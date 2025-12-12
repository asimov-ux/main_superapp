import type { Meta, StoryObj } from '@storybook/angular';
import { DscButtonComponent } from 'dsc-components';

const meta: Meta<DscButtonComponent> = {
  title: 'DSC Caixa/DscButton',
  component: DscButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'danger',
        'outlined',
        'text',
        'auxiliary',
      ],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['small', 'standard', 'large'],
      description: 'Tamanho do botão',
    },
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
    iconPrefix: {
      control: 'text',
      description: 'Ícone antes do texto (Material Icons)',
    },
    iconSuffix: {
      control: 'text',
      description: 'Ícone depois do texto (Material Icons)',
    },
    icon: {
      control: 'text',
      description: 'Ícone para botão icon-only',
    },
    iconButton: {
      control: 'boolean',
      description: 'Botão apenas com ícone',
    },
  },
};

export default meta;
type Story = StoryObj<DscButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Botão Primary',
    variant: 'primary',
    size: 'standard',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Botão Secondary',
    variant: 'secondary',
    size: 'standard',
  },
};

export const Danger: Story = {
  args: {
    label: 'Botão Danger',
    variant: 'danger',
    size: 'standard',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Botão Outlined',
    variant: 'outlined',
    size: 'standard',
  },
};

export const Text: Story = {
  args: {
    label: 'Botão Text',
    variant: 'text',
    size: 'standard',
  },
};

export const Auxiliary: Story = {
  args: {
    label: 'Botão Auxiliary',
    variant: 'auxiliary',
    size: 'standard',
  },
};

export const WithIconPrefix: Story = {
  args: {
    label: 'Salvar',
    variant: 'primary',
    iconPrefix: 'save',
  },
};

export const WithIconSuffix: Story = {
  args: {
    label: 'Avançar',
    variant: 'primary',
    iconSuffix: 'arrow_forward',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'favorite',
    iconButton: true,
    variant: 'primary',
    ariaLabel: 'Favoritar',
  },
};

export const Small: Story = {
  args: {
    label: 'Botão Pequeno',
    variant: 'primary',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Botão Grande',
    variant: 'primary',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Botão Desabilitado',
    variant: 'primary',
    disabled: true,
  },
};
