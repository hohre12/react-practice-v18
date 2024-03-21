import { atom } from "recoil";

export const answerListState = atom<any[]>({
    key: 'answerListState',
    default: []
})

export const selectAnswerListState = atom<string[]>({
    key: 'selectAnswerListState',
    default: []
})

export const timeState = atom<number>({
    key: 'timeState',
    default: 0
})

