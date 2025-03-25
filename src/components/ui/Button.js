import React from 'react';
import styled, { css } from 'styled-components';

// Варианты стилей кнопок
const VARIANTS = {
  primary: css`
    background-color: rgba(78, 66, 54, 0.8);
    border: 2px solid var(--orange);
    color: var(--light-beige);
    
    &:hover:not(:disabled) {
      background-color: rgba(171, 81, 46, 0.7);
    }
  `,
  secondary: css`
    background-color: rgba(169, 135, 74, 0.6);
    border: 2px solid var(--yellow);
    color: var(--light-beige);
    
    &:hover:not(:disabled) {
      background-color: rgba(237, 194, 39, 0.3);
    }
  `,
  danger: css`
    background-color: rgba(141, 40, 14, 0.8);
    border: 2px solid var(--red);
    color: var(--light-beige);
    
    &:hover:not(:disabled) {
      background-color: rgba(141, 40, 14, 0.6);
    }
  `,
};

// Размеры кнопок
const SIZES = {
  small: css`
    padding: 0.25rem 0.5rem;
    font-size: var(--font-size-sm);
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: var(--font-size-md);
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: var(--font-size-lg);
  `,
};

// Стилизованная кнопка с поддержкой разных вариантов и размеров
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  font-family: 'DreiFraktur', serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  /* Применяем стиль в зависимости от варианта */
  ${props => VARIANTS[props.variant] || VARIANTS.primary}
  
  /* Применяем размер */
  ${props => SIZES[props.size] || SIZES.medium}
  
  /* Стили для полноразмерной кнопки */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Стили для отключенной кнопки */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      /* Сохраняем базовый стиль для отключенных кнопок */
      ${props => VARIANTS[props.variant] || VARIANTS.primary}
    }
  }
  
  /* Добавляем стили для иконок внутри кнопки */
  & > svg {
    margin-right: ${props => props.iconOnly ? '0' : '0.5rem'};
  }
`;

/**
 * Компонент кнопки с различными вариантами стилей
 * 
 * @param {Object} props - Свойства компонента
 * @param {string} [props.variant='primary'] - Вариант стиля кнопки (primary, secondary, danger)
 * @param {string} [props.size='medium'] - Размер кнопки (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Растянуть кнопку на всю ширину родителя
 * @param {React.ReactNode} [props.children] - Содержимое кнопки
 * @param {React.ReactNode} [props.icon] - Иконка для отображения перед текстом
 * @param {boolean} [props.iconOnly=false] - Показать только иконку без отступа
 */
const Button = ({ 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  icon,
  iconOnly = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconOnly={iconOnly}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;