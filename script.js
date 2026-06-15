const questions = [
  {
    text: "一个正方形的边长是8厘米，它的周长是多少厘米？",
    options: ["32", "24", "16", "64"],
    answer: "32",
    explanation: "正方形周长=边长×4，因此8×4=32厘米。"
  },
  {
    text: "如果一个三角形两边分别是5厘米和7厘米，第三边可能是下面哪个？",
    options: ["1厘米", "3厘米", "10厘米", "13厘米"],
    answer: "3厘米",
    explanation: "根据三角形两边之差小于第三边小于两边之和，可选3厘米。"
  },
  {
    text: "45除以9等于多少？",
    options: ["5", "6", "4", "7"],
    answer: "5",
    explanation: "45÷9=5。"
  },
  {
    text: "一个长方形长12厘米，宽4厘米，它的面积是多少平方厘米？",
    options: ["48", "16", "32", "40"],
    answer: "48",
    explanation: "长方形面积=长×宽，12×4=48平方厘米。"
  },
  {
    text: "在下面哪个数中，3是最小因数？",
    options: ["12", "9", "15", "21"],
    answer: "9",
    explanation: "9可以被3整除，且比12、15、21小，因此3作为最小因数时，9是答案。"
  },
  {
    text: "如果时间是下午3点30分，再过2小时15分钟是几点？",
    options: ["5点15分", "5点45分", "6点15分", "6点30分"],
    answer: "5点45分",
    explanation: "3:30加2小时15分钟得到5:45。"
  },
  {
    text: "下列哪个小数最大？",
    options: ["0.45", "0.405", "0.54", "0.5"],
    answer: "0.54",
    explanation: "0.54比0.5、0.45、0.405都大。"
  },
  {
    text: "6个苹果平均分给3个小朋友，每人几只？",
    options: ["1只", "2只", "3只", "4只"],
    answer: "2只",
    explanation: "6÷3=2，每人2只。"
  },
  {
    text: "120的6分之1是多少？",
    options: ["20", "18", "15", "25"],
    answer: "20",
    explanation: "120÷6=20。"
  },
  {
    text: "以下哪一组数字按从小到大排列正确？",
    options: ["12, 21, 102", "12, 102, 21", "21, 12, 102", "102, 21, 12"],
    answer: "12, 21, 102",
    explanation: "从小到大排列应先写12，再写21，最后写102。"
  }
];

const questionsContainer = document.getElementById('questions');
const quizForm = document.getElementById('quiz-form');
const resultSection = document.getElementById('result-section');
const scoreText = document.getElementById('score-text');
const feedback = document.getElementById('feedback');
const resetBtn = document.getElementById('reset-btn');

function renderQuestions() {
  questionsContainer.innerHTML = '';

  questions.forEach((question, index) => {
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';

    const header = document.createElement('div');
    header.className = 'question-header';
    header.innerHTML = `<span class="question-number">第${index + 1}题</span>`;

    const text = document.createElement('p');
    text.className = 'question-text';
    text.textContent = question.text;

    const optionsList = document.createElement('div');
    optionsList.className = 'options';

    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'option';

      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question-${index}`;
      optionInput.value = option;
      optionInput.required = true;

      const labelText = document.createElement('span');
      labelText.className = 'option-label';
      labelText.textContent = option;

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(labelText);
      optionsList.appendChild(optionLabel);
    });

    const answerInfo = document.createElement('div');
    answerInfo.className = 'answer-info hidden';
    answerInfo.id = `answer-${index}`;
    answerInfo.innerHTML = `
      <strong>正确答案：<span class="correct-answer"></span></strong>
      <div class="explanation"></div>
    `;

    questionCard.appendChild(header);
    questionCard.appendChild(text);
    questionCard.appendChild(optionsList);
    questionCard.appendChild(answerInfo);
    questionsContainer.appendChild(questionCard);
  });
}

function showResults(score, total) {
  scoreText.textContent = `你得了 ${score} / ${total} 分`;
  if (score === total) {
    feedback.textContent = '太棒了！全部答对了，继续保持！';
  } else if (score >= total * 0.7) {
    feedback.textContent = '很不错！你掌握了大部分知识，再检查错题更稳妥。';
  } else {
    feedback.textContent = '别着急，多看解析并重做一遍，你会进步的。';
  }
  resultSection.classList.remove('hidden');
}

function showAnswers() {
  questions.forEach((question, index) => {
    const answerBlock = document.getElementById(`answer-${index}`);
    answerBlock.querySelector('.correct-answer').textContent = question.answer;
    answerBlock.querySelector('.explanation').textContent = question.explanation;
    answerBlock.classList.remove('hidden');
  });
}

quizForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(quizForm);
  let score = 0;

  questions.forEach((question, index) => {
    const userAnswer = formData.get(`question-${index}`);
    if (userAnswer === question.answer) {
      score += 1;
    }
  });

  showResults(score, questions.length);
  showAnswers();
  window.scrollTo({ top: resultSection.offsetTop - 20, behavior: 'smooth' });
});

resetBtn.addEventListener('click', () => {
  quizForm.reset();
  resultSection.classList.add('hidden');
  const answerBlocks = document.querySelectorAll('.answer-info');
  answerBlocks.forEach(block => block.classList.add('hidden'));
});

renderQuestions();
