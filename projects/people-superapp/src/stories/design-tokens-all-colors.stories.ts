import type { Meta, StoryObj } from '@storybook/angular';

/**
 * # Design System CAIXA - Todas as Cores
 *
 * Paleta completa com 150+ tokens de cores incluindo:
 * - Paleta Fixa (Primary, Secondary, Tertiary, Grayscale)
 * - Paleta Flexível (Céu, Uva, Limão, Tangerina, Goiaba)
 * - Paleta Feedback (Positive, Attention, Negative, Informative)
 * - Gradientes (12 variações)
 */
const meta: Meta<any> = {
  title: 'Design System/Tokens/Todas as Cores',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({}),
};

export default meta;
type Story = StoryObj<any>;

const ColorSwatch = (
  color: string,
  name: string,
  hex: string,
  level?: string
) => `
  <div style="text-align: center;">
    <div style="
      background: ${hex};
      height: 80px;
      border-radius: 8px;
      margin-bottom: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    "></div>
    <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 500; color: #212121;">${name}</p>
    ${
      level
        ? `<p style="margin: 0 0 4px 0; font-size: 11px; color: #757575;">${level}</p>`
        : ''
    }
    <p style="margin: 0; font-size: 11px; color: #9E9E9E; font-family: monospace;">${hex}</p>
  </div>
`;

export const PaletaCompleta: Story = {
  render: () => ({
    template: `
      <div style="padding: 40px; font-family: 'Roboto', sans-serif; background: #FAFAFA;">
        
        <!-- PALETA FIXA -->
        <section style="margin-bottom: 48px;">
          <h1 style="color: #005CA9; margin-bottom: 8px; font-size: 32px;">Paleta Fixa</h1>
          <p style="color: #757575; margin-bottom: 32px;">Cores principais da identidade visual CAIXA</p>
          
          <!-- Azul CAIXA -->
          <h2 style="color: #005CA9; margin-bottom: 16px; font-size: 20px;">Azul CAIXA (Primary)</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 32px;">
            ${ColorSwatch('#002A4D', 'Azul 130', '#002A4D', '130')}
            ${ColorSwatch('#00437A', 'Azul 110', '#00437A', '110')}
            ${ColorSwatch('#005CA9', 'Azul 90 ⭐', '#005CA9', '90 - Principal')}
            ${ColorSwatch('#2D8AD8', 'Azul 70', '#2D8AD8', '70')}
            ${ColorSwatch('#6DBAFA', 'Azul 50', '#6DBAFA', '50')}
            ${ColorSwatch('#A0D2FC', 'Azul 30', '#A0D2FC', '30')}
            ${ColorSwatch('#E5F1FC', 'Azul 10', '#E5F1FC', '10')}
          </div>
          
          <!-- Laranja CAIXA -->
          <h2 style="color: #F39200; margin-bottom: 16px; font-size: 20px;">Laranja CAIXA (Secondary)</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 32px;">
            ${ColorSwatch('#663A00', 'Laranja 130', '#663A00', '130')}
            ${ColorSwatch('#A65E00', 'Laranja 110', '#A65E00', '110')}
            ${ColorSwatch('#D87B00', 'Laranja 90', '#D87B00', '90')}
            ${ColorSwatch(
              '#F39200',
              'Laranja 70 ⭐',
              '#F39200',
              '70 - Secundária'
            )}
            ${ColorSwatch('#FDB548', 'Laranja 50', '#FDB548', '50')}
            ${ColorSwatch('#FFD392', 'Laranja 30', '#FFD392', '30')}
            ${ColorSwatch('#FFEFD6', 'Laranja 10', '#FFEFD6', '10')}
          </div>
          
          <!-- Turquesa CAIXA -->
          <h2 style="color: #54BBAB; margin-bottom: 16px; font-size: 20px;">Turquesa CAIXA (Tertiary)</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 32px;">
            ${ColorSwatch('#034538', 'Turquesa 130', '#034538', '130')}
            ${ColorSwatch('#216E62', 'Turquesa 110', '#216E62', '110')}
            ${ColorSwatch('#359485', 'Turquesa 90', '#359485', '90')}
            ${ColorSwatch(
              '#54BBAB',
              'Turquesa 70 ⭐',
              '#54BBAB',
              '70 - Terciária'
            )}
            ${ColorSwatch('#81D6C8', 'Turquesa 50', '#81D6C8', '50')}
            ${ColorSwatch('#B9EBE3', 'Turquesa 30', '#B9EBE3', '30')}
            ${ColorSwatch('#E4F7F4', 'Turquesa 10', '#E4F7F4', '10')}
          </div>
          
          <!-- Cinza -->
          <h2 style="color: #64747A; margin-bottom: 16px; font-size: 20px;">Escala de Cinza</h2>
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 16px;">
            ${ColorSwatch('#22292E', 'Cinza 130', '#22292E', '130')}
            ${ColorSwatch('#404852', 'Cinza 110', '#404852', '110')}
            ${ColorSwatch('#64747A', 'Cinza 90', '#64747A', '90')}
            ${ColorSwatch('#9EB2B8', 'Cinza 70', '#9EB2B8', '70')}
            ${ColorSwatch('#D0E0E3', 'Cinza 50', '#D0E0E3', '50')}
            ${ColorSwatch('#EBF1F2', 'Cinza 30', '#EBF1F2', '30')}
            ${ColorSwatch('#F7FAFA', 'Cinza 10', '#F7FAFA', '10')}
            ${ColorSwatch('#FFFFFF', 'Branco', '#FFFFFF', 'white')}
          </div>
        </section>

        <!-- PALETA FLEXÍVEL -->
        <section style="margin-bottom: 48px;">
          <h1 style="color: #005CA9; margin-bottom: 8px; font-size: 32px;">Paleta Flexível</h1>
          <p style="color: #757575; margin-bottom: 32px;">Cores complementares para diversos contextos</p>
          
          <!-- Céu -->
          <h2 style="color: #00B4E6; margin-bottom: 16px; font-size: 18px;">Céu</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px;">
            ${ColorSwatch('#003C4D', 'Céu 130', '#003C4D', '130')}
            ${ColorSwatch('#006480', 'Céu 110', '#006480', '110')}
            ${ColorSwatch('#008CB2', 'Céu 90', '#008CB2', '90')}
            ${ColorSwatch('#00B4E6', 'Céu 70', '#00B4E6', '70')}
            ${ColorSwatch('#2EC8F3', 'Céu 50', '#2EC8F3', '50')}
            ${ColorSwatch('#6EDBFA', 'Céu 30', '#6EDBFA', '30')}
            ${ColorSwatch('#D0F5FF', 'Céu 10', '#D0F5FF', '10')}
          </div>
          
          <!-- Uva -->
          <h2 style="color: #B26F9B; margin-bottom: 16px; font-size: 18px;">Uva</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px;">
            ${ColorSwatch('#4F213F', 'Uva 130', '#4F213F', '130')}
            ${ColorSwatch('#753C61', 'Uva 110', '#753C61', '110')}
            ${ColorSwatch('#93537D', 'Uva 90', '#93537D', '90')}
            ${ColorSwatch('#B26F9B', 'Uva 70', '#B26F9B', '70')}
            ${ColorSwatch('#CE97BB', 'Uva 50', '#CE97BB', '50')}
            ${ColorSwatch('#EAC9DE', 'Uva 30', '#EAC9DE', '30')}
            ${ColorSwatch('#F8EAF3', 'Uva 10', '#F8EAF3', '10')}
          </div>
          
          <!-- Limão -->
          <h2 style="color: #AFCA0B; margin-bottom: 16px; font-size: 18px;">Limão</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px;">
            ${ColorSwatch('#465200', 'Limão 130', '#465200', '130')}
            ${ColorSwatch('#6D8000', 'Limão 110', '#6D8000', '110')}
            ${ColorSwatch('#99B103', 'Limão 90', '#99B103', '90')}
            ${ColorSwatch('#AFCA0B', 'Limão 70', '#AFCA0B', '70')}
            ${ColorSwatch('#C5DE31', 'Limão 50', '#C5DE31', '50')}
            ${ColorSwatch('#DEF06D', 'Limão 30', '#DEF06D', '30')}
            ${ColorSwatch('#F5FEC1', 'Limão 10', '#F5FEC1', '10')}
          </div>
          
          <!-- Tangerina -->
          <h2 style="color: #F9B000; margin-bottom: 16px; font-size: 18px;">Tangerina</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px;">
            ${ColorSwatch('#664800', 'Tangerina 130', '#664800', '130')}
            ${ColorSwatch('#996C00', 'Tangerina 110', '#996C00', '110')}
            ${ColorSwatch('#D19400', 'Tangerina 90', '#D19400', '90')}
            ${ColorSwatch('#F9B000', 'Tangerina 70', '#F9B000', '70')}
            ${ColorSwatch('#FAC546', 'Tangerina 50', '#FAC546', '50')}
            ${ColorSwatch('#FCDD92', 'Tangerina 30', '#FCDD92', '30')}
            ${ColorSwatch('#FFF3D6', 'Tangerina 10', '#FFF3D6', '10')}
          </div>
          
          <!-- Goiaba -->
          <h2 style="color: #EF765E; margin-bottom: 16px; font-size: 18px;">Goiaba</h2>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px;">
            ${ColorSwatch('#801905', 'Goiaba 130', '#801905', '130')}
            ${ColorSwatch('#B23820', 'Goiaba 110', '#B23820', '110')}
            ${ColorSwatch('#D85B3F', 'Goiaba 90', '#D85B3F', '90')}
            ${ColorSwatch('#EF765E', 'Goiaba 70', '#EF765E', '70')}
            ${ColorSwatch('#F79481', 'Goiaba 50', '#F79481', '50')}
            ${ColorSwatch('#FCBDB0', 'Goiaba 30', '#FCBDB0', '30')}
            ${ColorSwatch('#FFEAE5', 'Goiaba 10', '#FFEAE5', '10')}
          </div>
        </section>

        <!-- PALETA FEEDBACK -->
        <section style="margin-bottom: 48px;">
          <h1 style="color: #005CA9; margin-bottom: 8px; font-size: 32px;">Paleta Feedback</h1>
          <p style="color: #757575; margin-bottom: 32px;">Cores para estados e mensagens do sistema</p>
          
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;">
            <!-- Positive -->
            <div>
              <h3 style="color: #179231; margin-bottom: 16px;">Positive (Sucesso)</h3>
              <div style="display: grid; gap: 12px;">
                ${ColorSwatch('#093A14', 'Positive 130', '#093A14', '130')}
                ${ColorSwatch('#0D581C', 'Positive 110', '#0D581C', '110')}
                ${ColorSwatch('#127527', 'Positive 90', '#127527', '90')}
                ${ColorSwatch('#179231', 'Positive 70 ⭐', '#179231', '70')}
                ${ColorSwatch('#5CB26E', 'Positive 50', '#5CB26E', '50')}
                ${ColorSwatch('#A2D3AD', 'Positive 30', '#A2D3AD', '30')}
                ${ColorSwatch('#E7F4EA', 'Positive 10', '#E7F4EA', '10')}
              </div>
            </div>
            
            <!-- Attention -->
            <div>
              <h3 style="color: #FCBE05; margin-bottom: 16px;">Attention (Atenção)</h3>
              <div style="display: grid; gap: 12px;">
                ${ColorSwatch('#654C02', 'Attention 130', '#654C02', '130')}
                ${ColorSwatch('#977203', 'Attention 110', '#977203', '110')}
                ${ColorSwatch('#CA9804', 'Attention 90', '#CA9804', '90')}
                ${ColorSwatch('#FCBE05', 'Attention 70 ⭐', '#FCBE05', '70')}
                ${ColorSwatch('#FDD150', 'Attention 50', '#FDD150', '50')}
                ${ColorSwatch('#FEE59B', 'Attention 30', '#FEE59B', '30')}
                ${ColorSwatch('#FFF9E6', 'Attention 10', '#FFF9E6', '10')}
              </div>
            </div>
            
            <!-- Negative -->
            <div>
              <h3 style="color: #D93636; margin-bottom: 16px;">Negative (Erro)</h3>
              <div style="display: grid; gap: 12px;">
                ${ColorSwatch('#661A1A', 'Negative 130', '#661A1A', '130')}
                ${ColorSwatch('#8C2323', 'Negative 110', '#8C2323', '110')}
                ${ColorSwatch('#B22C2C', 'Negative 90', '#B22C2C', '90')}
                ${ColorSwatch('#D93636', 'Negative 70 ⭐', '#D93636', '70')}
                ${ColorSwatch('#E47272', 'Negative 50', '#E47272', '50')}
                ${ColorSwatch('#F0AFAF', 'Negative 30', '#F0AFAF', '30')}
                ${ColorSwatch('#FBEBEB', 'Negative 10', '#FBEBEB', '10')}
              </div>
            </div>
            
            <!-- Informative -->
            <div>
              <h3 style="color: #04A2BF; margin-bottom: 16px;">Informative (Info)</h3>
              <div style="display: grid; gap: 12px;">
                ${ColorSwatch('#02414C', 'Informative 130', '#02414C', '130')}
                ${ColorSwatch('#026173', 'Informative 110', '#026173', '110')}
                ${ColorSwatch('#038299', 'Informative 90', '#038299', '90')}
                ${ColorSwatch('#04A2BF', 'Informative 70 ⭐', '#04A2BF', '70')}
                ${ColorSwatch('#4FBED2', 'Informative 50', '#4FBED2', '50')}
                ${ColorSwatch('#9BDAE5', 'Informative 30', '#9BDAE5', '30')}
                ${ColorSwatch('#E5F6F8', 'Informative 10', '#E5F6F8', '10')}
              </div>
            </div>
          </div>
        </section>

        <!-- GRADIENTES -->
        <section>
          <h1 style="color: #005CA9; margin-bottom: 8px; font-size: 32px;">Gradientes</h1>
          <p style="color: #757575; margin-bottom: 32px;">12 gradientes prontos para deficientes visuais e variações</p>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            ${[
              'Oceano',
              'Gelo',
              'Céu',
              'Uva',
              'Limão',
              'Tangerina',
              'Goiaba',
              'Água',
              'Primavera',
              'Inverno',
              'Verão',
              'Outono',
            ]
              .map((name) => {
                const gradients: Record<string, string> = {
                  Oceano: 'linear-gradient(180deg, #005C49 0%, #548BAB 100%)',
                  Gelo: 'linear-gradient(180deg, #F1F1F1 0%, #D0E0E3 100%)',
                  Céu: 'linear-gradient(45deg, #005C49 0%, #6085E3 100%)',
                  Uva: 'linear-gradient(45deg, #005C49 0%, #8249F0 100%)',
                  Limão:
                    'linear-gradient(45deg, #005C49 0%, #548BAB 60%, #AFC68B 100%)',
                  Tangerina:
                    'linear-gradient(45deg, #005C49 0%, #606C49 75%, #548BAB 60%, #498B00 100%)',
                  Goiaba:
                    'linear-gradient(45deg, #005C49 0%, #61745E 65%, #617428 100%)',
                  Água: 'linear-gradient(45deg, #548BAB 0%, #6085E3 100%)',
                  Primavera: 'linear-gradient(45deg, #548BAB 0%, #8269F0 100%)',
                  Inverno: 'linear-gradient(45deg, #548BAB 0%, #AFC68B 100%)',
                  Verão: 'linear-gradient(45deg, #548BAB 0%, #498B00 100%)',
                  Outono: 'linear-gradient(45deg, #548BAB 0%, #61745E 100%)',
                };
                return `
                <div>
                  <div style="
                    background: ${gradients[name]};
                    height: 120px;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  "></div>
                  <h3 style="margin: 0; text-align: center; color: #212121; font-size: 16px;">Gradiente ${name}</h3>
                </div>
              `;
              })
              .join('')}
          </div>
        </section>

        <!-- SUMMARY -->
        <section style="margin-top: 64px; padding: 32px; background: #E5F1FC; border-radius: 12px;">
          <h2 style="color: #005CA9; margin: 0 0 16px 0;">📊 Resumo do Design System CAIXA</h2>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
            <div>
              <h3 style="font-size: 36px; margin: 0; color: #005CA9;">56+</h3>
              <p style="margin: 8px 0 0 0; color: #757575;">Cores Paleta Fixa</p>
            </div>
            <div>
              <h3 style="font-size: 36px; margin: 0; color: #00B4E6;">35+</h3>
              <p style="margin: 8px 0 0 0; color: #757575;">Cores Flexíveis</p>
            </div>
            <div>
              <h3 style="font-size: 36px; margin: 0; color: #179231;">28+</h3>
              <p style="margin: 8px 0 0 0; color: #757575;">Cores Feedback</p>
            </div>
            <div>
              <h3 style="font-size: 36px; margin: 0; color: #F39200;">12</h3>
              <p style="margin: 8px 0 0 0; color: #757575;">Gradientes</p>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
