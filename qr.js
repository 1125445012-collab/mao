/* ===== QR 碼產生器（標準 QR Code，位元組模式；不連網、不用外部套件） =====
   QR.make(文字) → 二維陣列（true＝深色）；QR.canvas(文字, 像素) → canvas */
const QR=(()=>{
const EC={ // [每區塊糾錯碼字, 區塊數]，索引＝版本
M:[[0,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28],[0,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21]],
L:[[0,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26],[0,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12]]};
const FB={L:1,M:0};
const raw=v=>{let r=(16*v+128)*v+64;if(v>=2){const n=(v/7|0)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r};
const cap=(v,l)=>(raw(v)>>3)-EC[l][0][v]*EC[l][1][v];
const mul=(x,y)=>{let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z&255};
const div=n=>{const r=Array(n).fill(0);r[n-1]=1;let root=1;for(let i=0;i<n;i++){for(let j=0;j<n;j++){r[j]=mul(r[j],root);if(j+1<n)r[j]^=r[j+1]}root=mul(root,2)}return r};
const rem=(d,dv)=>{const r=dv.map(()=>0);for(const b of d){const f=b^r.shift();r.push(0);dv.forEach((c,i)=>r[i]^=mul(c,f))}return r};
const MASK=[(x,y)=>(x+y)%2,(x,y)=>y%2,(x,y)=>x%3,(x,y)=>(x+y)%3,(x,y)=>((x/3|0)+(y/2|0))%2,(x,y)=>x*y%2+x*y%3,(x,y)=>(x*y%2+x*y%3)%2,(x,y)=>((x+y)%2+x*y%3)%2];
function make(text){
  const bytes=[...new TextEncoder().encode(text)];let v=0,l='M';
  for(const q of['M','L']){for(let i=1;i<=25&&!v;i++)if(bytes.length*8+4+(i<10?8:16)<=cap(i,q)*8){v=i;l=q}if(v)break}
  if(!v)throw Error('QR：內容太長');
  const bits=[],put=(n,k)=>{for(let i=k-1;i>=0;i--)bits.push(n>>>i&1)};
  put(4,4);put(bytes.length,v<10?8:16);bytes.forEach(b=>put(b,8));
  const total=cap(v,l)*8;put(0,Math.min(4,total-bits.length));while(bits.length%8)bits.push(0);
  for(let p=0xEC;bits.length<total;p^=0xEC^0x11)put(p,8);
  const data=[];for(let i=0;i<bits.length;i+=8)data.push(parseInt(bits.slice(i,i+8).join(''),2));
  // 糾錯＋交錯
  const nb=EC[l][1][v],el=EC[l][0][v],rc=raw(v)>>3,short=nb-rc%nb,sl=rc/nb|0,blk=[],dv=div(el);
  for(let i=0,k=0;i<nb;i++){const d=data.slice(k,k+sl-el+(i<short?0:1));k+=d.length;const e=rem(d,dv);if(i<short)d.push(0);blk.push(d.concat(e))}
  const all=[];for(let i=0;i<blk[0].length;i++)blk.forEach((b,j)=>{if(i!=sl-el||j>=short)all.push(b[i])});
  // 圖樣
  const n=v*4+17,m=Array.from({length:n},()=>Array(n).fill(false)),fn=Array.from({length:n},()=>Array(n).fill(false));
  const set=(x,y,d)=>{m[y][x]=!!d;fn[y][x]=true};
  for(let i=0;i<n;i++){set(6,i,i%2==0);set(i,6,i%2==0)}
  [[3,3],[n-4,3],[3,n-4]].forEach(([x,y])=>{for(let a=-4;a<=4;a++)for(let b=-4;b<=4;b++){const X=x+b,Y=y+a,d=Math.max(Math.abs(a),Math.abs(b));if(X>=0&&X<n&&Y>=0&&Y<n)set(X,Y,d!=2&&d!=4)}});
  const al=[];if(v>1){const c=(v/7|0)+2,st=Math.ceil((v*4+4)/(c*2-2))*2;al.push(6);for(let p=n-7;al.length<c;p-=st)al.splice(1,0,p)}
  al.forEach((x,i)=>al.forEach((y,j)=>{const e=al.length-1;if(i==0&&j==0||i==0&&j==e||i==e&&j==0)return;for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)set(x+b,y+a,Math.max(Math.abs(a),Math.abs(b))!=1)}));
  const fmt=k=>{const d=FB[l]<<3|k;let r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=(d<<10|r)^0x5412,g=i=>b>>>i&1;
    for(let i=0;i<=5;i++)set(8,i,g(i));set(8,7,g(6));set(8,8,g(7));set(7,8,g(8));for(let i=9;i<15;i++)set(14-i,8,g(i));
    for(let i=0;i<8;i++)set(n-1-i,8,g(i));for(let i=8;i<15;i++)set(8,n-15+i,g(i));set(8,n-8,1)};
  fmt(0);
  if(v>=7){let r=v;for(let i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1F25);const b=v<<12|r;for(let i=0;i<18;i++){const a=n-11+i%3,c=i/3|0;set(a,c,b>>>i&1);set(c,a,b>>>i&1)}}
  let i=0;for(let r=n-1;r>=1;r-=2){if(r==6)r=5;for(let t=0;t<n;t++)for(let j=0;j<2;j++){const x=r-j,up=((r+1)&2)==0,y=up?n-1-t:t;if(!fn[y][x]&&i<all.length*8){m[y][x]=!!(all[i>>3]>>>(7-(i&7))&1);i++}}}
  const flip=k=>{for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(!fn[y][x]&&!MASK[k](x,y))m[y][x]=!m[y][x]};
  const score=()=>{let p=0;const line=g=>{let run=1;for(let a=1;a<=n;a++){if(a<n&&g(a)==g(a-1))run++;else{if(run>=5)p+=run-2;run=1}}for(let a=0;a+6<n;a++){if(g(a)&&!g(a+1)&&g(a+2)&&g(a+3)&&g(a+4)&&!g(a+5)&&g(a+6)){const q=(s)=>{for(let z=s;z<s+4;z++)if(z>=0&&z<n&&g(z))return 0;return 1};if(q(a-4)||q(a+7))p+=40}}};
    let dk=0;for(let y=0;y<n;y++){line(a=>m[y][a]);line(a=>m[a][y]);for(let x=0;x<n;x++){dk+=m[y][x];if(x+1<n&&y+1<n&&m[y][x]==m[y][x+1]&&m[y][x]==m[y+1][x]&&m[y][x]==m[y+1][x+1])p+=3}}
    return p+(Math.ceil(Math.abs(dk*20-n*n*10)/(n*n))-1)*10};
  let best=0,bs=1e9;for(let k=0;k<8;k++){flip(k);fmt(k);const s=score();if(s<bs){bs=s;best=k}flip(k)}
  flip(best);fmt(best);return m}
function canvas(text,px,col,bg){const m=make(text),n=m.length+8,s=Math.max(2,Math.floor(px/n)),cv=document.createElement('canvas');cv.width=cv.height=n*s;const c=cv.getContext('2d');c.fillStyle=bg||'#fff';c.fillRect(0,0,n*s,n*s);c.fillStyle=col||'#2b1d14';m.forEach((r,y)=>r.forEach((d,x)=>{if(d)c.fillRect((x+4)*s,(y+4)*s,s,s)}));return cv}
return{make,canvas}})();
