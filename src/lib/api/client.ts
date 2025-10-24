// src/lib/api/client.ts

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { paths } from '@/types/api';

/**
 * Класс APIClient для взаимодействия с API EcoChain
 * Использует сгенерированные типы из openapi.yaml через openapi-typescript
 */
class APIClient {
  private readonly instance: AxiosInstance;

  constructor() {
    // Используем baseUrl из environment переменной
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Добавляем interceptor для добавления токена авторизации
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Добавляем interceptor для обработки ошибок
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Получение списка токенов
   */
  async getTokens(params?: {
    page?: number;
    limit?: number;
    sort?: 'price' | 'marketCap' | 'name' | 'createdAt';
    search?: string;
  }) {
    const config: AxiosRequestConfig = { params };
    const response = await this.instance.get<paths['/tokens']['get']['responses']['200']['content']['application/json']>(
      '/tokens',
      config
    );
    return response.data;
  }

  /**
   * Получение токена по ID
   */
  async getTokenById(id: string) {
    const response = await this.instance.get<paths['/tokens']['get']['responses']['200']['content']['application/json']>(
      `/tokens/${id}`
    );
    return response.data;
  }

  /**
   * Создание нового токена
   */
  async createToken(data: paths['/tokens']['post']['requestBody']['content']['application/json']) {
    const response = await this.instance.post<paths['/tokens']['post']['responses']['201']['content']['application/json']>(
      '/tokens',
      data
    );
    return response.data;
  }

  /**
   * Добавление ликвидности к токену
   */
  async addLiquidity(id: string, data: { amount: number; tokenAmount: number; tokenPriceUSD?: number; tokenPriceX1?: number }) {
    const response = await this.instance.post<paths['/tokens']['post']['responses']['200']['content']['application/json']>(
      `/tokens/${id}/liquidity`,
      data
    );
    return response.data;
  }

  /**
   * Подключение кошелька
   */
  async connectWallet(data: { address: string; signature: string }) {
    const response = await this.instance.post<paths['/wallet']['post']['responses']['200']['content']['application/json']>(
      '/wallet/connect',
      data
    );
    return response.data;
  }

  /**
   * Получение токенов текущего пользователя
   */
  async getMyTokens() {
    const response = await this.instance.get<paths['/users']['get']['responses']['200']['content']['application/json']>(
      '/users/me/tokens'
    );
    return response.data;
  }
}

export const apiClient = new APIClient();