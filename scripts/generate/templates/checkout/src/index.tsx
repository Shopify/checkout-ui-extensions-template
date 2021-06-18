import {
  render,
  TextField,
  TextBlock,
  BlockStack,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Feature::Render', ({extensionPoint}) => (
  <App extensionPoint={extensionPoint} />
));

function App({extensionPoint}: {extensionPoint: string}) {
  return (
    <BlockStack>
      <TextBlock>Welcome to the {extensionPoint} extension!</TextBlock>
      <TextField
        label="Order note"
        onChange={(value) => {
          // eslint-disable-next-line no-console
          console.log(`Updated order note: ${value}`);
        }}
      />
    </BlockStack>
  );
}
