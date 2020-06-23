/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. Inquiry - Called first, during the checkout process.
 *  2. Render - If requested by `Inquiry`, will be rendered after checkout
 *     completes
 */

import React from 'react';
import {
  extend,
  render,
  Text,
  InputForRenderExtension,
} from '@shopify/argo-checkout-react';

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
render('Checkout::PostPurchase::Render', (props) => (
  <PostPurchaseExtension {...props} />
));

// Top-level React component
function PostPurchaseExtension(
  props: InputForRenderExtension<'Checkout::PostPurchase::Render'>
) {
  const payload = props.storage.initialData as Payload;
  return (
    <Text>
      Create your awesome post purchase page here. Inquiry payload=
      {JSON.stringify(payload)}
    </Text>
  );
}
