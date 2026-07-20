
const canvas=document.getElementById('stars');
const ctx=canvas.getContext('2d');
let stars=[],meteors=[];

function resize(){
  const d=Math.min(devicePixelRatio||1,2);
  canvas.width=innerWidth*d;
  canvas.height=innerHeight*d;
  canvas.style.width=innerWidth+'px';
  canvas.style.height=innerHeight+'px';
  ctx.setTransform(d,0,0,d,0,0);
  stars=Array.from({length:Math.min(360,Math.floor(innerWidth*innerHeight/3600))},()=>({
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,
    r:Math.random()*1.35+.18,
    a:Math.random()*.72+.12,
    p:Math.random()*Math.PI*2,
    v:Math.random()*.004+.0018
  }));
}

function animate(t=0){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    ctx.beginPath();
    ctx.fillStyle=`rgba(248,225,164,${Math.max(.05,s.a+Math.sin(t*s.v+s.p)*.2)})`;
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  }
  if(Math.random()<.0035){
    meteors.push({x:Math.random()*innerWidth*.72,y:Math.random()*innerHeight*.28,l:90+Math.random()*140,a:1});
  }
  meteors=meteors.filter(m=>m.a>0);
  for(const m of meteors){
    const g=ctx.createLinearGradient(m.x,m.y,m.x+m.l,m.y+m.l*.42);
    g.addColorStop(0,`rgba(255,241,192,${m.a})`);
    g.addColorStop(1,'rgba(255,241,192,0)');
    ctx.strokeStyle=g;
    ctx.beginPath();
    ctx.moveTo(m.x,m.y);
    ctx.lineTo(m.x+m.l,m.y+m.l*.42);
    ctx.stroke();
    m.x+=3.5;m.y+=1.48;m.a-=.017;
  }
  requestAnimationFrame(animate);
}
addEventListener('resize',resize);
resize();
requestAnimationFrame(animate);

const dust=document.getElementById('dust');
for(let i=0;i<52;i++){
  const p=document.createElement('i');
  p.style.left=(Math.random()*100)+'%';
  p.style.top=(63+Math.random()*48)+'%';
  p.style.animationDuration=(10+Math.random()*19)+'s';
  p.style.animationDelay=(-Math.random()*24)+'s';
  const size=1+Math.random()*3.2;
  p.style.width=p.style.height=size+'px';
  dust.appendChild(p);
}
