import React from 'react';
import styled from 'styled-components';
import { Container, Heading, Button } from '../ui';

// Стилизованный контейнер для шага лора
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
  justify-content: ${props => props.singleButton ? 'center' : 'space-between'};
  margin-top: 2rem;
`;

/**
 * Компонент для отображения одного шага лора (истории)
 */
const LoreStep = ({ 
  title, 
  image, 
  paragraphs, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious,
  onComplete,
  isFirstStep = false,
  isLastStep = false 
}) => {
  return (
    <LoreContainer>
      <Heading level="h2" color="secondary" align="center">
        {title}
      </Heading>
      
      {/* Изображение (если есть) */}
      {image && (
        <Image src={image} alt={title} />
      )}
      
      {/* Абзацы текста */}
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index}>
          {paragraph}
        </Paragraph>
      ))}
      
      {/* Кнопки навигации */}
      <ButtonContainer singleButton={isFirstStep}>
        {!isFirstStep && (
          <Button 
            variant="secondary" 
            onClick={onPrevious}
          >
            Previous
          </Button>
        )}
        
        <Button 
          onClick={isLastStep ? onComplete : onNext}
        >
          {isLastStep ? 'Begin' : 'Next'}
        </Button>
      </ButtonContainer>
    </LoreContainer>
  );
};

export default LoreStep;