import React from 'react';
import styled, { css } from 'styled-components';

/**
 * Базовые стили для всех заголовков
 */
const baseHeadingStyles = css`
  font-family: 'DreiFraktur', serif;
  margin-bottom: ${props => props.noMargin ? '0' : 'var(--spacing-md)'};
  text-align: ${props => props.align || 'left'};
  color: ${props => {
    switch(props.color) {
      case 'primary': return 'var(--light-beige)';
      case 'secondary': return 'var(--yellow)';
      case 'accent': return 'var(--orange)';
      case 'danger': return 'var(--red)';
      default: return 'var(--yellow)';
    }
  }};
  
  /* Декоративное подчеркивание, если указано */
  ${props => props.underlined && css`
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.5rem;
      width: ${props.underlinedWidth || '4rem'};
      height: 2px;
      background-color: var(--orange);
    }
  `}
  
  /* Центрированное подчеркивание */
  ${props => (props.underlined && props.align === 'center') && css`
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  `}
`;

/**
 * Стилизованные компоненты для каждого уровня заголовка
 */
const H1 = styled.h1`
  ${baseHeadingStyles}
  font-size: var(--font-size-3xl);
  letter-spacing: 0.05em;
`;

const H2 = styled.h2`
  ${baseHeadingStyles}
  font-size: var(--font-size-2xl);
  letter-spacing: 0.04em;
`;

const H3 = styled.h3`
  ${baseHeadingStyles}
  font-size: var(--font-size-xl);
  letter-spacing: 0.03em;
`;

const H4 = styled.h4`
  ${baseHeadingStyles}
  font-size: var(--font-size-lg);
  letter-spacing: 0.02em;
`;

const H5 = styled.h5`
  ${baseHeadingStyles}
  font-size: var(--font-size-md);
  letter-spacing: 0.01em;
`;

const H6 = styled.h6`
  ${baseHeadingStyles}
  font-size: var(--font-size-sm);
`;

/**
 * Компонент заголовка с поддержкой разных уровней и стилей
 * 
 * @param {Object} props - Свойства компонента
 * @param {('h1'|'h2'|'h3'|'h4'|'h5'|'h6')} [props.level='h1'] - Уровень заголовка
 * @param {('primary'|'secondary'|'accent'|'danger')} [props.color='secondary'] - Цвет заголовка
 * @param {('left'|'center'|'right')} [props.align='left'] - Выравнивание текста
 * @param {boolean} [props.underlined=false] - Добавить декоративное подчеркивание
 * @param {string} [props.underlinedWidth] - Ширина подчеркивания
 * @param {boolean} [props.noMargin=false] - Убрать нижний отступ
 * @param {React.ReactNode} props.children - Содержимое заголовка
 */
const Heading = ({ 
  level = 'h1', 
  children,
  ...props 
}) => {
  // Выбираем компонент в зависимости от уровня
  const HeadingComponent = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  }[level] || H1;

  return (
    <HeadingComponent {...props}>
      {children}
    </HeadingComponent>
  );
};

export default Heading;