import { read } from './modules/rw.js';
import readline from 'node:readline/promises';

// Интерфейс для чтения данных с консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const file = await read('./question.json');
const questions = JSON.parse(file);

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

// Функция для вывода вопроса и обработки ответа пользователя
const askQuestion = async () => {
  const q = questions[currentQuestionIndex];
  console.log(`\nВопрос ${parseInt(currentQuestionIndex + 1)}: ${q.question}`);
  q.options.forEach((answer, i) => console.log(`${i + 1}. ${answer}`));
  const answer = await rl.question('Введите номер ответа: ');
  const userAnswer = parseInt(answer);
  if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > q.options.length) {
    console.log('Неверный ввод, попробуйте снова.\n');
    return askQuestion();
  }
  if (userAnswer === q.correctIndex + 1) {
    correctAnswersCount++;
    console.log(`Ваш ответ: ${userAnswer}`);
    console.log('Правильный ответ!');
  } else {
    console.log(`Ваш ответ: ${userAnswer}`);
    console.log('Неправильный ответ.');
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    askQuestion(); // Задаем следующий вопрос
  } else {
    console.log(
      `Квиз завершен! Правильных ответов: ${correctAnswersCount} из ${questions.length}`,
    );
    rl.close();
  }
};

// Запуск программы
console.log(
  'Добро пожаловать в наш квиз!\nОтветьте на вопросы, выбрав номер правильного ответа.',
);
askQuestion();
