import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    // Configuração de controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },

    // Backgrounds customizados CAIXA
    backgrounds: {
      default: 'Branco CAIXA',
      values: [
        {
          name: 'Branco CAIXA',
          value: '#FFFFFF',
        },
        {
          name: 'Cinza Claro',
          value: '#F5F5F5',
        },
        {
          name: 'Azul CAIXA',
          value: '#005CA9',
        },
        {
          name: 'Laranja CAIXA',
          value: '#F39200',
        },
        {
          name: 'Turquesa CAIXA',
          value: '#54BBAB',
        },
        {
          name: 'Cinza Escuro',
          value: '#424242',
        },
      ],
    },

    // Viewports customizados (mobile-first)
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop (1366px)',
          styles: {
            width: '1366px',
            height: '768px',
          },
        },
        desktopHD: {
          name: 'Desktop HD (1920px)',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },

    // Documentação
    docs: {
      toc: true, // Table of contents
    },

    // Layout
    layout: 'centered',

    // Actions
    actions: { argTypesRegex: '^on[A-Z].*' },
  },

  // Global decorators
  decorators: [
    (story) => {
      return story();
    },
  ],
};

export default preview;
