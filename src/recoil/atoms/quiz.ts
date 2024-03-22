import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { TQuiz } from "../../type/quiz";

const { persistAtom } = recoilPersist({
    key: 'quizStorage',
    storage: localStorage
})

export const quizListState = atom<TQuiz[]>({
    key: 'quizListState',
    default: [],
    effects_UNSTABLE:[persistAtom]
})

export const answerListState = atom<any[]>({
    key: 'answerListState',
    default: [],
    effects_UNSTABLE:[persistAtom]
})

export const selectAnswerListState = atom<string[]>({
    key: 'selectAnswerListState',
    default: [],
    effects_UNSTABLE:[persistAtom]
})

export const timeState = atom<number>({
    key: 'timeState',
    default: 0,
    effects_UNSTABLE:[persistAtom]
})

