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
  const [hero,polo,mem,scI,homeI]=await Promise.all([load(dogSrc(bk,'sit')),load(dogSrc(bk,'happy')),load(dogSrc(bk,POSE[scn])),load(A[scn]),load(A.home)]);

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
  const paw=(x,y,s,col)=>{c.fillStyle=col;[[-.82,-.2,.25,.34,-.4],[-.32,-.72,.26,.36,-.12],[.32,-.72,.26,.36,.12],[.82,-.2,.25,.34,.4]].forEach(([dx,dy,a,b,ro])=>{c.beginPath();c.ellipse(x+dx*s,y+dy*s,a*s,b*s,ro,0,7);c.fill()});
    c.beginPath();c.moveTo(x,y-.2*s);c.bezierCurveTo(x+.5*s,y-.2*s,x+.85*s,y+.5*s,x+.6*s,y+.78*s);c.bezierCurveTo(x+.4*s,y+1*s,x+.2*s,y+.72*s,x,y+.74*s);c.bezierCurveTo(x-.2*s,y+.72*s,x-.4*s,y+1*s,x-.6*s,y+.78*s);c.bezierCurveTo(x-.85*s,y+.5*s,x-.5*s,y-.2*s,x,y-.2*s);c.fill()};
  const heart=(x,y,s,col,line)=>{c.beginPath();c.moveTo(x,y+s*.9);c.bezierCurveTo(x-s*1.5,y-s*.1,x-s*.85,y-s*1.1,x,y-s*.35);c.bezierCurveTo(x+s*.85,y-s*1.1,x+s*1.5,y-s*.1,x,y+s*.9);if(line){c.strokeStyle=col;c.lineWidth=line;c.lineJoin='round';c.stroke()}else{c.fillStyle=col;c.fill()}};
  const contain=(i,x,y,w,h)=>{if(!i)return;const s=Math.min(w/i.naturalWidth,h/i.naturalHeight),dw=i.naturalWidth*s,dh=i.naturalHeight*s;c.drawImage(i,x+(w-dw)/2,y+h-dh,dw,dh)};
  const coverI=(i,x,y,w,h,py)=>{if(!i)return;const s=Math.max(w/i.naturalWidth,h/i.naturalHeight),dw=i.naturalWidth*s,dh=i.naturalHeight*s;c.drawImage(i,x+(w-dw)/2,y+(h-dh)*(py==null?.5:py),dw,dh)};
  const ell=(x,y,a,b,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,a,b,0,0,7);c.fill()};
  const strokes=(L,col,w)=>{c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';L.forEach(([a,b,d,e])=>{c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke()})};
  const tape=(x,y,w,h,ro)=>{c.save();c.translate(x,y);c.rotate(ro);c.fillStyle='rgba(236,200,160,.82)';c.fillRect(-w/2,-h/2,w,h);c.restore()};

  /* 底紙＋圓角卡片 */
  c.fillStyle='#FCF3E9';c.fillRect(0,0,W,H);c.translate(MX,MY);
  c.save();c.shadowColor='rgba(120,75,40,.3)';c.shadowBlur=16;c.shadowOffsetY=5;box(0,0,CW,CH,30,'#FDF3E7');c.restore();
  c.save();rr(0,0,CW,CH,30);c.clip();
  let g=c.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#FEF5EA');g.addColorStop(.28,'#FCEBD8');g.addColorStop(.5,'#FAE3C9');g.addColorStop(1,'#F7DABA');c.fillStyle=g;c.fillRect(0,0,CW,CH);
  /* 標頭背景 */
  ell(62,210,110,112,C.sage);ell(236,246,72,78,C.sage);
  [[-6,252,34,30],[26,276,26,24],[6,292,44,34]].forEach(a=>ell(...a,'#B7B487'));
  ell(600,300,130,58,'#DDB48B');ell(470,338,190,44,'#EACBA6');ell(540,300,54,14,'#B9AF7C');ell(120,344,240,52,'#EDD0AC');
  strokes([[32,160,42,174],[46,142,58,166],[66,140,62,150]],'#8E8F5C',3);
  /* 標頭文字 */
  paw(50,42,20,C.br);T('毛²評估所',82,34,20,C.ink,900);T('PET READINESS LAB',82,54,10.5,C.br,700,'left',F,.4);
  T('我的陪伴紀錄',302,92,42,C.ink,900,'center',F,1);
  { /* 微微起伏的英文字 */
    const s='MY JOURNEY WITH MY DOG';font(15,700);let x=316-s.split('').reduce((n,ch)=>n+c.measureText(ch).width+1.4,0)/2;
    c.fillStyle=C.tan;c.textAlign='left';c.textBaseline='middle';for(const ch of s){const w=c.measureText(ch).width,u=(x-316)/112;c.save();c.translate(x+w/2,127+u*3-1.5*Math.cos(u*2.6));c.rotate(.03);c.fillText(ch,-w/2,0);c.restore();x+=w+1.4}}
  strokes([[452,104,463,86],[464,114,479,97],[470,125,485,121]],C.tan,3.4);heart(557,140,10,C.tan,3);
  /* 主角 */
  c.save();c.beginPath();c.rect(0,120,290,196);c.clip();
  if(hero){const s=Math.min(212/hero.naturalWidth,292/hero.naturalHeight),dw=hero.naturalWidth*s,dh=hero.naturalHeight*s;c.translate(134,0);c.scale(-1,1);c.shadowColor='rgba(110,70,35,.22)';c.shadowBlur=14;c.shadowOffsetY=4;c.drawImage(hero,-dw/2,dh>250?132:324-dh*1.0+Math.max(0,dh-188),dw,dh)}
  c.restore();
  heart(256,250,8,C.tan);
  /* 名牌 */
  c.save();rr(294,163,262,136,20);c.fillStyle='rgba(255,249,240,.95)';c.fill();c.setLineDash([7,5]);c.strokeStyle='#D9AE80';c.lineWidth=1.8;c.stroke();c.restore();
  fitT(o.name,425,196,230,34,C.ink,900,'center');fitT(`${bn}｜${ben}`,425,229,236,15,C.ink2,500,'center');
  c.save();c.translate(425,267);c.rotate(-.012);box(-118,-20,236,40,16,'#7B8650');paw(-99,0,9,'#FFF8EC');T('30 DAYS JOURNEY COMPLETED',13,1,12,'#FFF8EC',700,'center');c.restore();

  /* 面板 */
  const panel=(y,h,no,tt,en)=>{c.save();c.shadowColor='rgba(140,85,40,.22)';c.shadowBlur=14;c.shadowOffsetY=4;box(12,y,566,h,26,C.cream);c.restore();box(12,y,566,h,26,null,'rgba(214,168,122,.4)',1);
    c.fillStyle=C.br;c.beginPath();c.arc(56,y+30,20,0,7);c.fill();T(no,56,y+31,18,'#FFF6E8',700,'center');
    T(tt,87,y+30,25,C.ink,900);const w=tw(tt,25,900);T(en,87+w+14,y+32,13.5,C.br,700,'left',F,.4);paw(544,y+30,12,'#DDB48B')};

  /* 01 狗狗檔案 */
  panel(324,202,'01','我的狗狗檔案','PROFILE');
  c.save();c.translate(92,450);c.rotate(-.09);c.save();c.shadowColor='rgba(80,45,20,.26)';c.shadowBlur=10;c.shadowOffsetY=4;c.fillStyle='#FFFDF8';c.fillRect(-59,-62,118,126);c.restore();
  c.save();c.beginPath();c.rect(-52,-55,104,92);c.clip();c.fillStyle='#D9C3A8';c.fillRect(-52,-55,104,92);if(homeI){c.globalAlpha=.75;coverI(homeI,-52,-55,104,92,.7);c.globalAlpha=1}contain(polo,-48,-46,96,82);c.restore();
  heart(42,51,5.5,C.tan);c.restore();tape(86,384,42,14,-.14);
  box(161,384,88,122,18,C.peach);T('陪伴天數',205,409,14,C.ink,700,'center');T('30',205,453,44,C.ink,900,'center');T('DAYS',205,484,13.5,C.ink2,500,'center');
  box(257,384,106,122,18,C.peach);T('模擬花費',310,409,14,C.ink,700,'center');
  {const n=o.spent.toLocaleString();let a=13.5,b=21;while(tw('NT$',a,700)+4+tw(n,b,900)>96&&b>11){b-=.5;a-=.25}const x=310-(tw('NT$',a,700)+4+tw(n,b,900))/2;T('NT$',x,453,a,C.ink,700);T(n,x+tw('NT$',a,700)+4,451,b,C.ink,900)}
  T('（30 天累計）',310,484,10.5,C.ink2,500,'center');
  box(371,384,191,122,18,C.peach);
  [['健康',o.h],['心情',o.m],['羈絆',o.t]].forEach(([l,v],i)=>{const y=409+i*37;T(l,385,y,14,C.ink,700);box(422,y-7,80,14,7,'rgba(160,120,75,.16)');box(422,y-7,Math.max(14,80*Math.min(100,v)/100),14,7,C.ol);T(v+'/100',553,y,11.5,C.ink,500,'right')});

  /* 02 飼主評估 */
  panel(538,210,'02','我的飼主評估','ASSESSMENT');
  c.fillStyle=C.peach;c.beginPath();c.moveTo(72,596);c.lineTo(184,596);c.bezierCurveTo(214,598,224,628,221,664);c.bezierCurveTo(224,704,212,732,182,732);c.lineTo(66,732);c.bezierCurveTo(36,732,24,708,27,668);c.bezierCurveTo(24,626,42,597,72,596);c.fill();
  T('理想照顧選擇',147,622,14,C.ink,700,'center');
  c.fillStyle='#8F5E3D';c.fillRect(76,663,8,16);c.beginPath();c.moveTo(39,686);c.lineTo(63,661);c.lineTo(87,686);c.lineTo(83,690);c.lineTo(63,671);c.lineTo(43,690);c.closePath();c.fill();c.fillStyle='#C08A5B';c.beginPath();c.moveTo(46,685);c.lineTo(63,669);c.lineTo(80,685);c.lineTo(80,704);c.lineTo(46,704);c.closePath();c.fill();c.strokeStyle='#8F5E3D';c.lineWidth=2.4;c.lineJoin='round';c.stroke();heart(63,688,6,'#FFF3E0');c.fillStyle='#8F5E3D';c.fillRect(41,703,44,3.4);
  fitT(TYPES[o.type]||TYPES[0],95,661,121,22,C.br,900);T('最適合你的照顧風格！',95,694,11.5,C.ink,500);c.strokeStyle='rgba(190,140,90,.4)';c.lineWidth=1;c.beginPath();c.moveTo(95,706);c.lineTo(202,706);c.stroke();
  strokes([[236,596,236,732],[392,596,392,732]],'rgba(200,155,110,.4)',1);
  T('推薦犬種',265,622,14,C.ink,700);c.fillStyle='#E7B96A';c.beginPath();c.moveTo(343,626);c.lineTo(341,609);c.lineTo(348,616);c.lineTo(354,605);c.lineTo(359,616);c.lineTo(367,610);c.lineTo(364,626);c.closePath();c.fill();
  fitT(rn,265,661,112,26,C.br,900);box(265,684,104,32,14,C.peach2);T('契合度 '+o.fit+'%',317,701,14.5,C.ink,700,'center');
  {const cx=486,cy=675,R=46,pt=(i,r)=>{const t=-Math.PI/2+i*Math.PI/3;return[cx+r*Math.cos(t),cy+r*Math.sin(t)]},poly=f=>{c.beginPath();for(let i=0;i<6;i++){const p=pt(i,f(i));i?c.lineTo(...p):c.moveTo(...p)}c.closePath()};
  T('六大面向表現',cx,598,13.5,C.ink,700,'center');
  c.fillStyle='rgba(255,250,240,.9)';c.strokeStyle='rgba(200,155,110,.45)';c.lineWidth=1;c.beginPath();c.arc(cx,cy,R,0,7);c.fill();c.stroke();c.beginPath();c.arc(cx,cy,R*.55,0,7);c.stroke();
  strokes([0,1,2,3,4,5].map(i=>[cx,cy,...pt(i,R)]),'rgba(200,155,110,.28)',1);
  poly(i=>R*Math.max(.14,o.r[i]/100));c.fillStyle='rgba(240,196,140,.78)';c.fill();c.strokeStyle='#A8693B';c.lineWidth=2;c.lineJoin='round';c.stroke();
  const L=[[0,-57,'center'],[50,-29,'left'],[50,29,'left'],[0,57,'center'],[-50,29,'right'],[-50,-29,'right']];AXES.forEach((l,i)=>T(l,cx+L[i][0],cy+L[i][1],12,C.ink,500,L[i][2]))}

  /* 03 陪伴紀念 */
  panel(760,218,'03','我們的陪伴紀念','MEMORIES');
  c.save();c.translate(140,888);c.rotate(-.05);c.save();c.shadowColor='rgba(80,45,20,.26)';c.shadowBlur=12;c.shadowOffsetY=5;c.fillStyle='#FFFDF8';c.fillRect(-104,-74,208,152);c.restore();
  c.save();c.beginPath();c.rect(-96,-66,192,114);c.clip();c.fillStyle='#D9C3A8';c.fillRect(-96,-66,192,114);coverI(scI,-96,-66,192,114,.8);c.shadowColor='rgba(60,40,20,.3)';c.shadowBlur=6;c.shadowOffsetY=2;POSE[scn]=='sleep'?contain(mem,-74,-40,148,82):contain(mem,-62,-56,124,98);c.restore();
  heart(74,-46,7,'#FFF8EC');fitT(`DAY ${String(o.day).padStart(2,'0')}${evT?'・'+evT:''}`,0,63,188,12.5,C.ink,700,'center');c.restore();
  tape(58,822,42,13,-.16);tape(212,810,46,13,.1);
  T('這 30 天，我們一起經歷了……',268,827,15,C.ink,900);
  lines('從第一次迎接、日常照顧，到一起度過不同的生活事件，每一段都是值得珍藏的回憶。',12.5,500,F,294).slice(0,2).forEach((l,i)=>T(l,268,851+i*19,12.5,C.ink2,500));
  box(266,888,296,76,18,C.peach);fitT(`我想對${o.name}說的話`,281,907,264,13.5,C.ink,700);
  {let s=19,L;while((L=lines(o.msg+' ♡',s,400,HW,266)).length>1&&s>15.5)s-=.5;if(L.length>1){s=17;while((L=lines(o.msg+' ♡',s,400,HW,266)).length>2&&s>11)s-=.5}if(L.length==1)T(L[0],414,937,s,C.ink,400,'center',HW);else L.slice(0,2).forEach((l,i)=>T(l,281,930+i*(s+4),s,C.ink,400,'left',HW))}

  /* 頁尾 */
  box(24,990,542,60,24,'rgba(255,248,238,.75)');
  const leaf=(x,y,f)=>{c.save();c.translate(x,y);c.scale(f,1);c.fillStyle='#A9A97A';[[0,0,9,20,-.15],[-13,8,7,15,-.8],[13,6,7,15,.6],[-9,-13,6,12,-.5],[8,-15,6,12,.4]].forEach(([a,b,d,e,r])=>{c.beginPath();c.ellipse(a,b,d,e,r,0,7);c.fill()});c.strokeStyle='#7E8456';c.lineWidth=1.6;c.beginPath();c.moveTo(-2,26);c.quadraticCurveTo(0,4,0,-18);c.stroke();c.restore()};
  leaf(36,1030,1);leaf(554,1030,-1);
  {const t='成為一位好的飼主，從理解與準備開始。',w=tw(t,17,700);paw(CW/2-w/2-14,1010,12,C.tan);T(t,CW/2+10,1010,17,C.ink,700,'center')}
  T('毛²評估所 PET READINESS LAB',CW/2+4,1034,12,C.br,500,'center');
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
