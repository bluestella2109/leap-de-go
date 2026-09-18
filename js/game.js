import {loadWords} from "./sheets.js";
import {record,updateMaxCombo} from "./storage.js";

const params=new URLSearchParams(location.search);
let selectedMode=params.get("mode")||"meaning";
let words=[],current=null,index=0,score=0,combo=0,maxCombo=0,correct=0;
let timer=null,startedAt=0,paused=false;
const TOTAL=10, LIMIT=10;

const $=s=>document.querySelector(s);
const scoreEl=$("#score"),comboEl=$("#combo"),qNow=$("#qNow"),qTotal=$("#qTotal"),timeBar=$("#timeBar"),timeText=$("#timeText"),area=$("#questionArea"),answer=$("#answerArea"),feedback=$("#feedback"),label=$("#modeLabel");

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function modeName(m){return m==="meaning"?"MODE 01 / MEANING → WORD":m==="example"?"MODE 02 / EXAMPLE → WORD":"MODE 03 / WORD → 4 CHOICE"}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}

async function init(){
  qTotal.textContent=TOTAL;
  try{words=await loadWords()}catch(e){area.innerHTML="<div class='question-main'>DATA ERROR</div>";return}
  if(words.length<4){area.innerHTML="<div class='question-main'>単語データが4語以上必要です。</div>";return}
  startQuestion();
  createRain();
}
function startQuestion(){
  if(index>=TOTAL){finish();return}
  if(selectedMode==="mix") selectedMode=shuffle(["meaning","example","choice"])[0];
  current=words[Math.floor(Math.random()*words.length)];
  qNow.textContent=String(index+1).padStart(2,"0");
  label.textContent=modeName(selectedMode);
  renderQuestion();
  startedAt=performance.now();
  startTimer();
}
function renderQuestion(){
  answer.innerHTML="";
  if(selectedMode==="meaning"){
    area.innerHTML=`<div class="question-main">${escapeHtml(current.meaning||"意味データなし")}</div>`;
    answer.innerHTML=`<input id="answerInput" class="answer-input" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="英単語を入力">`;
    bindInput();
  }else if(selectedMode==="example"){
    const ex=current.example||"";
    const blanked=ex.replace(new RegExp(current.word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),"___");
    area.innerHTML=`<div class="question-main question-example">${escapeHtml(blanked).replace("___","<span class='blank'>＿＿＿＿</span>")}</div>`;
    answer.innerHTML=`<input id="answerInput" class="answer-input" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="空欄に入る英単語を入力">`;
    bindInput();
  }else{
    area.innerHTML=`<div class="question-main">${escapeHtml(current.word)}</div>`;
    const others=shuffle(words.filter(w=>w.id!==current.id)).slice(0,3);
    const choices=shuffle([current,...others]);
    answer.innerHTML=`<div class="choice-grid">${choices.map((w,i)=>`<button class="choice-button" data-word="${escapeHtml(w.word)}"><span class="choice-no">${i+1}</span><span>${escapeHtml(w.meaning||"")}</span></button>`).join("")}</div>`;
    document.querySelectorAll(".choice-button").forEach((b,i)=>b.addEventListener("click",()=>submit(b.dataset.word)));
    document.onkeydown=e=>{if(["1","2","3","4"].includes(e.key))document.querySelectorAll(".choice-button")[Number(e.key)-1]?.click()};
  }
}
function bindInput(){
  const input=$("#answerInput");input.focus();
  input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submit(input.value)}});
}
function startTimer(){
  clearInterval(timer);timeBar.style.width="100%";
  timer=setInterval(()=>{
    if(paused)return;
    const elapsed=(performance.now()-startedAt)/1000, left=Math.max(0,LIMIT-elapsed);
    timeText.textContent=left.toFixed(2);timeBar.style.width=`${left/LIMIT*100}%`;
    if(left<=0){clearInterval(timer);submit("")}
  },30);
}
function submit(value){
  if(paused)return;
  clearInterval(timer);
  const normalized=String(value||"").trim().toLowerCase();
  const isCorrect=normalized===current.word.trim().toLowerCase();
  const elapsed=(performance.now()-startedAt)/1000;
  record(current.word,isCorrect,elapsed);
  if(isCorrect){
    correct++;combo++;maxCombo=Math.max(maxCombo,combo);
    const points=Math.round(100+Math.max(0,LIMIT-elapsed)*15+combo*12);
    score+=points;feedback.textContent=elapsed<2.5?"PERFECT":"CORRECT";feedback.className="feedback show correct";
  }else{
    combo=0;feedback.textContent="MISS";feedback.className="feedback show miss";
  }
  scoreEl.textContent=String(score).padStart(6,"0");comboEl.textContent=`×${combo}`;
  updateMaxCombo(maxCombo);
  setTimeout(()=>{feedback.className="feedback";index++;startQuestion()},650);
}
function finish(){
  clearInterval(timer);
  localStorage.setItem("leapLastResult",JSON.stringify({score,correct,total:TOTAL,maxCombo,mode:params.get("mode")||"meaning"}));
  location.href="result.html";
}
function createRain(){
  const rain=$("#rain");
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for(let i=0;i<55;i++){
    const el=document.createElement("span");el.className="rain-char";
    el.textContent=chars[Math.floor(Math.random()*chars.length)];
    el.style.left=Math.random()*100+"%";el.style.animationDuration=(5+Math.random()*9)+"s";el.style.animationDelay=(-Math.random()*10)+"s";el.style.fontSize=(8+Math.random()*7)+"px";
    rain.appendChild(el);
  }
}
$("#pauseBtn").onclick=()=>{paused=true;$("#pauseModal").classList.remove("hidden")};
$("#resumeBtn").onclick=()=>{paused=false;$("#pauseModal").classList.add("hidden");startedAt=performance.now()};
document.addEventListener("visibilitychange",()=>{if(document.hidden&&!paused){paused=true;$("#pauseModal").classList.remove("hidden")}});
init();