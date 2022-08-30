export function saveUserInLocalStorage(token: string, id: string): void {
    const TIMEOUT = 1.44e7; // 4 hours
    const userSaved = {
        token: token,
        id: id,
        expire: Date.now() + TIMEOUT,
    };
    localStorage.setItem('userSaved', JSON.stringify(userSaved));
}

export function getUserFromLocalStorage(): void | null {
    const userSavedStr = localStorage.getItem('userSaved');
    if (!userSavedStr) {
        return null;
    }
    const userSaved = JSON.parse(userSavedStr);
    if (Date.now() > userSaved.expire) {
        deleteUserFromLocalStorage();
        return null;
    }
    return userSaved;
}

export function deleteUserFromLocalStorage(): void {
    localStorage.removeItem('userSaved');
}
