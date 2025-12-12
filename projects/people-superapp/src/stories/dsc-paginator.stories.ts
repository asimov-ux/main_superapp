import type { Meta, StoryObj } from '@storybook/angular';
import { DscPaginatorComponent } from 'dsc-components';

const meta: Meta<DscPaginatorComponent> = {
  title: 'DSC Caixa/DscPaginator',
  component: DscPaginatorComponent,
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Total de itens',
    },
    pageSize: {
      control: 'number',
      description: 'Itens por página',
    },
    pageIndex: {
      control: 'number',
      description: 'Índice da página atual (baseado em 0)',
    },
    disabledPaginator: {
      control: 'boolean',
      description: 'Desabilita o paginador',
    },
  },
};

export default meta;
type Story = StoryObj<DscPaginatorComponent>;

export const Basic: Story = {
  args: {
    length: 100,
    pageSize: 10,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 25, 100],
  },
};

export const CustomPageSizes: Story = {
  args: {
    length: 500,
    pageSize: 25,
    pageIndex: 0,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

export const LargeDataset: Story = {
  args: {
    length: 1000,
    pageSize: 20,
    pageIndex: 5,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

export const Disabled: Story = {
  args: {
    length: 100,
    pageSize: 10,
    pageIndex: 0,
    disabledPaginator: true,
  },
};
