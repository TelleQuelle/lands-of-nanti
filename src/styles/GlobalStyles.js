import { createGlobalStyle } from 'styled-components';

// Импортируем шрифт DreiFraktur (нужно будет добавить его в проект)
// Добавьте файл шрифта в public/fonts/ и раскомментируйте этот код
/*
@font-face {
  font-family: 'DreiFraktur';
  src: url('/fonts/DreiFraktur.woff2') format('woff2'),
       url('/fonts/DreiFraktur.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
*/

const GlobalStyles = createGlobalStyle`
  :root {
    /* Основные цвета из ТЗ */
    --light-beige: #faecb9;
    --yellow: #edc227;
    --orange: #ab512e;
    --red: #8d280e;
    --brown-beige: #4e4236;
    --bg-light-beige: #d4ac6f;
    --bg-dark-beige: #a9874a;
    
    /* Дополнительные цвета */
    --text-primary: var(--light-beige);
    --text-secondary: var(--yellow);
    --text-accent: var(--orange);
    --text-danger: var(--red);
    --text-muted: var(--brown-beige);
    
    /* Размеры шрифтов */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;
    --font-size-3xl: 3rem;
    
    /* Размеры отступов */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Радиусы скругления */
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 1rem;
    
    /* Тени */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: 'DreiFraktur', serif;
    background: linear-gradient(135deg, var(--bg-light-beige) 0%, var(--bg-dark-beige) 100%);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'DreiFraktur', serif;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  button {
    font-family: 'DreiFraktur', serif;
    cursor: pointer;
    border: 2px solid var(--text-accent);
    background-color: rgba(78, 66, 54, 0.8);
    color: var(--text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(171, 81, 46, 0.7);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      
      &:hover {
        background-color: rgba(78, 66, 54, 0.8);
      }
    }
  }
  
  input {
    font-family: 'DreiFraktur', serif;
    background-color: rgba(78, 66, 54, 0.6);
    border: 1px solid var(--text-accent);
    color: var(--text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    
    &::placeholder {
      color: rgba(250, 236, 185, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: var(--yellow);
    }
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;