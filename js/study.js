import {loadWords} from "./sheets.js";
let words=[];
const list=document.querySelector("#wordList"),search=document.querySelector("#search");
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
function render(data){list.innerHTML=data.map(w=>`<article class="word-card"><h2>${esc(w.word)}</h2><div class="meaning">${esc(w.meaning)}</div><p class="example">${esc(w.example)}</p><p class="example-meaning">${esc(w.exampleMeaning)}</p><div class="point">${esc(w.point||"覚えるポイントは未登録です。")}</div></article>`).join("")||"<p>該当する単語がありません。</p>"}
(async()=>{try{words=await loadWords();render(words)}catch(e){list.innerHTML="<p>Google Sheetsからデータを取得できませんでした。</p>"}})();
search.addEventListener("input",()=>{const q=search.value.toLowerCase();render(words.filter(w=>`${w.word} ${w.meaning} ${w.example}`.toLowerCase().includes(q)))});
document.querySelector("#shuffle").onclick=()=>render(words.sort(()=>Math.random()-.5));