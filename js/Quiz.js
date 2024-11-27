import Dom from "./Dom.js";

class Quiz {

    constructor(responseMessage, responseTable, scoreContainer, answersContainer, questionText, finalScore, questions, restartBtn) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.responseMessage = responseMessage;
        this.responseTable = responseTable;
        this.scoreContainer = scoreContainer;
        this.answersContainer = answersContainer;
        this.questionText = questionText;
        this.finalScore = finalScore;
        this.questions = questions;
        this.restartBtn = restartBtn;

     

    }

    startQuiz() {
        
        console.log("Start quiz");
        this.currentQuestionIndex = 0;
        this.score = 0;
        console.log('fff',this.responseMessage);
        console.log('tabl',this.responseTable)
        Dom.innerHTML(this.responseMessage, '');
        console.log('hhh',this.responseMessage)
     
        Dom.innerHTML(this.responseTable, '');
        Dom.toggleClass(this.scoreContainer, 'hidden', 'add');
        this.showQuestion();
    }

    endQuiz() {
        console.log("End quiz");
        this.restartBtn.disabled = false

        Dom.modifyText(this.questionText, '');
        Dom.modifyHtml(this.answersContainer, '');
        Dom.toggleClass(this.scoreContainer, 'hidden', 'remove');

        Dom.modifyText(this.finalScore, `Votre score final est : ${this.score}/${this.questions.length}`);

    }

    showQuestion() {
        console.log("Show question");

        const question = this.questions[this.currentQuestionIndex];
        Dom.modifyText(this.questionText, `Quelle est la capitale de ${question.country}?`);

        const answers = question.mixQuestionAnswer();

        Dom.modifyHtml(this.answersContainer, '');
        Dom.modifyText(this.responseMessage, '');

        answers.forEach(answer => {
            const button = Dom.createElement('button');
            Dom.modifyText(button, answer);
            Dom.triggerEvent(button, 'click', () => this.checkAnswer(button, answer, question.correctAnswer));
            Dom.appendChild(this.answersContainer, button);
        });

    }

    checkAnswer(button, selected, correct) {

        console.log("Check Answer");

        const buttons = Dom.getDomElements('button');
        buttons.forEach(btn => btn.disabled = true); // Désactive tous les boutons

        console.log(button);
        if (selected === correct) {

            Dom.toggleClass(button, 'correct', 'add')
            Dom.modifyText(this.responseMessage, 'Bonne réponse');
            Dom.modifyStyle(this.responseMessage, 'color', 'green');

            this.score++;

        } else {

            Dom.toggleClass(button, 'wrong', 'add')
            Dom.modifyText(this.responseMessage, 'Mauvaise réponse!');
            Dom.modifyStyle(this.responseMessage, 'color', 'red');

            // Marquer la bonne réponse
            buttons.forEach(btn => {
                if (btn.textContent === correct) {
                    Dom.toggleClass(btn, 'correct', 'add');
                }
            });
        }

        this.addResponseToTable(this.questions[this.currentQuestionIndex].country, selected, selected === correct ? 'Oui' : 'Non');
    }

    // Ajouter au tableau des réponses
    addResponseToTable(country, answer, isCorrect) {

        console.log("Add Response to table");

        const row = Dom.createElement('tr');
        Dom.modifyHtml(row, `
                <td>${country}</td>
                <td>${answer}</td>
                <td>${isCorrect}</td>
            `);
        Dom.appendChild(this.responseTable, row);

        // Passer à la question suivante après 1 seconde
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.showQuestion();
            } else {
                this.endQuiz();
            }
        }, 2000);

    }

}

export default Quiz