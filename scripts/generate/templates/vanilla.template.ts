/**
 * Extend Shopify Checkout with a custom Post Purchase user experience
 * This Shopify Checkout template provides two extension points:
 *  1. Inquiry - Called first, during the payment step.
 *  2. Render - If requested by `Inquiry`, will be rendered after
 *     payment processing completes
 */

import {extend, Text} from '@shopify/argo-checkout';

/** Define any shape or type of data */
interface Payload {
  couldBe: 'anything' | 'everything';
}

/**
 * Entry point for the Inquiry Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step,
 * and optionally allows data to be stored on the client for use in the
 * `::Render` extension point.
 */
extend('Checkout::PostPurchase::Inquiry', async ({storage}) => {
  const {render, payload} = await doInquiry();
  if (render) {
    await storage.update(payload);
  }
  return {
    render,
  };
});

// Simulate results of network call, etc.
const doInquiry = async () => {
  const payload: Payload = {
    couldBe: 'anything',
  };
  return {
    render: true,
    payload,
  };
};

/**
 * Entry point for the Render Extension Point
 *
 * Returns markup composed of remote-UI components.  The Render
 * extension can optionally make use of data stored during `::Inquiry` extension
 * point to expedite time-to-first-meaningful-paint.
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
