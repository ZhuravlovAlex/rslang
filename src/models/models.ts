export type Word = {
    id: string;
    group: 0;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
};

export type User = {
    name: string;
    email: string;
    password: string;
};

export type UserResponse = {
    id: string;
    name: string;
    email: string;
};

export type AuthData = {
    email: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    name: string;
    refreshToken: string;
    token: string;
    userId: string;
};

export type Statistic = {
    learnedWords?: number;
    optional: {
        hardWords?: number;
        sprint: {
            learnedWords: {
                count: number;
                date: string;
            }[];
            bestScore: {
                count: number;
                date: string;
            }[];
            total: number;
            wrongWords: number;
            bestWinstreak: number;
        };
        audio: {
            learnedWords: {
                count: number;
                date: string;
            }[];
            bestScore: {
                count: number;
                date: string;
            }[];
            total: number;
            wrongWords: number;
            bestWinstreak: number;
        };
    };
};

export type Settings = {
    wordsPerDay: number;
    optional?: { [key: string]: any };
};

export type UserData = {
    token: string | null;
    id: string | null;
};

export type UserWord = {
    difficulty: string;
    optional?: { [key: string]: any };
};

export interface ISprintGame {
    time: number;
    startTimer(heading: HTMLHeadingElement): void;
}
