import type { Meta, StoryObj } from '@storybook/angular';
import { DscLogoComponent } from 'dsc-components';

const meta: Meta<DscLogoComponent> = {
  title: 'DSC Caixa/DscLogo',
  component: DscLogoComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['brand-full', 'synthesis-element'],
      description: 'Tipo do logotipo',
    },
    theme: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Tema de cores',
    },
    size: {
      control: 'select',
      options: ['16px', '24px', '32px', '40px', '48px', '56px'],
      description: 'Tamanho do logotipo',
    },
  },
};

export default meta;
type Story = StoryObj<DscLogoComponent>;

export const BrandFull: Story = {
  args: {
    type: 'brand-full',
    theme: 'default',
    size: '48px',
  },
};

export const SynthesisElement: Story = {
  args: {
    type: 'synthesis-element',
    theme: 'default',
    size: '48px',
  },
};

export const BrandFullInverse: Story = {
  args: {
    type: 'brand-full',
    theme: 'inverse',
    size: '48px',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SynthesisElementInverse: Story = {
  args: {
    type: 'synthesis-element',
    theme: 'inverse',
    size: '48px',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Size16px: Story = {
  args: {
    type: 'brand-full',
    size: '16px',
  },
};

export const Size24px: Story = {
  args: {
    type: 'brand-full',
    size: '24px',
  },
};

export const Size56px: Story = {
  args: {
    type: 'synthesis-element',
    size: '56px',
  },
};
