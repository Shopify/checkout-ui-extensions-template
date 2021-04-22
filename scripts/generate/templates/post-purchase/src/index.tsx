/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. ShouldRender - Called first, during the checkout process.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */

import {
  extend,
  render,
  useExtensionInput,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  HeadingGroup,
  Image,
  Layout,
  Separator,
  Text,
  TextBlock,
  TextContainer,
} from '@shopify/argo-post-purchase-react';

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
    // Saves initial state, provided to `Render` via `storage.initialData`
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
render('Checkout::PostPurchase::Render', () => <App />);

// Top-level React component
export function App() {
  const {extensionPoint, storage} = useExtensionInput<
    'Checkout::PostPurchase::Render'
  >();
  const initialState = storage.initialData as InitialState;
  return (
    <BlockStack>
      <CalloutBanner
        title={`The body of this page was rendered by ${extensionPoint}`}
      >
        subtext
      </CalloutBanner>
      {/* <Layout />
       * `500` represents `500px`
       * `0.5` represents `50%`
       * `1` represents `100%` */}
      <Layout
        media={[
          {viewportSize: 'small', sizes: [1, 1], maxInlineSize: 0.95},
          {viewportSize: 'medium', sizes: [300, 0.5], maxInlineSize: 0.95},
          {viewportSize: 'large', sizes: [300, 0.3], maxInlineSize: 0.95},
        ]}
      >
        <BlockStack>
          <Heading>Left Column</Heading>
          <Image source="https://cdn.shopify.com/assets/images/logos/shopify-bag.png" />
        </BlockStack>
        <BlockStack alignment="leading">
          <TextContainer>
            <Heading>Right Column</Heading>
            <HeadingGroup>
              <Heading>My Post-Purchase Extension</Heading>
              <TextBlock>
                It could be a cross-sell extension, product review for past
                purchases, request for more information from the buyer, or
                anything else
              </TextBlock>
              <HeadingGroup>
                <Heading>Description</Heading>
                <TextBlock>
                  This is a non-exhaustive example, demonstrating provided UI
                  components
                </TextBlock>
              </HeadingGroup>
            </HeadingGroup>
          </TextContainer>
          <Button
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log(`Extension point ${extensionPoint}`, initialState);
            }}
          >
            Log extension point to console
          </Button>
        </BlockStack>
      </Layout>
      <Layout maxInlineSize={0.8}>
        <BlockStack>
          <Separator />
          <TextContainer spacing="loose" alignment="center">
            <TextBlock>
              Bottom Text <Text emphasized>Stretches </Text>
              across both columns. Bottom Text Stretches across both columns.
              Bottom Text Stretches across both columns. Bottom Text Stretches
              across both columns. Bottom Text Stretches across both columns.
              Bottom Text Stretches across both columns.
            </TextBlock>
            <TextBlock>
              In the <Text role="deletion">First</Text> Second Paragraph, Bottom
              Text Stretches across both columns. Bottom Text Stretches across
              both columns. Bottom Text Stretches across both columns. Bottom
              Text Stretches across both columns. Bottom Text Stretches across
              both columns. Bottom Text Stretches across both columns.
            </TextBlock>
          </TextContainer>
        </BlockStack>
      </Layout>
    </BlockStack>
  );
}
