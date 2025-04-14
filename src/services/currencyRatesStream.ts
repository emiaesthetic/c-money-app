import { IRate } from '@/types';

import { API } from './api';

let socket: WebSocket | null = null;

export const connectToCurrencyRatesStream = (
  onMessageCallback: (message: IRate) => void,
  onErrorCallback: (error: string) => void,
) => {
  try {
    socket = new WebSocket(`${API.BASE_URL}/currency-feed`);

    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const message: IRate = JSON.parse(event.data);
        onMessageCallback(message);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Не удалось разобрать сообщение WebSocket';
        onErrorCallback(message);
      }
    };

    socket.onerror = () => {
      onErrorCallback('Произошла ошибка WebSocket');
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Не удалось установить соединение WebSocket';
    onErrorCallback(message);
  }
};

export const closeCurrencyRatesStream = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
