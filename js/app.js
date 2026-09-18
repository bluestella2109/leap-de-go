import {loadWords} from "./sheets.js";
(async()=>{
  const el=document.querySelector("#wordCount");
  try{
    const words=await loadWords();
    if(el) el.textContent=`${words.length.toLocaleString()} WORDS LOADED`;
  }catch(e){
    if(el) el.textContent="DATA CONNECTION ERROR";
    console.error(e);
  }
})();