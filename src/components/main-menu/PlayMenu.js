import React from 'react';
import styled from 'styled-components';
import { Container, Heading, Button } from '../ui';
import { useUser } from '../../contexts/UserContext';

// Стилизованный контейнер для меню игры
const PlayMenuContainer = styled(Container)`
  max-width: 800px;
  margin: 50px auto;
  padding: 2rem;
  text-align: center;
`;

// Контейнер для опций игры
const GameOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Стилизованная карточка для опции игры
const GameOption = styled.div`
  width: 300px;
  background-color: rgba(78, 66, 54, 0.8);
  border: 2px solid ${props => props.disabled ? 'var(--brown-beige)' : 'var(--orange)'};
  border-radius: var(--border-radius-md);
  padding: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.3)'};
  }
`;

// Изображение опции
const OptionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;
`;

// Название опции
const OptionTitle = styled.h3`
  color: var(--yellow);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

// Уведомление о блокировке
const LockNotice = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--light-beige);
  border-radius: var(--border-radius-md);
`;

/**
 * Компонент меню выбора типа игры
 */
const PlayMenu = ({ onNavigate, onBack }) => {
  const { campaignProgress } = useUser();
  
  // Проверяем, завершена ли кампания
  const isCampaignCompleted = campaignProgress && 
    campaignProgress.length >= 10 && 
    campaignProgress[9]?.completed;
  
  // Обработчик для выбора кампании
  const handleCampaignSelect = () => {
    if (onNavigate) onNavigate('campaign');
  };
  
  // Обработчик для выбора приключения
  const handleAdventureSelect = () => {
    if (!isCampaignCompleted) return;
    
    if (onNavigate) onNavigate('adventure');
  };
  
  return (
    <PlayMenuContainer>
      <Heading level="h2" color="secondary" align="center">
        What's your path?
      </Heading>
      
      <GameOptions>
        {/* Опция кампании */}
        <GameOption onClick={handleCampaignSelect}>
          <OptionImage src="/images/ui/campaign-option.png" alt="Campaign" />
          <OptionTitle>Campaign</OptionTitle>
        </GameOption>
        
        {/* Опция приключения */}
        <GameOption disabled={!isCampaignCompleted} onClick={handleAdventureSelect}>
          <OptionImage src="/images/ui/adventure-option.png" alt="Adventure" />
          <OptionTitle>Adventure</OptionTitle>
          
          {!isCampaignCompleted && (
            <LockNotice>Complete the campaign first</LockNotice>
          )}
        </GameOption>
      </GameOptions>
      
      <Button onClick={onBack}>Back</Button>
    </PlayMenuContainer>
  );
};

export default PlayMenu;