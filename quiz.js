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
      { text: "Să creez conținut vizual sau artistic", type: "creative", icon: "palette", insight: "Creativitatea ta este o superputere! Lumea are nevoie de vizionari ca tine." },
      { text: "Să repar sau să construiesc obiecte", type: "technical", icon: "handyman", insight: "Mâinile tale pot transforma idei în realitate. Asta e rar și valoros!" },
      { text: "Să ajut prietenii cu sfaturi", type: "social", icon: "diversity_3", insight: "Empatia ta face diferența în viețile altora. E un dar autentic!" }
    ]
  },
  {
    question: "În timpul liber, preferi să...",
    category: "HOBBY-URI",
    options: [
      { text: "Organizezi evenimente sau planuri", type: "organizational", icon: "calendar_month", insight: "Talentul tău de organizare poate schimba modul în care echipele funcționează!" },
      { text: "Rezolvi puzzle-uri sau probleme logice", type: "technical", icon: "extension", insight: "Mintea ta analitică e perfectă pentru provocări complexe!" },
      { text: "Scrii povești sau să desenezi", type: "creative", icon: "edit", insight: "Arta ta poate inspira și transforma! Continuă să creezi." }
    ]
  },
  {
    question: "Ce materie ți-a plăcut cel mai mult la școală?",
    category: "EDUCAȚIE",
    options: [
      { text: "Matematica sau Informatica", type: "technical", icon: "terminal", insight: "Gândirea ta logică e fundația inovațiilor de mâine!" },
      { text: "Psihologia sau Științele Sociale", type: "social", icon: "psychology", insight: "Înțelegerea oamenilor e cheia pentru liderii adevărați!" },
      { text: "Artele sau Literatura", type: "creative", icon: "brush", insight: "Expresia ta artistică poate atinge inimi și minți!" }
    ]
  },
  {
    question: "Cum te descriu prietenii tăi?",
    category: "PERSONALITATE",
    options: [
      { text: "O persoană organizată și lider", type: "organizational", icon: "groups", insight: "Liderii naturali ca tine inspiră pe cei din jur!" },
      { text: "O persoană empatică și săritooare", type: "social", icon: "volunteer_activism", insight: "Generozitatea ta creează conexiuni autentice!" },
      { text: "O persoană originală și creativă", type: "creative", icon: "lightbulb", insight: "Originalitatea ta e o valoare rară pe piața muncii!" }
    ]
  },
  {
    question: "Ce fel de probleme îți place să rezolvi?",
    category: "ABILITĂȚI",
    options: [
      { text: "Probleme tehnice sau de funcționare", type: "technical", icon: "settings", insight: "Rezolvitorii de probleme tehnice sunt mereu căutați!" },
      { text: "Conflicte între oameni", type: "social", icon: "handshake", insight: "Abilitatea ta de mediere e esențială în orice echipă!" },
      { text: "Probleme de eficiență și organizare", type: "organizational", icon: "trending_up", insight: "Optimizatorii ca tine fac companiile să exceleze!" }
    ]
  },
  {
    question: "Dacă ai lansa o afacere, ce rol ți-ar plăcea?",
    category: "CARIERĂ",
    options: [
      { text: "Să creezi brandul și designul", type: "creative", icon: "design_services", insight: "Viziunea ta poate defini identitatea unui business!" },
      { text: "Să gestionezi echipa și bugetul", type: "organizational", icon: "attach_money", insight: "Managementul e coloana vertebrală a oricărei afaceri!" },
      { text: "Să dezvolți produsul tehnic", type: "technical", icon: "code", insight: "Constructorii tehnici transformă visele în produse reale!" }
    ]
  },
  {
    question: "Ce te motivează cel mai mult?",
    category: "MOTIVAȚIE",
    options: [
      { text: "Să înțelegi cum funcționează lucrurile", type: "technical", icon: "search", insight: "Curiozitatea ta deblocează descoperiri importante!" },
      { text: "Să ai un impact pozitiv în viața altora", type: "social", icon: "favorite", insight: "Dorința ta de a ajuta e cea mai nobilă motivație!" },
      { text: "Să îți exprimi ideile liber", type: "creative", icon: "campaign", insight: "Libertatea de expresie e motorul inovației!" }
    ]
  },
  {
    question: "Ce mediu de lucru preferi?",
    category: "MEDIU",
    options: [
      { text: "Un mediu structurat și clar", type: "organizational", icon: "apartment", insight: "Structura îți permite să excelezi și să planifici!" },
      { text: "Un mediu flexibil și artistic", type: "creative", icon: "draw", insight: "Flexibilitatea îți hrănește creativitatea!" },
      { text: "Un mediu unde lucrezi direct cu oamenii", type: "social", icon: "people", insight: "Conexiunile umane îți dau energie și sens!" }
    ]
  },
  {
    question: "Când ai o sarcină nouă, cum o abordezi?",
    category: "STIL DE LUCRU",
    options: [
      { text: "Fac un plan detaliat înainte", type: "organizational", icon: "list_alt", insight: "Planificarea ta previne haosul și asigură succesul!" },
      { text: "Mă apuc direct și experimentez", type: "creative", icon: "science", insight: "Spiritul tău experimental duce la descoperiri unice!" },
      { text: "Cer sfatul celorlalți", type: "social", icon: "forum", insight: "Colaborarea ta amplifică rezultatele echipei!" }
    ]
  },
  {
    question: "Ce gadget sau unealtă preferi?",
    category: "PREFERINȚE",
    options: [
      { text: "Un laptop performant", type: "technical", icon: "laptop_mac", insight: "Tehnologia e extensia minții tale!" },
      { text: "O agendă sau planner", type: "organizational", icon: "event_note", insight: "Organizarea fizică îți clarifică mintea!" },
      { text: "O cameră foto sau tabletă grafică", type: "creative", icon: "camera_alt", insight: "Uneltele creative îți capturează viziunea!" }
    ]
  },
  {
    question: "\"Prefer să lucrez singur decât în echipă.\"",
    subtitle: "Cât de mult te descrie această afirmație?",
    category: "AUTO-EVALUARE",
    layout: "scale",
    scaleLabels: { min: "Deloc", max: "Total" },
    scoreMapping: { 1: "social", 2: "social", 3: null, 4: "technical", 5: "technical" }
  },
  {
    question: "\"Văd soluții creative acolo unde alții văd probleme.\"",
    subtitle: "Cât de mult ești de acord?",
    category: "AUTO-EVALUARE",
    layout: "scale",
    scaleLabels: { min: "Deloc", max: "Total" },
    scoreMapping: { 1: "organizational", 2: "organizational", 3: null, 4: "creative", 5: "creative" }
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
const insightContainer = document.getElementById("insight-container");
const insightMessageEl = document.getElementById("insight-message");

// Insight screen elements
const insightScreen = document.getElementById("insight-screen");
const insightScreenImage = document.getElementById("insight-screen-image");
const insightScreenTitle = document.getElementById("insight-screen-title");
const insightScreenText = document.getElementById("insight-screen-text");
const insightContinueBtn = document.getElementById("insight-continue-btn");

// Insight screens data (appears at specific points)
const insightScreens = {
  midpoint: {
    image: "career_compass.png",
    title: "Ești pe drumul cel bun!",
    text: "<span class='font-bold text-slate-900'>Aproape jumătate gata!</span> Răspunsurile tale ne ajută să îți construim un profil personalizat. Continuă — fiecare răspuns contează!"
  },
  beforeResults: {
    image: "puzzle_progress.png",
    title: "Ultimii pași spre claritate",
    text: "<span class='font-bold text-slate-900'>Profilul tău e aproape gata.</span> Mai sunt doar câteva întrebări și vei descoperi ce tip de carieră ți se potrivește cel mai bine!"
  }
};

function init() {
  // Start quiz directly with demographics (hide intro initially)
  introScreen.classList.add("hidden");
  quizNav.classList.remove("hidden");
  quizContainer.classList.remove("hidden");
  quizFooter.classList.remove("hidden");

  startBtn.addEventListener("click", continueAfterIntro);
  nextBtn.addEventListener("click", handleNext);
  backBtn.addEventListener("click", handleBack);

  // Insight screen continue button
  if (insightContinueBtn) {
    insightContinueBtn.addEventListener("click", continueFromInsight);
  }

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

// Track which insight screens have been shown
let shownInsights = { midpoint: false, beforeResults: false };

function showEducationalInsight(type) {
  const data = insightScreens[type];
  if (!data || !insightScreen) return;

  // Update content
  if (insightScreenImage) insightScreenImage.src = data.image;
  if (insightScreenTitle) insightScreenTitle.textContent = data.title;
  if (insightScreenText) insightScreenText.innerHTML = data.text;

  // Hide quiz, show insight screen
  quizContainer.classList.add("hidden");
  quizFooter.classList.add("hidden");
  insightScreen.classList.remove("hidden");
  insightScreen.classList.add("flex");

  shownInsights[type] = true;
}

function continueFromInsight() {
  insightScreen.classList.add("hidden");
  insightScreen.classList.remove("flex");
  quizContainer.classList.remove("hidden");
  quizFooter.classList.remove("hidden");

  quizContainer.classList.add("animate-[fadeIn_0.5s_ease-out]");

  currentQuestion++;
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

  // Handle SCALE layout (1-5 rating)
  if (data.layout === 'scale') {
    optionsEl.classList.remove('grid', 'grid-cols-2', 'flex-col');
    optionsEl.classList.add('flex', 'flex-col');

    // Add subtitle if present
    if (data.subtitle) {
      const subtitleEl = document.createElement('p');
      subtitleEl.className = 'text-slate-500 text-base text-center mb-8 -mt-4';
      subtitleEl.textContent = data.subtitle;
      optionsEl.appendChild(subtitleEl);
    }

    // Create scale container
    const scaleContainer = document.createElement('div');
    scaleContainer.className = 'flex justify-center gap-3 mb-3';

    for (let i = 1; i <= 5; i++) {
      const isSelected = userAnswers[currentQuestion] === i;
      const scaleBtn = document.createElement('button');
      scaleBtn.className = `
        w-14 h-14 rounded-xl font-bold text-lg transition-all duration-200
        ${isSelected
          ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }
      `;
      scaleBtn.textContent = i;
      scaleBtn.addEventListener('click', () => handleScaleSelect(i));
      scaleContainer.appendChild(scaleBtn);
    }

    optionsEl.appendChild(scaleContainer);

    // Add scale labels
    if (data.scaleLabels) {
      const labelsContainer = document.createElement('div');
      labelsContainer.className = 'flex justify-between px-2 text-sm text-slate-400';
      labelsContainer.innerHTML = `
        <span>${data.scaleLabels.min}</span>
        <span class="mx-auto">•────────────────────────────•</span>
        <span>${data.scaleLabels.max}</span>
      `;
      optionsEl.appendChild(labelsContainer);
    }

    updateNavigationState();
    return; // Don't process regular options
  }

  // Set layout classes for regular questions
  const isGrid = data.layout === 'grid';
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
      // List Card Style (SmartyMe)
      btn.className = `
          group relative w-full p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 select-none
          ${isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200'
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
        <div class="flex-shrink-0 text-2xl">
           ${emoji}
        </div>
        <div class="flex-1 text-left">
          <span class="font-semibold text-slate-800 text-base leading-snug">${opt.text}</span>
        </div>
      `;
    }

    btn.addEventListener('click', () => handleOptionSelect(opt.type));
    optionsEl.appendChild(btn);
  });

  // Show insight message if an option is selected
  const selectedAnswer = userAnswers[currentQuestion];
  if (selectedAnswer && insightContainer && insightMessageEl) {
    const selectedOption = data.options.find(opt => opt.type === selectedAnswer);
    if (selectedOption && selectedOption.insight) {
      insightMessageEl.textContent = selectedOption.insight;
      insightContainer.classList.remove('hidden');
    } else {
      insightContainer.classList.add('hidden');
    }
  } else if (insightContainer) {
    insightContainer.classList.add('hidden');
  }

  updateNavigationState();
}

function handleOptionSelect(type) {
  userAnswers[currentQuestion] = type;
  loadQuestion();
}

function handleScaleSelect(value) {
  userAnswers[currentQuestion] = value;
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

  // Show midpoint insight at question 6 (halfway through vocational questions)
  if (currentQuestion === 6 && !shownInsights.midpoint) {
    optionsEl.classList.add('opacity-0', '-translate-x-2');
    questionEl.classList.add('opacity-0');

    setTimeout(() => {
      showEducationalInsight('midpoint');
    }, 250);
    return;
  }

  // Show beforeResults insight at question 10 (near end)
  if (currentQuestion === 10 && !shownInsights.beforeResults) {
    optionsEl.classList.add('opacity-0', '-translate-x-2');
    questionEl.classList.add('opacity-0');

    setTimeout(() => {
      showEducationalInsight('beforeResults');
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
    const answer = userAnswers[i];
    const questionData = quizData[i];

    // Handle scale questions
    if (questionData.layout === 'scale' && typeof answer === 'number') {
      const mappedType = questionData.scoreMapping && questionData.scoreMapping[answer];
      if (mappedType && finalScores[mappedType] !== undefined) {
        finalScores[mappedType]++;
      }
    }
    // Handle regular questions
    else if (answer && finalScores[answer] !== undefined) {
      finalScores[answer]++;
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
      careers: "Designer Grafic, Arhitect, Director de Creație, UX/UI Designer",
      emoji: "🎨"
    },
    technical: {
      title: "Ești un Tehnician!",
      desc: "Îți place să înțelegi cum funcționează lucrurile și să rezolvi probleme complexe prin logică.",
      careers: "Programator, Inginer, Analist de Date, Specialist IT",
      emoji: "💻"
    },
    social: {
      title: "Ești un Helper!",
      desc: "Empatia este superputerea ta. Îți place să lucrezi cu oamenii și să îi ajuți să crească.",
      careers: "Psiholog, Profesor, Medic, Specialist HR",
      emoji: "❤️"
    },
    organizational: {
      title: "Ești un Lider!",
      desc: "Ești organizat, eficient și îți place să pui lucrurile în mișcare. Ai stofă de antreprenor.",
      careers: "Manager, Antreprenor, Consultant, Event Planner",
      emoji: "📈"
    }
  };

  const result = resultContents[resultType] || resultContents.creative;
  const totalAnswered = Object.values(finalScores).reduce((a, b) => a + b, 0);
  const percentage = totalAnswered > 0 ? Math.round((maxScore / totalAnswered) * 100) : 0;

  // Update result content
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-desc').textContent = result.desc;
  document.getElementById('result-careers').textContent = result.careers;
  document.getElementById('result-icon').textContent = result.emoji;

  // Animate circular graph
  const progressCircle = document.getElementById('progress-circle');
  const percentageText = document.getElementById('result-percentage');
  if (progressCircle && percentageText) {
    const circumference = 283; // 2 * PI * 45
    const offset = circumference - (percentage / 100) * circumference;

    setTimeout(() => {
      progressCircle.style.strokeDashoffset = offset;

      // Animate percentage counter
      let current = 0;
      const increment = percentage / 30;
      const counter = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          current = percentage;
          clearInterval(counter);
        }
        percentageText.textContent = Math.round(current) + '%';
      }, 30);
    }, 300);
  }

  // Populate score breakdown
  const scoreBreakdown = document.getElementById('score-breakdown');
  if (scoreBreakdown) {
    const typeNames = {
      creative: { name: 'Creativ', emoji: '🎨', color: 'bg-pink-500' },
      technical: { name: 'Tehnic', emoji: '💻', color: 'bg-indigo-500' },
      social: { name: 'Social', emoji: '❤️', color: 'bg-rose-500' },
      organizational: { name: 'Organizator', emoji: '📈', color: 'bg-cyan-500' }
    };

    scoreBreakdown.innerHTML = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .map(([type, score]) => {
        const info = typeNames[type];
        const scorePercent = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
        return `
          <div class="flex items-center gap-3">
            <span class="text-lg">${info.emoji}</span>
            <div class="flex-1">
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">${info.name}</span>
                <span class="text-slate-500">${scorePercent}%</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="${info.color} h-full rounded-full transition-all duration-700" style="width: ${scorePercent}%"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
  }
}

// Start
init();
