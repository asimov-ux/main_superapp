import type { Meta, StoryObj } from '@storybook/angular';
import { DscSelectComponent } from 'dsc-components';

const meta: Meta<DscSelectComponent> = {
  title: 'DSC Caixa/DscSelect',
  component: DscSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo do campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    multiple: {
      control: 'boolean',
      description: 'Permite seleção múltipla',
    },
    showFilter: {
      control: 'boolean',
      description: 'Exibe campo de filtro',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o select',
    },
    size: {
      control: 'select',
      options: ['small', 'standard', 'large'],
      description: 'Tamanho do componente',
    },
  },
};

export default meta;
type Story = StoryObj<DscSelectComponent>;

export const Basic: Story = {
  args: {
    label: 'Selecione uma opção',
    placeholder: 'Escolha uma opção',
    options: [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' },
      { label: 'Opção 3', value: '3' },
    ],
  },
};

export const WithFilter: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país',
    showFilter: true,
    options: [
      { label: 'Brasil', value: 'br' },
      { label: 'Argentina', value: 'ar' },
      { label: 'Chile', value: 'cl' },
      { label: 'Uruguai', value: 'uy' },
      { label: 'Paraguai', value: 'py' },
    ],
  },
};

export const Multiple: Story = {
  args: {
    label: 'Selecione múltiplas opções',
    placeholder: 'Escolha uma ou mais opções',
    multiple: true,
    options: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'py' },
      { label: 'Java', value: 'java' },
      { label: 'C#', value: 'csharp' },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    label: 'Tecnologia',
    placeholder: 'Selecione uma tecnologia',
    showFilter: true,
    options: [
      {
        label: 'Frontend',
        value: 'frontend',
        options: [
          { label: 'Angular', value: 'angular' },
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
        ],
      },
      {
        label: 'Backend',
        value: 'backend',
        options: [
          { label: 'Node.js', value: 'node' },
          { label: 'Python', value: 'python' },
          { label: 'Java', value: 'java' },
        ],
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Este campo está desabilitado',
    disabled: true,
    options: [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' },
    ],
  },
};
