import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  // Очистка после каждого теста
  cleanup();
});