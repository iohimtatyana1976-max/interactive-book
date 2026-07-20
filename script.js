const intro = document.getElementById('intro');
const reader = document.getElementById('reader');
const mapPanel = document.getElementById('mapPanel');
const openBook = document.getElementById('openBook');
const backToCover = document.getElementById('backToCover');
const toggleMap = document.getElementById('toggleMap');
const closeMap = document.getElementById('closeMap');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const chapterTitle = document.getElementById('chapterTitle');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const book = document.getElementById('book');
const castleGrid = document.getElementById('castleGrid');

const spreads = [
  {
    title: 'Пролог',
    leftTitle: 'Под сенью Великой Липы',
    leftText: [
      'Здесь будет размещен текст вступления. На этом этапе мы создаем оболочку книги: атмосферу, навигацию и первую рабочую версию.',
      'Позже мы заменим этот текст на настоящий и добавим иллюстрации, главы, созвездия и мягкие анимации.'
    ],
    art: '✦',
    artText: 'Здесь будет первая иллюстрация'
  },
  {
    title: 'Созвездие I',
    leftTitle: 'Первый замок',
    leftText: [
      'Здесь начнется первая глава. Текст можно будет читать на развороте, а иллюстрация займет соседнюю страницу.',
      'Каждая прочитанная глава будет зажигать одно созвездие на карте.'
    ],
    art: '♜',
    artText: 'Иллюстрация первого замка'
  },
  {
    title: 'Созвездие II',
    leftTitle: 'Дорога под звездами',
    leftText: [
      'Эта версия показывает принцип работы. Далее мы добавим ваши настоящие страницы и художественные материалы.',
      'Навигация останется простой: вперед, назад и карта двенадцати созвездий.'
    ],
    art: '✧',
    artText: 'Следующая иллюстрация'
  }
];

let currentSpread = 0;

function renderSpread() {
  const data = spreads[currentSpread];
  chapterTitle.textContent = data.title;

  const left = book.querySelector('.page-left .page-inner');
  left.innerHTML = `
    <span class="page-label">${data.title}</span>
    <h3>${data.leftTitle}</h3>
    ${data.leftText.map(p => `<p>${p}</p>`).join('')}
    <span class="page-number">${currentSpread * 2 + 1}</span>
  `;

  const right = book.querySelector('.page-right');
  right.innerHTML = `
    <div class="illustration-placeholder">
      <div class="constellation">${data.art}</div>
      <p>${data.artText}</p>
    </div>
    <span class="page-number">${currentSpread * 2 + 2}</span>
  `;

  progressText.textContent = `Разворот ${currentSpread + 1} из ${spreads.length}`;
  progressBar.style.width = `${((currentSpread + 1) / spreads.length) * 100}%`;

  book.animate(
    [
      { opacity: .35, transform: 'perspective(1200px) rotateY(4deg)' },
      { opacity: 1, transform: 'perspective(1200px) rotateY(0deg)' }
    ],
    { duration: 420, easing: 'ease-out' }
  );
}

openBook.addEventListener('click', () => {
  intro.classList.add('hidden');
  reader.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderSpread();
});

backToCover.addEventListener('click', () => {
  reader.classList.add('hidden');
  intro.classList.remove('hidden');
});

toggleMap.addEventListener('click', () => mapPanel.classList.remove('hidden'));
closeMap.addEventListener('click', () => mapPanel.classList.add('hidden'));
mapPanel.addEventListener('click', (event) => {
  if (event.target === mapPanel) mapPanel.classList.add('hidden');
});

prevPage.addEventListener('click', () => {
  currentSpread = (currentSpread - 1 + spreads.length) % spreads.length;
  renderSpread();
});

nextPage.addEventListener('click', () => {
  currentSpread = (currentSpread + 1) % spreads.length;
  renderSpread();
});

for (let i = 1; i <= 12; i++) {
  const item = document.createElement('div');
  item.className = 'castle';
  item.innerHTML = `<strong>${String(i).padStart(2, '0')}</strong><span>Созвездие</span>`;
  castleGrid.appendChild(item);
}

// Lightweight star field
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.floor((innerWidth * innerHeight) / 9000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + .2,
    a: Math.random() * .65 + .2,
    s: Math.random() * .012 + .003
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const star of stars) {
    star.a += star.s;
    if (star.a > .95 || star.a < .2) star.s *= -1;
    ctx.beginPath();
    ctx.fillStyle = `rgba(238, 207, 132, ${star.a})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeStars);
resizeStars();
drawStars();
