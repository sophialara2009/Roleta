const PASSWORD = 'sophia';

const questionsAndAnswers = [
  {
    question: 'Como o cérebro regula a fome e a saciedade?',
    answer:
      'O hipotálamo integra sinais de fome e saciedade, como hormônios, glicose e nutrientes. Ele ajuda a ajustar o apetite e o gasto energético conforme o corpo precisa.'
  },
  {
    question: 'Quais áreas cerebrais influenciam a compulsão alimentar?',
    answer:
      'O córtex pré-frontal, amígdala, núcleo accumbens e hipotálamo participam do controle do desejo, da recompensa e da tomada de decisão alimentar.'
  },
  {
    question: 'O que pode desencadear um transtorno alimentar?',
    answer:
      'Fatores emocionais, pressão social, autoimagem negativa, traumas, ansiedade, depressão, ambiente familiar e influências digitais podem aumentar o risco.'
  },
  {
    question: 'Como a autoimagem afeta o comportamento alimentar?',
    answer:
      'Quando a pessoa se vê de forma crítica ou distorcida, pode recorrer a rigidez alimentar, jejum, compulsão ou purgação para controlar a imagem corporal.'
  },
  {
    question: 'Qual a diferença entre anorexia e bulimia?',
    answer:
      'A anorexia costuma envolver restrição grave da alimentação e baixo peso, enquanto a bulimia envolve episódios de compulsão seguidos de comportamentos compensatórios.'
  },
  {
    question: 'O que é compulsão alimentar?',
    answer:
      'É um episódio de ingestão excessiva de alimentos, muitas vezes sem controle, acompanhado de culpa, desconforto e sensação de perda de autocontrole.'
  },
  {
    question: 'Como a pressão social pode contribuir?',
    answer:
      'Ideais de corpo, críticas frequentes, comparação com padrões irreais e exposição constante a conteúdos digitais podem intensificar a preocupação com o peso e a aparência.'
  },
  {
    question: 'Quais sinais aparecem antes do agravamento?',
    answer:
      'Mudanças de humor, isolamento, obsessão por calorias, negação de alimentação, ritmo de alimentação muito rígido, compulsão e sinais físicos como fraqueza e tontura.'
  },
  {
    question: 'Como o estresse altera o controle alimentar?',
    answer:
      'O estresse ativa circuitos que podem aumentar a busca por “alívio” alimentar e reduzir a regulação emocional, favorecendo a compulsão ou a restrição exagerada.'
  },
  {
    question: 'Quais fatores genéticos influenciam o risco?',
    answer:
      'Há predisposição genética que pode afetar a regulação do apetite, humor, ansiedade e sensibilidade à recompensa, mas o ambiente também é muito importante.'
  },
  {
    question: 'Como a ansiedade e a depressão se conectam?',
    answer:
      'Essas condições podem aumentar a vulnerabilidade a padrões alimentares disfuncionais, especialmente quando a pessoa usa a comida como mecanismo de regulação emocional.'
  },
  {
    question: 'O que é o cérebro emocional e a alimentação?',
    answer:
      'O cérebro emocional liga sensações, memórias e sentimentos à comida. Isso explica por que determinadas emoções podem levar a comer mais, menos ou de forma compensatória.'
  },
  {
    question: 'Como as redes sociais influenciam a imagem corporal?',
    answer:
      'Elas reforçam padrões rígidos e muitas vezes inatingíveis, o que pode causar comparação constante e distorção da própria imagem corporal.'
  },
  {
    question: 'Quais tipos de transtorno alimentar existem?',
    answer:
      'Os principais incluem anorexia nervosa, bulimia nervosa, compulsão alimentar periódica e outros transtornos alimentares específicos, com graus diferentes de gravidade.'
  },
  {
    question: 'Como a terapia ajuda no tratamento?',
    answer:
      'A terapia ajuda a identificar gatilhos emocionais, padrões de pensamento, crenças sobre peso e alimentação, além de desenvolver estratégias de autocuidado e regulação emocional.'
  },
  {
    question: 'Qual o papel da nutrição na recuperação?',
    answer:
      'A nutrição é essencial para restaurar a alimentação segura, melhorar a saúde física, estabilizar energia e reduzir riscos associados à desnutrição ou ao ciclo de compulsão.'
  },
  {
    question: 'Como o tratamento combina psicologia e medicina?',
    answer:
      'A abordagem integrativa pode incluir psicoterapia, acompanhamento nutricional, apoio médico e, em alguns casos, medicação para tratar sintomas associados como ansiedade ou depressão.'
  },
  {
    question: 'Como os transtornos alimentares são criados no corpo e na mente?',
    answer:
      'Eles são influenciados por fatores biológicos, emocionais, sociais e culturais. O corpo sofre alterações físicas, e a mente passa a reforçar pensamentos e comportamentos rígidos em torno da alimentação.'
  }
];

const accessForm = document.getElementById('accessForm');
const passwordInput = document.getElementById('passwordInput');
const hubContent = document.getElementById('hubContent');
const qaList = document.getElementById('qaList');

function renderQuestions() {
  qaList.innerHTML = '';

  questionsAndAnswers.forEach(({ question, answer }) => {
    const item = document.createElement('article');
    item.className = 'qa-item';

    const questionEl = document.createElement('h2');
    questionEl.textContent = question;

    const answerEl = document.createElement('p');
    answerEl.textContent = answer;

    item.appendChild(questionEl);
    item.appendChild(answerEl);
    qaList.appendChild(item);
  });
}

function unlockHub() {
  hubContent.classList.remove('hidden');
  accessForm.classList.add('hidden');
  renderQuestions();
}

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (passwordInput.value === PASSWORD) {
    unlockHub();
  } else {
    passwordInput.value = '';
    passwordInput.focus();
    passwordInput.setAttribute('placeholder', 'Senha incorreta');
  }
});
