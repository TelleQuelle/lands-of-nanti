import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст пользователя
const UserContext = createContext();

/**
 * Провайдер для контекста пользователя
 * Хранит и управляет данными пользователя и его прогрессом в игре
 */
export const UserProvider = ({ children }) => {
  // Состояние пользователя
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [nickname, setNickname] = useState('');
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [loreCompleted, setLoreCompleted] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState([]);
  const [silver, setSilver] = useState(0);
  const [inventory, setInventory] = useState({
    cardSkins: [],
    diceSkins: [],
    specialCards: [],
    specialDice: []
  });
  
  // Имитируем загрузку данных
  useEffect(() => {
    console.log("[UserContext] Initializing...");
    
    // Устанавливаем loading в false после небольшой задержки (для тестирования)
    const timer = setTimeout(() => {
      console.log("[UserContext] Setting loading to false");
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Сохраняем данные пользователя при их изменении
  useEffect(() => {
    if (wallet && user) {
      console.log("[UserContext] Saving user data to localStorage");
      const userData = {
        wallet,
        nickname,
        tutorialCompleted,
        loreCompleted,
        campaignProgress,
        silver,
        inventory
      };
      
      localStorage.setItem(`user_${wallet}`, JSON.stringify(userData));
    }
  }, [wallet, user, nickname, tutorialCompleted, loreCompleted, campaignProgress, silver, inventory]);
  
  // Функция для подключения кошелька
  const connectWallet = (walletAddress) => {
    console.log("[UserContext] Connecting wallet:", walletAddress);
    setWallet(walletAddress);
    
    // Создаем нового пользователя, если он не существует
    if (!user) {
      setUser({ wallet: walletAddress });
    }
  };
  
  // Функция для отключения кошелька
  const disconnectWallet = () => {
    console.log("[UserContext] Disconnecting wallet");
    setWallet(null);
    setUser(null);
    setNickname('');
    setTutorialCompleted(false);
    setLoreCompleted(false);
    setCampaignProgress([]);
    setSilver(0);
    setInventory({
      cardSkins: [],
      diceSkins: [],
      specialCards: [],
      specialDice: []
    });
  };
  
  // Функция для установки никнейма
  const setUserNickname = (name) => {
    console.log("[UserContext] Setting nickname:", name);
    setNickname(name);
  };
  
  // Функция для изменения количества серебра
  const addSilver = (amount) => {
    console.log("[UserContext] Adding silver:", amount);
    setSilver(prev => prev + amount);
  };
  
  // Функция для добавления предмета в инвентарь
  const addInventoryItem = (itemType, item) => {
    console.log("[UserContext] Adding inventory item:", itemType, item);
    setInventory(prev => ({
      ...prev,
      [itemType]: [...prev[itemType], item]
    }));
  };
  
  // Функция для обновления прогресса кампании
  const updateCampaignProgress = (levelIndex, completed, stats = {}) => {
    console.log("[UserContext] Updating campaign progress:", levelIndex, completed, stats);
    setCampaignProgress(prev => {
      const newProgress = [...prev];
      newProgress[levelIndex] = { completed, stats };
      return newProgress;
    });
  };
  
  // Предоставляем все функции и данные через контекст
  const value = {
    user,
    loading,
    wallet,
    nickname,
    tutorialCompleted,
    loreCompleted,
    campaignProgress,
    silver,
    inventory,
    connectWallet,
    disconnectWallet,
    setUserNickname,
    setTutorialCompleted,
    setLoreCompleted,
    addSilver,
    addInventoryItem,
    updateCampaignProgress
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста пользователя
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

export default UserContext;