/* ===== 測試用 SKIP 按鈕｜開關在 js/config.js 的 SHOW_SKIP ===== */
if(typeof SHOW_SKIP=='undefined'||SHOW_SKIP){const st=document.createElement('style');st.textContent='#tskip{position:fixed;left:14px;bottom:14px;z-index:99999;display:flex;align-items:stretch;height:38px;border-radius:99px;background:#C2473B;color:#fff;border:2px solid #fff;box-shadow:0 8px 20px rgba(0,0,0,.35);overflow:hidden}#tskip button{display:flex;align-items:center;gap:8px;padding:0 10px 0 12px;background:none;border:0;color:#fff;font:800 13px/1 "Archivo","Noto Sans TC",sans-serif;letter-spacing:.14em;cursor:pointer}#tskip button:hover{background:rgba(0,0,0,.16)}#tskip .x{padding:0 13px 0 11px;border-left:1px solid rgba(255,255,255,.45);font-size:15px;letter-spacing:0}#tskip small{font:700 9px/1 "Archivo",sans-serif;letter-spacing:.2em;background:#fff;color:#C2473B;padding:3px 6px;border-radius:6px}';document.head.append(st);
const bx=document.createElement('div');bx.id='tskip';bx.innerHTML='<button type="button" class="s"><small>TEST</small>SKIP ▸</button><button type="button" class="x" aria-label="關掉 SKIP 按鈕" title="關掉 SKIP（重新整理會再出現）">✕</button>';document.body.append(bx);
const bt=$('.s',bx);$('.x',bx).addEventListener('click',()=>{bx.remove();const o=$('#tskipT');if(o)o.remove()});
const say2=t=>{let o=$('#tskipT');if(!o){o=document.createElement('div');o.id='tskipT';o.style.cssText='position:fixed;left:14px;bottom:62px;z-index:99999;background:#22303a;color:#fff;padding:8px 14px;border-radius:12px;font:700 13px "Noto Sans TC",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.35)';document.body.append(o)}o.textContent=t;o.hidden=false;clearTimeout(o._t);o._t=setTimeout(()=>o.hidden=true,2200)},
rnd=a=>a[Math.random()*a.length|0],ck=el=>{if(el)el.click();return !!el};
let busy=0;
function auto(){if(busy)return;busy=1;const sp0=S.sp;S.sp=4;root.style.setProperty('--t',.25);let n=0;
const iv=setInterval(()=>{n++;if($('.fw')||$('.mm')||n>600){clearInterval(iv);busy=0;S.sp=sp0;root.style.setProperty('--t',1/(sp0||1));return}
const pm=$('.ptm');if(pm){ck($('[data-pt=x]',pm));return}
const pop=$('.pop');if(pop){const d=$('.ops.dn',pop);if(!d)ck(rnd($$('.opt',pop)));else{const c=$('[data-a=pclose]',pop);if(c&&!c.closest('[hidden]'))c.click()}return}
const lf=$('.leaf:not(.tear)');if(!lf)return;const ops=$('.ops',lf);if(ops&&!ops.classList.contains('dn')){const o=rnd($$('.opt',ops));ck(o);clearTimeout(S.at);tear(lf)}else if(!ops)tear(lf)},160)}
bt.addEventListener('click',()=>{
const fs=$('.fsv');if(fs){if(!$('[name=q1]:checked',fs))ck(rnd($$('[name=q1]',fs)));if(!$('[name=q2]:checked',fs))ck(rnd($$('[name=q2]',fs)));ck($('.rgo',fs));return}
const pm=$('.ptm');if(pm){ck($('[data-pt=x]',pm));return}
const fdm=$('.fdm');if(fdm){ck($('[data-fd=go]',fdm));return}
const rg=$('.rgm');if(rg){const v=(id,x)=>{const el=$('#'+id,rg);if(!el.value)el.value=x};v('rgn','測試');v('rga','10');$('#rgok',rg).checked=true;$('.rgo',rg).click();return}
const mm=$('.mm');
if(mm){const s=+mm.dataset.st;if(s==1)ck($('[data-m=dn]',mm));else if(s==2)ck($('[data-m=l3]',mm));else say2('已經是最後一頁了');return}
if($('.fw')){const f=$('.fw');if($('[data-f="1"]',f))ck($('[data-f="1"]',f));else if($('[data-f="2"]',f)){ck($('.fwa',f));ck($('[data-f="2"]',f))}else if($('[data-f="3"]',f)){ck($('.fwg',f));ck($('[data-f="3"]',f))}else ck($('[data-f="4"]',f));return}
if($('.rgm')){const g=$('.rgm');if(!$('#rgn',g).value)$('#rgn',g).value='測試';if(!$('#rga',g).value)$('#rga',g).value='12';$('#rgok',g).checked=true;ck($('.rgo',g));return}
if($('.nmd')){ck($('[data-a=nmgo]'));return}
if($('.intro')){say2('開場動畫播放中，結束後再按');return}
if($('.gm')||$('.leaf')){auto();say2('自動跑完 30 天…');return}
if($('.mtc')){ck($('[data-a=mgo]'));return}
if($('#cv')){S.step=0;S.pf={};S.ex=S.ex||[];setup();return}
const v=$$('[data-a=val]');if(v.length){ck(rnd(v));return}
if($('[data-a=go]:not(:disabled)')){ck($('[data-a=go]'));return}
const ex=$$('[data-a=ex]');if(ex.length){ex.slice(0,3).forEach(ck);ck($('[data-a=go]'));return}
say2('這個畫面沒有可跳的動作')});
}
/* ===== END TEMP SKIP ===== */
