/**
 * Вспомогательные функции для работы с путями к ассетам
 */

export const getAssetPath = (path: string): string => {
  // Определяем, запущено ли приложение как GitHub Pages (на github.io)
  if (typeof window !== 'undefined') {
    // Проверяем, что hostname содержит github.io
    if (window.location.hostname.includes('github.io')) {
      // Проверяем, что путь уже не содержит префикса
      if (path.startsWith('/1Xecochain/')) {
        return path;
      }
      return `/1Xecochain/${path}`;
    }
  }
  // Для локальной разработки и других случаев возвращаем путь с префиксом для consistency
  // но в режиме разработки vite будет обрабатывать правильно
  if (path.startsWith('/1Xecochain/')) {
    return path;
  }
  return `/${path}`;
};
