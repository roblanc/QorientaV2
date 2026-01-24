const quizData = [
  {
    question: "Ce activitate te atrage cel mai mult?",
    options: [
      { text: "Să creez conținut vizual sau artistic", type: "creative", icon: "palette" },
      { text: "Să repar sau să construiesc obiecte", type: "technical", icon: "handyman" },
      { text: "Să ajut prietenii cu sfaturi", type: "social", icon: "diversity_3" }
    ]
  },
  {
    question: "În timpul liber, preferi să...",
    options: [
      { text: "Organizezi evenimente sau planuri", type: "organizational", icon: "calendar_month" },
      { text: "Rezolvi puzzle-uri sau probleme logice", type: "technical", icon: "extension" },
      { text: "Scrii povești sau să desenezi", type: "creative", icon: "edit" }
    ]
  },
  {
    question: "Ce materie ți-a plăcut cel mai mult la școală?",
    options: [
      { text: "Matematica sau Informatica", type: "technical", icon: "terminal" },
      { text: "Psihologia sau Științele Sociale", type: "social", icon: "psychology" },
      { text: "Artele sau Literatura", type: "creative", icon: "brush" }
    ]
  },
  {
    question: "Cum te descriu prietenii tăi?",
    options: [
      { text: "O persoană organizată și lider", type: "organizational", icon: "groups" },
      { text: "O persoană empatică și săritooare", type: "social", icon: "volunteer_activism" },
      { text: "O persoană originală și creativă", type: "creative", icon: "lightbulb" }
    ]
  },
  {
    question: "Ce fel de probleme îți place să rezolvi?",
    options: [
      { text: "Probleme tehnice sau de funcționare", type: "technical", icon: "settings" },
      { text: "Conflicte între oameni", type: "social", icon: "handshake" },
      { text: "Probleme de eficiență și organizare", type: "organizational", icon: "trending_up" }
    ]
  },
  {
    question: "Dacă ai lansa o afacere, ce rol ți-ar plăcea?",
    options: [
      { text: "Să creezi brandul și designul", type: "creative", icon: "design_services" },
      { text: "Să gestionezi echipa și bugetul", type: "organizational", icon: "attach_money" },
      { text: "Să dezvolți produsul tehnic", type: "technical", icon: "code" }
    ]
  },
  {
    question: "Ce te motivează cel mai mult?",
    options: [
      { text: "Să înțelegi cum funcționează lucrurile", type: "technical", icon: "search" },
      { text: "Să ai un impact pozitiv în viața altora", type: "social", icon: "favorite" },
      { text: "Să îți exprimi ideile liber", type: "creative", icon: "campaign" }
    ]
  },
  {
    question: "Ce mediu de lucru preferi?",
    options: [
      { text: "Un mediu structurat și clar", type: "organizational", icon: "apartment" },
      { text: "Un mediu flexibil și artistic", type: "creative", icon: "draw" },
      { text: "Un mediu unde lucrezi direct cu oamenii", type: "social", icon: "people" }
    ]
  },
  {
    question: "Când ai o sarcină nouă, cum o abordezi?",
    options: [
      { text: "Fac un plan detaliat înainte", type: "organizational", icon: "list_alt" },
      { text: "Mă apuc direct și experimentez", type: "creative", icon: "science" },
      { text: "Cer sfatul celorlalți", type: "social", icon: "forum" }
    ]
  },
  {
    question: "Ce gadget sau unealtă preferi?",
    options: [
      { text: "Un laptop performant", type: "technical", icon: "laptop_mac" },
      { text: "O agendă sau planner", type: "organizational", icon: "event_note" },
      { text: "O cameră foto sau tabletă grafică", type: "creative", icon: "camera_alt" }
    ]
  }
];

let currentQuestion = 0;
// Track user answers by index to allow "Back" functionality and score recalculation
let userAnswers = new Array(quizData.length).fill(null);

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar-inner");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");

// Initial state updates
function init() {
  loadQuestion();
  updateNavigationState();
}

function updateNavigationState() {
  // Back button handling
  backBtn.disabled = currentQuestion === 0;
  if (currentQuestion === 0) {
    backBtn.classList.add('opacity-0', 'pointer-events-none');
  } else {
    backBtn.classList.remove('opacity-0', 'pointer-events-none');
  }

  // Next button state based on if an answer is selected
  const hasAnswer = userAnswers[currentQuestion] !== null;
  nextBtn.disabled = !hasAnswer;

  if (hasAnswer) {
    nextBtn.classList.remove('bg-slate-200', 'text-slate-400');
    nextBtn.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
  } else {
    nextBtn.classList.add('bg-slate-200', 'text-slate-400');
    nextBtn.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
  }
}

function loadQuestion() {
  const data = quizData[currentQuestion];
  questionEl.textContent = data.question;

  // Update progress
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Clear previous options
  optionsEl.innerHTML = "";

  // Render options
  data.options.forEach((opt, index) => {
    // Check if this option was previously selected
    const isSelected = userAnswers[currentQuestion] === opt.type;

    const btn = document.createElement("div");
    // Card styling
    btn.className = `
        group relative w-full p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer flex items-center gap-4
        ${isSelected
        ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
        : 'border-white shadow-sm hover:border-slate-200 hover:shadow-md'
      }
    `;

    // Inner HTML
    btn.innerHTML = `
      <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}">
        <span class="material-symbols-rounded text-2xl">${opt.icon}</span>
      </div>
      <div class="flex-1 text-left">
        <h3 class="font-bold text-slate-800 text-base leading-tight group-hover:text-primary transition-colors ${isSelected ? 'text-primary' : ''}">${opt.text}</h3>
      </div>
      <div class="flex-shrink-0">
        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-slate-200'}">
            <span class="material-symbols-rounded text-white text-xs font-bold leading-none ${isSelected ? 'opacity-100' : 'opacity-0'}">check</span>
        </div>
      </div>
    `;

    // Click handler
    btn.addEventListener('click', () => handleOptionSelect(opt.type));

    optionsEl.appendChild(btn);
  });

  updateNavigationState();
}

function handleOptionSelect(type) {
  // Save answer
  userAnswers[currentQuestion] = type;

  // Re-render to show selection state immediately (could be optimized but fast enough)
  loadQuestion();

  // Optional: Auto-scroll slightly or minimal feedback
}

function handleNext() {
  if (currentQuestion < quizData.length - 1) {
    // Animating out
    optionsEl.classList.add('opacity-50', 'translate-x-[-10px]');
    questionEl.classList.add('opacity-50');

    setTimeout(() => {
      currentQuestion++;
      loadQuestion();

      // Reset animation classes
      optionsEl.classList.remove('opacity-50', 'translate-x-[-10px]');
      questionEl.classList.remove('opacity-50');

      // Add fade in
      optionsEl.classList.add('animate-[fadeIn_0.3s_ease-out]');
      setTimeout(() => optionsEl.classList.remove('animate-[fadeIn_0.3s_ease-out]'), 300);
    }, 200);

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
  // Calculate scores based on userAnswers
  const finalScores = {
    creative: 0,
    technical: 0,
    social: 0,
    organizational: 0
  };

  userAnswers.forEach(type => {
    if (type && finalScores[type] !== undefined) {
      finalScores[type]++;
    }
  });

  quizContainer.classList.add('hidden');
  document.querySelector('nav').classList.add('hidden'); // Hide nav on results
  resultsContainer.classList.remove('hidden');

  // Find winner
  const maxScore = Math.max(...Object.values(finalScores));
  // In case of tie, prioritize order: creative > technical > social > organizational
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

// Event Listeners
nextBtn.addEventListener("click", handleNext);
backBtn.addEventListener("click", handleBack);

// Start
init();
