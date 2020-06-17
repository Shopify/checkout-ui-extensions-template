import * as fs from 'fs';
import * as path from 'path';

export enum Template {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const CUSTOM_EXTENSIONS = new Map([
  [Template.VanillaTypescript, '.ts'],
  [Template.ReactTypescript, '.tsx'],
]);

const TEMPLATES = new Map([
  [Template.Vanilla, 'vanilla.template'],
  [Template.React, 'react.template'],
  [Template.VanillaTypescript, 'vanilla.template'],
  [Template.ReactTypescript, 'react.template'],
]);

export function generateSrc(template: Template) {
  const extension = CUSTOM_EXTENSIONS.get(template) || '.js';
  const selectedTemplate = TEMPLATES.get(template)!;
  const templateSource = fs.readFileSync(
    path.join(__dirname, 'templates', selectedTemplate),
    'utf8'
  );

  try {
    const outputDirectory = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    const outPath = path.join(outputDirectory, `index${extension}`);
    fs.writeFileSync(outPath, templateSource);

    console.log(`src/index${extension} file was created.`);
  } catch (error) {
    console.error(`src/index${extension} file could not be created: `, error);
  }
}
