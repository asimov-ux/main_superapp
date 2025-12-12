import type { Meta, StoryObj } from '@storybook/angular';
import { DscTableComponent } from 'dsc-components';

const meta: Meta<DscTableComponent> = {
  title: 'DSC Caixa/DscTable',
  component: DscTableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DscTableComponent>;

const sampleData = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    status: 'Ativo',
    data: '15/03/2025',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@exemplo.com',
    status: 'Ativo',
    data: '20/03/2025',
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@exemplo.com',
    status: 'Inativo',
    data: '25/03/2025',
  },
  {
    id: 4,
    nome: 'Ana Costa',
    email: 'ana.costa@exemplo.com',
    status: 'Ativo',
    data: '01/04/2025',
  },
];

const columns = [
  { field: 'id', header: 'ID', sortable: true, width: '80px' },
  { field: 'nome', header: 'Nome', sortable: true },
  { field: 'email', header: 'Email', sortable: false },
  { field: 'status', header: 'Status', sortable: true },
  { field: 'data', header: 'Data de Cadastro', sortable: true },
];

export const Basic: Story = {
  args: {
    columns: columns,
    data: sampleData,
    selectorType: 'none',
  },
};

export const WithCheckboxSelection: Story = {
  args: {
    columns: columns,
    data: sampleData,
    selectorType: 'checkbox',
  },
};

export const WithRadioSelection: Story = {
  args: {
    columns: columns,
    data: sampleData,
    selectorType: 'radio',
  },
};

export const WithMaxHeight: Story = {
  args: {
    columns: columns,
    data: [...sampleData, ...sampleData, ...sampleData],
    selectorType: 'checkbox',
    tableMaxHeight: '300px',
  },
};

export const Empty: Story = {
  args: {
    columns: columns,
    data: [],
    selectorType: 'none',
  },
};
