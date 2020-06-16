import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import prettier from 'prettier';

export enum Template {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const CUSTOM_EXTENSIONS = new Map([
  [Template.VanillaTypescript, '.ts'],
  [Template.ReactTypescript, '.tsx'],
  [Template.React, '.jsx'],
]);

const TEMPLATES = new Map([
  [Template.Vanilla, 'vanilla.template.js'],
  [Template.React, 'react.template.jsx'],
  [Template.VanillaTypescript, 'vanilla.template.ts'],
  [Template.ReactTypescript, 'react.template.tsx'],
]);

export function generateSrc(Template: Template) {
  const extension = CUSTOM_EXTENSIONS.get(Template) || '.js';
  try {
    const outputDirectory = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    const outPath = path.join(outputDirectory, `index${extension}`);
    const templateSource = getTemplateSrc(Template);
    fs.writeFileSync(outPath, templateSource);

    console.log(`src/index${extension} file was created.`);
  } catch (error) {
    console.error(`src/index${extension} file could not be created: `, error);
  }
}

function getTemplateSrc(template: Template) {
  switch (template) {
    case Template.React:
      return transpile(Template.ReactTypescript);
    case Template.Vanilla:
      return transpile(Template.VanillaTypescript);
    default:
      return readTemplate(template);
  }
}

function transpile(Template: Template) {
  const input = readTemplate(Template);
  const output = ts.transpileModule(input, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2017,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
  });
  const options = prettier.resolveConfig.sync('.')!;
  return prettier.format(output.outputText, {...options, parser: 'typescript'});
}

function readTemplate(Template: Template) {
  return fs.readFileSync(
    path.join(__dirname, 'templates', TEMPLATES.get(Template)!),
    'utf8'
  );
}
