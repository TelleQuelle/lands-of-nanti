import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';
import { Button, Container, Heading } from '../ui';
import { useNotification } from '../ui/Notification';

// Стилизованный контейнер для экрана ввода имени
const NicknameContainer = styled(Container)`
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  padding: 2rem;
`;

// Стилизованный ввод для имени
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  text-align: center;
`;

// Стилизованный текст для отображения адреса кошелька
const WalletAddress = styled.p`
  font-size: 0.9rem;
  color: var(--light-beige);
  opacity: 0.8;
  margin: 0.5rem 0 1.5rem;
  word-break: break-all;
`;

/**
 * Компонент для ввода никнейма пользователя
 */
const NicknameInput = ({ onComplete }) => {
  const { wallet, setUserNickname } = useUser();
  const { showNotification } = useNotification();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Функция для сокращения адреса кошелька (для отображения)
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Обработчик изменения имени в поле ввода
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем, что имя не пустое
    if (!nickname.trim()) {
      showNotification(
        'Error', 
        'Please enter your name to continue.', 
        'error'
      );
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Сохраняем никнейм в контексте пользователя
      setUserNickname(nickname.trim());
      
      showNotification(
        'Ready!', 
        `Welcome, ${nickname}! Your adventure begins.`, 
        'success'
      );
      
      // Вызываем колбэк для перехода дальше
      if (onComplete) onComplete();
      
    } catch (error) {
      console.error('Ошибка при сохранении никнейма:', error);
      showNotification(
        'Error', 
        'Failed to save your name. Please try again.', 
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <NicknameContainer>
      <Heading level="h2" color="secondary" align="center">
        What's your name, adventurer?
      </Heading>
      
      <WalletAddress>
        wallet: {formatWalletAddress(wallet)}
      </WalletAddress>
      
      <form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          value={nickname} 
          onChange={handleNicknameChange}
          placeholder="Your Name"
          autoFocus
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Starting...' : 'Start Journey'}
        </Button>
      </form>
    </NicknameContainer>
  );
};

export default NicknameInput;