const initialQuestions = [
  'Como o cérebro regula a fome e a saciedade?',
  'Quais áreas cerebrais influenciam a compulsão alimentar?',
  'O que pode desencadear um transtorno alimentar?',
  'Como a autoimagem afeta o comportamento alimentar?',
  'Qual a diferença entre anorexia e bulimia?',
  'O que é compulsão alimentar?',
  'Como a pressão social pode contribuir?',
  'Quais sinais aparecem antes do agravamento?'
];

const extraQuestions = [
  'Como o estresse altera o controle alimentar?',
  'Quais fatores genéticos influenciam o risco?',
  'Como a ansiedade e a depressão se conectam?',
  'O que é o cérebro emocional e a alimentação?',
  'Como as redes sociais influenciam a imagem corporal?',
  'Quais tipos de transtorno alimentar existem?',
  'Como a terapia ajuda no tratamento?',
  'Qual o papel da nutrição na recuperação?',
  'Como o tratamento combina psicologia e medicina?',
  'Como os transtornos alimentares são criados no corpo e na mente?'
];

const roulette = document.getElementById('roulette');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const currentQuestion = document.getElementById('currentQuestion');
const roundNumber = document.getElementById('roundNumber');
const historyList = document.getElementById('historyList');
const questionsList = document.getElementById('questionsList');
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

let questions = [...initialQuestions];
let availableQuestions = [...extraQuestions];
let recentSelections = [];
let round = 0;
let currentRotation = 0;
let spinning = false;

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function addHistory(text) {
  const item = document.createElement('li');
  item.textContent = text;
  historyList.prepend(item);

  while (historyList.children.length > 6) {
    historyList.removeChild(historyList.lastChild);
  }
}

function renderQuestionList() {
  questionsList.innerHTML = '';

  questions.forEach((question) => {
    const item = document.createElement('li');
    item.textContent = question;
    questionsList.appendChild(item);
  });
}

function resetRoulette() {
  questions = [...initialQuestions];
  availableQuestions = [...extraQuestions];
  recentSelections = [];
  round = 0;
  roundNumber.textContent = round;
  currentQuestion.textContent = 'Clique em “Girar roleta” para começar.';
  historyList.innerHTML = '';
  renderQuestionList();
  drawWheel();
}

function refreshQuestionsPool() {
  const pool = [...initialQuestions, ...extraQuestions];
  questions = shuffle(pool).slice(0, 8);
  availableQuestions = [...extraQuestions];
  renderQuestionList();
  drawWheel();
}

function getReplacementQuestion() {
  if (!availableQuestions.length) {
    availableQuestions = [...extraQuestions];
  }

  const index = Math.floor(Math.random() * availableQuestions.length);
  const question = availableQuestions[index];
  availableQuestions.splice(index, 1);
  return question;
}

function drawWheel() {
  const total = questions.length;
  const center = canvas.width / 2;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const palette = ['#f3d7ea', '#e7d9ff', '#d6ebff', '#cfe5ff', '#d9f3ff', '#f7d9f0', '#dce9ff', '#e9d7ff'];

  questions.forEach((question, index) => {
    const startAngle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const endAngle = (Math.PI * 2 * (index + 1)) / total - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = palette[index % palette.length];
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(90, 108, 130, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const angle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.64;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;

    const wrapText = (label) => {
      if (label.length <= 20) return [label];

      const words = label.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= 20) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) lines.push(currentLine);
      return lines.slice(0, 2);
    };

    const lines = wrapText(question);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#2f2f3a';
    ctx.font = '700 10.5px "Segoe UI", Arial, sans-serif';

    const verticalOffset = lines.length === 1 ? 0 : -6;
    lines.forEach((line, idx) => {
      const yOffset = (idx - (lines.length - 1) / 2) * 12 + verticalOffset;
      ctx.fillText(line, 0, yOffset);
    });
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(center, center, 52, 0, Math.PI * 2);
  ctx.fillStyle = '#f5f0f7';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center, 44, 0, Math.PI * 2);
  ctx.fillStyle = '#f8e8f4';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center, 34, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center - 12, center - 8, 6, 0, Math.PI * 2);
  ctx.arc(center + 12, center - 8, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#2d2d2d';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center + 10, 16, 0, Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#2d2d2d';
  ctx.stroke();
}


function spinWheel() {
  if (spinning) return;
  if (questions.length === 0) {
    refreshQuestionsPool();
    return;
  }

  spinning = true;
  spinBtn.disabled = true;

  const shuffled = shuffle(questions);
  questions = shuffled;
  renderQuestionList();
  drawWheel();

  const eligibleQuestions = questions.filter((question) => !recentSelections.includes(question));
  const poolToSpin = eligibleQuestions.length ? eligibleQuestions : questions;
  const chosenIndex = Math.floor(Math.random() * poolToSpin.length);
  const selected = poolToSpin[chosenIndex];

  const totalSegments = questions.length;
  const segmentAngle = 360 / totalSegments;
  const targetIndex = questions.indexOf(selected);
  const randomOffset = Math.random() * (segmentAngle * 0.7);
  const finalAngle = 360 * 6 + (360 - (targetIndex * segmentAngle + randomOffset + segmentAngle / 2));

  currentRotation += finalAngle;
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    currentQuestion.textContent = selected;
    addHistory(selected);
    recentSelections.push(selected);
    if (recentSelections.length > 3) {
      recentSelections.shift();
    }
    round += 1;
    roundNumber.textContent = round;

    const selectedIndex = questions.indexOf(selected);
    if (selectedIndex !== -1) {
      questions.splice(selectedIndex, 1);
    }
    renderQuestionList();
    drawWheel();

    if (questions.length === 0) {
      refreshQuestionsPool();
      recentSelections = [];
    }

    if (round % 2 === 0 && questions.length > 0) {
      questions[questions.length - 1] = getReplacementQuestion();
      renderQuestionList();
      drawWheel();
    }

    spinning = false;
    spinBtn.disabled = false;
  }, 4300);
}

renderQuestionList();
drawWheel();
currentQuestion.textContent = 'Clique em “Girar roleta” para começar.';
spinBtn.addEventListener('click', spinWheel);
resetBtn.addEventListener('click', resetRoulette);
