let DATA={schedule:[],notices:[],lessons:[]}, gradeFilter='All', learnFilter='All', currentLesson=null;
const $=s=>document.querySelector(s);
const done=()=>JSON.parse(localStorage.getItem('doneLessons')||'[]');
async function load(){
  try{ const [s,n,l]=await Promise.all(['data/schedule.json','data/notices.json','data/lessons.json'].map(u=>fetch(u).then(r=>r.json()))); DATA={schedule:s,notices:n,lessons:l}; }
  catch(e){ $('#homeNotice').innerHTML='<div class="card">Could not load data. Check your connection.</div>'; return; }
  render();
}
function notExpired(n){ return !n.expires || n.expires>=new Date().toISOString().slice(0,10); }
function noticeCard(n){ return `<div class="card"><span class="tag ${n.priority==='important'?'important':''}">${n.priority==='important'?'Important':'Notice'}</span><h3>${n.title}</h3><p class="muted">${n.date}</p><p>${n.body}</p></div>`; }
function schedCard(s){ return `<div class="card"><span class="tag">${s.grade}</span><h3>${s.subject}</h3><p>🗓️ ${s.day} · ${s.time}<br>👤 ${s.teacher} · 📍 ${s.venue}</p></div>`; }
function lessonCard(l){ const d=done().includes(l.id)?'<span class="done-badge">✅</span>':''; return `<div class="card clickable" onclick="openLesson('${l.id}')">${d}<span class="tag">${l.grade} · ${l.subject}</span><h3>${l.title}</h3></div>`; }
function chips(el,items,active,fn){ $(el).innerHTML=items.map(i=>`<button class="${i===active?'active':''}" onclick="${fn}('${i}')">${i}</button>`).join(''); }
window.setGrade=g=>{gradeFilter=g;render();}; window.setLearn=g=>{learnFilter=g;render();};
function render(){
  const notices=DATA.notices.filter(notExpired).sort((a,b)=>(b.priority==='important')-(a.priority==='important')||b.date.localeCompare(a.date));
  $('#homeNotice').innerHTML=notices.length?noticeCard(notices[0]):'<div class="card empty">No notices yet.</div>';
  $('#noticeList').innerHTML=notices.length?notices.map(noticeCard).join(''):'<div class="card empty">No notices yet.</div>';
  $('#homeSchedule').innerHTML=DATA.schedule.map(schedCard).join('');
  const grades=['All',...new Set(DATA.schedule.map(s=>s.grade))];
  chips('#gradeChips',grades,gradeFilter,'setGrade');
  $('#scheduleList').innerHTML=DATA.schedule.filter(s=>gradeFilter==='All'||s.grade===gradeFilter).map(schedCard).join('')||'<div class="card empty">No classes.</div>';
  const lgrades=['All',...new Set(DATA.lessons.map(l=>l.grade))];
  chips('#learnChips',lgrades,learnFilter,'setLearn');
  const lessons=[...DATA.lessons].sort((a,b)=>a.order-b.order).filter(l=>learnFilter==='All'||l.grade===learnFilter||l.grade==='All');
  $('#lessonList').innerHTML=lessons.map(lessonCard).join('');
  $('#homeLessons').innerHTML=[...DATA.lessons].sort((a,b)=>a.order-b.order).slice(0,3).map(lessonCard).join('');
}
window.openLesson=id=>{
  currentLesson=DATA.lessons.find(l=>l.id===id); if(!currentLesson) return;
  $('#lessonBody').innerHTML=`<span class="tag">${currentLesson.grade} · ${currentLesson.subject}</span><h1>${currentLesson.title}</h1>${currentLesson.body}`;
  $('#doneCheck').checked=done().includes(id); show('lesson');
};
$('#doneCheck').addEventListener('change',e=>{
  let d=done(); d=e.target.checked?[...new Set([...d,currentLesson.id])]:d.filter(x=>x!==currentLesson.id);
  localStorage.setItem('doneLessons',JSON.stringify(d)); render();
});
window.show=name=>{
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('active',b.dataset.go===name));
  window.scrollTo(0,0);
};
document.querySelectorAll('.tabbar button').forEach(b=>b.onclick=()=>show(b.dataset.go));
// PWA install
let deferred; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;$('#installBtn').hidden=false;});
$('#installBtn').onclick=async()=>{ if(deferred){deferred.prompt(); await deferred.userChoice; $('#installBtn').hidden=true; deferred=null;} };
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
load();
