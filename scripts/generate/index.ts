import yargs from 'yargs';
import {generateSrc, Template} from './generate-src';
import {cleanUp} from './clean-up';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer = require('inquirer');

(async () => {
  const {type: extensionPoint} = yargs.argv;
  console.log('Create ', extensionPoint, ' extension project');
  if (!extensionPoint) {
    console.error(
      `
Warning: Unknown extension point ${extensionPoint}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
      `
    );
    return;
  }

  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select template:',
      min: 1,
      max: 1,
      instructions: false,
      choices: ['vanilla', 'react', 'vanilla-typescript', 'react-typescript'],
    },
  ]);

  const {template} = response;

  console.log('✅ You selected:', template);

  generateSrc(template as Template);
  cleanUp();
})();
