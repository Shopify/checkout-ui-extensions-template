/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. ShouldRender - Called first, during the checkout process.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */

import React from 'react';
import {
  extend,
  render,
  useExtensionInput,
  Button,
  Text,
} from '@shopify/argo-checkout-react';

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
function App() {
  const {extensionPoint, storage} = useExtensionInput<
    'Checkout::PostPurchase::Render'
  >();
  const initialState = storage.initialData;
  return (
    <>
      <Text>
        Create your awesome post purchase page here. initialState=
        {JSON.stringify(initialState)}
      </Text>
      <Button
        onPress={() => {
          console.log(`Extension point ${extensionPoint}`);
        }}
      >
        Log extension point to console
      </Button>
    </>
  );
}
