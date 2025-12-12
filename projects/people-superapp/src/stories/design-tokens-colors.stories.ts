import type { Meta, StoryObj } from '@storybook/angular';

/**
 * # Design System CAIXA - Cores
 *
 * Paleta oficial de cores da CAIXA Econômica Federal conforme Design System institucional.
 *
 * ## Cores Principais
 * - **Azul CAIXA**: Cor primária da marca (#005CA9)
 * - **Laranja CAIXA**: Cor secundária (#F39200)
 * - **Turquesa CAIXA**: Cor terciária (#54BBAB)
 */
const meta: Meta<any> = {
  title: 'Design System/Tokens/Cores',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({}),
};

export default meta;
type Story = StoryObj<any>;

export const CoresPrincipais: Story = {
  render: () => ({
    template: `
      <div style="padding: 40px; font-family: 'Roboto', sans-serif;">
        <h1 style="color: #005CA9; margin-bottom: 32px;">Cores Principais</h1>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px; margin-bottom: 48px;">
          <!-- Azul CAIXA -->
          <div>
            <div style="background: #005CA9; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Azul CAIXA 90</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#005CA9</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Cor primária</p>
          </div>
          
          <div>
            <div style="background: #0076D6; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Azul CAIXA 70</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#0076D6</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Hover</p>
          </div>
          
          <div>
            <div style="background: #003E72; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Azul CAIXA 110</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#003E72</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Active</p>
          </div>
          
          <!-- Laranja CAIXA -->
          <div>
            <div style="background: #F39200; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Laranja CAIXA 70</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#F39200</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Cor secundária</p>
          </div>
          
          <div>
            <div style="background: #FFB03B; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Laranja CAIXA 50</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#FFB03B</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Hover</p>
          </div>
          
          <div>
            <div style="background: #C77700; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Laranja CAIXA 90</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#C77700</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Active</p>
          </div>
          
          <!-- Turquesa CAIXA -->
          <div>
            <div style="background: #54BBAB; height: 120px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Turquesa CAIXA</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#54BBAB</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #757575;">Cor terciária</p>
          </div>
        </div>
        
        <h2 style="color: #005CA9; margin-bottom: 24px;">Cores de Feedback</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
          <div>
            <div style="background: #4CAF50; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Success</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#4CAF50</p>
          </div>
          
          <div>
            <div style="background: #C62828; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Danger</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#C62828</p>
          </div>
          
          <div>
            <div style="background: #F39200; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Warning</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#F39200</p>
          </div>
          
          <div>
            <div style="background: #005CA9; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Info</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#005CA9</p>
          </div>
        </div>
      </div>
    `,
  }),
};

export const CoresNeutras: Story = {
  render: () => ({
    template: `
      <div style="padding: 40px; font-family: 'Roboto', sans-serif;">
        <h1 style="color: #005CA9; margin-bottom: 32px;">Cores Neutras</h1>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
          <div>
            <div style="background: #FFFFFF; height: 80px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #E0E0E0;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Branco</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#FFFFFF</p>
          </div>
          
          <div>
            <div style="background: #F5F5F5; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 10</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#F5F5F5</p>
          </div>
          
          <div>
            <div style="background: #E0E0E0; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 20</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#E0E0E0</p>
          </div>
          
          <div>
            <div style="background: #BDBDBD; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 40</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#BDBDBD</p>
          </div>
          
          <div>
            <div style="background: #9E9E9E; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 50</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#9E9E9E</p>
          </div>
          
          <div>
            <div style="background: #757575; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 60</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#757575</p>
          </div>
          
          <div>
            <div style="background: #424242; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 80</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#424242</p>
          </div>
          
          <div>
            <div style="background: #212121; height: 80px; border-radius: 8px; margin-bottom: 12px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #212121;">Cinza 90</h3>
            <p style="margin: 0; font-size: 14px; color: #757575; font-family: monospace;">#212121</p>
          </div>
        </div>
      </div>
    `,
  }),
};
