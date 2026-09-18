const KEY="leapGoPlayerData";
const initial={totalPlay:0,totalCorrect:0,totalAnswered:0,maxCombo:0,words:{}};
export function getData(){try{return {...initial,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...initial}}}
export function saveData(d){localStorage.setItem(KEY,JSON.stringify(d))}
export function record(word,correct,time=0){
  const d=getData(); d.totalPlay++; d.totalAnswered++;
  if(correct)d.totalCorrect++;
  d.words[word]=d.words[word]||{correct:0,wrong:0,last:0,totalTime:0};
  d.words[word][correct?"correct":"wrong"]++;
  d.words[word].last=Date.now(); d.words[word].totalTime+=time;
  saveData(d); return d;
}
export function updateMaxCombo(combo){const d=getData();if(combo>d.maxCombo)d.maxCombo=combo;saveData(d)}