import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'quizStorage',
    storage: localStorage
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
    default: 0
})

