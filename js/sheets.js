const PUBLISHED_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpVxxNOK5pVkNNVpTsDBAyzHpqssOUL9WtTQdU8iZvWqq-_h6U8OkRkdy5ONDHlxWtyxFGa2Cvxu-/pub?output=csv";

function parseCSV(text){
  const rows=[]; let row=[], cell="", quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c === '"' && quoted && n === '"'){cell+='"'; i++; continue}
    if(c === '"'){quoted=!quoted; continue}
    if(c === ',' && !quoted){row.push(cell); cell=""; continue}
    if((c === '\n' || c === '\r') && !quoted){
      if(c === '\r' && n === '\n') i++;
      row.push(cell); cell="";
      if(row.some(v=>v.trim()!=="")) rows.push(row);
      row=[]; continue;
    }
    cell+=c;
  }
  row.push(cell); if(row.some(v=>v.trim()!=="")) rows.push(row);
  return rows;
}
export async function loadWords(){
  const res=await fetch(PUBLISHED_CSV+"&cache="+Date.now(),{cache:"no-store"});
  if(!res.ok) throw new Error("Google Sheets data could not be loaded.");
  const rows=parseCSV(await res.text());
  if(rows.length<2) return [];
  const h=rows[0].map(x=>x.trim());
  const idx=(names)=>names.map(n=>h.indexOf(n)).find(i=>i>=0);
  const columns={
    id:idx(["ID","id"]),
    word:idx(["英単語","Word","word"]),
    meaning:idx(["意味","Meaning","meaning"]),
    example:idx(["例文","Example","example"]),
    exampleMeaning:idx(["例文の意味","ExampleMeaning","exampleMeaning"]),
    point:idx(["覚えるポイント","Point","point"]),
    difficulty:idx(["難易度","Difficulty","difficulty"])
  };
  return rows.slice(1).map((r,i)=>({
    id:r[columns.id]||String(i+1).padStart(3,"0"),
    word:(r[columns.word]||"").trim(),
    meaning:(r[columns.meaning]||"").trim(),
    example:(r[columns.example]||"").trim(),
    exampleMeaning:(r[columns.exampleMeaning]||"").trim(),
    point:(r[columns.point]||"").trim(),
    difficulty:Number(r[columns.difficulty]||2)
  })).filter(x=>x.word);
}
export {PUBLISHED_CSV};