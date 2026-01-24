const quizData = [
  {
    question: "Cum te identifici?",
    category: "DESPRE TINE",
    layout: "grid",
    options: [
      { text: "Masculin", type: "male", image: "male_avatar.png" },
      { text: "Feminin", type: "female", image: "female_avatar.png" }
    ]
  },
  {
    question: "Ce vârstă ai?",
    category: "DESPRE TINE",
    layout: "grid",
    options: [
      { text: "14-18 ani", type: "age_14_18", icon: "school" },
      { text: "19-24 ani", type: "age_19_24", icon: "school" },
      { text: "25-34 ani", type: "age_25_34", icon: "work" },
      { text: "35+ ani", type: "age_35_plus", icon: "group" }
    ]
  },
  {
    question: "Ce activitate te atrage cel mai mult?",
    category: "INTERESE",
    options: [
      { text: "Să creez conținut vizual sau artistic", type: "creative", icon: "palette" },
      { text: "Să repar sau să construiesc obiecte", type: "technical", icon: "handyman" },
      { text: "Să ajut prietenii cu sfaturi", type: "social", icon: "diversity_3" }
    ]
  },
  {
    question: "În timpul liber, preferi să...",
    category: "HOBBY-URI",
    options: [
      { text: "Organizezi evenimente sau planuri", type: "organizational", icon: "calendar_month" },
      { text: "Rezolvi puzzle-uri sau probleme logice", type: "technical", icon: "extension" },
      { text: "Scrii povești sau să desenezi", type: "creative", icon: "edit" }
    ]
  },
  {
    question: "Ce materie ți-a plăcut cel mai mult la școală?",
    category: "EDUCAȚIE",
    options: [
      { text: "Matematica sau Informatica", type: "technical", icon: "terminal" },
      { text: "Psihologia sau Științele Sociale", type: "social", icon: "psychology" },
      { text: "Artele sau Literatura", type: "creative", icon: "brush" }
    ]
  },
  {
    question: "Cum te descriu prietenii tăi?",
    category: "PERSONALITATE",
    options: [
      { text: "O persoană organizată și lider", type: "organizational", icon: "groups" },
      { text: "O persoană empatică și săritooare", type: "social", icon: "volunteer_activism" },
      { text: "O persoană originală și creativă", type: "creative", icon: "lightbulb" }
    ]
  },
  {
    question: "Ce fel de probleme îți place să rezolvi?",
    category: "ABILITĂȚI",
    options: [
      { text: "Probleme tehnice sau de funcționare", type: "technical", icon: "settings" },
      { text: "Conflicte între oameni", type: "social", icon: "handshake" },
      { text: "Probleme de eficiență și organizare", type: "organizational", icon: "trending_up" }
    ]
  },
  {
    question: "Dacă ai lansa o afacere, ce rol ți-ar plăcea?",
    category: "CARIERĂ",
    options: [
      { text: "Să creezi brandul și designul", type: "creative", icon: "design_services" },
      { text: "Să gestionezi echipa și bugetul", type: "organizational", icon: "attach_money" },
      { text: "Să dezvolți produsul tehnic", type: "technical", icon: "code" }
    ]
  },
  {
    question: "Ce te motivează cel mai mult?",
    category: "MOTIVAȚIE",
    options: [
      { text: "Să înțelegi cum funcționează lucrurile", type: "technical", icon: "search" },
      { text: "Să ai un impact pozitiv în viața altora", type: "social", icon: "favorite" },
      { text: "Să îți exprimi ideile liber", type: "creative", icon: "campaign" }
    ]
  },
  {
    question: "Ce mediu de lucru preferi?",
    category: "MEDIU",
    options: [
      { text: "Un mediu structurat și clar", type: "organizational", icon: "apartment" },
      { text: "Un mediu flexibil și artistic", type: "creative", icon: "draw" },
      { text: "Un mediu unde lucrezi direct cu oamenii", type: "social", icon: "people" }
    ]
  },
  {
    question: "Când ai o sarcină nouă, cum o abordezi?",
    category: "STIL DE LUCRU",
    options: [
      { text: "Fac un plan detaliat înainte", type: "organizational", icon: "list_alt" },
      { text: "Mă apuc direct și experimentez", type: "creative", icon: "science" },
      { text: "Cer sfatul celorlalți", type: "social", icon: "forum" }
    ]
  },
  {
    question: "Ce gadget sau unealtă preferi?",
    category: "PREFERINȚE",
    options: [
      { text: "Un laptop performant", type: "technical", icon: "laptop_mac" },
      { text: "O agendă sau planner", type: "organizational", icon: "event_note" },
      { text: "O cameră foto sau tabletă grafică", type: "creative", icon: "camera_alt" }
    ]
  }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

const introScreen = document.getElementById("intro-screen");
const quizContainer = document.getElementById("quiz-container");
const quizFooter = document.getElementById("quiz-footer");
const quizNav = document.getElementById("quiz-nav");
const resultsContainer = document.getElementById("results-container");

const questionEl = document.getElementById("question-text");
const categoryTitleEl = document.getElementById("category-title");
const optionsEl = document.getElementById("options-container");
const progressFill = document.getElementById("progress-fill");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");


const introMessageEl = document.getElementById("intro-message");

function init() {
  // Start quiz directly with demographics (hide intro initially)
  introScreen.classList.add("hidden");
  quizNav.classList.remove("hidden");
  quizContainer.classList.remove("hidden");
  quizFooter.classList.remove("hidden");

  startBtn.addEventListener("click", continueAfterIntro);
  nextBtn.addEventListener("click", handleNext);
  backBtn.addEventListener("click", handleBack);

  loadQuestion();
  updateNavigationState();
}

function showIntroScreen() {
  // Get personalized message based on gender and age
  const genderAnswer = userAnswers[0];
  const ageAnswer = userAnswers[1];

  const genderText = genderAnswer === 'male' ? 'bărbați' : genderAnswer === 'female' ? 'femei' : 'tineri';
  const ageText = {
    'age_14_18': '14-18 ani',
    'age_19_24': '19-24 ani',
    'age_25_34': '25-34 ani',
    'age_35_plus': '35+ ani'
  }[ageAnswer] || '';

  // Update intro message
  if (introMessageEl) {
    const count = Math.floor(Math.random() * 50000) + 150000; // Random realistic number
    introMessageEl.innerHTML = `<span class="font-bold text-slate-900">${count.toLocaleString('ro-RO')}</span> ${genderText} cu vârsta ${ageText} și-au descoperit deja vocația cu noi — dar această călătorie este despre <span class="font-bold text-primary">tine</span>!`;
  }

  // Hide quiz, show intro
  quizContainer.classList.add("hidden");
  quizFooter.classList.add("hidden");
  quizNav.classList.add("hidden");
  introScreen.classList.remove("hidden");
  introScreen.classList.add("animate-[fadeIn_0.5s_ease-out]");
}

function continueAfterIntro() {
  introScreen.classList.add("hidden");
  quizNav.classList.remove("hidden");
  quizContainer.classList.remove("hidden");
  quizFooter.classList.remove("hidden");

  quizContainer.classList.add("animate-[fadeIn_0.5s_ease-out]");

  // Move to first vocational question (index 2)
  currentQuestion = 2;
  loadQuestion();
  updateNavigationState();
}

function updateNavigationState() {
  backBtn.disabled = currentQuestion === 0;
  if (currentQuestion === 0) {
    backBtn.classList.remove('opacity-100');
    backBtn.classList.add('opacity-0');
  } else {
    backBtn.classList.remove('opacity-0');
    backBtn.classList.add('opacity-100');
  }

  const hasAnswer = userAnswers[currentQuestion] !== null;
  nextBtn.disabled = !hasAnswer;

  if (hasAnswer) {
    nextBtn.classList.remove('bg-slate-100', 'text-slate-400');
    nextBtn.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
  } else {
    nextBtn.classList.add('bg-slate-100', 'text-slate-400');
    nextBtn.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
  }
}

function loadQuestion() {
  const data = quizData[currentQuestion];
  const isGrid = data.layout === 'grid';

  questionEl.style.opacity = '0';
  setTimeout(() => {
    questionEl.textContent = data.question;
    questionEl.style.opacity = '1';
  }, 150);

  if (categoryTitleEl) {
    categoryTitleEl.textContent = data.category || "General";
  }

  const progress = ((currentQuestion) / (quizData.length - 1)) * 100;
  if (progressFill) progressFill.style.width = `${progress}%`;

  for (let i = 2; i <= 4; i++) {
    const step = document.getElementById(`step-${i}`);
    if (step) {
      const threshold = (i - 1) * 25;
      if (progress >= threshold) {
        step.classList.add('bg-primary');
        step.classList.remove('bg-slate-200');
      } else {
        step.classList.remove('bg-primary');
        step.classList.add('bg-slate-200');
      }
    }
  }

  optionsEl.innerHTML = "";

  // Set layout classes
  if (isGrid) {
    optionsEl.classList.remove('flex-col');
    optionsEl.classList.add('grid', 'grid-cols-2');
  } else {
    optionsEl.classList.remove('grid', 'grid-cols-2');
    optionsEl.classList.add('flex-col');
  }

  data.options.forEach((opt, index) => {
    const isSelected = userAnswers[currentQuestion] === opt.type;

    const btn = document.createElement("div");

    if (isGrid) {
      // Grid Card Style (SmartyMe Gender/Age)
      btn.className = `
          group relative w-full aspect-[4/5] rounded-[2rem] bg-white border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-end overflow-hidden select-none
          ${isSelected
          ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]'
          : 'border-transparent shadow-md hover:shadow-lg hover:-translate-y-1'
        }
      `;

      // Check if it has an image (for gender) or icon (for age)
      if (opt.image) {
        btn.innerHTML = `
          <div class="flex-1 w-full flex items-center justify-center p-4">
            <img src="${opt.image}" alt="${opt.text}" class="w-full h-full object-contain transition-transform duration-300 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}"/>
          </div>
          <div class="w-full py-3 px-4 bg-primary text-white text-center font-bold text-lg rounded-b-[1.8rem]">
            ${opt.text}
          </div>
        `;
      } else {
        // Icon-based grid card (for age)
        const iconMap = {
          'school': '🎒', 'work': '💼', 'group': '✨'
        };
        const emoji = iconMap[opt.icon] || '🔹';
        btn.innerHTML = `
          <div class="flex-1 w-full flex items-center justify-center text-5xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}">
            ${emoji}
          </div>
          <div class="w-full py-3 px-4 bg-primary text-white text-center font-bold text-base rounded-b-[1.8rem]">
            ${opt.text}
          </div>
        `;
      }
    } else {
      // List Card Style
      btn.className = `
          group relative w-full p-5 rounded-[2rem] bg-white border-2 transition-all duration-300 cursor-pointer flex items-center gap-5 select-none
          ${isSelected
          ? 'border-primary shadow-xl shadow-primary/10 scale-[1.01]'
          : 'border-transparent shadow-sm hover:shadow-lg hover:border-slate-100 hover:-translate-y-0.5'
        }
      `;

      const iconMap = {
        'palette': '🎨', 'handyman': '🛠️', 'diversity_3': '🤝',
        'calendar_month': '📅', 'extension': '🧩', 'edit': '✍️',
        'terminal': '💻', 'psychology': '🧠', 'brush': '🖌️',
        'groups': '👥', 'volunteer_activism': '❤️', 'lightbulb': '💡',
        'settings': '⚙️', 'handshake': '🤝', 'trending_up': '📈',
        'design_services': '✨', 'attach_money': '💰', 'code': '👨‍💻',
        'search': '🔍', 'favorite': '💖', 'campaign': '📣',
        'apartment': '🏢', 'draw': '🎭', 'people': '🧑‍🤝‍🧑',
        'list_alt': '📝', 'science': '🧪', 'forum': '🗣️',
        'laptop_mac': '💻', 'event_note': '📓', 'camera_alt': '📷'
      };
      const emoji = iconMap[opt.icon] || '🔹';

      btn.innerHTML = `
        <div class="flex-shrink-0 text-3xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}">
           ${emoji}
        </div>
        <div class="flex-1 text-left">
          <h3 class="font-bold text-slate-700 text-lg leading-snug group-hover:text-primary transition-colors ${isSelected ? 'text-primary' : ''}">${opt.text}</h3>
        </div>
      `;
    }

    btn.addEventListener('click', () => handleOptionSelect(opt.type));
    optionsEl.appendChild(btn);
  });

  updateNavigationState();
}

function handleOptionSelect(type) {
  userAnswers[currentQuestion] = type;
  loadQuestion();
}

function handleNext() {
  // If finishing Age question (index 1), show intro screen
  if (currentQuestion === 1 && userAnswers[1] !== null) {
    optionsEl.classList.add('opacity-0', '-translate-x-2');
    questionEl.classList.add('opacity-0');

    setTimeout(() => {
      showIntroScreen();
    }, 250);
    return;
  }

  if (currentQuestion < quizData.length - 1) {
    optionsEl.classList.add('opacity-0', '-translate-x-2');
    questionEl.classList.add('opacity-0');

    setTimeout(() => {
      currentQuestion++;
      loadQuestion();

      optionsEl.classList.remove('opacity-0', '-translate-x-2');
      questionEl.classList.remove('opacity-0');

      optionsEl.classList.add('animate-[fadeIn_0.4s_ease-out]');
      setTimeout(() => optionsEl.classList.remove('animate-[fadeIn_0.4s_ease-out]'), 400);
    }, 250);

  } else {
    calculateAndShowResults();
  }
}

function handleBack() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function calculateAndShowResults() {
  // Ignore demographics (first 2 questions) for scoring
  const finalScores = { creative: 0, technical: 0, social: 0, organizational: 0 };
  for (let i = 2; i < userAnswers.length; i++) {
    const type = userAnswers[i];
    if (type && finalScores[type] !== undefined) {
      finalScores[type]++;
    }
  }

  quizContainer.classList.add('hidden');
  quizNav.classList.add('hidden');
  quizFooter.classList.add('hidden');
  resultsContainer.classList.remove('hidden');

  const maxScore = Math.max(...Object.values(finalScores));
  const resultType = Object.keys(finalScores).find(key => finalScores[key] === maxScore);

  const resultContents = {
    creative: {
      title: "Ești un Creator!",
      desc: "Ai o imaginație bogată și îți place să te exprimi prin artă, design sau idei inovatoare.",
      careers: "Designer Grafic, Arhitect, Director de Creație, UX/UI Designer, Content Creator",
      icon: "palette",
      color: "text-accent-pink"
    },
    technical: {
      title: "Ești un Tehnician!",
      desc: "Îți place să înțelegi cum funcționează lucrurile și să rezolvi probleme complexe prin logică.",
      careers: "Programator, Inginer, Analist de Date, Specialist Cyber Security, Mecanic",
      icon: "terminal",
      color: "text-primary"
    },
    social: {
      title: "Ești un Helper!",
      desc: "Empatia este superputerea ta. Îți place să lucrezi cu oamenii și să îi ajuți să se dezvolte.",
      careers: "Psiholog, Profesor, Medic, Specialist HR, Asistent Social",
      icon: "volunteer_activism",
      color: "text-accent-pink"
    },
    organizational: {
      title: "Ești un Lider!",
      desc: "Ești organizat, eficient și îți place să pui lucrurile în mișcare. Ai stofă de antreprenor.",
      careers: "Manager de Proiect, Antreprenor, Contabil, Consultant Business, Event Planner",
      icon: "trending_up",
      color: "text-accent-cyan"
    }
  };

  const result = resultContents[resultType] || resultContents.creative;

  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-desc').textContent = result.desc;
  document.getElementById('result-careers').textContent = result.careers;
  document.getElementById('result-icon').textContent = result.icon;
  document.getElementById('result-icon-container').className = `w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 mx-auto animate-[fadeIn_0.5s_ease-out] ${result.color}`;
}

// Start
init();
