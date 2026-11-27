/* ===== 成果小卡：資料編碼、畫圖、下載 =====
   電腦上的成果頁（index.html）和手機掃描後的頁面（card.html）共用這一支。
   需要先載入 assets.js（場景路徑）與 data.js（事件標題）。 */
const CARD=(()=>{
const BREEDS=[['柴犬','Shiba Inu','shiba'],['柯基犬','Corgi','corgi'],['博美犬','Pomeranian','pom'],['貴賓犬','Poodle','poodle'],['馬爾濟斯','Maltese','maltese'],['黃金獵犬','Golden Retriever','golden'],['哈士奇','Siberian Husky','husky'],['米克斯','Mixed Breed','mutt']];
const SCENES=['home','park','play','clinic','bath','dine'];
const TYPES=['運動陪伴型飼主','訓練規律型飼主','毛髮清潔型飼主','細心觀察型飼主'];
const AXES=['飲食','清潔','運動','情感','訓練','醫療'];
const POSE={home:'sleep',dine:'sleep',bath:'happy',clinic:'sit',park:'jump',play:'jump'};

/* ---------- 編碼：整份成果放進網址 # 後面，不上傳到任何地方 ---------- */
const by=v=>Math.max(0,Math.min(255,Math.round(v)||0));
function encode(o){
  const te=new TextEncoder(),nm=te.encode(o.name),ms=te.encode(o.msg),sp=Math.max(0,Math.min(16777215,Math.round(o.spent)||0));
  const a=[2,by(o.b),sp>>16,sp>>8&255,sp&255,by(o.h),by(o.m),by(o.t),...o.r.map(by),by(o.type),by(o.rec),by(o.fit),by(o.ev<0?255:o.ev),by(o.day),by(o.scene),nm.length,...nm,...ms];
  return btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function decode(s){try{
  const a=Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)),td=new TextDecoder();
  if(a[0]!=2||a.length<21)return null;const n=a[20];
  const o={b:a[1],spent:a[2]<<16|a[3]<<8|a[4],h:a[5],m:a[6],t:a[7],r:[...a.slice(8,14)],type:a[14],rec:a[15],fit:a[16],ev:a[17]==255?-1:a[17],day:a[18],scene:a[19],name:td.decode(a.slice(21,21+n)),msg:td.decode(a.slice(21+n))};
  return BREEDS[o.b]&&BREEDS[o.rec]?o:null}catch(e){return null}}

/* ---------- 圖片 ---------- */
/* 直接雙擊開啟（file://）時，外部圖片不能畫進可下載的 canvas，改讀 js/card-inline.js 的內嵌版 */
let inlineP=null;
const inline=()=>location.protocol!='file:'?Promise.resolve({}):inlineP||(inlineP=new Promise(r=>{const s=document.createElement('script');s.src='js/card-inline.js';s.onload=()=>r(window.CARD_INLINE||{});s.onerror=()=>r({});document.head.append(s)}));
const load=async src=>{const m=await inline();return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=m[src]||src})};
const dogSrc=(k,p)=>`assets/card/${k}-${p}.webp`;

/* ---------- 畫卡片 ---------- */
const W=618,H=1092,MX=14,MY=14,CW=590,CH=1064,K=2;
const F='"Chiron GoRound TC","Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif',HW='"Iansui","Chiron GoRound TC","Noto Sans TC",sans-serif';
const C={ink:'#5B3826',ink2:'#7A573F',br:'#94603F',tan:'#C79364',ol:'#7F8A54',ol2:'#C9C9A2',sage:'#DFDCBF',cream:'#FEF6EB',peach:'#F9E6CC',peach2:'#F6DCBB'};

async function draw(o){
  const [bn,ben,bk]=BREEDS[o.b],rn=BREEDS[o.rec][0],scn=SCENES[o.scene]||'home';
  const ev=o.ev>=0&&typeof D!='undefined'?D.q[o.ev]:null,evT=ev?ev.title:'';
  const txt='毛²評估所我的陪伴紀錄狗檔案天數模擬花費健康心情羈絆飼主理想照顧選擇最適合你的風格推薦犬種契度六大面向表現們念這，一起經歷了從第次迎接、日常到過不同生活事件每段都是值得珍藏回憶。想對說話成為位好理解與準備開始累計（）！…'+AXES.join('')+TYPES.join('')+bn+rn+o.name+evT;
  const fl=[['900 20px',F,txt],['700 20px',F,txt],['500 20px',F,txt],['400 20px',HW,o.msg]].map(([w,f,t])=>document.fonts.load(`${w} ${f.split(',')[0]}`,t));
  await Promise.race([Promise.all(fl).catch(()=>{}),new Promise(r=>setTimeout(r,5000))]);
  /* 標準字只在網頁伺服器上用（file:// 沒有內嵌版，畫進去會讓圖片無法下載），讀不到就改用文字 */
  const [hero,run,mem,logo]=await Promise.all([load(dogSrc(bk,'sit')),load(dogSrc(bk,'jump')),load(dogSrc(bk,'happy')),location.protocol=='file:'||typeof A=='undefined'?null:load(A.logo)]);

  const cv=document.createElement('canvas');cv.width=W*K;cv.height=H*K;const c=cv.getContext('2d');c.scale(K,K);
  /* 小工具 */
  const rr=(x,y,w,h,r)=>{r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
  const box=(x,y,w,h,r,fill,st,lw)=>{rr(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(st){c.strokeStyle=st;c.lineWidth=lw||1;c.stroke()}};
  const font=(s,w,f)=>c.font=`${w||500} ${s}px ${f||F}`;
  const sp=v=>{try{c.letterSpacing=v+'px'}catch(e){}};
  const T=(t,x,y,s,col,w,al,f,ls)=>{font(s,w,f);c.fillStyle=col;c.textAlign=al||'left';c.textBaseline='middle';sp(ls||0);c.fillText(t,x,y);sp(0)};
  const tw=(t,s,w,f)=>{font(s,w,f);return c.measureText(t).width};
  const fitT=(t,x,y,mw,s,col,w,al,f)=>{while(tw(t,s,w,f)>mw&&s>9)s-=.5;T(t,x,y,s,col,w,al,f);return s};
  const lines=(t,s,w,f,mw)=>{font(s,w,f);const L=[];let cur='';for(const ch of t){if(c.measureText(cur+ch).width>mw&&!'，。、！？」…♡'.includes(ch)){L.push(cur);cur=ch}else cur+=ch}L.push(cur);return L};
  const heart=(x,y,s,col)=>{c.beginPath();c.moveTo(x,y+s*.9);c.bezierCurveTo(x-s*1.5,y-s*.1,x-s*.85,y-s*1.1,x,y-s*.35);c.bezierCurveTo(x+s*.85,y-s*1.1,x+s*1.5,y-s*.1,x,y+s*.9);c.fillStyle=col;c.fill()};
  const contain=(i,x,y,w,h,flip)=>{if(!i)return;const s=Math.min(w/i.naturalWidth,h/i.naturalHeight),dw=i.naturalWidth*s,dh=i.naturalHeight*s;c.save();if(flip){c.translate(x+w/2,0);c.scale(-1,1);c.translate(-(x+w/2),0)}c.drawImage(i,x+(w-dw)/2,y+h-dh,dw,dh);c.restore()};
  const poly=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill()};
  const dot=(x,y,r,col)=>{c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,7);c.fill()};
  /* 標準字：灰黑原色疊一層咖啡色，跟版面同色系 */
  const mark=(x,y,h,al)=>{
    if(!logo){T('毛²評估所',x,y+h/2,h*.72,C.ink,900,al);return}
    const w=h*logo.naturalWidth/logo.naturalHeight,o2=document.createElement('canvas');o2.width=Math.ceil(w*K);o2.height=Math.ceil(h*K);
    const g2=o2.getContext('2d');g2.drawImage(logo,0,0,o2.width,o2.height);g2.globalCompositeOperation='source-atop';g2.fillStyle='rgba(91,56,38,.6)';g2.fillRect(0,0,o2.width,o2.height);
    c.drawImage(o2,al=='center'?x-w/2:x,y,w,h)};
  /* 葉子：兩片色塊拼成一片，跟狗狗插畫的切面風格一致 */
  const leaf=(x,y,len,wd,ro)=>{c.save();c.translate(x,y);c.rotate(ro);
    c.fillStyle='#9C9C6B';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-wd,-len*.45,0,-len);c.lineTo(0,0);c.fill();
    c.fillStyle='#868858';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(wd,-len*.5,0,-len);c.lineTo(0,0);c.fill();c.restore()};
  const sprig=(x,y,f)=>{c.save();c.translate(x,y);c.scale(f,1);leaf(0,0,34,10,-.08);leaf(-2,-4,26,8,-.9);leaf(2,-10,24,8,.75);leaf(-1,-16,20,7,-.45);c.restore()};

  /* 底紙＋圓角卡片 */
  c.fillStyle='#FCF3E9';c.fillRect(0,0,W,H);c.translate(MX,MY);
  c.save();c.shadowColor='rgba(120,75,40,.18)';c.shadowBlur=10;c.shadowOffsetY=3;box(0,0,CW,CH,28,'#F5E2C9');c.restore();
  c.save();rr(0,0,CW,CH,28);c.clip();
  c.fillStyle='#F5E2C9';c.fillRect(0,0,CW,CH);

  /* 標頭：平塗的折角山丘 */
  c.fillStyle='#E9C9A4';c.fillRect(0,0,CW,336);
  poly([[0,214],[70,160],[128,182],[214,118],[300,176],[352,336],[0,336]],'#F0DDB8');
  poly([[214,118],[300,176],[262,190],[214,150]],'#E8D2AA');
  poly([[340,336],[402,256],[452,268],[530,206],[590,236],[590,336]],'#DDB28A');
  poly([[530,206],[590,236],[590,262],[548,236]],'#D3A47B');
  poly([[0,300],[140,278],[290,296],[440,280],[590,302],[590,336],[0,336]],'#E2BD96');
  poly([[0,316],[0,240],[16,226],[34,238],[40,262],[60,270],[70,316]],'#919267');
  poly([[16,226],[34,238],[40,262],[20,270]],'#7F8257');
  poly([[528,336],[546,304],[566,296],[590,306],[590,336]],'#A0A071');

  /* 標頭文字 */
  mark(26,20,42,'left');
  T('我的陪伴紀錄',CW/2,92,42,C.ink,900,'center',F,2);
  T('MY JOURNEY WITH MY DOG',CW/2,130,14.5,C.ink2,700,'center',F,1.2);

  /* 主角：坐著的大狗，下半身被 01 面板蓋住 */
  contain(hero,4,148,262,290,true);

  /* 名牌 */
  box(306,160,256,140,24,'#FCEEDB');
  fitT(o.name,434,200,224,34,C.ink,900,'center');
  fitT(`${bn}｜${ben}`,434,236,228,15,C.ink2,500,'center');
  box(322,254,224,34,17,'#7E8150');dot(342,271,5,'#FFF8EC');T('30 DAYS JOURNEY COMPLETED',446,272,11.5,'#FFF8EC',700,'center',F,.3);

  /* 面板 */
  const panel=(y,h,no,tt,en)=>{
    box(12,y+3,566,h,24,'rgba(196,146,98,.18)');box(12,y,566,h,24,'#FFFAF3');
    dot(54,y+32,19,C.br);T(no,54,y+33,17,'#FFF6E8',700,'center');
    T(tt,84,y+32,24,C.ink,900);T(en,84+tw(tt,24,900)+12,y+34,13,C.ink2,600,'left',F,.6);dot(548,y+34,6,'#DDB089')};

  /* 01 狗狗檔案 */
  panel(324,202,'01','我的狗狗檔案','PROFILE');
  contain(run,22,384,170,122);
  T('陪伴天數',238,398,14,C.ink,700,'center');T('30',238,442,46,C.ink,900,'center');T('DAYS',238,482,13.5,C.ink2,600,'center');
  T('模擬花費',348,398,14,C.ink,700,'center');
  {const n=o.spent.toLocaleString();let a=14,b=24;while(tw('NT$',a,700)+4+tw(n,b,800)>104&&b>11){b-=.5;a-=.25}const x=348-(tw('NT$',a,700)+4+tw(n,b,800))/2;T('NT$',x,444,a,C.ink,700);T(n,x+tw('NT$',a,700)+4,442,b,C.ink,800)}
  T('（30 天累計）',348,482,11,C.ink2,500,'center');
  [['健康',o.h],['心情',o.m],['羈絆',o.t]].forEach(([l,v],i)=>{const y=402+i*39;T(l,414,y,14,C.ink,700);box(450,y-7,62,14,7,'#EFE3D2');box(450,y-7,Math.max(14,62*Math.min(100,v)/100),14,7,C.ol);T(v+'/100',566,y,11.5,C.ink,500,'right')});

  /* 02 飼主評估 */
  panel(538,210,'02','我的飼主評估','ASSESSMENT');
  c.fillStyle='#F8E4CB';c.beginPath();c.moveTo(72,594);c.lineTo(188,596);c.bezierCurveTo(216,598,226,630,222,664);c.bezierCurveTo(225,704,212,734,182,733);c.lineTo(64,734);c.bezierCurveTo(36,733,24,708,27,668);c.bezierCurveTo(25,626,42,595,72,594);c.fill();
  T('理想照顧選擇',147,620,14,C.ink,700,'center');
  c.fillStyle='#8F5E3D';c.fillRect(76,663,8,16);c.beginPath();c.moveTo(39,686);c.lineTo(63,661);c.lineTo(87,686);c.lineTo(83,690);c.lineTo(63,671);c.lineTo(43,690);c.closePath();c.fill();c.fillStyle='#C08A5B';c.beginPath();c.moveTo(46,685);c.lineTo(63,669);c.lineTo(80,685);c.lineTo(80,704);c.lineTo(46,704);c.closePath();c.fill();heart(63,689,6,'#FFF3E0');c.fillStyle='#8F5E3D';c.fillRect(41,703,44,3);
  fitT(TYPES[o.type]||TYPES[0],95,661,121,21,C.ink,900);T('最適合你的照顧風格！',95,694,11.5,C.ink,500);c.fillStyle=C.ink2;c.fillRect(95,705,108,1.2);
  T('推薦犬種',258,620,14,C.ink,700);c.fillStyle='#E9BC6E';c.beginPath();c.moveTo(334,627);c.lineTo(331,609);c.lineTo(339,617);c.lineTo(345,606);c.lineTo(351,617);c.lineTo(359,609);c.lineTo(356,627);c.closePath();c.fill();
  fitT(rn,258,662,120,27,C.ink,900);box(258,684,108,32,16,'#F6CF96');T('契合度 '+o.fit+'%',312,701,14,C.ink,700,'center');
  {const cx=486,cy=677,R=46,pt=(i,r)=>{const t=-Math.PI/2+i*Math.PI/3;return[cx+r*Math.cos(t),cy+r*Math.sin(t)]};
  T('六大面向表現',cx,598,13.5,C.ink,700,'center');
  c.strokeStyle='rgba(91,56,38,.55)';c.lineWidth=1;[1,.66,.33].forEach(f=>{c.beginPath();c.arc(cx,cy,R*f,0,7);c.stroke()});
  c.strokeStyle='rgba(91,56,38,.3)';for(let i=0;i<6;i++){c.beginPath();c.moveTo(cx,cy);c.lineTo(...pt(i,R));c.stroke()}
  c.beginPath();for(let i=0;i<6;i++){const p=pt(i,R*Math.max(.14,o.r[i]/100));i?c.lineTo(...p):c.moveTo(...p)}c.closePath();c.fillStyle='rgba(233,170,105,.72)';c.fill();c.strokeStyle='#9A6038';c.lineWidth=1.6;c.lineJoin='round';c.stroke();
  const L=[[0,-57,'center'],[50,-29,'left'],[50,29,'left'],[0,57,'center'],[-50,29,'right'],[-50,-29,'right']];AXES.forEach((l,i)=>T(l,cx+L[i][0],cy+L[i][1],12,C.ink,500,L[i][2]))}

  /* 03 陪伴紀念 */
  panel(760,218,'03','我們的陪伴紀念','MEMORIES');
  contain(mem,26,806,204,140);
  fitT(`DAY ${String(o.day).padStart(2,'0')}${evT?'・'+evT:''}`,128,960,196,11.5,C.ink2,600,'center');
  T('這 30 天，我們一起經歷了……',250,822,15.5,C.ink,900);
  lines('從第一次迎接、日常照顧，到一起度過不同的生活事件，每一段都是值得珍藏的回憶。',12.5,500,F,312).slice(0,2).forEach((l,i)=>T(l,250,849+i*19,12.5,C.ink,500));
  box(248,890,316,74,18,'#F8E4CB');fitT(`我想對${o.name}說的話`,264,908,284,13.5,C.ink,700);
  {let s=19,L;while((L=lines(o.msg,s,400,HW,286)).length>1&&s>15.5)s-=.5;if(L.length>1){s=17;while((L=lines(o.msg,s,400,HW,286)).length>2&&s>11)s-=.5}if(L.length==1)T(L[0],264,938,s,C.ink,400,'left',HW,1);else L.slice(0,2).forEach((l,i)=>T(l,264,931+i*(s+4),s,C.ink,400,'left',HW))}

  /* 頁尾：沙丘、兩叢葉子、一句話和標準字 */
  c.fillStyle='#EED4B2';c.beginPath();c.moveTo(0,1040);c.quadraticCurveTo(CW/2,1000,CW,1040);c.lineTo(CW,CH);c.lineTo(0,CH);c.closePath();c.fill();
  c.save();c.translate(36,1062);c.scale(1.35,1.35);sprig(0,0,1);c.restore();c.save();c.translate(554,1062);c.scale(1.35,1.35);sprig(0,0,-1);c.restore();
  T('成為一位好飼主，從理解與準備開始。',CW/2,1004,16,C.ink,700,'center');
  mark(CW/2,1022,24,'center');
  c.restore();
  return cv}

/* ---------- 下載 ---------- */
const blob=(cv,t,q)=>new Promise(r=>cv.toBlob(r,t||'image/png',q));
const save=(bl,fn)=>{const u=URL.createObjectURL(bl),l=document.createElement('a');l.href=u;l.download=fn;document.body.append(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),60000)};
const fname=o=>'毛評估所_'+o.name.replace(/[\\/:*?"<>|]/g,'')+'_成果小卡';
const crc=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return b=>{let c=-1;for(let i=0;i<b.length;i++)c=t[(c^b[i])&255]^(c>>>8);return(c^-1)>>>0}})();
function zip(files){const en=new TextEncoder(),parts=[],cen=[];let off=0;const u16=v=>[v&255,v>>8&255],u32=v=>[v&255,v>>8&255,v>>16&255,v>>24&255];
  files.forEach(([n,d])=>{const nb=en.encode(n),cr=crc(d),h=new Uint8Array([0x50,0x4b,3,4,20,0,0,8,0,0,0,0,0x21,0,...u32(cr),...u32(d.length),...u32(d.length),...u16(nb.length),0,0]);parts.push(h,nb,d);
    cen.push(new Uint8Array([0x50,0x4b,1,2,20,0,20,0,0,8,0,0,0,0,0x21,0,...u32(cr),...u32(d.length),...u32(d.length),...u16(nb.length),0,0,0,0,0,0,0,0,0,0,0,0,...u32(off)]),nb);off+=h.length+nb.length+d.length});
  const cs=cen.reduce((a,x)=>a+x.length,0);return new Blob([...parts,...cen,new Uint8Array([0x50,0x4b,5,6,0,0,0,0,...u16(files.length),...u16(files.length),...u32(cs),...u32(off),0,0])],{type:'application/zip'})}
function pdf(jb,pw,ph,w,h){const en=new TextEncoder(),ch=[],ofs=[];let len=0;const add=x=>{const b=typeof x=='string'?en.encode(x):x;ch.push(b);len+=b.length},obj=(i,f)=>{ofs[i]=len;add(i+' 0 obj\n');f();add('\nendobj\n')};add('%PDF-1.4\n');
  obj(1,()=>add('<</Type/Catalog/Pages 2 0 R>>'));obj(2,()=>add('<</Type/Pages/Kids[3 0 R]/Count 1>>'));
  obj(3,()=>add(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${w} ${h}]/Resources<</XObject<</Im0 4 0 R>>>>/Contents 5 0 R>>`));
  obj(4,()=>{add(`<</Type/XObject/Subtype/Image/Width ${pw}/Height ${ph}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${jb.length}>>\nstream\n`);add(jb);add('\nendstream')});
  const cnt=`q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;obj(5,()=>add(`<</Length ${cnt.length}>>\nstream\n${cnt}\nendstream`));
  const xr=len;add('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)add(String(ofs[i]).padStart(10,'0')+' 00000 n \n');add(`trailer\n<</Size 6/Root 1 0 R>>\nstartxref\n${xr}\n%%EOF`);return new Blob(ch,{type:'application/pdf'})}
const savePng=async(cv,o)=>save(await blob(cv),fname(o)+'.png');
const savePdf=async(cv,o)=>save(pdf(new Uint8Array(await(await blob(cv,'image/jpeg',.93)).arrayBuffer()),cv.width,cv.height,W,H),fname(o)+'.pdf');
const saveThree=async(cv,o)=>{const fl=[];for(const[y,h,n]of[[324,202,'01狗狗檔案'],[538,210,'02飼主評估'],[760,218,'03陪伴紀念']]){const c=document.createElement('canvas'),hh=h+16;c.width=W*K;c.height=hh*K;c.getContext('2d').drawImage(cv,0,(MY+y-8)*K,W*K,hh*K,0,0,c.width,c.height);fl.push([n+'.png',new Uint8Array(await(await blob(c)).arrayBuffer())])}save(zip(fl),fname(o)+'_三張.zip')};
return{BREEDS,SCENES,encode,decode,draw,blob,fname,savePng,savePdf,saveThree}})();
