import { Word } from "../models/models";

export function saveUserInLocalStorage(token: string, id: string): void {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
}

export function getUserToken(): string | null {
  return localStorage.getItem('token') || null;
}

export function getUserId(): string | null {
  return localStorage.getItem('id') || null;
}

export function deleteUserFromLocalStorage(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
}

export function shuffle(array: Word[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export function getRandomBoolean(): boolean {
  return (Math.random() < 0.6);
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
