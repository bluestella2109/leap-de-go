import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, set, update, get, onValue, onDisconnect, remove, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig={
  apiKey:"AIzaSyDcxnd5VFyucSbgSWY2tRzn97Jc8SAHniU",
  authDomain:"leap-de-go-online.firebaseapp.com",
  databaseURL:"https://leap-de-go-online-default-rtdb.firebaseio.com",
  projectId:"leap-de-go-online",
  storageBucket:"leap-de-go-online.firebasestorage.app",
  messagingSenderId:"762325082483",
  appId:"1:762325082483:web:9650963a37c685f6696506",
  measurementId:"G-WTSHVKW6CK"
};
const app=initializeApp(firebaseConfig); const auth=getAuth(app); const db=getDatabase(app);
let authPromise=null;
export function ensureAuth(){return authPromise ||= signInAnonymously(auth).then(c=>c.user);}
export {db,ref,set,update,get,onValue,onDisconnect,remove,push,serverTimestamp};
export const roomRef=code=>ref(db,`rooms/${code}`);
export const playerRef=(code,uid)=>ref(db,`rooms/${code}/players/${uid}`);
