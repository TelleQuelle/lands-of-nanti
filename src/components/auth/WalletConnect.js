import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';
import { Button, Container, Heading } from '../ui';
import { useNotification } from '../ui/Notification';

// Стилизованный контейнер для экрана подключения кошелька
const WalletContainer = styled(Container)`
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  padding: 2rem;
`;

// Стилизованная кнопка для подключения кошелька
const ConnectButton = styled(Button)`
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
`;

/**
 * Компонент для подключения кошелька Phantom
 */
const WalletConnect = ({ onConnect }) => {
  const { connectWallet } = useUser();
  const { showNotification } = useNotification();
  const [connecting, setConnecting] = useState(false);
  
  // Функция проверки и подключения кошелька Phantom
  // Функция проверки и подключения кошелька Phantom
const handleConnectWallet = async () => {
    setConnecting(true);
    
    try {
      // Для тестирования просто создаем фейковый адрес кошелька
      setTimeout(() => {
        const fakeWalletAddress = "FakeWalletAddress12345";
        connectWallet(fakeWalletAddress);
        
        showNotification(
          'Wallet Connected!', 
          'Your wallet has been successfully connected to the game.', 
          'success'
        );
        
        // Вызываем колбэк для перехода дальше
        if (onConnect) onConnect();
      }, 1000); // Имитируем задержку в 1 секунду
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showNotification(
        'Connection Error', 
        'Failed to connect wallet. Please try again.', 
        'error'
      );
      setConnecting(false);
    }
  };
  
  return (
    <WalletContainer>
      {/* В реальном проекте здесь будет ваш логотип */}
      {/* <Logo src="/images/ui/logo.png" alt="Lands of Nanti Logo" /> */}
      
      <Heading level="h2" color="secondary" align="center">
        Connect your phantom wallet on SOL
      </Heading>
      
      <ConnectButton 
        onClick={handleConnectWallet} 
        disabled={connecting}
        fullWidth
      >
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </ConnectButton>
    </WalletContainer>
  );
};

export default WalletConnect;