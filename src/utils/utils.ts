import { UserLocalStorage } from "../models/models";

export function saveUserInLocalStorage(token: string, id: string): void {
  const TIMEOUT = 1.44e+7; // 4 hours
  const userSaved = {
    token: token,
    id: id,
    expire: Date.now() + TIMEOUT
  };
  localStorage.setItem('userSaved', JSON.stringify(userSaved));
}

export function getUserFromLocalStorage(): null | UserLocalStorage {
  const userSavedStr = localStorage.getItem('userSaved');
  if (!userSavedStr) {
    return null;
  }
  const userSaved: UserLocalStorage = JSON.parse(userSavedStr);
  if (Date.now() > userSaved.expire) {
    deleteUserFromLocalStorage();
    return null;
  }
  return userSaved;
}

export function getUserToken() : string | null {
  return getUserFromLocalStorage()?.token || null;
}

export function getUserId() : string | null {
  return getUserFromLocalStorage()?.id || null;
}

export function deleteUserFromLocalStorage(): void {
  localStorage.removeItem('userSaved');
}

