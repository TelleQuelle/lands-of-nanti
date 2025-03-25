import React from 'react';
import styled from 'styled-components';
import { Container, Heading, Button } from '../ui';

// Стилизованный контейнер для шага туториала
const TutorialContainer = styled(Container)`
  max-width: 600px;
  margin: 50px auto;
  padding: 2rem;
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
 * Компонент для отображения одного шага туториала
 */
const TutorialStep = ({ 
  title, 
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
    <TutorialContainer>
      <Heading level="h2" color="secondary" align="center">
        {title}
      </Heading>
      
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
          {isLastStep ? 'Start' : 'Next'}
        </Button>
      </ButtonContainer>
    </TutorialContainer>
  );
};

export default TutorialStep;