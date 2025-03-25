import { useEffect } from 'react';

/**
 * Хук для отладки состояния компонентов
 * @param {string} componentName - Имя компонента для логирования
 * @param {Object} values - Объект с значениями для отслеживания
 */
const useDebug = (componentName, values) => {
  useEffect(() => {
    console.log(`[${componentName}] Render:`, values);
  }, [componentName, values]);
};

export default useDebug;