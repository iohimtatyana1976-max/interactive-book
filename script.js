const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
const hero = document.getElementById("hero");
const reader = document.getElementById("reader");
const openButton = document.getElementById("openBook");
const bookWrap = document.getElementById("bookWrap");
const closeReader = document.getElementById("closeReader");
const soundToggle = document.getElementById("soundToggle");

let stars = [];
let meteors = [];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(320, Math.floor(innerWidth * innerHeight / 4200));
  stars = Array.from({length: count}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.25 + .18,
    a: Math.random() * .72 + .15,
    s: Math.random() * .005 + .0018,
    p: Math.random() * Math.PI * 2
  }));
}

function maybeMeteor() {
  if (document.hidden || Math.random() > .0045) return;
  meteors.push({
    x: Math.random() * innerWidth * .72,
    y: Math.random() * innerHeight * .32,
    len: 100 + Math.random() * 120,
    life: 1
  });
}

function draw(t = 0) {
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for (const st of stars) {
    const twinkle = Math.sin(t * st.s + st.p) * .2;
    ctx.beginPath();
    ctx.fillStyle = `rgba(248,225,164,${Math.max(.06, st.a + twinkle)})`;
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();
  }

  maybeMeteor();
  meteors = meteors.filter(m => m.life > 0);
  for (const m of meteors) {
    const g = ctx.createLinearGradient(m.x,m.y,m.x+m.len,m.y+m.len*.42);
    g.addColorStop(0,`rgba(255,241,192,${m.life})`);
    g.addColorStop(1,"rgba(255,241,192,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(m.x,m.y);
    ctx.lineTo(m.x+m.len,m.y+m.len*.42);
    ctx.stroke();
    m.x += 3.5; m.y += 1.45; m.life -= .017;
  }

  requestAnimationFrame(draw);
}

function openReader() {
  hero.classList.add("leaving");
  setTimeout(() => {
    reader.classList.add("visible");
    reader.setAttribute("aria-hidden","false");
  }, 560);
}

function closeBook() {
  reader.classList.remove("visible");
  reader.setAttribute("aria-hidden","true");
  setTimeout(() => hero.classList.remove("leaving"), 330);
}

openButton.addEventListener("click", openReader);
bookWrap.addEventListener("click", openReader);
bookWrap.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") openReader();
});
closeReader.addEventListener("click", closeBook);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && reader.classList.contains("visible")) closeBook();
});

document.addEventListener("pointermove", e => {
  if (innerWidth <= 900 || hero.classList.contains("leaving")) return;
  const x = (e.clientX / innerWidth - .5) * 2;
  const y = (e.clientY / innerHeight - .5) * 2;
  bookWrap.style.transform = `translateY(-2px) rotateY(${-9 + x * 3.2}deg) rotateX(${2 - y * 2.3}deg)`;
});
document.addEventListener("pointerleave", () => bookWrap.style.removeProperty("transform"));

soundToggle.addEventListener("click", () => {
  const on = soundToggle.getAttribute("aria-pressed") === "true";
  soundToggle.setAttribute("aria-pressed", String(!on));
  soundToggle.querySelector("span:last-child").textContent = on ? "Звук: выкл." : "Звук будет добавлен";
});

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(draw);
