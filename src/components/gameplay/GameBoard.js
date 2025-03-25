import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Container, Heading } from '../ui';
import { useNotification } from '../ui/Notification';

// Стилизованный контейнер для игрового поля
const GameContainer = styled(Container)`
  max-width: 900px;
  margin: 20px auto;
  padding: 1.5rem;
`;

// Верхняя информационная панель
const InfoPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background-color: rgba(78, 66, 54, 0.8);
  border-radius: var(--border-radius-sm);
`;

// Блок информации
const InfoBlock = styled.div`
  text-align: center;
  
  h3 {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  
  p {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--yellow);
  }
`;

// Блок с выпавшими кубиками
const DiceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
`;

// Стилизованный кубик
const Die = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.selected ? 'rgba(237, 194, 39, 0.4)' : 'rgba(78, 66, 54, 0.8)'};
  border: 3px solid ${props => props.selected ? 'var(--yellow)' : 'var(--brown-beige)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--light-beige);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.3)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Контейнер для карт
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

// Стилизованная карта
const Card = styled.div`
  width: 110px;
  height: 160px;
  background-color: ${props => props.selected ? 'rgba(237, 194, 39, 0.2)' : 'rgba(250, 236, 185, 0.9)'};
  border: 3px solid ${props => props.selected ? 'var(--yellow)' : 'var(--brown-beige)'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.3)'};
  }
`;

// Ранг карты
const CardRank = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: ${props => {
    switch (props.suit) {
      case 'hearts': 
      case 'diamonds': 
        return '#cc0000';
      default: 
        return '#000000';
    }
  }};
`;

// Масть карты
const CardSuit = styled.div`
  font-size: 2.5rem;
  color: ${props => {
    switch (props.suit) {
      case 'hearts': 
      case 'diamonds': 
        return '#cc0000';
      default: 
        return '#000000';
    }
  }};
`;

// Панель действий
const ActionPanel = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(78, 66, 54, 0.8);
  border-radius: var(--border-radius-sm);
`;

// Разделитель для комбинаций карт
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--brown-beige);
  margin: 1.5rem 0;
`;

// Панель комбинаций
const CombinationsPanel = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(78, 66, 54, 0.8);
  border-radius: var(--border-radius-sm);
`;

// Заголовок панели комбинаций
const CombinationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  h3 {
    margin: 0;
    color: var(--yellow);
  }
  
  button {
    background: none;
    border: none;
    color: var(--light-beige);
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: underline;
    
    &:hover {
      color: var(--yellow);
    }
  }
`;

// Список комбинаций
const CombinationsList = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 1rem;
`;

// Строка комбинации
const CombinationRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(78, 66, 54, 0.4);
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background-color: rgba(78, 66, 54, 0.6);
  }
`;

// Подсчет очков в реальном времени
const ScoreCalculation = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(237, 194, 39, 0.2);
  border-radius: var(--border-radius-sm);
  
  h4 {
    margin-bottom: 0.5rem;
    color: var(--yellow);
  }
`;

// Строка расчета очков
const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  
  &:last-child {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--brown-beige);
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  span:last-child {
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
  }
`;

/**
 * Данные о комбинациях кубиков и карт
 */
const DICE_COMBINATIONS = {
  '1': { cards: ['7', 'J', 'Q', 'K', 'A'], pointsPerCard: 150 },
  '2': { cards: ['2', '4', '6', '8', '10', 'A'], pointsPerCard: 100 },
  '3': { cards: ['3', '6', '9', 'A'], pointsPerCard: 200 },
  '4': { cards: ['4', '8', 'A'], pointsPerCard: 250 },
  '5': { cards: ['5', '10', 'A'], pointsPerCard: 250 },
  '6': { cards: ['6', 'A'], pointsPerCard: 300 }
};

/**
 * Компонент игрового поля
 */
const GameBoard = ({ level, onComplete, onExit }) => {
  const { showNotification } = useNotification();
  
  // Состояния игры
  const [gameState, setGameState] = useState('rolling'); // rolling, selecting, playing, roundEnd, gameOver
  const [currentTurn, setCurrentTurn] = useState(1);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  
  // Состояния игровых элементов
  const [dice, setDice] = useState([]);
  const [selectedDie, setSelectedDie] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [validCombinations, setValidCombinations] = useState([]);
  const [showCombinations, setShowCombinations] = useState(false);
  
// Функция для броска кубиков
const rollDice = () => {
    const newDice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    setDice(newDice);
    return newDice;
  };
  
  // Функция для получения случайной карты
  const getRandomCard = () => {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    
    return { rank, suit };
  };
  
  // Функция для получения новых карт
  const drawCards = (count = 3) => {
    const newCards = [];
    for (let i = 0; i < count; i++) {
      newCards.push(getRandomCard());
    }
    return newCards;
  };
  
  // Функция для начала нового раунда
  const startNewRound = () => {
    const newDice = rollDice();
    const newCards = drawCards();
    
    setDice(newDice);
    setCards(newCards);
    setSelectedDie(null);
    setSelectedCards([]);
    setRoundScore(0);
    setGameState('selecting');
    
    showNotification(
      'New Turn Started', 
      `Turn ${currentTurn}/${level.goal.turns}: Roll the dice and select your cards!`,
      'info'
    );
  };
  
  // Функция для выбора кубика
  const handleDieSelect = (index) => {
    if (gameState !== 'selecting') return;
    
    setSelectedDie(index);
    
    // Определяем, какие карты могут быть использованы с этим кубиком
    const validCards = DICE_COMBINATIONS[dice[index]].cards;
    setValidCombinations(validCards);
    
    setGameState('playing');
  };
  
  // Функция для выбора карты
  const handleCardSelect = (index) => {
    if (gameState !== 'playing') return;
    
    // Проверяем, является ли карта допустимой для выбранного кубика
    const card = cards[index];
    const validCards = DICE_COMBINATIONS[dice[selectedDie]].cards;
    
    if (!validCards.includes(card.rank)) {
      showNotification(
        'Invalid Card', 
        `This card doesn't match the combinations for die value ${dice[selectedDie]}.`,
        'warning'
      );
      return;
    }
    
    // Проверяем, выбрана ли карта уже
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter(i => i !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };
  
  // Функция для вычисления очков за раунд
  const calculateRoundScore = () => {
    if (selectedCards.length === 0) return 0;
    
    const dieValue = dice[selectedDie];
    const pointsPerCard = DICE_COMBINATIONS[dieValue].pointsPerCard;
    let baseScore = selectedCards.length * pointsPerCard;
    
    // Проверяем наличие тузов для множителя
    const hasAce = selectedCards.some(index => cards[index].rank === 'A');
    const aceMultiplier = hasAce ? 1.25 : 1;
    
    // Проверяем карты одной масти
    const suits = selectedCards.map(index => cards[index].suit);
    const uniqueSuits = [...new Set(suits)];
    
    let suitMultiplier = 1;
    if (uniqueSuits.length === 1) {
      // Все карты одной масти
      if (selectedCards.length >= 4) {
        suitMultiplier = 3;
      } else if (selectedCards.length === 3) {
        suitMultiplier = 2;
      } else if (selectedCards.length === 2) {
        suitMultiplier = 1.5;
      }
    }
    
    const totalScore = Math.floor(baseScore * aceMultiplier * suitMultiplier);
    return totalScore;
  };
  
  // Обновляем подсчет очков при изменении выбранных карт
  useEffect(() => {
    if (gameState === 'playing') {
      const newRoundScore = calculateRoundScore();
      setRoundScore(newRoundScore);
    }
  }, [selectedCards, gameState]);
  
  // Функция для взятия дополнительной карты
  const handleDrawExtraCard = () => {
    if (gameState !== 'playing') return;
    
    const newCard = getRandomCard();
    const newCards = [...cards, newCard];
    setCards(newCards);
    
    // Проверяем, является ли новая карта допустимой для выбранного кубика
    const validCards = DICE_COMBINATIONS[dice[selectedDie]].cards;
    
    if (!validCards.includes(newCard.rank)) {
      showNotification(
        'Bad Luck!', 
        `You drew a card that doesn't match your die. Round over, and points are lost!`,
        'error'
      );
      
      // Заканчиваем раунд без очков
      setRoundScore(0);
      endRound(false);
      return;
    }
    
    showNotification(
      'Lucky Draw!', 
      `You drew a card that matches your die. You can select it for more points!`,
      'success'
    );
  };
  
  // Функция для завершения раунда
  const handleEndRound = () => {
    if (gameState !== 'playing') return;
    
    if (selectedCards.length === 0) {
      showNotification(
        'No Cards Selected', 
        'You must select at least one valid card to end the round.',
        'warning'
      );
      return;
    }
    
    endRound(true);
  };
  
  // Логика завершения раунда
  const endRound = (success = true) => {
    if (success) {
      // Добавляем очки за раунд к общему счету
      const newScore = score + roundScore;
      setScore(newScore);
      
      showNotification(
        'Round Complete', 
        `You earned ${roundScore} points this round!`,
        'success'
      );
    }
    
    // Увеличиваем номер хода
    const newTurn = currentTurn + 1;
    setCurrentTurn(newTurn);
    
    // Проверяем, достигнута ли цель или закончились ходы
    if (score + (success ? roundScore : 0) >= level.goal.points) {
      // Игра выиграна
      setGameState('gameOver');
      
      showNotification(
        'Victory!', 
        `You reached the target score of ${level.goal.points} points!`,
        'success'
      );
      
      if (onComplete) {
        onComplete({
          completed: true,
          score: score + (success ? roundScore : 0),
          turns: currentTurn,
          silverEarned: Math.floor((score + (success ? roundScore : 0)) / 10)
        });
      }
    } else if (newTurn > level.goal.turns) {
      // Игра проиграна из-за исчерпания ходов
      setGameState('gameOver');
      
      showNotification(
        'Game Over', 
        `You've used all ${level.goal.turns} turns. You needed ${level.goal.points - score - (success ? roundScore : 0)} more points to win.`,
        'error'
      );
      
      if (onComplete) {
        onComplete({
          completed: false,
          score: score + (success ? roundScore : 0),
          turns: currentTurn,
          silverEarned: 0
        });
      }
    } else {
      // Переходим к следующему раунду
      setGameState('roundEnd');
    }
  };
  
  // Начинаем новый раунд при первой загрузке
  useEffect(() => {
    startNewRound();
  }, []);
  
  // Обработчик для кнопки начала следующего раунда
  const handleNextRound = () => {
    if (gameState === 'roundEnd') {
      startNewRound();
    }
  };
  
  // Обработчик показа/скрытия списка комбинаций
  const toggleCombinations = () => {
    setShowCombinations(!showCombinations);
  };
  
  // Преобразование значения масти в символ
  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };
  
  return (
    <GameContainer>
      <Heading level="h2" color="secondary" align="center">
        Level {level.index + 1}: {level.name}
      </Heading>
      
      <InfoPanel>
        <InfoBlock>
          <h3>Turn</h3>
          <p>{currentTurn}/{level.goal.turns}</p>
        </InfoBlock>
        
        <InfoBlock>
          <h3>Score</h3>
          <p>{score}/{level.goal.points}</p>
        </InfoBlock>
        
        <InfoBlock>
          <h3>Current Round</h3>
          <p>{roundScore}</p>
        </InfoBlock>
      </InfoPanel>
      
      {(gameState === 'selecting' || gameState === 'playing') && (
        <>
          <Heading level="h4" color="primary" align="center">
            {gameState === 'selecting' 
              ? 'Select a die to use for this round' 
              : 'Select cards that match your chosen die'}
          </Heading>
          
          <DiceContainer>
            {dice.map((value, index) => (
              <Die 
                key={index}
                selected={selectedDie === index}
                disabled={gameState !== 'selecting'}
                onClick={() => handleDieSelect(index)}
              >
                {value}
              </Die>
            ))}
          </DiceContainer>
          
          <Divider />
          
          <CardsContainer>
            {cards.map((card, index) => (
              <Card 
                key={index}
                selected={selectedCards.includes(index)}
                disabled={gameState !== 'playing' || 
                  (!DICE_COMBINATIONS[dice[selectedDie]]?.cards.includes(card.rank))}
                onClick={() => handleCardSelect(index)}
              >
                <CardRank suit={card.suit}>{card.rank}</CardRank>
                <CardSuit suit={card.suit}>{getSuitSymbol(card.suit)}</CardSuit>
              </Card>
            ))}
          </CardsContainer>
          
          {gameState === 'playing' && (
            <>
              <ScoreCalculation>
                <h4>Current Score Calculation</h4>
                <ScoreRow>
                  <span>Base points ({selectedCards.length} cards × {selectedDie !== null ? DICE_COMBINATIONS[dice[selectedDie]].pointsPerCard : 0})</span>
                  <span>{selectedCards.length * (selectedDie !== null ? DICE_COMBINATIONS[dice[selectedDie]].pointsPerCard : 0)}</span>
                </ScoreRow>
                
                {selectedCards.some(index => cards[index].rank === 'A') && (
                  <ScoreRow>
                    <span>Ace multiplier (×1.25)</span>
                    <span>×1.25</span>
                  </ScoreRow>
                )}
                
                {selectedCards.length >= 2 && new Set(selectedCards.map(index => cards[index].suit)).size === 1 && (
                  <ScoreRow>
                    <span>Same suit multiplier 
                      {selectedCards.length >= 4 ? ' (×3)' : 
                       selectedCards.length === 3 ? ' (×2)' : 
                       ' (×1.5)'}
                    </span>
                    <span>
                      {selectedCards.length >= 4 ? '×3' : 
                       selectedCards.length === 3 ? '×2' : 
                       '×1.5'}
                    </span>
                  </ScoreRow>
                )}
                
                <ScoreRow bold>
                  <span>Total round score</span>
                  <span>{roundScore}</span>
                </ScoreRow>
              </ScoreCalculation>
              
              <ActionPanel>
                <Button 
                  onClick={handleDrawExtraCard} 
                  variant="secondary"
                >
                  Draw Extra Card (Risk)
                </Button>
                
                <Button 
                  onClick={handleEndRound}
                  disabled={selectedCards.length === 0}
                >
                  End Turn & Keep Points
                </Button>
              </ActionPanel>
            </>
          )}
          
          <CombinationsPanel>
            <CombinationsHeader>
              <h3>Valid Card Combinations</h3>
              <button onClick={toggleCombinations}>
                {showCombinations ? 'Hide' : 'Show'} combinations
              </button>
            </CombinationsHeader>
            
            <CombinationsList isOpen={showCombinations}>
              {Object.entries(DICE_COMBINATIONS).map(([die, combo]) => (
                <CombinationRow key={die}>
                  <span>Die value {die}:</span>
                  <span>{combo.cards.join(', ')} → {combo.pointsPerCard} points each</span>
                </CombinationRow>
              ))}
            </CombinationsList>
          </CombinationsPanel>
        </>
      )}
      
      {gameState === 'roundEnd' && (
        <div className="round-end">
          <Heading level="h3" color="secondary" align="center">
            Round Complete!
          </Heading>
          <p className="score-summary">
            You've earned {roundScore} points this round.
            Your total score is now {score} points.
            You need {level.goal.points - score} more points to complete the level.
          </p>
          <Button onClick={handleNextRound}>
            Next Turn
          </Button>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="game-over">
          <Heading level="h3" color={score >= level.goal.points ? 'secondary' : 'danger'} align="center">
            {score >= level.goal.points ? 'Victory!' : 'Game Over'}
          </Heading>
          
          <p className="score-summary">
            {score >= level.goal.points 
              ? `Congratulations! You reached ${score} points and completed the level!` 
              : `You scored ${score} points, but needed ${level.goal.points} to complete the level.`
            }
          </p>
          <Button onClick={onExit}>
            Return to Level Menu
          </Button>
        </div>
      )}
    </GameContainer>
  );
};

export default GameBoard;