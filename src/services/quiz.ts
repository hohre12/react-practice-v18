export const getQuiz = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=14&difficulty=hard&type=multiple').then((response) => response.json())
    return response.results
}