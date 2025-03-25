import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../ui/Notification';
import TutorialStep from './TutorialStep';

/**
 * Данные для шагов туториала
 */
const TUTORIAL_STEPS = [
  {
    title: 'Welcome to Lands of Nanti!',
    paragraphs: [
      'Hello, brave adventurer! 🌟 In this medieval journey, you\'ll play to earn points and prove your worth.',
      'Your goal? Reach a target score before your turns run out or beat your opponent! It\'s a game of luck, strategy, and a little bit of courage.',
      'Don\'t worry — I\'ll guide you step-by-step so you\'ll be ready to face the challenge!'
    ]
  },
  {
    title: 'Rolling Dice and Drawing Cards',
    paragraphs: [
      'Every turn starts with action! You\'ll roll two six-sided dice 🎲',
      'Then, you\'ll draw three random cards from a deck of 52 — think of it like pulling treasures from a chest! 🃏',
      'You\'ll see both dice numbers and all three cards. Pick ONE die to use — this choice decides which cards you can play with. Smart moves win the day!'
    ]
  },
  {
    title: 'Scoring Points and Taking Risks',
    paragraphs: [
      'Now the fun begins! Based on the die you picked, choose cards that match its "valid combinations" to earn points. Each die has its own special card list (you can check it anytime in-game) 📜',
      'Want more points? Draw extra cards! But beware — if a new card doesn\'t fit, your turn ends, and you lose all points for that round. Risky, right?',
      'You can stop anytime to keep your points safe. It\'s up to you to balance greed and caution! ⚖️'
    ]
  },
  {
    title: 'Ready to Begin? ⚔️',
    paragraphs: [
      'Go through the campaign, earn silver, and accumulate skins - all of which will affect your share of future airdrop'
    ]
  }
];

/**
 * Компонент туториала
 */
const Tutorial = ({ onComplete }) => {
  const { setTutorialCompleted } = useUser();
  const { showNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Переход к следующему шагу
  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Переход к предыдущему шагу
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Завершение туториала
  const handleComplete = () => {
    // Отмечаем туториал как завершенный
    setTutorialCompleted(true);
    
    showNotification(
        'Tutorial Completed!', 
        'You are now ready to begin your adventure in Lands of Nanti.', 
        'success'
    );
    
    // Вызываем колбэк для перехода дальше
    if (onComplete) onComplete();
  };
  
  // Текущий шаг туториала
  const currentTutorialStep = TUTORIAL_STEPS[currentStep];
  
  return (
    <TutorialStep
      title={currentTutorialStep.title}
      paragraphs={currentTutorialStep.paragraphs}
      currentStep={currentStep}
      totalSteps={TUTORIAL_STEPS.length}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === TUTORIAL_STEPS.length - 1}
    />
  );
};

export default Tutorial;