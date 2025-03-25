import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Heading } from '../ui';

// Стилизованный контейнер для лора уровня
const LoreContainer = styled(Container)`
  max-width: 700px;
  margin: 50px auto;
  padding: 2rem;
`;

// Стилизованное изображение
const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--orange);
`;

// Стилизованный абзац текста
const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--light-beige);
`;

// Контейнер для кнопок
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

// Данные о лоре для каждого уровня
const LEVEL_LORE = [
    // Уровень 1: Treachery
    [
      {
        title: "The Circle of Betrayers",
        image: "/images/lore/level1-1.png",
        paragraphs: [
          "As you descend into the first circle, the air grows cold. This realm houses those who turned against friends, family, and allies. The betrayers are bound in ice, their tears freezing as they fall.",
          "A pale figure approaches. 'Welcome to my kingdom of broken trust,' he says. 'I am Judas, guardian of this circle. To earn passage, you must beat me in a game of chance and cunning.'"
        ]
      },
      {
        title: "Price of Disloyalty",
        image: "/images/lore/level1-2.png",
        paragraphs: [
          "Judas explains the rules while shuffling a deck of cards. 'In the realm of betrayers, nothing is as it seems. Choose wisely, for deception lurks in every choice.'",
          "You notice the frozen souls watching intently. Some seem to silently root for your success, perhaps seeing in you a chance for vicarious redemption. Others hope for your failure, bitter in their eternal punishment."
        ]
      }
    ],
    
    // Уровень 2: Fraud
    [
      {
        title: "Masters of Deception",
        image: "/images/lore/level2-1.png",
        paragraphs: [
          "The second circle engulfs you in an endless maze of mirrors. Illusions surround you, and the whispers of liars echo through the corridors. These souls deceived others for gain, their punishments to forever chase truth but never find it.",
          "A figure with many faces emerges from the reflections. 'I am Autolycus, master of deceit and thievery. You won't find passage easy here, for even the game itself may lie to you.'"
        ]
      },
      {
        title: "Games of Falsehood",
        image: "/images/lore/level2-2.png",
        paragraphs: [
          "Autolycus produces worn dice and a deck of cards, some with impossible suits and values. 'In the realm of fraudsters, one must learn to see through deception. Can you discern truth when everything appears false?'",
          "The souls around you morph and shift, taking forms to confuse and distract. You must focus, ignore their illusions, and trust your instinct for truth if you hope to progress."
        ]
      }
    ],
    
    // Добавьте здесь лор для остальных уровней по аналогии
  ];
  
  /**
   * Компонент для отображения лора конкретного уровня
   */
  const LevelLore = ({ levelIndex, onBack, onPlay }) => {
    const [currentPage, setCurrentPage] = useState(0);
    
    // Получаем данные о лоре для этого уровня
    const levelLore = LEVEL_LORE[levelIndex] || [];
    const currentLore = levelLore[currentPage];
    
    // Переход к следующей странице лора
    const handleNext = () => {
      if (currentPage < levelLore.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (onPlay) {
        onPlay();
      }
    };
    
    // Переход к предыдущей странице лора
    const handlePrevious = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        onBack();
      }
    };
    
    // Если нет данных о лоре для этого уровня
    if (!currentLore) {
      return (
        <LoreContainer>
          <Heading level="h2" color="secondary" align="center">
            Lore Unavailable
          </Heading>
          <Paragraph>
            The history of this circle is shrouded in mystery...
          </Paragraph>
          <Button onClick={onBack}>Back</Button>
        </LoreContainer>
      );
    }
    
    return (
      <LoreContainer>
        <Heading level="h2" color="secondary" align="center">
          {currentLore.title}
        </Heading>
        
        {currentLore.image && (
          <Image src={currentLore.image} alt={currentLore.title} />
        )}
        
        {currentLore.paragraphs.map((paragraph, index) => (
          <Paragraph key={index}>
            {paragraph}
          </Paragraph>
        ))}
        
        <ButtonContainer>
          <Button variant="secondary" onClick={handlePrevious}>
            {currentPage === 0 ? 'Back' : 'Previous'}
          </Button>
          
          <Button onClick={handleNext}>
            {currentPage < levelLore.length - 1 ? 'Next' : 'Begin Level'}
          </Button>
        </ButtonContainer>
      </LoreContainer>
    );
  };
  
  export default LevelLore;