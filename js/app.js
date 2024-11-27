import Dom from "./Dom.js";
import Player from "./Player.js";
import Question from "./Question.js";
import Quiz from "./Quiz.js";

const questionText = Dom.getDomElement('#question-text');
const answersContainer = Dom.getDomElement('#answers-container');
const responseMessage = Dom.getDomElement('#response-message');
const responseTable = Dom.getDomElement('#response-table tbody');
const scoreContainer = Dom.getDomElement('#score-container');
const finalScore = Dom.getDomElement('#final-score');
const restartBtn = Dom.getDomElement('#restart-btn');

const listCountry = ['France', 'Italie', 'Espagne'];
const listAnswers = ['Paris', 'Rome', 'Madrid'];
const listOptions = [ ['Lyon', 'Marseille', 'Nice'], ['Venise', 'Florence', 'Milan'], ['Barcelone', 'Séville', 'Valence'] ];

let questions = [];

for(let i = 0; i < listCountry.length; i++) {

    let question = new Question(listCountry[i], listAnswers[i], listOptions[i]);
    questions.push(question);

}

const quiz = new Quiz(responseMessage, responseTable, scoreContainer, answersContainer, questionText, finalScore, questions, restartBtn);

quiz.startQuiz();


Dom.triggerEvent(restartBtn, 'click',  function(){
    quiz.startQuiz();
});
