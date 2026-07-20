
const hero=document.getElementById('hero');
const reader=document.getElementById('reader');
const book=document.getElementById('book');
const openButton=document.getElementById('openBook');
const closeButton=document.getElementById('closeBook');

function openBook(){
  if(hero.classList.contains('opening')) return;
  hero.classList.add('opening');
  setTimeout(()=>{
    reader.classList.add('show');
    reader.setAttribute('aria-hidden','false');
    hero.classList.remove('opening');
  },1250);
}
function closeBook(){
  reader.classList.remove('show');
  reader.setAttribute('aria-hidden','true');
}
openButton.addEventListener('click',openBook);
book.addEventListener('click',openBook);
book.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();openBook();}
});
closeButton.addEventListener('click',closeBook);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBook()});

document.addEventListener('pointermove',e=>{
  if(innerWidth<980||hero.classList.contains('opening')) return;
  const x=(e.clientX/innerWidth-.5)*2;
  const y=(e.clientY/innerHeight-.5)*2;
  book.style.transform=`translateY(-4vh) rotateY(${-8+x*3.2}deg) rotateX(${1.5-y*2.2}deg)`;
});
document.addEventListener('pointerleave',()=>book.style.removeProperty('transform'));
