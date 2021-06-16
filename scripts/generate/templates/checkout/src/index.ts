import {extend, TextField, TextBlock, BlockStack} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root, {extensionPoint}) => {
  root.appendChild(
    root.createComponent(BlockStack, {}, [
      root.createComponent(
        TextBlock,
        {},
        `Welcome to the ${extensionPoint} extension!`
      ),
      root.createComponent(TextField, {
        label: 'Order note',
        onChange(value) {
          // eslint-disable-next-line no-console
          console.log(`Updated order note: ${value}`);
        },
      }),
    ])
  );
});
