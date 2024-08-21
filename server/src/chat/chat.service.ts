import { Injectable } from '@nestjs/common';
import { NAMES } from './names'; // Импорт списка имен

@Injectable()
export class ChatService {
  // Получение случайного имени из списка
  getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * NAMES.length);
    return NAMES[randomIndex];
  }

  // Добавление сообщения с именем автора
  addMessage(text: string): string {
    const randomName = this.getRandomName();
    return `${randomName}: ${text}`;
  }
}
