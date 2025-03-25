import React from 'react';
import styled from 'styled-components';

/**
 * Стилизованный контейнер для карточек и секций интерфейса
 * Используется для создания унифицированного стиля карточек в игре
 */
const StyledContainer = styled.div`
  background-color: rgba(78, 66, 54, 0.8);
  border: 2px solid var(--orange);
  border-radius: var(--border-radius-md);
  padding: ${props => props.padding || 'var(--spacing-lg)'};
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || 'none'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: ${props => props.overflow || 'visible'};
  display: ${props => props.flex ? 'flex' : 'block'};
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  gap: ${props => props.gap || '0'};
  
  /* Добавляем декоративный фон, если указан */
  ${props => props.backgroundImage && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${props.backgroundImage});
      background-size: cover;
      background-position: center;
      opacity: 0.1;
      z-index: -1;
      border-radius: var(--border-radius-md);
    }
  `}
  
  /* Центрирование контейнера, если указано */
  ${props => props.centered && `
    margin-left: auto;
    margin-right: auto;
  `}
`;

/**
 * Компонент-контейнер для создания карточек и секций интерфейса
 * 
 * @param {Object} props - Свойства компонента
 * @param {string} [props.padding] - Внутренние отступы
 * @param {string} [props.margin] - Внешние отступы
 * @param {string} [props.width] - Ширина контейнера
 * @param {string} [props.maxWidth] - Максимальная ширина контейнера
 * @param {string} [props.overflow] - Поведение переполнения
 * @param {boolean} [props.flex] - Использовать flex-контейнер
 * @param {string} [props.flexDirection] - Направление flex-контейнера
 * @param {string} [props.justifyContent] - Выравнивание по главной оси
 * @param {string} [props.alignItems] - Выравнивание по поперечной оси
 * @param {string} [props.gap] - Промежуток между элементами
 * @param {string} [props.backgroundImage] - URL декоративного фонового изображения
 * @param {boolean} [props.centered] - Центрировать контейнер
 * @param {React.ReactNode} props.children - Содержимое контейнера
 */
const Container = ({ children, ...props }) => {
  return (
    <StyledContainer {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;