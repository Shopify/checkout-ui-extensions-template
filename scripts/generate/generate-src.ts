import * as fs from 'fs';
import * as path from 'path';

export enum Framework {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const CUSTOM_EXTENSIONS = new Map([
  [Framework.VanillaTypescript, '.ts'],
  [Framework.ReactTypescript, '.tsx'],
]);

const TEMPLATES = new Map([
  [Framework.Vanilla, 'vanilla.template'],
  [Framework.React, 'react.template'],
  [Framework.VanillaTypescript, 'vanilla.template'],
  [Framework.ReactTypescript, 'react.template'],
]);

export function generateSrc(framework: Framework) {
  const extension = CUSTOM_EXTENSIONS.get(framework) || '.js';
  const template = TEMPLATES.get(framework)!;
  const templateSource = fs.readFileSync(
    path.join(__dirname, 'templates', template),
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
