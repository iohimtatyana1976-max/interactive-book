const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const panel = $('#panel');
const menuBtn = $('#menuBtn');
const panelClose = $('#panelClose');
const toast = $('#toast');
const musicBtn = $('#musicBtn');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(()=>toast.classList.remove('show'), 1800);
}

function unavailable(){
  showToast('Следующая иллюстрация ещё не добавлена');
}

$('#nextBtn').addEventListener('click', unavailable);
$('#prevBtn').addEventListener('click', ()=>showToast('Это первая иллюстрация'));

$$('.dot').forEach((dot)=>{
  dot.addEventListener('click', ()=>{
    if(dot.dataset.page === '1') return;
    unavailable();
  });
});

menuBtn.addEventListener('click', ()=>{
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  menuBtn.setAttribute('aria-expanded','true');
});
panelClose.addEventListener('click', ()=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  menuBtn.setAttribute('aria-expanded','false');
});

$('#tocBtn').addEventListener('click', ()=>menuBtn.click());

$('#fullscreenBtn').addEventListener('click', async ()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){
    showToast('Полноэкранный режим недоступен');
  }
});

musicBtn.addEventListener('click', ()=>{
  const active = musicBtn.getAttribute('aria-pressed') === 'true';
  musicBtn.setAttribute('aria-pressed', String(!active));
  musicBtn.style.opacity = active ? '1' : '.6';
  showToast(active ? 'Музыка выключена' : 'Аудиофайл пока не добавлен');
});

let startX = null;
$('#book').addEventListener('pointerdown', e => startX = e.clientX);
$('#book').addEventListener('pointerup', e => {
  if(startX === null) return;
  const dx = e.clientX - startX;
  if(dx < -55) unavailable();
  if(dx > 55) showToast('Это первая иллюстрация');
  startX = null;
});

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') unavailable();
  if(e.key === 'ArrowLeft') showToast('Это первая иллюстрация');
  if(e.key === 'Escape') panelClose.click();
});
