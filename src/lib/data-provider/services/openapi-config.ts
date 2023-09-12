import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
    apiFile: './emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFile: './__generated.ts',
    exportName: 'api',
    hooks: true,
};

export default config;
