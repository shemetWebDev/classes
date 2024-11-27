class Question {

    constructor(country, correctAnswer, options) {
        this.country = country;
        this.correctAnswer = correctAnswer;
        this.options = options;
    }
    
    mixQuestionAnswer() {
        const answers = [this.correctAnswer, ...this.options];
        answers.sort(() => Math.random() - 0.5); // Mélange les réponses
        return answers;
    }
}

export default Question