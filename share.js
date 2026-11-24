/* ===== 帶走這份紀錄：個人 QR 碼＋成果小卡預覽（畫圖在 card.js，QR 在 qr.js） ===== */
function shareData(){
  const H=S.hist||[],cd=S.cd||{},good=H.filter(h=>h.o.fx.health>=4),from=good.length?good:H;
  if(S._ch!==H){S._ch=H;S._cp=from[Math.floor(Math.random()*from.length)]||null}
  const p=S._cp,idx=k=>Math.max(0,CARD.BREEDS.findIndex(b=>b[0]==k)),rb=cd.rb||S.b;
  return{name:[...String(S.name||'小白')].slice(0,8).join(''),b:idx(S.b),spent:S.spent||0,h:S.health||0,m:S.happy||0,t:S.trust||0,
    r:(cd.r||[50,50,50,50,50,50]).map(v=>v<0?50:v),type:Math.max(0,cd.gi||0),rec:idx(rb),fit:fit(rb).pct,
    ev:p?D.q.indexOf(p.e):-1,day:p?p.d:1,scene:Math.max(0,CARD.SCENES.indexOf(p?SCN[p.e.id]||'home':'home')),
    msg:[...String(S.fwMsg||'謝謝你，來到我的生命裡')].slice(0,40).join('')}}

/* 手機掃描後要開的網址。回傳 null＝目前的開啟方式手機連不到 */
async function cardBase(){
  if(typeof SITE_URL=='string'&&SITE_URL)return{url:SITE_URL.replace(/\/?$/,'/')};
  if(location.protocol=='file:')return null;
  const dir=location.pathname.replace(/[^/]*$/,'');
  if(/^(localhost|127\.|\[::1\])/.test(location.hostname)){
    const j=await fetch('/__lan').then(r=>r.ok?r.json():null).catch(()=>null);
    return j&&j.lan?{url:j.lan+dir,lan:1}:null}
  return{url:location.origin+dir,lan:location.protocol=='http:'}}
/* openExternalBrowser：從 LINE 掃描時改用手機瀏覽器開，才能下載 */
const cardUrl=(base,o)=>base+'card.html?openExternalBrowser=1#'+CARD.encode(o);

function qrMount(m){
  const o=m._qa=shareData(),hint=$('#qhint',m),qb=$('#qrbox',m),prev=$('#rcw',m);
  const card=()=>m._qc||(m._qc=CARD.draw(o));
  cardBase().then(b=>{
    if(!b){qb.classList.add('off');qb.innerHTML='<p>目前的開啟方式，手機連不到這台電腦。<br>請改用資料夾裡的「啟動網頁.bat」開啟，<br>或把網頁放到網路上。</p>';hint.textContent='仍可用下方按鈕，把小卡存在這台裝置。';return}
    const u=cardUrl(b.url,o),cv=QR.canvas(u,560);cv.setAttribute('role','img');cv.setAttribute('aria-label',o.name+' 的成果小卡 QR 碼');m._url=u;qb.replaceChildren(cv);
    hint.textContent=b.lan?'手機請先連上和這台電腦相同的 Wi-Fi，再掃描。':'這是你的專屬 QR 碼，掃描後可下載成果小卡。';
  }).catch(e=>{console.error(e);qb.textContent='QR 碼製作失敗，請重新整理'});
  const show=()=>{if(m._rd)return;m._rd=1;card().then(cv=>{const im=new Image();im.alt=o.name+' 的成果小卡';im.src=cv.toDataURL('image/png');prev.replaceChildren(im)}).catch(e=>{console.error(e);m._rd=0;m._qc=null;prev.innerHTML='<span class="rcph">小卡製作失敗，請重新整理再試</span>'})};
  const sec=$('.rcs',m);
  if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();show()}},{root:m,rootMargin:'300px'});io.observe(sec)}else show();
  m.addEventListener('click',async e=>{const t=e.target.closest('[data-qv]');if(!t)return;t.disabled=true;
    try{await CARD.savePng(await card(),o);hint.textContent='已存到這台裝置的「下載」資料夾。'}catch(er){console.error(er);hint.textContent='製作圖片時出了問題，請再試一次。'}t.disabled=false})}
