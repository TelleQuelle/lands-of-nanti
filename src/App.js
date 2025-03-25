import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import useDebug from './hooks/useDebug'; // Добавьте этот импорт в начало файла
import { NotificationProvider } from './components/ui/Notification';
import { UserProvider, useUser } from './contexts/UserContext';
import { WalletConnect, NicknameInput } from './components/auth';
import { Tutorial } from './components/tutorial';
import { Lore } from './components/lore';
import { CampaignMenu, LevelMenu, LevelLore } from './components/campaign';
import { GameLevel } from './components/gameplay';

// Компонент для отображения заглушки (временно)
const ComingSoonScreen = ({ title, message, onBack }) => {
  return (
    <div className="coming-soon">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

// Компонент для управления состоянием аутентификации и онбординга
const GameFlow = () => {
  const { 
    wallet, 
    nickname, 
    tutorialCompleted, 
    loreCompleted,
    loading 
  } = useUser();
  
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [gameScreen, setGameScreen] = useState('main');
  const [gameParams, setGameParams] = useState({});
  
  // Добавляем отладку
  useDebug('GameFlow', { 
    wallet, 
    nickname, 
    tutorialCompleted, 
    loreCompleted, 
    loading, 
    currentScreen,
    gameScreen
  });
  
  // Определяем текущий экран на основе прогресса пользователя
  useEffect(() => {
    if (loading) {
      setCurrentScreen('loading');
    } else if (!wallet) {
      setCurrentScreen('wallet');
    } else if (!nickname) {
      setCurrentScreen('nickname');
    } else if (!tutorialCompleted) {
      setCurrentScreen('tutorial');
    } else if (!loreCompleted) {
      setCurrentScreen('lore');
    } else {
      setCurrentScreen('main');
    }
  }, [wallet, nickname, tutorialCompleted, loreCompleted, loading]);
  
  // Обработчик навигации по игре
  const handleNavigate = (screen) => {
    setGameScreen(screen);
  };
  
  // Обработчик для возврата в главное меню
  const handleBackToMain = () => {
    setGameScreen('main');
  };
  
  // Пока загружаются данные, показываем экран загрузки
  if (currentScreen === 'loading') {
    return (
      <div className="loading">
        <h2>Loading the world of Lands of Nanti...</h2>
      </div>
    );
  }
  
  // Отображаем нужный экран в зависимости от прогресса
  switch (currentScreen) {
    case 'wallet':
      return <WalletConnect onConnect={() => setCurrentScreen('nickname')} />;
      
    case 'nickname':
      return <NicknameInput onComplete={() => setCurrentScreen('tutorial')} />;
      
    case 'tutorial':
      return <Tutorial onComplete={() => setCurrentScreen('lore')} />;
      
    case 'lore':
      return <Lore onComplete={() => setCurrentScreen('main')} />;
      
    case 'main':
      // Временно используем заглушки для всех экранов
      switch (gameScreen) {
        case 'main':
          return (
            <div className="main-menu">
              <h2>Main Menu</h2>
              <p>The main game menu will appear here.</p>
              <button onClick={() => handleNavigate('play')}>Play</button>
              <button onClick={() => handleNavigate('shop')}>Shop</button>
              <button onClick={() => handleNavigate('inventory')}>Inventory</button>
              <button onClick={() => handleNavigate('about')}>About</button>
            </div>
          );
          
        case 'play':
          return (
            <div className="play-menu">
              <h2>What's your path?</h2>
              <button onClick={() => handleNavigate('campaign')}>Campaign</button>
              <button onClick={() => handleNavigate('adventure')}>Adventure</button>
              <button onClick={handleBackToMain}>Back</button>
            </div>
          );
          
        case 'campaign':
          return <CampaignMenu onNavigate={(screen, params) => {
            setGameScreen(screen);
            setGameParams(params || {});
          }} onBack={handleBackToMain} />;

        case 'level':
          return <LevelMenu 
            levelIndex={gameParams.levelIndex} 
            onNavigate={(screen, params) => {
              setGameScreen(screen);
              setGameParams({...gameParams, ...params});
            }} 
            onBack={() => setGameScreen('campaign')} 
          />;
        
        case 'level-lore':
          return <LevelLore 
            levelIndex={gameParams.levelIndex}
            onBack={() => setGameScreen('level', { levelIndex: gameParams.levelIndex })}
            onPlay={() => setGameScreen('play-level', { levelIndex: gameParams.levelIndex })}
          />;
        
        case 'play-level':
          return <GameLevel 
            levelIndex={gameParams.levelIndex}
            onComplete={(results) => {
              // После завершения уровня возвращаемся к его меню
              setGameScreen('level', { levelIndex: gameParams.levelIndex });
            }}
            onExit={() => setGameScreen('level', { levelIndex: gameParams.levelIndex })}
          />;
          
        case 'adventure':
          return <ComingSoonScreen 
            title="Adventure Screen" 
            message="Adventure mode will be available soon." 
            onBack={handleBackToMain} 
          />;
          
        case 'shop':
          return <ComingSoonScreen 
            title="Shop Screen" 
            message="Shop will be available soon." 
            onBack={handleBackToMain} 
          />;
          
        case 'inventory':
          return <ComingSoonScreen 
            title="Inventory Screen" 
            message="Inventory will be available soon." 
            onBack={handleBackToMain} 
          />;
          
        case 'about':
          return <ComingSoonScreen 
            title="About Screen" 
            message="Game information will be available soon." 
            onBack={handleBackToMain} 
          />;
          
        case 'admin':
          return <ComingSoonScreen 
            title="Admin Panel" 
            message="Admin functionality will be available soon." 
            onBack={handleBackToMain} 
          />;
          
        default:
          return (
            <div className="main-menu">
              <h2>Main Menu</h2>
              <p>The main game menu will appear here.</p>
            </div>
          );
      }
      
    default:
      return <Navigate to="/" />;
  }
};

// Главный компонент приложения
function App() {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <GlobalStyles />
          <Routes>
            <Route path="/*" element={<GameFlow />} />
          </Routes>
        </UserProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;