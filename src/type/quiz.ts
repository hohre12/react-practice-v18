// export const quizStatusCode = {
// 	start: 'start',
// 	ing: 'ing',
// 	complete: 'complete'
// }

// export type TquizStatus = typeof quizStatusCode[keyof typeof quizStatusCode]


// export type TQuiz = {
// 	category: string,
// 	correct_answer: string,
// 	difficulty: string,
// 	incorrect_answers: []
// 	question: string,
// 	type: string,
// 	options?: [string]
// }

export type TQuizItem = {
    done?: boolean,
    text?: string,
}

export type TQuizHeader = {
    category: string,
    difficulty: string,
    question: string,
    type: string
}

export type TQuizListItem = {
    correct_answer: string,
    incorrect_answers: string[]
}

export type TQuiz = TQuizHeader & TQuizListItem