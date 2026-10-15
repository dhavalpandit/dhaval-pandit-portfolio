const projects = {
  rfid:{index:'01',title:'RFID Gen2X',lead:'A real-time access control and asset checkpoint framework that joins RFID hardware, backend services, and a live operations dashboard.',stats:[['99.7%','READ ACCURACY'],['<250ms','RESPONSE'],['1,000+','DAILY ENTRIES']],problem:'Manual access checks were slow, inconsistent, and difficult to audit. Noisy reads and hardware variability made a dependable automated system harder than a simple scan-and-log workflow.',build:'Built an edge-friendly Python and Streamlit system with occupancy tracking, redundancy checks, text-to-speech feedback, local data persistence, and optional Flask API monitoring.',tech:'Python · Streamlit · Flask · RFID Gen2X · OpenCV · Pandas',url:'https://github.com/dhavalpandit/RFID-Gen2X-Use-Case-Development-Framework-An-Asset-and-Personnel-Checkpoint-System-Case-Study'},
  fleet:{index:'02',title:'FleetVision',lead:'A real-time computer vision system for vehicle tracking, speed estimation, and automated overspeed alerts across live camera feeds.',stats:[['95%+','ACCURACY'],['20+','LIVE FEEDS'],['−30%','FALSE POSITIVES']],problem:'High-volume traffic monitoring needs stable tracking under changing light, angles, and congestion. False alerts quickly make an otherwise accurate model operationally useless.',build:'Combined object detection, frame-to-frame tracking, calibrated speed estimation, and repeatable reporting in an OpenCV pipeline designed for real-world conditions.',tech:'Python · OpenCV · YOLO · CNN · Real-time pipelines',url:'https://github.com/dhavalpandit/FleetVision'},
  sentiment:{index:'03',title:'Market Signals',lead:'An evaluation of transformer architectures for financial sentiment classification using more than 6,000 market-related posts.',stats:[['89%','TOP ACCURACY'],['6K+','SAMPLES'],['4','MODELS']],problem:'Financial language is contextual, fast-moving, and often ambiguous. Generic sentiment systems miss domain-specific meaning and can be too heavy for responsive deployment.',build:'Fine-tuned and benchmarked FinBERT, DistilBERT, RoBERTa, and DistilRoBERTa across accuracy, inference speed, and model size to identify practical deployment tradeoffs.',tech:'Python · PyTorch · Hugging Face · FinBERT · scikit-learn',url:'https://github.com/dhavalpandit/stock-sentiment-transformers'},
  golden:{index:'04',title:'Golden Tiger',lead:'An AI-powered sales assistant designed to help agents understand leads, prioritize action, and spend more time closing.',stats:[['AI','ASSISTED'],['LIVE','INSIGHTS'],['LESS','BUSYWORK']],problem:'Sales teams lose time piecing together fragmented lead context and deciding what to do next, creating inconsistent follow-up and slower response.',build:'Designed an assistant workflow that surfaces intelligent lead insights, identifies intent, and turns context into clear next actions and automation.',tech:'Python · Applied AI · Data workflows · Automation',url:'https://github.com/dhavalpandit/Golden-Tiger'}
};

document.body.classList.add('loading');
const count = document.querySelector('.loader__count');
const bar = document.querySelector('.loader__track span');
let progress = 0;
const loaderTimer = setInterval(()=>{
  progress += Math.ceil((100-progress)*.14);
  if(progress>99) progress=100;
  count.textContent=String(progress).padStart(3,'0'); bar.style.width=progress+'%';
  if(progress===100){clearInterval(loaderTimer);setTimeout(()=>{document.querySelector('.loader').classList.add('done');document.body.classList.remove('loading');},350)}
},36);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
if(!reduced){
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-2}px,${my-2}px)`});
  const follow=()=>{rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;requestAnimationFrame(follow)};follow();
  document.querySelectorAll('a,button,.project').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))});
}

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const menuButton=document.querySelector('.menu-button'),mobileMenu=document.querySelector('.mobile-menu');
menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);mobileMenu.setAttribute('aria-hidden',!open)});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');mobileMenu.setAttribute('aria-hidden','true')}));

function updateTime(){document.querySelector('#local-time').textContent=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())}
updateTime();setInterval(updateTime,1000);document.querySelector('#year').textContent=new Date().getFullYear();

const visual=document.querySelector('.hero__visual');
if(!reduced){addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5)*12,y=(e.clientY/innerHeight-.5)*12;visual.style.transform=`translateY(-47%) translate(${x}px,${y}px)`})}

const canvas=document.querySelector('#signal-canvas'),ctx=canvas.getContext('2d');let cw,ch;
function sizeCanvas(){cw=canvas.width=innerWidth*devicePixelRatio;ch=canvas.height=canvas.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio)}sizeCanvas();addEventListener('resize',sizeCanvas);
let tick=0;function draw(){const w=innerWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(200,255,65,.11)';ctx.lineWidth=1;for(let j=0;j<5;j++){ctx.beginPath();for(let x=0;x<w;x+=8){const y=h*(.18+j*.17)+Math.sin(x*.008+tick*.012+j)*28+Math.sin(x*.002-tick*.007)*40;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke()}tick++;if(!reduced)requestAnimationFrame(draw)}draw();

document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});

const modal=document.querySelector('.case-modal');
function openProject(key){const p=projects[key];modal.querySelector('.modal-index span').textContent=p.index;modal.querySelector('h2').textContent=p.title;modal.querySelector('.modal-lead').textContent=p.lead;modal.querySelector('.modal-problem').textContent=p.problem;modal.querySelector('.modal-build').textContent=p.build;modal.querySelector('.modal-tech').textContent=p.tech;modal.querySelector('.modal-link').href=p.url;modal.querySelector('.modal-stats').innerHTML=p.stats.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');modal.showModal()}
document.querySelectorAll('.project').forEach(card=>{card.addEventListener('click',()=>openProject(card.dataset.project));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openProject(card.dataset.project)})});
modal.querySelector('.modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));button.classList.add('active');const f=button.dataset.filter;document.querySelectorAll('[data-category]').forEach(item=>item.classList.toggle('hidden',f!=='all'&&!item.dataset.category.includes(f)))}));
document.querySelector('.back-top').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

let lastY=0;addEventListener('scroll',()=>{const header=document.querySelector('.site-header');const y=scrollY;header.style.position=y>innerHeight*.7?'fixed':'absolute';header.style.background=y>innerHeight*.7?'rgba(9,11,13,.82)':'transparent';header.style.backdropFilter=y>innerHeight*.7?'blur(18px)':'none';header.style.transform=y>lastY&&y>innerHeight?'translateY(-100%)':'translateY(0)';header.style.transition='transform .35s, background .35s';lastY=y});
