const $=id=>document.getElementById(id);
const KEY='guild-countdown-settings-v1';
let timer;
function pad(n){return String(n).padStart(2,'0')}
function formatDate(value){if(!value)return '日時を設定してください';const d=new Date(value);return new Intl.DateTimeFormat('ja-JP',{dateStyle:'medium',timeStyle:'short'}).format(d)}
function render(){
  const title=$('eventTitle').value.trim()||'次のギルドイベント';
  const value=$('eventDate').value;
  $('eventTitleView').textContent=title;
  $('targetView').textContent=formatDate(value);
  if(!value){['days','hours','minutes','seconds'].forEach(id=>$(id).textContent='--');$('status').textContent='イベント日時を入力してください';return}
  const diff=new Date(value).getTime()-Date.now();
  if(diff<=0){$('days').textContent='00';$('hours').textContent='00';$('minutes').textContent='00';$('seconds').textContent='00';$('status').textContent='イベント開始時刻です！';return}
  const total=Math.floor(diff/1000),days=Math.floor(total/86400),hours=Math.floor(total%86400/3600),minutes=Math.floor(total%3600/60),seconds=total%60;
  $('days').textContent=days;$('hours').textContent=pad(hours);$('minutes').textContent=pad(minutes);$('seconds').textContent=pad(seconds);
  $('status').textContent='イベント開始まで';
}
function save(){localStorage.setItem(KEY,JSON.stringify({title:$('eventTitle').value,date:$('eventDate').value}));render()}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');$('eventTitle').value=x.title||'';$('eventDate').value=x.date||''}catch{}render()}
$('saveBtn').addEventListener('click',save);
$('resetBtn').addEventListener('click',()=>{localStorage.removeItem(KEY);$('eventTitle').value='';$('eventDate').value='';render()});
$('eventTitle').addEventListener('input',render);$('eventDate').addEventListener('input',render);
document.querySelectorAll('[data-minutes]').forEach(btn=>btn.addEventListener('click',()=>{const d=new Date(Date.now()+Number(btn.dataset.minutes)*60000);const offset=d.getTimezoneOffset();const local=new Date(d.getTime()-offset*60000);$('eventDate').value=local.toISOString().slice(0,16);if(!$('eventTitle').value.trim())$('eventTitle').value='ギルドイベント';save()}));
load();timer=setInterval(render,1000);
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
