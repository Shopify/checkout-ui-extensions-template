import yargs from 'yargs';
import {
  log,
  generateSrc,
  Template,
  EXTENSION_TEMPLATE_MAP,
} from './generate-src';
import {cleanUp} from './clean-up';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer = require('inquirer');

const NICE_TEMPLATE_NAME_MAP = new Map([
  [Template.Vanilla, 'vanilla JavaScript'],
  [Template.React, 'React'],
  [Template.VanillaTypescript, 'TypeScript'],
  [Template.ReactTypescript, 'React and TypeScript'],
]);

(async () => {
  const {type: extensionType, template: templateIdentifier} = yargs.argv;

  const type = validateExtensionType(extensionType);

  const template = templateIdentifier
    ? validateTemplateIdentifier(templateIdentifier as string)
    : await getTemplateIdentifier();

  log(
    `Creating a ${EXTENSION_TEMPLATE_MAP.get(
      type
    )} extension using ${NICE_TEMPLATE_NAME_MAP.get(template)}`
  );

  generateSrc(type, template);
  cleanUp(type);
})();

function validateExtensionType(extensionPoint?: unknown) {
  if (
    typeof extensionPoint === 'string' &&
    EXTENSION_TEMPLATE_MAP.has(extensionPoint)
  ) {
    return extensionPoint;
  }

  throw new Error(`Unknown extension type: ${extensionPoint}`);
}

function validateTemplateIdentifier(templateIdentifier: string): Template {
  if (isTemplate(templateIdentifier)) {
    return templateIdentifier;
  }
  throw new Error(`Unknown template: ${templateIdentifier}`);
}

function isTemplate(
  templateIdentifier: string
): templateIdentifier is Template {
  for (const key in Template) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((Template as any)[key] === templateIdentifier) {
      return true;
    }
  }
  return false;
}

async function getTemplateIdentifier() {
  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select template:',
      min: 1,
      max: 1,
      instructions: false,
      choices: Object.values(Template),
    },
  ]);
  const {template} = response;
  return template;
}
