import type { StorybookConfig } from '@storybook/angular';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
  docs: {},
  webpackFinal: async (config: any) => {
    // Configurar alias para resolver dsc-components
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'dsc-components': resolve(
        __dirname,
        '../../../projects/dsc-components/src/public-api.ts'
      ),
    };

    // Adicionar suporte para CSS
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    return config;
  },
};
export default config;
