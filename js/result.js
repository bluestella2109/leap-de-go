import {getData} from "./storage.js";
const d=getData();
document.querySelector("#totalPlay").textContent=d.totalPlay;
document.querySelector("#totalCorrect").textContent=d.totalCorrect;
document.querySelector("#accuracy").textContent=(d.totalAnswered?d.totalCorrect/d.totalAnswered*100:0).toFixed(1)+"%";
document.querySelector("#maxCombo").textContent=d.maxCombo;
const weak=Object.entries(d.words).filter(([,v])=>v.wrong>0).sort((a,b)=>(b[1].wrong-a[1].wrong)).slice(0,20);
document.querySelector("#weakCount").textContent=weak.length;
document.querySelector("#weakWords").innerHTML=weak.map(([word,v])=>`<div class="weak-item"><span>${word}</span><span>${v.correct} CORRECT / ${v.wrong} MISS</span></div>`).join("")||"<p>まだ苦手単語はありません。</p>";