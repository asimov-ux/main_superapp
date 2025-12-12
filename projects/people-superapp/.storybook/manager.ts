// Configuração do tema CAIXA para Storybook
// Customização inline sem dependências extras

// Inject custom styles
const style = document.createElement('style');
style.innerHTML = `
  /* Tema CAIXA - Cores da identidade visual */
  
  /* Sidebar e navegação */
  .sidebar-container {
    background: #FFFFFF !important;
  }
  
  .sidebar-header {
    background: #005CA9 !important;
    color: #FFFFFF !important;
    padding: 16px !important;
  }
  
  .sidebar-item[data-selected="true"] {
    background: #E3F2FD !important;
    border-left: 3px solid #005CA9 !important;
  }
  
  .sidebar-item:hover {
    background: #F5F5F5 !important;
  }
  
  /* Toolbar superior */
  #storybook-preview-wrapper {
    background: #F5F5F5 !important;
  }
  
  /* Buttons e controles */
  button[title*="Zoom"],
  button[title*="Background"],
  button[title*="Grid"] {
    color: #005CA9 !important;
  }
  
  button[title*="Zoom"]:hover,
  button[title*="Background"]:hover,
  button[title*="Grid"]:hover {
    background: #E3F2FD !important;
  }
  
  /* Links */
  a {
    color: #005CA9 !important;
  }
  
  a:hover {
    color: #0076D6 !important;
  }
  
  /* Tabs */
  .os-content button[role="tab"][aria-selected="true"] {
    border-bottom: 3px solid #F39200 !important;
    color: #005CA9 !important;
  }
  
  /* Brand logo area */
  .sidebar-svg-icon {
    fill: #005CA9 !important;
  }
`;
document.head.appendChild(style);

console.log('🎨 CAIXA Design System Theme loaded');
