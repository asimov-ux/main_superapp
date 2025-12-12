import type { Meta, StoryObj } from '@storybook/angular';
import { DscButtonHeaderComponent } from 'dsc-components';

const meta: Meta<DscButtonHeaderComponent> = {
  title: 'DSC Caixa/DscButtonHeader',
  component: DscButtonHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Ícone do Material Design',
    },
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
  },
};

export default meta;
type Story = StoryObj<DscButtonHeaderComponent>;

export const Menu: Story = {
  args: {
    icon: 'menu',
    label: 'Menu',
  },
};

export const Home: Story = {
  args: {
    icon: 'home',
    label: 'Início',
  },
};

export const Search: Story = {
  args: {
    icon: 'search',
    label: 'Buscar',
  },
};

export const Notifications: Story = {
  args: {
    icon: 'notifications',
    label: 'Notificações',
  },
};

export const Profile: Story = {
  args: {
    icon: 'account_circle',
    label: 'Perfil',
  },
};

export const Settings: Story = {
  args: {
    icon: 'settings',
    label: 'Configurações',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'block',
    label: 'Excluir',
    disabled: true,
  },
};
