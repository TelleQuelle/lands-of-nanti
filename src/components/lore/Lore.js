import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../ui/Notification';
import LoreStep from './LoreStep';

/**
 * Данные для шагов лора
 * Примечание: в реальном проекте пути к изображениям нужно будет заменить на актуальные
 */
const LORE_STEPS = [
  {
    title: 'Betrayed and Condemned',
    image: '/images/lore/betrayed.png', // Замените на путь к вашему изображению
    paragraphs: [
      'You were betrayed by friends who accused you of crimes you didn\'t commit. Bribed guards seized you and dragged you through the court\'s shadowy halls. Execution seemed certain, but fate had other plans—you were cast into the Abyss of Despair, a prison that descends deep into the earth.',
      'There, nine circles await their victims, each a reflection of hell itself. Few escape alive, and those who do are broken. As you were thrown to the prison gates, hope fled from your heart.'
    ]
  },
  {
    title: 'The Rules of the Abyss',
    image: '/images/lore/abyss.png', // Замените на путь к вашему изображению
    paragraphs: [
      'In the prison\'s reception, a guard smirked as he revealed your fate: "Nine circles below, each more dreadful than the last. Play dice and cards with their denizens—win, and you rise; lose, and you rot."',
      'You realized freedom was a prize earned through trials. The gates slammed shut, and the guard\'s laughter faded. Now a prisoner of the Abyss, your path to the surface lies through infernal games.'
    ]
  }
];

/**
 * Компонент лора (истории игры)
 */
const Lore = ({ onComplete }) => {
  const { setLoreCompleted } = useUser();
  const { showNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Переход к следующему шагу
  const handleNext = () => {
    if (currentStep < LORE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Переход к предыдущему шагу
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Завершение лора
  const handleComplete = () => {
    // Отмечаем лор как завершенный
    setLoreCompleted(true);
    
    showNotification(
        'Story Revealed!', 
        'It is time to prove your strength and escape from the Abyss of Despair.', 
        'success'
    );
    
    // Вызываем колбэк для перехода дальше
    if (onComplete) onComplete();
  };
  
  // Текущий шаг лора
  const currentLoreStep = LORE_STEPS[currentStep];
  
  return (
    <LoreStep
      title={currentLoreStep.title}
      image={currentLoreStep.image}
      paragraphs={currentLoreStep.paragraphs}
      currentStep={currentStep}
      totalSteps={LORE_STEPS.length}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === LORE_STEPS.length - 1}
    />
  );
};

export default Lore;