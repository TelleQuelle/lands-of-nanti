import React, { useState, useEffect, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Анимация появления уведомления
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Анимация исчезновения уведомления
const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

// Стили типов уведомлений
const TYPES = {
  success: css`
    background-color: rgba(0, 128, 0, 0.8);
    border-color: #006400;
  `,
  info: css`
    background-color: rgba(70, 130, 180, 0.8);
    border-color: #4682b4;
  `,
  warning: css`
    background-color: rgba(237, 194, 39, 0.8);
    border-color: var(--yellow);
    color: #4e4236;
  `,
  error: css`
    background-color: rgba(141, 40, 14, 0.8);
    border-color: var(--red);
  `,
};

// Контейнер для уведомлений
const NotificationContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 400px;
  width: calc(100% - 2rem);
`;

// Стилизованное уведомление
const NotificationItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius-sm);
  border-left: 4px solid;
  color: var(--light-beige);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  
  /* Применяем стиль в зависимости от типа */
  ${props => TYPES[props.type] || TYPES.info}
  
  /* Анимация */
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.3s ease forwards;
  
  /* Содержимое уведомления */
  .notification-content {
    flex: 1;
  }
  
  /* Заголовок */
  .notification-title {
    font-weight: bold;
    margin-bottom: 0.25rem;
    font-size: var(--font-size-md);
  }
  
  /* Текст сообщения */
  .notification-message {
    font-size: var(--font-size-sm);
  }
  
  /* Кнопка закрытия */
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
    font-size: 1.2rem;
    line-height: 1;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
    }
  }
`;

// Создаем контекст для уведомлений
const NotificationContext = React.createContext({
  showNotification: () => {},
});

/**
 * Провайдер для системы уведомлений
 * Оборачивает приложение и предоставляет функции для показа уведомлений
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Функция для добавления нового уведомления
  const showNotification = useCallback((title, message, type = 'info', duration = 5000) => {
    const id = Date.now();
    
    // Добавляем новое уведомление
    setNotifications(prev => [...prev, { id, title, message, type, isClosing: false }]);
    
    // Удаляем уведомление после указанной длительности
    if (duration !== Infinity) {
      setTimeout(() => {
        closeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);
  
  // Функция для закрытия уведомления
  const closeNotification = useCallback((id) => {
    // Помечаем уведомление как закрывающееся для анимации
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isClosing: true } : notification
      )
    );
    
    // Удаляем уведомление после завершения анимации
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 300); // Длительность анимации
  }, []);
  
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationContainer>
        {notifications.map(({ id, title, message, type, isClosing }) => (
          <NotificationItem key={id} type={type} isClosing={isClosing}>
            <div className="notification-content">
              {title && <div className="notification-title">{title}</div>}
              <div className="notification-message">{message}</div>
            </div>
            <button 
              className="notification-close" 
              onClick={() => closeNotification(id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </NotificationItem>
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

/**
 * Хук для использования уведомлений в компонентах
 * @returns {Object} - Объект с методом showNotification
 */
export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationProvider;