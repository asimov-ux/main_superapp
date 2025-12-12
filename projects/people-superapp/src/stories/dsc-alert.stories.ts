import type { Meta, StoryObj } from '@storybook/angular';
import { DscAlertComponent } from 'dsc-components';

const meta: Meta<DscAlertComponent> = {
  title: 'DSC Caixa/DscAlert',
  component: DscAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info'],
      description: 'Tipo de alerta',
    },
    message: {
      control: 'text',
      description: 'Mensagem do alerta',
    },
    title: {
      control: 'text',
      description: 'Título do alerta',
    },
    showIcon: {
      control: 'boolean',
      description: 'Exibir ícone',
    },
  },
};

export default meta;
type Story = StoryObj<DscAlertComponent>;

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Operação concluída com sucesso!',
    showIcon: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    message: 'Ocorreu um erro ao processar sua solicitação.',
    showIcon: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Esta ação não pode ser desfeita.',
    showIcon: true,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'O sistema será atualizado em breve.',
    showIcon: true,
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Operação bem-sucedida',
    message: 'Os dados foram salvos com sucesso.',
    showIcon: true,
  },
};

export const WithList: Story = {
  args: {
    variant: 'warning',
    title: 'Múltiplas mensagens',
    list: [
      'Primeira mensagem de alerta',
      'Segunda mensagem de alerta',
      'Terceira mensagem de alerta',
    ],
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    message: 'Alerta sem ícone para interface mais limpa.',
    showIcon: false,
  },
};
