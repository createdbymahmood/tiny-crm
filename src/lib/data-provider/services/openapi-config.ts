import type {ConfigFile} from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './swagger.yaml',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './__generated.ts',
  exportName: 'generatedApi',
  hooks: false,
  tag: true,
  flattenArg: true,
};

export default config;
