import React from 'react';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';
import { Container, Heading, Button } from '../ui';
import { useNotification } from '../ui/Notification';

// Стилизованный контейнер для главного меню
const MenuContainer = styled(Container)`
  max-width: 800px;
  margin: 50px auto;
  padding: 2rem;
  text-align: center;
`;

// Стилизованный фон для меню с изображением
const MenuBackground = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.backgroundImage || '/images/ui/menu-background.png'});
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    z-index: -1;
  }
`;

// Контейнер для информации о пользователе
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

// Стилизованное отображение серебра
const SilverCounter = styled.div`
  background-color: rgba(78, 66, 54, 0.8);
  border: 2px solid var(--yellow);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  
  span {
    margin-right: 0.5rem;
  }
`;

// Контейнер для кнопок меню
const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

// Контейнер для социальных иконок
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

// Стилизованная социальная иконка
const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(78, 66, 54, 0.8);
  border: 2px solid var(--yellow);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: rgba(171, 81, 46, 0.7);
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;

// Админская иконка
const AdminIcon = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;

/**
 * Компонент главного меню игры
 */
const MainMenu = ({ onNavigate }) => {
  const { nickname, wallet, silver, disconnectWallet } = useUser();
  const { showNotification } = useNotification();
  
  // Проверка на административные права (упрощенная версия)
  const isAdmin = [
    // Здесь можно добавить список адресов админов
    '12345' // Временный пример
  ].includes(wallet);
  
  // Обработчик для кнопки "Play"
  const handlePlay = () => {
    if (onNavigate) onNavigate('play');
  };
  
  // Обработчик для кнопки "Shop"
  const handleShop = () => {
    if (onNavigate) onNavigate('shop');
  };
  
  // Обработчик для кнопки "Inventory"
  const handleInventory = () => {
    if (onNavigate) onNavigate('inventory');
  };
  
  // Обработчик для кнопки "About"
  const handleAbout = () => {
    if (onNavigate) onNavigate('about');
  };
  
  // Обработчик для отключения кошелька
  const handleDisconnect = () => {
    disconnectWallet();
    showNotification(
      'Wallet Disconnected', 
      'Your wallet has been disconnected from the game.', 
      'info'
    );
  };
  
  // Обработчик для админ-панели
  const handleAdmin = () => {
    if (onNavigate) onNavigate('admin');
  };
  
  return (
    <MenuContainer>
      <MenuBackground backgroundImage="/images/ui/menu-background.png">
        <Heading level="h1" color="secondary" align="center">
          Lands of Nanti: {nickname}'s quest
        </Heading>
        
        <Heading level="h4" color="primary" align="center">
          Choose your path, wanderer... 🏰
        </Heading>
        
        <UserInfo>
          <div></div> {/* Пустой элемент для выравнивания */}
          <SilverCounter>
            <span>Silver:</span> {silver}
          </SilverCounter>
        </UserInfo>
        
        <MenuButtons>
          <Button fullWidth onClick={handlePlay}>Play</Button>
          <Button fullWidth onClick={handleShop}>Shop</Button>
          <Button fullWidth onClick={handleInventory}>Inventory</Button>
          <Button fullWidth onClick={handleAbout}>About</Button>
          <Button fullWidth variant="danger" onClick={handleDisconnect}>Disconnect Wallet</Button>
        </MenuButtons>
        
        <SocialIcons>
          <SocialIcon href="https://discord.gg/tdMWdrwCSD" target="_blank" rel="noopener noreferrer">
            <img src="/images/ui/discord-icon.png" alt="Discord" />
          </SocialIcon>
          <SocialIcon href="https://x.com/Nanti_NFT" target="_blank" rel="noopener noreferrer">
            <img src="/images/ui/twitter-icon.png" alt="Twitter" />
          </SocialIcon>
        </SocialIcons>
        
        {isAdmin && (
          <AdminIcon onClick={handleAdmin} title="Admin Panel">
            <img src="/images/ui/settings-icon.png" alt="Admin" />
          </AdminIcon>
        )}
      </MenuBackground>
    </MenuContainer>
  );
};

export default MainMenu;