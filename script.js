const status = document.getElementById('status');
function flash(text){
  status.textContent = text;
  status.animate(
    [{opacity:.45, transform:'translateX(-50%) translateY(4px)'},
     {opacity:1, transform:'translateX(-50%) translateY(0)'}],
    {duration:260, fill:'both'}
  );
}
document.getElementById('prev').addEventListener('click',()=>flash('Это первая сцена'));
document.getElementById('next').addEventListener('click',()=>flash('Следующая сцена ещё не добавлена'));

let startX = null;
document.getElementById('bookPage').addEventListener('pointerdown',e=>startX=e.clientX);
document.getElementById('bookPage').addEventListener('pointerup',e=>{
  if(startX===null) return;
  const dx=e.clientX-startX;
  if(dx<-55) flash('Следующая сцена ещё не добавлена');
  if(dx>55) flash('Это первая сцена');
  startX=null;
});
