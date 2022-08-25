import { AuthData, AuthResponse, Settings, Statistic, User, UserData, UserResponse, UserWord, Word} from "../models/models";

const BASE_URL = "https://rs-lang-team187.herokuapp.com";

export const userData: UserData = {
  token: null,
  id: null
}

export const Auth = {
  signIn: async (auth: AuthData): Promise<AuthResponse> => {
    const url = `${BASE_URL}/signin`;
    const response: Response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth)
    });
    const result: AuthResponse = await response.json();
    userData.token = result.token;
    userData.id = result.userId;
    saveUserInLocalStorage(result.token, result.userId);
    return result;
  }
}

export const Words = {
  getWords: async (group: string, page: string): Promise<Word[]> => {
    const url = `${BASE_URL}/words?page=${page}&group=${group}`;
    const response = await fetch(url);
    return response.json();
  },

  getWordById: async (id: string): Promise<Word> => {
    const url = `${BASE_URL}/words/${id}`;
    const response = await fetch(url);
    return response.json();
  }
}

export const Users = {
  createUser: async (user: User): Promise<UserResponse> => {
    const url = `${BASE_URL}/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  getUser: async (id: string): Promise<UserResponse | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getUserWords: async (id: string): Promise<UserWord[] | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/words`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getUserWordById: async (id: string, wordId: string): Promise<UserWord | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/words/${wordId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  createUserWord: async (id: string, wordId: string, userWord: UserWord): Promise<UserWord | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/words/${wordId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userWord)
    });
    return response.json();
  },

  deleteUserWord: async (id: string, wordId: string): Promise<Response | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/words/${wordId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getUserAggregatedWords: async (id: string): Promise<UserWord[] | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/aggregatedWords`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getUserAggregatedWordbyId: async (id: string, wordId: string): Promise<UserWord | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/aggregatedWords/${wordId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getUserStatistic: async (id: string): Promise<Statistic | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/statistics`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  updateUserStatistic: async (id: string, statistic: Statistic): Promise<Statistic | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/statistics`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statistic)
    });
    return response.json();
  },

  getUserSettings: async (id: string): Promise<Settings | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/settings`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },


  updateUserSettings: async (id: string, settings: Settings): Promise<Settings | null> => {
    if (userData.token === null) return null;
    const url = `${BASE_URL}/users/${id}/statistics`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    return response.json();
  }
}
/*export const signIn = async (auth: Auth): Promise<AuthResponse> => {
  const url = `${BASE_URL}/signin`;
  const response: Response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(auth)
  });
  const result = await response.json();
  token = result.token;
  console.log(token);
  return result;
}*/