/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. ShouldRender - Called first, during the checkout process.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */

import {
  extend,
  BlockStack,
  Button,
  Heading,
  HeadingGroup,
  Image,
  InlineStack,
  Separator,
  Text,
  TextBlock,
  TextContainer,
  CalloutBanner,
} from '@shopify/argo-checkout';

/** Define any shape or type of data */
interface InitialState {
  couldBe: 'anything' | 'everything';
}

/**
 * Entry point for the `ShouldRender` Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step, and
 * optionally allows data to be stored on the client for use in the `Render`
 * extension point.
 */
extend('Checkout::PostPurchase::ShouldRender', async ({storage}) => {
  const {render, initialState} = await getRenderData();
  if (render) {
    // Saves payload data, provided to `Render` via `storage.initialData`
    await storage.update(initialState);
  }
  return {
    render,
  };
});

// Simulate results of network call, etc.
async function getRenderData() {
  const initialState: InitialState = {
    couldBe: 'anything',
  };
  return {
    render: true,
    initialState,
  };
}

/**
 * Entry point for the `Render` Extension Point
 *
 * Returns markup composed of Argo components.  The Render extension can
 * optionally make use of data stored during `ShouldRender` extension point to
 * expedite time-to-first-meaningful-paint.
 */
extend('Checkout::PostPurchase::Render', (root, {extensionPoint, storage}) => {
  const initialState = storage.initialData as InitialState;

  root.appendChild(
    root.createComponent(BlockStack, {}, [
      root.createComponent(
        CalloutBanner,
        {
          title: `The body of this page was rendered by ${extensionPoint}`,
        },
        'subtext'
      ),
      /* InlineStack is a temporary to create columns.  A new layout component will be
         available soon that provides responsive UI and more control over widths. */
      root.createComponent(InlineStack, {}, [
        root.createComponent(BlockStack, {}, [
          root.createComponent(Heading, {}, 'Left Column'),
          root.createComponent(Image, {
            source:
              'https://cdn.shopify.com/assets/images/logos/shopify-bag.png',
          }),
        ]),
        root.createComponent(BlockStack, {}, [
          root.createComponent(TextContainer, {}, [
            root.createComponent(Heading, {}, 'Right Column'),
            root.createComponent(HeadingGroup, {}, [
              root.createComponent(Heading, {}, 'My Post-Purchase Extension'),
              root.createComponent(
                TextBlock,
                {},
                'It could be a cross-sell extension, product review for past purchases, request for more information from the buyer, or anything else'
              ),
              root.createComponent(HeadingGroup, {}, [
                root.createComponent(Heading, {}, 'Description'),
                root.createComponent(
                  TextBlock,
                  {},
                  'This is a non-exhaustive example, demonstrating provided UI components'
                ),
                root.createComponent(Heading, {}, 'initialState'),
                root.createComponent(
                  TextBlock,
                  {},
                  JSON.stringify(initialState)
                ),
              ]),
            ]),
          ]),
          root.createComponent(
            Button,
            {
              onPress: () => {
                console.log(`Extension point ${extensionPoint}`);
              },
            },
            'Log extension point to console'
          ),
        ]),
      ]),
      root.createComponent(Separator),
      root.createComponent(
        TextContainer,
        {spacing: 'loose', alignment: 'center'},
        [
          root.createComponent(TextBlock, {}, [
            'Bottom Text ',
            root.createComponent(Text, {emphasized: true}, 'Stretches'),
            ' across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns.',
          ]),
          root.createComponent(TextBlock, {}, [
            'In the ',
            root.createComponent(Text, {role: 'deletion'}, 'First'),
            ' Second Paragraph, Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns. Bottom Text Stretches across both columns.',
          ]),
        ]
      ),
    ])
  );

  root.mount();
});
