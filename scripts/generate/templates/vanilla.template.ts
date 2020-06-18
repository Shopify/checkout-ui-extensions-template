/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. Inquiry - Called first, during the checkout process.
 *  2. Render - If requested by `Inquiry`, will be rendered after checkout
 *     completes
 */

import {extend, Text} from '@shopify/argo-checkout';

/** Define any shape or type of data */
interface Payload {
  couldBe: 'anything' | 'everything';
}

/**
 * Entry point for the `Inquiry` Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step, and
 * optionally allows data to be stored on the client for use in the `Render`
 * extension point.
 */
extend('Checkout::PostPurchase::Inquiry', async ({storage}) => {
  const {render, payload} = await doInquiry();
  if (render) {
    // Saves payload data, provided to `Render` via `storage.inputData`
    await storage.update(payload);
  }
  return {
    render,
  };
});

// Simulate results of network call, etc.
async function doInquiry() {
  const payload: Payload = {
    couldBe: 'anything',
  };
  return {
    render: true,
    payload,
  };
}

/**
 * Entry point for the `Render` Extension Point
 *
 * Returns markup composed of Argo components.  The Render extension can
 * optionally make use of data stored during `Inquiry` extension point to
 * expedite time-to-first-meaningful-paint.
 */
extend('Checkout::PostPurchase::Render', (root, input) => {
  const payload = input.storage.initialData as Payload;
  const text = root.createComponent(Text);
  text.appendChild(
    `Create your awesome offer page here.  Inquiry payload=${JSON.stringify(
      payload
    )}`
  );

  root.appendChild(text);
  root.mount();
});
