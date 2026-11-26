const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)],root=document.documentElement;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,PAL=['#EE8A34','#F2C46D','#EF8F78','#9FA34F','#F6E8CB'];
root.style.setProperty('--hero','url('+new URL(A.hero,location.href).href+')');
const dots=n=>'●'.repeat(n)+'○'.repeat(5-n),cl=v=>Math.max(0,Math.min(100,v));
/* breeds: k image, e 活動量, a 獨處力, s 掉毛, g 美容, z 花費倍率 */
const B={
'柴犬':{en:'SHIBA INU',k:'shiba',e:3,a:4,s:5,g:2,z:1,ac:'#D9822B',tag:'獨立、有主見',f:'獨立卻忠誠，能接受生活偶有起伏；但早期社會化沒做好，固執很難扳回來。',n:{act:'柴犬不黏人，但每天一定要出門——牠要自己決定聞哪一棵樹。',alone:'柴犬相對耐得住獨處，但被冷落久了，固執會變成無聲抗議。',care:'柴犬一年大換毛兩次，梳毛是全年無休的功課。',cost:'中型犬的飼料與醫療費，比小型犬高出一截。',train:'柴犬聰明又有主見，訓練要的是一致，不是大聲。'}},
'柯基犬':{en:'CORGI',k:'corgi',e:4,a:3,s:5,g:2,z:1,ac:'#EBA13B',tag:'活潑、愛吃',f:'聰明有個性，幼年與青年期的紮實訓練，是牠發展的關鍵。',n:{act:'柯基腿短，精力卻很長；每天的散步是基本款。',alone:'柯基怕無聊勝過怕孤單，獨處時間長，玩具與腦力遊戲得補上。',care:'長身短腿，背與關節要替牠留意，也別讓牠太胖。',cost:'花費不算誇張，但關節與體重管理是長期投資。',train:'柯基聰明又愛吃，零食是最好的老師，也是最大的陷阱。'}},
'博美犬':{en:'POMERANIAN',k:'pom',e:3,a:2,s:4,g:3,z:.85,ac:'#E0A64D',tag:'愛叫、精力旺盛',f:'體型小、個性大，適合互動意願高的飼主；早期社會化不足，吠叫問題難根除。',n:{act:'博美體型小、能量大，室內玩不夠，外面的世界牠也想巡一圈。',alone:'博美一個人在家，會用叫聲通知全世界牠不開心。',care:'雙層毛蓬鬆漂亮，也容易打結，梳毛是每週固定行程。',cost:'小型犬日常花費較低，但牙齒與膝蓋要定期檢查。',train:'博美愛叫也愛學；早期社會化決定牠是警覺還是焦慮。'}},
'貴賓犬':{en:'POODLE',k:'poodle',e:4,a:2,s:1,g:5,z:.9,ac:'#8A4F36',tag:'聰明、需要美容',f:'適應力強、聰明好教，需要持續的心智刺激與固定美容。',n:{act:'貴賓犬像運動員：要跑，也要動腦，只靠散步不夠。',alone:'貴賓犬聰明又敏感，長時間獨處容易焦慮。',care:'毛不太掉，但會打結——每 4 到 6 週的美容是固定開銷。',cost:'美容、醫療與用品加起來，是要列進預算的常態。',train:'貴賓犬學得快，連壞習慣也學得快。'}},
'馬爾濟斯':{en:'MALTESE',k:'maltese',e:2,a:1,s:2,g:5,z:.8,ac:'#CDBFA6',tag:'黏人、怕孤單',f:'需求單純，卻極度需要陪伴；獨處過長會引發焦慮。',n:{act:'馬爾濟斯運動量低，但每天的散步是你們的社交時間。',alone:'馬爾濟斯最怕一個人。你出門的每一分鐘，牠都在門口算。',care:'白毛容易沾上淚痕與髒污，要天天擦臉、定期梳洗。',cost:'體型小、飼料花費低，美容與牙齒照護不能省。',train:'馬爾濟斯黏人又心軟——但你要比牠更堅定。'}},
'黃金獵犬':{en:'GOLDEN RETRIEVER',k:'golden',e:4,a:2,s:5,g:4,z:1.3,ac:'#E3A94E',tag:'親人、掉毛多',f:'溫和好訓練，需要每天大量互動與運動，也需要寬裕的預算。',n:{act:'黃金獵犬需要大量運動，一天只出門一次，牠會自己找事做。',alone:'黃金獵犬愛人勝過一切，被獨留在家比你想像的難受。',care:'長毛、厚毛、大量掉毛——你的衣服會自動增加黃金色。',cost:'大型犬的飼料、保健與醫療費，是小型犬的好幾倍。',train:'黃金獵犬溫和好教，但幼年基礎沒打好，牠會是一隻好動的大狗。'}},
'哈士奇':{en:'SIBERIAN HUSKY',k:'husky',e:5,a:2,s:5,g:3,z:1.3,ac:'#8E8F94',tag:'需要大量運動',f:'最高挑戰性的犬種之一，需要高投入的運動與訓練。',n:{act:'哈士奇的字典裡沒有「今天先休息」。每日兩小時以上是起跳。',alone:'哈士奇被獨留，會挖、會嚎、會逃——牠有的是時間與創意。',care:'雙層厚毛，換毛季像下雪，吸塵器要先當你的好朋友。',cost:'大型犬、高運動量，飼料、用品與損壞物品的帳單都不輕。',train:'哈士奇聰明、獨立又固執，牠會測試你的每一條規則。'}},
'米克斯':{en:'MIXED BREED',k:'mutt',e:3,a:4,s:3,g:2,z:1,ac:'#6E6A66',tag:'個性各有不同',f:'個性已成形、生命力強，等待一個不輕易放棄的家。',n:{act:'米克斯的活動量因個體而異，觀察牠，比相信標籤更準。',alone:'許多米克斯適應力強，但每一隻的過去不同，安全感要慢慢建。',care:'毛長毛短都有可能，照護方式得跟著牠調整。',cost:'米克斯通常體質強健，但突發狀況的準備金一樣不能少。',train:'成犬米克斯個性已成形，耐心與一致是最好的訓練。'}}};
const ST=[
{k:'home',t:'你住在哪裡？',s:'居住環境',o:[['small','小公寓','20 坪以下'],['elevator','電梯大樓','有管委會的住宅'],['house','透天厝','有樓梯的家'],['yard','庭院大房','獨棟、有庭院']]},
{k:'athome',t:'每天能陪牠多久？',s:'陪伴時間',o:[[1,'1 小時以下','早出晚歸'],[2,'1–3 小時','晚上和假日'],[3,'3–5 小時','有半天的陪伴'],[4,'5 小時以上','幾乎都在家']]},
{k:'members',t:'家庭人數',s:'家裡有誰一起照顧？',o:[[1,'獨居','只有我'],[2,'兩個人','我和另一半或家人'],[3,'親子家庭','有孩子一起生活'],[5,'多人家庭','三代同堂或室友多']]},
{k:'outing',t:'你的假日比較像？',s:'外出頻率',o:[['low','時常在家','在家休息、追劇'],['high','喜歡外出','郊遊、爬山、逛街']]},
{k:'budget',t:'每月能為牠準備多少預算？',s:'預算分配',o:[[1,'$3,000 以下','飼料與用品要精打細算'],[2,'$3,000–5,000','日常夠用，預備金有限'],[3,'$5,000–8,000','日常、美容、預防都顧得到'],[4,'$8,000 以上','還能留下充足的醫療預備金']]},
{k:'name',t:'替牠取個名字',s:'配對完成，替牠取個名字吧。'}];
const SG=[['幼年期・0–1 歲','一切都是第一次：牠在學你，你也在學牠。',7],['青年期・1–3 歲','精力旺盛的日子，規矩與耐心要一起長出來。',14],['中年期・3–8 歲','新鮮感退去，剩下的是每天都要做的事。',21],['老年期・8 歲以後','腳步慢下來了，陪伴成了最重要的事。',30]];
const sg=d=>SG.findIndex(x=>d<=x[2]);
const TG={r_activity:'act',r_social:'act',e_chew:'act',r_pace:'act',r_alone:'alone',r_overtime:'alone',e_outing:'alone',r_longplan:'alone',r_family:'alone',e_itch:'care',r_appetite:'care',r_checkup:'care',e_medical:'cost',r_budget:'cost',e_supply:'cost',r_dinner:'train',r_safezone:'train',e_pee:'train',r_potty2:'train',e_noeat:'care',e_abnormal:'care',r_potty:'train',r_sit:'train',r_groom:'care',r_foodcheck:'care',r_shop:'cost',r_shed:'care',r_floor:'act'};
const f=x=>S.flags.includes(x);
const SC={r_alone:()=>S.pf.athome>=3?'你今天在家，但有一件不能中斷的事，{n}得獨自待在另一個房間。':'你得出門了。這是{n}第一次要獨自待在家好幾個小時。',
r_family:()=>S.pf.members==1?'你一個人扛下所有事，朋友問：「要不要找個人輪流幫忙？」':'家人對新成員反應不一：有人搶著抱，有人嫌掉毛，還有人不知道怎麼靠近。',
r_rota:()=>f('rota')?'輪值表貼在冰箱上兩週了，有幾格已經空白。':'你發現，所有事情還是落在同一個人身上。'};
const E={r_potty:()=>({small:'小公寓沒有庭院，每一次出門都得下樓。',elevator:'要搭電梯才能出門，上廁所得算好時間。',yard:'有院子，但牠不會自己知道院子的哪一角才是廁所。'})[S.pf.home]||0,e_pee:()=>f('noPlan')?'前幾天你沒有替牠決定固定地點，牠無法分辨哪裡才對。':f('outTrain')||f('padTrain')?'你已經開始建立固定地點，這只是學習中的失誤。':0,e_supply:()=>f('impulseBuy')?'上次你買了很多玩具，卻漏了補充主食。':f('cheapBuy')?'之前買的便宜貨，比預期更快用完。':f('plannedBuy')?'你有採買清單，只是這次用量比預估多。':0,e_itch:()=>f('skipBath')?'上次洗澡被你省略，皮膚可能一直沒有被好好清潔。':f('groomRoutine')?'你有固定清潔，這次可能不是衛生問題。':0,e_noeat:()=>f('treats')?'這幾天你習慣用零食哄牠，正餐反而失去了吸引力。':f('skipMeal')?'牠對「吃飯」這件事，還沒有建立安心感。':0,e_abnormal:()=>f('skipCheckup')?'你延後了健康檢查，現在沒有基準資料可以比較。':f('logHealth')?'你有記錄牠的食量與飲水，可以幫助獸醫判斷。':S.health<60?'最近牠的健康狀況一直在下滑。':0,r_alone:()=>({1:'你平常很少在家，牠會有很長的獨處時間。',2:'你有一半的時間不在家，牠得學會等你。',3:'你有一半的時間不在家，牠得學會等你。',4:'你就在隔壁，但牠並不明白為什麼不能進來。'})[S.pf.athome],
r_family:()=>S.pf.members==1?'你是一個人住，沒有人會自動分擔。':0,
r_activity:()=>S.pf.home=='yard'||S.pf.home=='house'?'有院子不代表不用散步：牠需要的是和你一起出去聞世界。':S.pf.home=='small'?'小公寓裡，牠的精力只能往你的家具上放。':0,
r_social:()=>f('longAlone')?'第一次獨處的經驗，讓牠對陌生的事更沒有安全感。':0,
r_overtime:()=>S.time<40?'你這週已經累積了不少疲憊。':0,
r_checkup:()=>S.health<70?'牠最近的健康狀況起伏不定。':0,
r_rota:()=>S.family<40?'「家人默契」偏低，大家開始把牠當成「你的事」。':0,
r_budget:()=>S.money<8000?'照顧基金只剩 NT$'+S.money.toLocaleString()+'。':0,
e_chew:()=>f('longAlone')?'第一次獨處時的焦慮，可能讓牠用咬東西來排解。':f('unsafeHome')?'你當初沒有把家整理成安全空間。':f('noWalk')||f('skipWalk')?'這幾天牠的運動量不夠，精力只好用在沙發上。':0,
e_outing:()=>S.family>=50?'家人說：「這週我們可以幫忙。」':'你身邊沒有人可以立刻接手。',
e_medical:()=>f('insured')?'你先前投保了寵物保險，可以分擔一部分。':f('reserve')?'你預留了急用金，這次不必動用生活費。':S.money<6000?'照顧基金只剩 NT$'+S.money.toLocaleString()+'。':0,
r_longplan:()=>S.family<40?'你很清楚，身邊並沒有太多人能接手。':0,
r_potty2:()=>f('fear')?'牠似乎還記得被責罵的那天，一出錯就縮成一團。':0};
/* 純文字頁：[標題, 標籤, 犬種筆記類型, 內文] */
const TX={3:['第一個夜晚','陪伴','alone','半夜，{n}在窗邊的墊子上翻了個身。你假裝睡著，其實一直在聽牠的呼吸聲。三天了，這間屋子開始有了另一個人的聲音。'],
6:['鑰匙聲','迎接','alone','你一轉動鑰匙，{n}就從房間衝出來，在玄關轉了三圈。你放下包包，什麼也沒做，只是先蹲下來。'],
9:['雨天的腳印','日常','care','下雨天，地板上多了一排小小的腳印。你拿著抹布追過去，擦了一半，又停下來看。'],
12:['手機裡的相簿','紀錄','act','你滑開手機，相簿裡有一半是{n}。睡著的、歪頭的、打哈欠的。十二天，你已經不太記得上一次拍的是什麼別的。'],
15:['陌生人的問候','社會化','train','路上有人彎下腰問：「牠幾歲啊？」你第一次用「我家的」介紹{n}。那個詞，說出口比想像的更重。'],
17:['深夜的水聲','安心','care','深夜你聽見{n}喝水的聲音，一下一下，很規律。你突然覺得安心，原來確認牠還在，也是照顧的一部分。'],
20:['假日的睡過頭','作息','act','週末你想賴床，{n}把下巴靠在床邊看你。你嘆了口氣，起來穿鞋。你知道，牠不會因為你累了，就晚一點需要出門。'],
23:['窗邊的等待','陪伴','alone','你出門前，{n}坐在玄關看你穿鞋。回家時牠還在同一個位置。你不知道牠等了多久，只知道今天尾巴搖得特別用力。'],
27:['傍晚的散步','散步','act','傍晚的散步變慢了，{n}停在每一根電線桿前面。你沒有催牠。第 27 天，你開始懂得，陪伴不是做了什麼，而是不趕時間。']};
/* 柴犬、柯基用 SVG 插圖。q 題目、t 純文字頁（data.js 的 t）、d 其他、z 最後、low 心情或健康低於 40、quiz 評估五題、main／card／face 配對大卡、小卡、背面與取名
   柴犬：shZ 趴睡、shP 趴著抬頭、shL 牽繩、shE 抓臉、shA 警覺、shS 低落　柯基：cgL 趴睡、cgS 坐著 */
const SVP={
shiba:{q:{r_dinner:'shS',r_safezone:'shA',e_noeat:'shS',r_potty:'shA',r_alone:'shS',e_pee:'shP',r_family:'shP',r_activity:'shP',r_social:'shL',e_chew:'shP',r_groom:'shE',r_overtime:'shL',r_longplan:'shS',r_shop:'shP',e_itch:'shE',r_checkup:'shA',r_appetite:'shS',r_pace:'shL',e_abnormal:'shZ',r_budget:'shP',e_medical:'shS',r_final:'shP',e_outing:'shS',e_supply:'shA'},t:{0:'shZ',4:'shL',5:'shZ',6:'shZ',7:'shZ'},d:'shP',z:'shZ',low:'shS',quiz:['shP','shE','shP','shL','shA','shP'],main:'shP',card:'shP',face:'shE'},
corgi:{q:{r_alone:'cgL',e_outing:'cgL',r_longplan:'cgL',e_abnormal:'cgL',r_appetite:'cgL',e_medical:'cgL'},t:{0:'cgL',5:'cgL',6:'cgL',7:'cgL'},d:'cgS',z:'cgL',low:'cgL',quiz:['cgS','cgS','cgS','cgS','cgS','cgS'],main:'cgS',card:'cgS',face:'cgS'}},
/* SVG 在「一生」的高度（%）、半身圖（底邊貼齊畫面下緣）、原圖朝左要翻成朝右的 */
SVH={shZ:22,shP:38,shL:57,shE:54,shA:54,shS:54,cgL:25,cgS:48},SVB=['shL','shE','shA','shS'],SVF=['shZ','shA','shS','cgL','cgS'];
/* 其他六種狗：NPH 各姿態原圖高度（決定大小比例）、NPQ 題目→姿態、NPT 純文字頁→姿態 */
const NPH={mutt:{sleep:182,play:414,sad:396,stand:459,sit:463},golden:{sleep:194,play:394,sad:389,stand:444,sit:458},maltese:{sleep:202,play:393,sad:377,stand:407,sit:395},poodle:{sleep:216,play:374,sad:372,stand:449,sit:454},pom:{sleep:267,play:398,sad:394,stand:436,sit:445},husky:{sleep:231,play:391,sad:347,stand:420,sit:422}},
NPQ={r_dinner:'sad',r_safezone:'stand',e_noeat:'sad',r_potty:'stand',r_alone:'sad',e_pee:'sit',r_family:'sit',r_activity:'play',r_social:'sad',e_chew:'play',r_groom:'sit',r_overtime:'sit',r_longplan:'sad',r_shop:'stand',e_itch:'sad',r_checkup:'sit',r_appetite:'sad',r_pace:'sit',e_abnormal:'sleep',r_budget:'sit',e_medical:'sad',r_final:'sit',e_outing:'sad',e_supply:'sit'},
NPT={0:'sleep',1:'sit',2:'stand',3:'sit',4:'stand',5:'sleep',6:'sleep',7:'sleep'},
npose=(it,sn)=>{const k=B[S.b].k,v=SVP[k];if(v)return it.t=='f'?v.z:it.t=='t'?v.t[it.i]||v.d:v.q[it.id]||v.d;return k+'_'+(it.t=='f'?'sleep':it.t=='t'?NPT[it.i]||'stand':NPQ[it.id]||(sn=='park'||sn=='play'?'play':'stand'))},
npLow=np=>{const k=B[S.b].k,v=SVP[k];return v?(np==v.z?np:v.low):np.endsWith('_sleep')?np:k+'_sad'},
nph=(key,base)=>{if(SVH[key])return (base*SVH[key]/46).toFixed(1)+'%';const [k,p]=key.split('_');return (base*NPH[k][p]/NPH[k].stand).toFixed(1)+'%'};
const SCN={r_dinner:'dine',e_noeat:'dine',r_appetite:'dine',r_shop:'dine',r_groom:'bath',r_activity:'play',r_social:'park',r_pace:'park',r_overtime:'park',r_final:'park',e_itch:'clinic',r_checkup:'clinic',e_abnormal:'clinic',e_medical:'clinic'};
const EV=id=>D.q.find(x=>x.id==id);
let SEQ=[];
function shuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function buildSeq(){const q=id=>({t:'q',id}),x=i=>({t:'t',i});
const ST=[{q:['r_dinner','r_safezone','e_noeat','r_potty','r_alone','e_pee'],t:[0]},{q:['r_family','r_activity','r_social','e_chew','r_groom'],t:[1,3]},{q:['r_overtime','r_longplan','r_shop','e_itch','r_checkup'],t:[2,4]},{q:['r_appetite','r_pace','e_abnormal','r_budget','e_medical'],t:[5],last:'r_final'}];
const out=[];
ST.forEach(s=>{const cs=shuf(s.q).map(q);if(s.last)cs.push(q(s.last));const n=cs.length,max=s.last?n-1:n,gaps=shuf(Array.from({length:max},(_,i)=>i+1)).slice(0,s.t.length).sort((a,b)=>a-b),ts=shuf(s.t);
 cs.forEach((c,i)=>{out.push(c);const g=gaps.indexOf(i+1);if(g>=0)out.push(x(ts[g]))})});
out.push(x(6));out.push(x(7));
SEQ=out.map((o,i)=>({...o,d:i+1}));SEQ.push({t:'f',d:30})}
const scene=d=>{const it=SEQ[S.pi]||{};if(it.t=='t')return D.t[it.i].sn||'home';const q=it.t=='q'?EV(it.id):null;return q?SCN[q.id]||'home':'home'};
const isSd=d=>{const it=SEQ[d-1],q=it&&it.t=='q'?EV(it.id):null;return !!q&&q.kind=='sudden'};
const AB={A:'飲食照護',B:'清潔護理',C:'運動陪伴',D:'情感陪伴',E:'環境與訓練',F:'醫療健康'};
const S={step:0,b:'柴犬',name:'',pf:{},ex:[]};
const fill=t=>t.replace(/\{n\}/g,S.name);
/* particles */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[],W,H;
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
function burst(x,y,bad){for(let i=0;i<48;i++){const a=Math.random()*6.28,v=1+Math.random()*4;P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.5,l:1,d:.012+Math.random()*.012,r:1+Math.random()*2.6,c:bad?'#8A8580':PAL[i%5],g:.06})}}
function amb(){let x,y;const s=$('.stage,.scn');if(s){const r=s.getBoundingClientRect();if(r.bottom<0||r.top>H)return;x=r.left+r.width*(.1+.8*Math.random());y=r.top+r.height*(.3+.7*Math.random())}else if($('.cover')){x=Math.random()*W;y=H*(.4+.6*Math.random())}else return;
P.push({x,y,vx:(Math.random()-.5)*.3,vy:-.3-Math.random()*.6,l:1,d:.006,r:.8+Math.random()*2,c:PAL[Math.random()*4|0],g:0})}
(function loop(){cx.clearRect(0,0,W,H);if(!RM&&P.length<260&&Math.random()<.5*(S.sp||1))amb();P=P.filter(p=>p.l>0);for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l-=p.d;cx.globalAlpha=Math.max(0,p.l)*.85;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r,p.r)}requestAnimationFrame(loop)})();
/* screens */
const app=$('#app'),dogH=()=>`<div class="blob"></div><div class="dogw" id="dw"><img class="dog" src="${A[B[S.b].k]}" alt="${S.b}"></div>`;
const trt=()=>{const b=B[S.b];return [['活動量',b.e],['獨處力',b.a],['掉毛',b.s],['美容',b.g]].map(([k,v])=>`<div>${k}<i>${dots(v)}</i></div>`).join('')+`<p>${S.b}・${b.tag}</p>`};
const COVBG=`<svg class="bgs" viewBox="0 0 2068 1002" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="gs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FDE2B5"/><stop offset="1" stop-color="#F8C58A"/></linearGradient><linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F07F1F"/><stop offset=".6" stop-color="#F39A62"/><stop offset="1" stop-color="#F2A08F"/></linearGradient></defs><rect width="2068" height="1002" fill="url(#gs)"/><polygon points="0,0 700,0 380,520 0,380" fill="#FCD9A2" opacity=".6"/><polygon points="700,0 1500,0 1100,420 760,520" fill="#F9C98C" opacity=".5"/><polygon points="1500,0 2068,0 2068,520 1300,640" fill="#F7BA7C" opacity=".45"/><polygon points="360,360 650,210 1010,185 1290,330 1230,540 930,650 570,620 330,500" fill="url(#gb)"/><polygon points="650,210 1010,185 900,380" fill="#F6A25A" opacity=".5"/><polygon points="360,360 650,210 700,420 330,500" fill="#F07F22" opacity=".4"/><polygon points="1010,185 1290,330 1100,430" fill="#F4A98A" opacity=".5"/><polygon points="1100,720 1380,560 1650,660 1900,520 2068,600 2068,860 1100,860" fill="#B2A858"/><polygon points="1500,760 1800,640 2068,720 2068,900 1500,900" fill="#9CA155"/><polygon points="640,820 900,690 1180,780 1420,700 1500,860 640,900" fill="#A6AC5C"/><polygon points="0,880 2068,740 2068,1002 0,1002" fill="#F7D09B"/><polygon points="400,940 2068,820 2068,1002 300,1002" fill="#F3C48A" opacity=".7"/><polygon points="0,560 140,440 330,600 560,760 0,1002" fill="#A5A956"/><polygon points="0,800 300,660 640,860 460,1002 0,1002" fill="#8D9944"/><polygon points="0,560 140,440 200,640 0,760" fill="#7F8E3C"/><polygon points="20,560 40,560 36,720 24,720" fill="#8B6B3E"/><polygon points="0,470 60,430 100,500 50,560 0,540" fill="#6F8A3A"/></svg>`,CLD=`<svg viewBox="0 0 200 80" aria-hidden="true"><polygon points="10,70 40,34 82,22 112,38 152,28 190,70" fill="#FFF4E2"/><polygon points="40,34 82,22 76,70 10,70" fill="#F8E7CC"/><polygon points="112,38 152,28 190,70 120,70" fill="#EFD9B8"/></svg>`;
const CVO=[['bowl','cvBowl',163,138,334,139,'fl'],['bag','cvBag',92,483,262,283,'fl'],['bed','cvBed',317,776,320,192,'fl'],['collar','cvCollar',254,1051,204,152,'fl'],['house','cvHouse',610,896,381,274,'hse'],['ttK','cvTK',499,394,1153,321,'ttl'],['ttG','cvTG',499,394,1153,321,'ttl'],['pgC','cvC',1762,219,176,178,'fl'],['pgB','cvB',1921,108,169,86,'fl'],['pgA','cvA',1553,-44,322,172,'fl'],['dog','cvDog',1706,133,832,1115,'dgo'],['cal','cvCal',2103,-48,524,513,'calo']];
let CVA=[],CVT=[];
function cvStop(){CVA.forEach(a=>{try{a.cancel()}catch(e){}});CVA=[];CVT.forEach(clearTimeout);CVT=[]}
/* 封面物件的對齊點 [左右,上下]：背景鋪滿視窗時，狗和房子貼地、日曆貼上緣，其他以中心對齊 */
const CVX=k=>k=='dog'||k=='house'?[.5,1]:k=='cal'?[.5,0]:k=='pgC'?[.1,0]:[.5,.5];
function cover(){S.step=0;S.reg=0;S.owner=null;const rg=$('.rgm');if(rg)rg.remove();S.kseen={};S.b='柴犬';cvStop();window.bgmRestart&&bgmRestart();
const cvh=CVO.map(([k,a,x,y,w,h,c],i)=>`<div class="cvo ${c} ${k=='dog'?'':''}" data-k="${k}" style="left:calc(${x+w*CVX(k)[0]}/2576*100cqw - ${w*CVX(k)[0]}*var(--s));top:calc(${y+h*CVX(k)[1]}/1248*100cqh - ${h*CVX(k)[1]}*var(--s));width:calc(${w}*var(--s));--s:var(${c=='ttl'?'--k':'--u'});--t:${(4.4+i*.37%2.6).toFixed(2)}s;--l:${(-i*.7).toFixed(1)}s;--dy:${i%2?-2.4:-3.2}%;--r0:${i%2?-1.2:1}deg;--r1:${i%2?1:-1.2}deg"><div class="cvi"><img src="${A[a]}" alt="" draggable="false"></div></div>`).join('');
app.innerHTML=`<section class="cvf" id="cv">${nav(-1)}<div class="hs" id="hs"><div class="cam" id="cam"><img class="hbg" src="${A.cvBg}" alt="毛評估所">${cvh}</div></div><div class="cmf"><h1 class="cmh2">領養前，<br>先過 <em>30</em> 天。</h1><p class="cms2"><b>30 DAYS</b>養一隻狗的 30 天日曆</p><button class="go" data-a="start">開始體驗 →</button></div><div class="rwf">${Object.values(B).map(b=>`<img src="${A[b.k]}" alt="">`).join('')}</div></section>`;scrollTo(0,0);cvPlay()}
function cvPlay(){const cv=$('#cv'),hs=$('#hs'),cam=$('#cam');if(!hs)return;
const fin=()=>{cvStop();cv.classList.add('idle','cta')};
if(RM||matchMedia('(prefers-reduced-motion:reduce)').matches){fin();return}
const kx=hs.clientWidth/2576,ky=hs.clientHeight/1248,k=Math.min((kx+ky)/2,1.1*Math.min(kx,ky)),q=n=>hs.querySelector('[data-k="'+n+'"]'),I=n=>q(n).firstElementChild;
const an=(el,kf,o)=>{const a=el.animate(kf,Object.assign({fill:'both',easing:'linear'},o));CVA.push(a);return a};
const OUT=t=>1-Math.pow(1-t,3),px=v=>(v*k).toFixed(1)+'px';
// camera: start zoomed on the house, then pull back
const S0=2.4,cx=.32,cy=.78;
an(cam,[{transform:`translate(${(.5-S0*cx)*100}%,${(.5-S0*cy)*100}%) scale(${S0})`},{transform:'translate(0,0) scale(1)'}],{delay:1500,duration:2900,easing:'cubic-bezier(.5,0,.15,1)'});
// house pops in, then squashes before each spit
an(q('house'),[{transform:'scale(.4)',opacity:0},{transform:'scale(1.1,.94)',opacity:1,offset:.55},{transform:'scale(.97,1.04)',offset:.78},{transform:'scale(1)',opacity:1}],{duration:800,easing:'ease-out'});
[800,1400,2000,2600].forEach(t=>an(q('house'),[{transform:'scale(1)'},{transform:'scale(1.07,.9)',offset:.4},{transform:'scale(.95,1.08)',offset:.72},{transform:'scale(1)'}],{delay:t,duration:520,easing:'ease-in-out'}));
// spit out items from the door (hero px 867,1075)
const DX=867,DY=1075,fly=(n,t0,dur,arc,rot)=>{const [x,y,w,h]=CVO.find(c=>c[0]==n).slice(2,6),fx=(DX-(x+w/2))*kx/k,fy=(DY-(y+h/2))*ky/k,kf=[];
for(let i=0;i<=18;i++){const t=i/18,e=OUT(t),sc=Math.min(1,.12+.88*Math.min(1,e*1.35));
kf.push({offset:t,opacity:t<.04?0:1,transform:`translate(${px(fx*(1-e))},${px(fy*(1-e)-arc*4*e*(1-e))}) rotate(${(rot*(1-e)).toFixed(1)}deg) scale(${sc.toFixed(3)})`})}
an(q(n),kf,{delay:t0,duration:dur,easing:'cubic-bezier(.3,.1,.5,1)'});
an(q(n),[{transform:'scale(1,1)'},{transform:'scale(1.1,.88)',offset:.35},{transform:'scale(.97,1.05)',offset:.7},{transform:'scale(1,1)'}],{delay:t0+dur,duration:420,easing:'ease-out'})};
fly('collar',900,1000,260,-300);fly('bed',1500,1150,320,260);fly('bag',2100,1250,380,-240);fly('bowl',2700,1400,420,220);
// title: black strokes drop in, grey strokes rise in
an(q('ttK'),[{opacity:0,transform:`translateY(${px(-150)}) scale(1.04)`},{opacity:1,transform:`translateY(${px(12)})`,offset:.7},{opacity:1,transform:'translateY(0)'}],{delay:3700,duration:900,easing:'cubic-bezier(.2,.8,.3,1)'});
an(q('ttG'),[{opacity:0,transform:`translateY(${px(150)}) scale(.96)`},{opacity:1,transform:`translateY(${px(-12)})`,offset:.7},{opacity:1,transform:'translateY(0)'}],{delay:3900,duration:900,easing:'cubic-bezier(.2,.8,.3,1)'});
// calendar drops from above and swings to rest
an(q('cal'),[{transform:`translateY(${px(-760)}) rotate(-14deg)`},{transform:`translateY(${px(24)}) rotate(5deg)`,offset:.55,easing:'ease-in'},{transform:'translateY(-1.5%) rotate(-2.8deg)',offset:.72},{transform:'translateY(.6%) rotate(1.2deg)',offset:.86},{transform:'translateY(0) rotate(0)'}],{delay:3300,duration:1300,easing:'cubic-bezier(.4,0,.8,.6)'});
// loose sheets flip out of the calendar (page-turn)
const flip=(n,t0,rx,ry)=>{const [x,y,w,h]=CVO.find(c=>c[0]==n).slice(2,6),fx=(2330-(x+w/2))*kx/k,fy=(220-(y+h/2))*ky/k;
an(q(n),[{opacity:0,transform:`translate(${px(fx)},${px(fy)}) perspective(800px) rotateX(0) rotateY(0) rotate(0) scale(.25)`},{opacity:1,offset:.12},{opacity:1,transform:`translate(${px(fx*.35)},${px(fy*.35-70)}) perspective(800px) rotateX(${rx*.5}deg) rotateY(${ry*.5}deg) rotate(-90deg) scale(.7)`,offset:.5},{opacity:1,transform:'translate(0,0) perspective(800px) rotateX(0) rotateY(0) rotate(0) scale(1)'}],{delay:t0,duration:1200,easing:'cubic-bezier(.25,.6,.3,1)'})};
flip('pgB',4500,-540,180);flip('pgA',4650,540,-200);flip('pgC',4800,-360,360);
// dog runs in from beyond the right edge
const dg=[],N=44;for(let i=0;i<=N;i++){const t=i/N;dg.push({offset:t,transform:`translateY(${px(-30*Math.abs(Math.sin(Math.PI*6*t))*(1-t*.55))}) rotate(${(-4*(1-t)).toFixed(2)}deg)`})}
an(q('dog'),[{transform:`translateX(${px(2576-1706+60)})`},{transform:'translateX(0)'}],{delay:5000,duration:1500,easing:'cubic-bezier(.12,.6,.28,1)'});
an(I('dog'),dg,{delay:5000,duration:1500});
an(q('dog'),[{transform:'scale(1,1)'},{transform:'scale(1.03,.96)',offset:.4},{transform:'scale(.995,1.015)',offset:.75},{transform:'scale(1,1)'}],{delay:6500,duration:450,easing:'ease-out'});
CVT.push(setTimeout(()=>cv.classList.add('cta'),6300),setTimeout(fin,7100));
hs.onclick=()=>{if(!cv.classList.contains('idle'))fin()}}
let ITM=[];
function intro(x,y){if($('.intro'))return;if(RM)return setup();ITM.forEach(clearTimeout);ITM=[];const T=[1900,2600,1500],o=document.createElement('div');o.className='intro';o.style.cssText=`--x:${x}px;--y:${y}px`;
o.innerHTML=`<div class="sn"><small>毛評估所　A 30-DAY DOG TRIAL</small><h2>養一隻狗，</h2><h2 class="lt">不是一個決定。</h2></div><div class="sn"><h2>而是接下來，</h2><h2 class="lt">每一天的選擇。</h2><p>先看清自己的生活，遇見最合拍的牠，<br>再用 30 天的日曆，試著照顧牠。</p><div class="ir">${ICO.map(k=>`<img src="${A['ic_'+B[k].k]}" alt="">`).join('')}</div></div><div class="sn"><h2 class="wh">先從你的家開始。</h2><span class="ar2">01 · LIVING SPACE ↓</span></div><div class="ib"><i></i></div>`;
document.body.append(o);burst(x,y);const sn=$$('.sn',o);let k=-1,done=0;
const end=()=>{if(done)return;done=1;ITM.forEach(clearTimeout);setup();o.classList.add('out');setTimeout(()=>o.remove(),900)},
go=()=>{if(done)return;k++;if(k>=sn.length)return end();sn.forEach((s,i)=>s.classList.toggle('on',i==k));$('.ib i',o).style.width=(k+1)/sn.length*100+'%';burst(innerWidth/2,innerHeight/2);ITM.push(setTimeout(go,T[k]))};
o.onclick=e=>{if(e.target.closest('.sk'))return end();ITM.forEach(clearTimeout);go()};ITM.push(setTimeout(go,650))}

const EB=['LIVING · SPACE','TIME · TOGETHER','FAMILY · HOME','WEEKEND · MOOD','MONTHLY · BUDGET','NAME · IT'],SUBT=['牠需要一個能轉身、奔跑的角落。','陪伴的時間，是牠最在意的事。','家裡有誰，會一起照顧牠？','假日的你，決定牠的日常。','飼料、用品、美容、預防、醫療預備金，要怎麼分？（金額僅為示意）','配對完成，替牠取個名字吧。'];
const ws=(x,y0,n,c=2)=>Array.from({length:n*c},(_,i)=>`<rect x="${x+(i%c)*13}" y="${y0+(i/c|0)*13}" width="8" height="7" fill="#fff"/>`).join('');
const clk=f=>{const a=f*6.2832;return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="42" fill="#E8DCC4" stroke="#1d1612" stroke-width="3"/>${f>=1?'<circle cx="60" cy="60" r="42" fill="#E8A058"/>':`<path d="M60 60 L60 18 A42 42 0 ${f>.5?1:0} 1 ${60+42*Math.sin(a)} ${60-42*Math.cos(a)} Z" fill="#E8A058"/>`}<circle cx="60" cy="60" r="42" fill="none" stroke="#1d1612" stroke-width="3"/><rect x="58" y="10" width="4" height="8" fill="#1d1612"/></svg>`};
const fg=(x,h,c)=>`<circle cx="${x}" cy="${100-h-10}" r="8" fill="${c}"/><rect x="${x-9}" y="${100-h}" width="18" height="${h}" rx="9" fill="${c}"/>`,svg=b=>`<svg viewBox="0 0 120 120" aria-hidden="true">${b}</svg>`;
const house=(dx,s)=>`<polygon points="${24+dx},66 ${60+dx},66 ${60+dx},102 ${24+dx},102" fill="#F0C48C"/><polygon points="${60+dx},66 ${80+dx},58 ${80+dx},94 ${60+dx},102" fill="#E8A058"/><polygon points="${18+dx},66 ${42+dx},36 ${66+dx},66" fill="#E07A2E"/><polygon points="${42+dx},36 ${86+dx},56 ${80+dx},58 ${66+dx},66" fill="#C65A1E"/><rect x="${36+dx}" y="84" width="10" height="18" fill="#1d1612"/><rect x="${30+dx}" y="72" width="7" height="7" fill="#fff"/><rect x="${46+dx}" y="72" width="7" height="7" fill="#fff"/>`;
const oct=n=>{const V=k=>[60+46*Math.sin(k*Math.PI/4),62-46*Math.cos(k*Math.PI/4)];let s='';for(let k=0;k<8;k++){const a=V(k),b=V(k+1);s+=`<polygon points="60,62 ${a[0].toFixed(1)},${a[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="${k<n?(k%2?'#E8A058':'#DE7228'):(k%2?'#D9CBB2':'#E4D9C4')}"/>`}return svg(s+'<polygon points="57,62 60,24 63,62" fill="#1d1612"/><polygon points="60,56 65,59 65,65 60,68 55,65 55,59" fill="#1d1612"/>')};
const pp=(x,s,c1,c2)=>{const W=28*s,T=17*s,H=35*s,y=104-H,r=9.5*s,cy=y-4-r,h=.866*r;return `<polygon points="${x},${cy-r} ${x+h},${cy-r/2} ${x+h},${cy+r/2} ${x},${cy+r} ${x-h},${cy+r/2} ${x-h},${cy-r/2}" fill="${c1}"/><polygon points="${x-T/2},${y} ${x},${y} ${x},104 ${x-W/2},104" fill="${c1}"/><polygon points="${x},${y} ${x+T/2},${y} ${x+W/2},104 ${x},104" fill="${c2}"/>`};
const OR=['#DE7228','#C2652A'],SL=['#62767E','#51636A'],LO=['#E8A058','#CF8F50'],GB=['#8E9EA3','#7B8A8F'];
const BC=n=>{let o='';for(let i=0;i<n;i++){const y=96-i*17;o+=`<polygon points="22,${y} 60,${y+10} 60,${y+1} 22,${y-9}" fill="#CF8F50"/><polygon points="98,${y} 60,${y+10} 60,${y+1} 98,${y-9}" fill="#DE7228"/><polygon points="22,${y-9} 60,${y-19} 98,${y-9} 60,${y+1}" fill="#F0C48C"/>`}return o};
const SQ=c=>c.map((x,i)=>{const px=24+(i%2)*38,py=24+(i/2|0)*38;return x?`<polygon points="${px},${py} ${px+34},${py} ${px+34},${py+34} ${px},${py+34}" fill="${x}"/><polygon points="${px+27},${py} ${px+34},${py} ${px+34},${py+34} ${px+27},${py+34}" fill="rgba(0,0,0,.12)"/>`:`<polygon points="${px+2},${py+2} ${px+32},${py+2} ${px+32},${py+32} ${px+2},${py+32}" fill="none" stroke="#8E9EA3" stroke-width="2.5" stroke-dasharray="5 4"/>`}).join('');
const IC={budget:{1:svg(BC(1)),2:svg(BC(2)),3:svg(BC(3)),4:svg(BC(4))},share:{1:svg(SQ(['#DE7228','#DE7228','#DE7228','#DE7228'])),2:svg(SQ(['#DE7228','#62767E','#DE7228','#62767E'])),3:svg(SQ(['#DE7228','#62767E','#E8A058','#DE7228'])),4:svg(SQ(['#DE7228','#62767E','#E8A058',null]))},home:{small:svg('<polygon points="20,58 62,58 62,106 20,106" fill="#E8A058"/><polygon points="62,58 98,44 98,92 62,106" fill="#D9722A"/><polygon points="20,58 56,44 98,44 62,58" fill="#F0C48C"/><rect x="42" y="84" width="12" height="22" fill="#1d1612"/><rect x="26" y="66" width="11" height="9" fill="#fff"/><rect x="43" y="66" width="11" height="9" fill="#fff"/><rect x="26" y="82" width="11" height="9" fill="#fff"/>'),
elevator:svg('<polygon points="36,26 70,26 70,108 36,108" fill="#8CA0AA"/><polygon points="70,26 94,14 94,96 70,108" fill="#5F7685"/><polygon points="36,26 60,14 94,14 70,26" fill="#D8CDB4"/>'+ws(42,34,6)),
house:svg('<polygon points="34,64 76,64 76,108 34,108" fill="#F0C48C"/><polygon points="76,64 98,56 98,100 76,108" fill="#E8A058"/><polygon points="26,64 55,30 84,64" fill="#E07A2E"/><polygon points="55,30 104,52 98,56 84,64" fill="#C65A1E"/><rect x="50" y="84" width="12" height="24" fill="#1d1612"/><rect x="40" y="70" width="8" height="8" fill="#fff"/><rect x="62" y="70" width="8" height="8" fill="#fff"/>'),
yard:svg('<polygon points="4,98 100,98 116,110 14,110" fill="#A3B987"/>'+house(0)+'<polygon points="96,100 104,56 112,100" fill="#5F7A3A"/><polygon points="96,100 104,56 104,100" fill="#7C9A68"/>')},
athome:{1:oct(1),2:oct(3),3:oct(5),4:oct(8)},
members:{1:svg(pp(60,1.5,...OR)),2:svg(pp(44,1.25,...OR)+pp(78,1.25,...SL)),3:svg(pp(34,1.1,...OR)+pp(64,1.1,...SL)+pp(92,.7,...LO)),5:svg(pp(24,.9,...OR)+pp(50,1.05,...SL)+pp(76,.7,...LO)+pp(100,.95,...GB))},
outing:{low:svg('<polygon points="20,50 100,50 100,82 20,82" fill="#E48D72"/><polygon points="10,76 110,76 110,100 10,100" fill="#F1BE9E"/><polygon points="10,62 28,62 28,100 10,100" fill="#D9775F"/><polygon points="92,62 110,62 110,100 92,100" fill="#D9775F"/><polygon points="40,56 62,56 56,74 38,74" fill="#F3B15E"/><rect x="18" y="100" width="6" height="8" fill="#9BA36A"/><rect x="96" y="100" width="6" height="8" fill="#9BA36A"/>'),
high:svg('<circle cx="90" cy="32" r="13" fill="#F3B15E"/><polygon points="4,100 44,40 84,100" fill="#8CA0AA"/><polygon points="44,40 84,100 44,100" fill="#5F7685"/><polygon points="50,100 82,58 116,100" fill="#A3B987"/><polygon points="82,58 116,100 82,100" fill="#7C9A68"/><rect x="0" y="100" width="120" height="6" fill="#5F7A3A"/>')}};
/* 評估每題的場景 */
const QZS=['home','dine','park','play','clinic','home'];
/* 評估每題的姿態 */
const QZP=['stand','sit','stand','play','sit','sit'];
function qdog(i){const k=B[S.b].k,h=NPH[k],p=QZP[i];if(!qdog.pre){qdog.pre=1;Object.keys(NPH).forEach(n=>['stand','sit','play'].forEach(q=>{new Image().src=A[n+'_'+q]}))}
const v=SVP[k];if(v){const s=v.quiz[i];return `<div class="qz-dog sv${SVB.includes(s)?' bust':''}${SVF.includes(s)?' mir':''} ${s}" id="qzd"><img src="${A[s]}" alt="${S.b}">`}
return h?`<div class="qz-dog np ${p}" id="qzd"><img src="${A[k+'_'+p]}" style="height:${Math.min(112,104*h[p]/h.stand).toFixed(1)}%" alt="${S.b}">`:`<div class="qz-dog" id="qzd"><img src="${A[k]}" alt="${S.b}">`}
/* 小飼主登記表：進入評估第 1 題前填寫一次（回首頁後重新填） */
const RGW=['散步、逛公園','在家陪伴、一起放鬆','一起出遊、旅行','教牠新把戲','拍照、留下紀錄'];
function regModal(){if($('.rgm'))return;const o=S.owner||{},m=document.createElement('div');m.className='rgm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','rgt');
const sz=b=>['小型犬','中型犬','大型犬'][SZ(b)-1];
m.innerHTML=`<form class="rgb" novalidate><div class="rgi" aria-hidden="true"><svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="8.5" ry="7" fill="currentColor"/><ellipse cx="9.5" cy="17" rx="3.6" ry="4.6" transform="rotate(-18 9.5 17)" fill="currentColor"/><ellipse cx="16" cy="11" rx="3.6" ry="4.8" transform="rotate(-6 16 11)" fill="currentColor"/><ellipse cx="24" cy="11" rx="3.6" ry="4.8" transform="rotate(6 24 11)" fill="currentColor"/><ellipse cx="30.5" cy="17" rx="3.6" ry="4.6" transform="rotate(18 30.5 17)" fill="currentColor"/></svg></div>
<small class="rge0">OWNER · REGISTRATION</small><h2 id="rgt">歡迎來到「毛評估所」</h2><p class="rgs">在開始評估之前，請先填寫小飼主登記表！</p>
<div class="rgg"><label class="rgf"><span>小飼主姓名 <b>*</b></span><input id="rgn" maxlength="10" placeholder="例如：小毛" autocomplete="off" value="${o.n||''}"><em></em></label>
<label class="rgf"><span>小飼主年齡 <b>*</b></span><input id="rga" type="number" inputmode="numeric" min="1" max="120" placeholder="例如：9" value="${o.a||''}"><em></em></label>
<label class="rgf"><span>最想和毛孩一起做的事</span><select id="rgw">${RGW.map(x=>`<option${o.w==x?' selected':''}>${x}</option>`).join('')}</select></label>
<label class="rgf"><span>心中想養的狗狗</span><select id="rgp"><option value="">還不確定</option>${Object.keys(B).map(k=>`<option value="${k}"${o.p==k?' selected':''}>${k}（${sz(B[k])}）</option>`).join('')}</select></label></div>
<label class="rgk"><input type="checkbox" id="rgok"${o.ok?' checked':''}><span>我願意認真參與這 30 天的學習與實作，了解養狗狗需要每天餵食、散步、清理、看醫生與陪伴，做一個有責任感的小飼主！</span></label><em class="rge" id="rge"></em>
<button type="submit" class="rgo">歡迎小飼主，開始評估！</button><button type="button" class="rgh">← 回首頁</button></form>`;
const f=$('form',m),err=(id,t)=>{const el=id=='rgok'?$('#rge',m):$('#'+id,m).parentElement.querySelector('em');el.textContent=t||'';if(id!='rgok')$('#'+id,m).classList.toggle('bad',!!t)};
f.addEventListener('submit',ev=>{ev.preventDefault();const n=$('#rgn',m).value.trim(),a=$('#rga',m).value.trim(),ag=+a,ok=$('#rgok',m).checked;
err('rgn',n?'':'請填寫小飼主的名字');err('rga',!a?'請填寫年齡':(ag>=1&&ag<=120&&Number.isInteger(ag))?'':'請填 1 到 120 的數字');err('rgok',ok?'':'請勾選上面的承諾，才能開始評估');
const bad=[!n&&'rgn',(!a||!(ag>=1&&ag<=120&&Number.isInteger(ag)))&&'rga',!ok&&'rgok'].find(Boolean);if(bad){$('#'+bad,m).focus();return}
S.owner={n,a:ag,w:$('#rgw',m).value,p:$('#rgp',m).value,ok:1};S.reg=1;m.classList.add('out');setTimeout(()=>m.remove(),RM?0:300);const r=$('.rgo',m).getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)});
['rgn','rga'].forEach(id=>$('#'+id,m).addEventListener('input',()=>err(id,'')));$('#rgok',m).addEventListener('change',()=>err('rgok',''));
$('.rgh',m).addEventListener('click',()=>{m.remove();cover()});
document.body.append(m);setTimeout(()=>{const i=$('#rgn',m);if(i&&!i.value)i.focus()},350)}
function setup(){if(S.step<4)S.b=best();if(S.step==0&&!S.reg)setTimeout(regModal,0);const s=ST[S.step],i=S.step,N=ST.length-1,two=s.o&&s.o.length==2;
const cards=s.o?`<div class="cards ${two?'two':''}">${s.o.map((x,j)=>`<button class="cd ${S.pf[s.k]===x[0]?'on':''}" data-a="val" data-v="${x[0]}"><span class="op">OPTION 0${j+1}</span>${IC[s.k][x[0]]}<b>${x[1]}</b><small>${x[2]}</small></button>`).join('')}</div>`:`<div class="nmw"><input class="nm" id="nm" maxlength="8" placeholder="小白" value="${S.name}" autocomplete="off"><button class="go" data-a="go">下一步 →</button></div>`;
app.innerHTML=nav(i==5?1:0)+`<main class="qz"><div class="qz-bg" style="background-image:url(${A[QZS[i]]})"></div>${qdog(i)}${i>0?`<span class="qz-mp">${i<5?`目前最合拍<b>${S.b} ${fit(S.b).pct}%</b>`:S.b}</span>`:''}</div><section class="qz-card"><div class="qz-top"><span class="qz-eb">${EB[i]}</span><div class="qz-paws">${ST.slice(0,N).map((_,j)=>`<i class="${j<i?'done':j==i?'now':''}"></i>`).join('')}</div></div><div class="qz-num"><b>${i+1}</b><span>/ ${N}</span></div><h1>${s.t}</h1><p>${SUBT[i]}</p>${cards}<div class="qz-foot"><button class="bk2" data-a="back">← 上一步</button></div></section></main>`;
root.style.setProperty('--ac',B[S.b].ac);scrollTo(0,0)}
function showDog(){root.style.setProperty('--ac',B[S.b].ac);$('.stage').innerHTML=dogH();$('#trt').innerHTML=trt();const r=$('.stage').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}
const HOME=`<svg viewBox="0 0 860 604" preserveAspectRatio="xMidYMid slice"><rect width="860" height="604" fill="#F0CFAA"/><polygon points="0,0 520,0 300,430 0,430" fill="#F6DDBE"/><polygon points="520,0 860,0 860,430 300,430" fill="#EDC096"/><polygon points="610,0 860,0 860,230 700,430 560,430" fill="#E9B58A" opacity=".55"/><rect x="520" y="70" width="250" height="270" fill="#E6D3B4"/><polygon points="534,84 756,84 756,326 534,326" fill="#CFE0DC"/><polygon points="534,250 600,200 680,262 756,215 756,326 534,326" fill="#A9B77C"/><polygon points="600,326 680,262 756,326" fill="#7F9A66"/><circle cx="700" cy="170" r="22" fill="#F6C46E"/><rect x="640" y="84" width="10" height="242" fill="#E6D3B4"/><polygon points="0,430 860,430 860,604 0,604" fill="#DDB48C"/><polygon points="0,500 860,470 860,604 0,604" fill="#E7C6A0"/><polygon points="0,330 60,300 210,330 270,440 0,450" fill="#E48D72"/><polygon points="40,360 170,350 260,450 0,456" fill="#F1BE9E"/><polygon points="60,350 130,300 190,360" fill="#F3B15E"/><polygon points="150,340 230,310 250,376" fill="#9BAA7C"/><polygon points="0,440 290,440 300,462 0,470" fill="#9BA36A"/><polygon points="740,540 800,420 830,430 790,540" fill="#D4806A"/><polygon points="770,430 700,360 740,330 790,420" fill="#8FA66A"/><polygon points="790,425 830,330 860,350 840,430" fill="#6C8A55"/><polygon points="780,430 760,320 800,350" fill="#A5B87C"/></svg>`;
const NAVS=['評估','配對','一生','回憶錄','模擬評估表','成為飼主的必修課'],SH=['幼年期','青年期','中年期','老年期'],FS=[1,8,15,22],AGE=[0,0,0,0,0,0,1,1,1,2,2,2,2,3,3,4,4,5,6,6,7,8,9,10,11,12,13,14,15,15],MD=['早晨','午後','黃昏','夜晚'];
const nav=a=>`<header class="top"><button class="top-logo" data-a="home" aria-label="回首頁"><img src="${A.logo}" alt="毛評估所"></button><nav class="dock" aria-label="體驗步驟"><span class="dk ${a<0?'on':''}" data-a="home" role="button" tabindex="0" aria-label="首頁"><i class="paw"></i><span>首頁</span></span>${NAVS.map((n,i)=>`<span class="dk st ${i==a?'on':i<a?'done':i>1?'locked':''}" ${i<2?`data-a="nav" data-i="${i}" role="button" tabindex="0"`:''} aria-label="${n}"><b>0${i+1}</b><span>${n}</span></span>`).join('')}</nav></header>`;
/* 評估 → 配對 */
const SZ=b=>b.z<1?1:b.z>1?3:2,cl1=v=>Math.max(0,Math.min(1,v));
const LS={'柴犬':'12–15','柯基犬':'12–14','博美犬':'12–16','貴賓犬':'12–15','馬爾濟斯':'12–15','黃金獵犬':'10–12','哈士奇':'12–14','米克斯':'10–15'};
const XPT={親人:{shiba:2,corgi:4,pom:4,poodle:4,maltese:5,golden:5,husky:3,mutt:3},乖巧:{shiba:3,corgi:3,pom:3,poodle:4,maltese:4,golden:4,husky:1,mutt:3},安靜:{shiba:4,corgi:3,pom:1,poodle:3,maltese:3,golden:4,husky:2,mutt:3},聰明好教:{shiba:3,corgi:4,pom:3,poodle:5,maltese:3,golden:5,husky:2,mutt:3}};
const xs=(b,t)=>t=='活潑'?b.e:t=='不太掉毛'?6-b.s:XPT[t][b.k];
const PER={'米克斯':[.5,1,1,.5],'馬爾濟斯':[.5,2.5,0,0],'貴賓犬':[1,2.5,2,1],'博美犬':[.5,2,2,0],'柯基犬':[1.5,2,1.5,1],'柴犬':[2,2,1,.5],'哈士奇':[2.5,2.5,2,1],'黃金獵犬':[2,2.5,2,0]},HM=['small','elevator','house','yard'],MB=[1,2,3,5],OT=['low','high'];
function fit(bn,pf=S.pf){const b=B[bn],need=SZ(b)+(b.e>=5?.5:0),sup={small:1.2,elevator:2,house:3,yard:3.8}[pf.home]||2,sp=cl1(1-Math.max(0,need-sup)*.28),
al={1:1,2:1.7,3:2.4,4:3}[pf.athome]||1.7,out=pf.outing=='high',exn=1+(b.e-1)/2,exs=1+(al-1)*.45+(out?.9:0),ex=cl1(1-Math.max(0,exn-exs)*.45),
co=cl1(1-Math.max(0,(6-b.a)-(al*1.5+(out?0:.8)))*.28),s2={1:.35,2:.6,3:.9,5:1}[pf.members]||.6,cr=cl1(1-Math.max(0,(b.g+b.s+b.e)/15-s2)*.9),
bud={1:2.2,2:3.2,3:4.2,4:5.2}[pf.budget]||3.2,bu=cl1(1-Math.max(0,SZ(b)+b.g*.5-bud)*.35),pe=PER[bn],v=[HM.indexOf(pf.home),pf.athome-1,MB.indexOf(pf.members),OT.indexOf(pf.outing)],rg=[3,3,3,1];let d=0,n=0;v.forEach((x,i)=>{if(isNaN(x)||x<0)return;d+=Math.abs(x-pe[i])/rg[i];n++});
const per=n?1-d/n:.6;return {sp,ex,co,cr,bu,pct:Math.round(32+67*(.45*(.2*sp+.2*ex+.2*co+.15*cr+.25*bu)+.55*per))}}
const rank=()=>Object.keys(B).sort((a,b)=>fit(b).pct-fit(a).pct),best=()=>rank()[0];
function ready(pf=S.pf){const v=[['空間',{small:3,elevator:5,house:8,yard:10}[pf.home]||5],['家庭',{1:3,2:5,3:8,5:9}[pf.members]||5],['時間',{1:2,2:4,3:7,4:9}[pf.athome]||5],['假日',{low:8,high:4}[pf.outing]||5],['預算',{1:3,2:5,3:8,4:10}[pf.budget]||5]];return {v,pct:Math.round(v.reduce((a,x)=>a+x[1],0)/(v.length*10)*100)}}
const mp=()=>`<span class="mp">目前最合拍<b>${S.b} ${fit(S.b).pct}%</b></span>`;
/* 配對：主卡公園邀玩／客廳站立；小卡站立；背面與取名坐下 */
const mdog=(b,p,cls,w)=>{const v=SVP[b.k];if(v){const s=v[w];return `src="${A[s]}" class="${cls} ${SVF.includes(s)?'np':''} sv"`}return `src="${A[b.k+'_'+p]}" class="${cls} np ${p}"`};
function mtop(){const k=S.b,b=B[k],f=fit(k),r=ready(),no=Object.keys(B).indexOf(k)+1,park=b.e>=4,C=2*Math.PI*42,
chips=[['小型','中型','大型'][SZ(b)-1],'運動 '+['低','低','中','高','高'][b.e-1],'陪伴 '+(b.a<=2?'高':b.a==3?'中':'低'),'掉毛 '+(b.s<=2?'低':b.s==3?'中':'高'),'壽命 '+LS[k]+' 歲'],
chk=[[f.sp,f.sp>=.85?'空間剛好':f.sp>=.6?'空間偏緊，要多帶牠出門':'空間明顯不足'],[f.ex,f.ex>=.85?'運動量跟得上':f.ex>=.6?'運動量要多安排':'運動量恐怕不夠'],[f.co,f.co>=.85?'陪伴時間足夠':f.co>=.6?'陪伴時間稍嫌不足':'獨處時間恐怕太長'],[f.cr,f.cr>=.85?'家人能分擔照顧':f.cr>=.6?'照顧要靠你多費心':'照顧負擔偏重'],[f.bu,f.bu>=.85?'預算寬裕':f.bu>=.6?'預算要精打細算':'每月花費恐怕超出預算']];
root.style.setProperty('--ac',b.ac);
$('#mtop').innerHTML=`<div class="mhd"><div><button class="mbk" data-a="mback">← 重新評估</button><small>${k==S.best?'YOUR BEST MATCH':'YOUR PICK'}</small><h1>${k==S.best?'和你最合拍的牠':'也值得考慮的牠'}</h1></div>
<div class="rdy"><div class="rg2"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#F6E6D0" stroke-width="10"/><circle cx="50" cy="50" r="42" fill="none" stroke="#EE8A34" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C*r.pct/100} ${C}" transform="rotate(-90 50 50)"/></svg><b>${r.pct}<small>%</small></b></div><div><em>READINESS</em><p>${r.pct>=75?'準備得很充分。':r.pct>=50?'有空間，也有需要調整的地方。':'還有不少地方要先準備。'}</p><div class="rb">${r.v.map(([n,x])=>`<div>${n}<i><s style="width:${x*10}%"></s></i><span>${x}/10</span></div>`).join('')}</div></div></div></div>
<div class="mcard"><div class="msc"><div class="sl on" style="background-image:url(${park?A.park:A.home})"></div><div class="bdg"><b>${f.pct}</b>% 契合</div><div class="stgm">${park?'公園':'客廳'}・午後</div><img ${mdog(b,park?'play':'stand','mdg','main')} alt="${k}"></div>
<div class="mif"><small>NO.0${no} · ${b.en}</small><h2>${k}</h2><div class="chips">${chips.map(c=>`<span>${c}</span>`).join('')}</div><div class="chk">${chk.map(([v,t])=>`<div><i class="${v>=.75?'':'w'}">${v>=.75?'✓':'!'}</i>${t}</div>`).join('')}</div><button class="tr2" data-a="mgo">就是牠了 →</button></div></div>`}
const ICO=['米克斯','馬爾濟斯','貴賓犬','博美犬','柯基犬','柴犬','哈士奇','黃金獵犬'];
const PW=n=>`<div class="kp">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`,PW3=n=>`<div class="kp">${[1,2,3].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`,LV=['低','低','中','高','高'];
const kstT=on=>on?'✓ 目前配對中':'點卡片，認識牠';
function kcard(k){const b=B[k],no=Object.keys(B).indexOf(k)+1,sz=SZ(b),szn=['小型','中型','大型'][sz-1],nd=6-b.a,ex=b.e,sh=b.s,on=k==S.b,
M=(l,w,p)=>`<div><b>${l}</b>${p}<em>${w}</em></div>`;
return `<div class="kc ${on?'on':''}" data-a="kpick" data-v="${k}" role="button" tabindex="0" aria-label="選擇${k}，翻面看照顧重點" style="--c:${b.ac}"><div class="kin">
<div class="kf"><div class="kt"><b>NO.0${no}${k==S.best?'<u>BEST</u>':''}</b></div>
<div class="ksc"><i class="kpc">${fit(k).pct}<small>% 契合</small></i><img ${mdog(b,'stand','','card')} alt="${k}"></div>
<div class="kn"><h3>${k}</h3><small>${b.en}</small></div>
<div class="km">${M('體型',szn,PW3(sz))}${M('運動',LV[ex-1],PW(ex))}${M('陪伴',nd>=4?'高需求':nd==3?'中':'低需求',PW(nd))}${M('掉毛',LV[sh-1],PW(sh))}</div>
<div class="kst">${kstT(on)}</div></div>
<div class="kb" data-a="kflip"><div class="kbh"><img ${mdog(b,'sit','','face')} alt=""><div><small>${b.tag} · 壽命 ${LS[k]} 歲</small><h4>${k}</h4></div></div>
<h5>CARE · 四個照顧需求</h5><ul class="kbn"><li><b>運動</b><span>${b.n.act}</span></li><li><b>陪伴</b><span>${b.n.alone}</span></li><li><b>毛髮</b><span>${b.n.care}</span></li><li><b>花費</b><span>${b.n.cost}</span></li></ul>
<div class="kbr"><b>REMINDER · 飼養提醒</b>${b.n.train}</div>
<button class="kbk" data-a="kflip" aria-label="翻回正面">↻ 翻回正面</button></div></div></div>`}
/* 配對小卡：每張卡第一次點會翻到背面，停 1.5 秒後自動翻回；之後再點就停在背面，要再點一次才翻回 */
const KSTAY=1500,KFLIP=800;
function kflip(c,on){clearTimeout(c._kt);c.classList.toggle('flip',!!on);c.setAttribute('aria-pressed',!!on)}
function kpick(c){if(c.classList.contains('flip'))return kflip(c,0);
const k=c.dataset.v,first=!S.kseen[k];S.kseen[k]=1;S.b=k;
$$('.kc').forEach(x=>{const on=x.dataset.v==k;x.classList.toggle('on',on);$('.kst',x).textContent=kstT(on);if(x!=c)kflip(x,0)});
mtop();const r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2);kflip(c,1);
if(first)c._kt=setTimeout(()=>{if(!c.isConnected)return;kflip(c,0);c._kt=setTimeout(()=>{if(c.isConnected&&!$('.nmd'))scrollTo({top:0,behavior:'smooth'})},RM?0:KFLIP)},(RM?0:KFLIP)+KSTAY)}
function match(keep){const ord=rank();S.best=ord[0];if(!keep)S.b=ord[0];
app.innerHTML=nav(1)+`<main class="mtc"><section class="mtop" id="mtop"></section><section class="mbot" id="kbot"><p class="ot9">八位毛孩<small>點卡片認識牠，也可以換一隻。</small></p><div class="kg">${ord.map(kcard).join('')}</div></section></main>`;mtop();scrollTo(0,0)}
function nameModal(){if($('.nmd'))return;const k=S.b,b=B[k],m=document.createElement('div');m.className='nmd';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
m.innerHTML=`<div class="nmb"><button class="nx" data-a="nmx" aria-label="關閉">×</button><div class="nmp" style="--c:${b.ac}"><img ${mdog(b,'sit','','face')} alt="${k}"></div><small>NAME · IT</small><h2>替牠取個名字</h2><p>${k}・契合度 ${fit(k).pct}%</p><input class="nm2" id="nm2" maxlength="8" placeholder="小白" value="${S.name}" autocomplete="off"><div class="chp">${['小白','麻糬','黑糖','棉花','豆花','可樂'].map(n=>`<button data-a="nmchip" data-v="${n}">${n}</button>`).join('')}</div><button class="go" data-a="nmgo">開始 30 天 →</button></div>`;
m.addEventListener('click',e=>{if(e.target===m)m.remove()});app.append(m);const i=$('#nm2');i.addEventListener('keydown',e=>{if(e.key=='Enter'){S.name=i.value.trim()||'小白';play()}else if(e.key=='Escape')m.remove()});setTimeout(()=>i.focus(),250);burst(innerWidth/2,innerHeight/2)}
function stopAll(){clearInterval(S.iv);clearTimeout(S.at);clearInterval(S.rv);clearTimeout(S.pt);S.pop=0;S.pend=0}
function init(){const p=S.pf,sm=({1:50,2:60,3:75,4:88}[p.athome]||60)-({low:0,high:12}[p.outing]||0),u={1:12,2:40,3:60,5:72}[p.members]||40;
buildSeq();Object.assign(S,{pi:0,day:1,happy:70,health:90,trust:35,stress:10,time:sm,family:Math.max(5,u),money:30000,spent:0,bor:0,flags:[],hist:[],ab:{},sud:0,sudT:0,sp:1,sdDays:plan(),sdDone:[],pop:0,pend:0,ps:null});clearInterval(S.iv);clearTimeout(S.at);clearTimeout(S.pt);clearInterval(S.rv);root.style.setProperty('--t',1)}
function play(){init();{const k=B[S.b].k;if(NPH[k])Object.keys(NPH[k]).forEach(p=>{new Image().src=A[k+'_'+p]})}app.innerHTML=nav(2)+`<main class="lf"><section class="lf-scene"><div class="scn" id="scn">${['home','park','play','clinic','bath','dine'].map(k=>`<div class="sl" data-s="${k}" style="background-image:url(${A[k]})"></div>`).join('')}<div class="dogw" id="dw"><img class="dog" src="${A[npose(SEQ[0]||{},scene(1))||B[S.b].k]}" alt="${S.b}"></div></div><div class="hud9"><div class="who"><b>${S.name}</b><small>${B[S.b].en}・${S.b}</small></div><div class="age"><b id="sn"></b><u id="su"></u></div><div class="spd" id="spd">${[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]].map(([v,l])=>`<button class="${v==1?"on":""}" data-a="spd" data-v="${v}" aria-label="${v?"自動翻頁 "+v+" 倍速":"手動翻頁"}">${l}</button>`).join("")}</div></div><div class="sts" id="hud"></div><div class="tkb9"><span>DAY <b id="tkd">01</b>/ 30</span><div class="tkb" id="tk"></div></div></section><aside class="pad9"><div class="cal"><div class="pile"></div><div class="rg"><i></i><i></i><i></i><i></i></div></div></aside></main>`;
hud(1);const l=leaf(0);l.classList.add('drop');$('.cal').append(l);nar(1);sched();scrollTo(0,0)}
function hud(first){const si=sg(S.day),sn=S.ps||scene(S.day);$('#sn').textContent=AGE[Math.min(S.day,30)-1];$('#su').textContent=SH[si];
$('#tk').innerHTML=Array.from({length:30},(_,i)=>`<i class="${i+1<S.day?'d':i+1==S.day?'c':''} ${FS.includes(i+1)?'s':''}">${i+1}</i>`).join('');$('#tkd').textContent=String(Math.min(S.day,30)).padStart(2,'0');
$$('.sl').forEach(x=>x.classList.toggle('on',x.dataset.s==sn));
{const dw=$('#dw'),im=dw&&$('img',dw);if(im){let np=npose(SEQ[S.pi]||{},sn);if(S.happy<40||S.health<40)np=npLow(np);const src=A[np];if(im.getAttribute('src')!==src){im.setAttribute('src',src)}dw.style.height=nph(np,46);dw.dataset.bust=SVB.includes(np)?1:''}}$('#scn').classList.toggle('sd',S.pop==1);{const cur=S.pi==SEQ.length-1?3:2;$$('#app .dk.st').forEach((x,i)=>{x.classList.toggle('on',i==cur);x.classList.toggle('done',i<cur);x.classList.toggle('locked',i>cur)})}
if(first)$('#hud').innerHTML=[['健康','#7C9A68'],['心情','#DE7228'],['羈絆','#E49BB9']].map(([k,c])=>`<div><small>${k}</small><em><i style="background:${c}"></i></em><b></b></div>`).join('')+'<div><small>累計花費</small><b class="mn"></b></div>';
const c=$$('#hud>div'),vals=[S.health,S.happy,S.trust,S.spent],old=S.dv||vals;S.dv=vals.slice();
vals.forEach((n,i)=>{const cell=c[i],b=$('b',cell),o=old[i],fm=v=>i<3?Math.round(v):'NT$ '+Math.round(v).toLocaleString();if(i<3)$('i',cell).style.width=n+'%';if(first||o===n){b.textContent=fm(n);return}
cell.classList.remove('up','dn');void cell.offsetWidth;cell.classList.add(i<3&&n>o?'up':'dn');const t0=performance.now(),dur=800/(S.sp||1);(function f(now){const k=Math.min(1,(now-t0)/dur);b.textContent=fm(o+(n-o)*k);if(k<1)requestAnimationFrame(f)})(t0)});
$('#dw').className='dogw '+(S.happy<40||S.health<40?'sad':S.happy>=75?'hp':'')}
function pop(i,v,t,cls){const c=$$('#hud>div')[i];$$('u',c).forEach(x=>x.remove());if(v)c.insertAdjacentHTML('beforeend',`<u class="${cls||(v>0?'p':'n')}">${t||(v>0?'+':'−')+Math.abs(v)}</u>`)}
const ORN='<svg class="orn" viewBox="0 0 200 70" aria-hidden="true"><polygon points="0,70 50,18 90,70" fill="#9FA34F"/><polygon points="50,18 90,70 30,70" fill="#7E8A3C"/><polygon points="70,70 120,28 170,70" fill="#EE8A34"/><polygon points="120,28 170,70 110,70" fill="#D9722A"/><polygon points="140,70 175,40 200,70" fill="#EF8F78"/></svg>';
function leaf(pi){const it=SEQ[pi],d=it.d,el=document.createElement('article');el.className='leaf';const si=sg(d),q=it.t=='q'?EV(it.id):null,sd=0,bn=B[S.b].n,
hdr=(ic,tp)=>`<div class="lh"><div><div class="ic">${ic}</div><div class="mt">${SG[si][0]} · DAY ${FS[si]}–${SG[si][2]}</div><div class="tm ${sd?'sd':''}">${sd?'● 突發事件':'◐ '+MD[d%4]} · ${tp}</div></div><div class="dy${it.t=='t'?' gh':''}"><small>DAY</small><b>${String(d).padStart(2,'0')}</b></div></div>`;
if(it.t=='f'){const sc=(S.health+S.happy)/2,ln=sc>=75?'牠的一生沒有戲劇性的轉折，只是一天一天，被你放在心上。':sc>=50?'這一生裡有幾次你慢了一步，但你一直在，牠都看見了。':'這段路比你想像的更重。這不是失敗，而是真實的重量：陪一隻狗走完一生，本來就不輕。';
el.innerHTML=`${hdr('★','回顧')}<h2>${S.name} 的一生</h2><p class="sc">${ln}</p><div class="btns"><button class="tr2" data-a="memo">查看回憶錄 →</button></div>`;return el}
if(it.t=='t'){const x=D.t[it.i];el.dataset.k='t';if(it.i>=6)el.dataset.du=7500;el.innerHTML=`${hdr(x.ic,x.tp)}<div class="tw"><h2 class="tt2">${x.t}</h2><p class="tb">${fill(x.b)}</p></div>${ORN}<div class="pz"></div>`;return el}
const tag=TG[q.id],ec=E[q.id]&&E[q.id](),ex=(D.b4[q.id]||[]).filter(x=>S.ex.includes(x[0])).map(x=>x[1]),notes=[ec,...ex,tag&&bn[tag]].filter(Boolean),U={money:'花基金',time:'花時間',delay:'先放著'};
el.dataset.id=q.id;if(sd)el.dataset.sd=1;
el.innerHTML=`${hdr(q.icon,q.topic)}${sd?'<div class="tmr"><span>突發事件・15 秒內決定</span><em><i></i></em><b>15</b></div>':''}<h2>${q.title}</h2><p class="sc">${fill(SC[q.id]?SC[q.id]():q.scene)}</p>${notes.length?`<p class="nt">${notes.join('<br>')}</p>`:''}<div class="ops">${shuf(q.options.map((o,i)=>[o,i])).map(([o,oi],k)=>`<button class="opt" data-a="pick" data-i="${oi}"><i>${'ABC'[k]}</i><span><b>${fill(o.label)}</b><em>${o.uses.map(u=>U[u]).filter(Boolean).join(' · ')}</em></span></button>`).join('')}</div>`;return el}
function arm(l){clearInterval(S.iv);if(!l.dataset.sd)return;const st=Date.now();S.iv=setInterval(()=>{const r=Math.max(0,15-(Date.now()-st)/1000);$('.tmr i',l).style.width=r/15*100+'%';$('.tmr b',l).textContent=Math.ceil(r);if(r<=0){clearInterval(S.iv);const e=D.q.find(q=>q.id==l.dataset.id),i=e.options.findIndex(o=>o.uses.includes('delay'));pick($$('.opt',l)[i<0?2:i],1)}},100)}
function apply(e,o,late){const b=B[S.b],tag=TG[e.id],De={act:b.e,alone:6-b.a,care:b.g}[tag],fx={...o.fx};
if(De!=null){if(o.uses.includes('delay')){fx.happy=(fx.happy||0)-(De-2)*2;fx.health=(fx.health||0)-Math.max(0,De-3)*2;fx.stress=(fx.stress||0)+Math.max(0,De-3)}else if(o.uses.includes('time'))fx.happy=(fx.happy||0)+Math.max(0,De-3)}
if(late)fx.happy=(fx.happy||0)-3;fx.happy=Math.round((fx.happy||0)*1.8);fx.health=Math.round((fx.health||0)*1.8+fx.happy*.25);if(fx.money<0)fx.money=-Math.round(-fx.money*b.z/50)*50;
const hp=o.helper&&S.family>=50;if(hp&&fx.time)fx.time=Math.round(fx.time*.6);
S.health=cl(S.health+(fx.health||0));S.happy=cl(S.happy+(fx.happy||0));S.stress=cl(S.stress+(fx.stress||0));S.time=cl(S.time+(fx.time||0));
S.money+=fx.money||0;if(fx.money<0)S.spent-=fx.money;if(S.money<0){S.bor-=S.money;S.money=0}
S.trust=cl(S.trust+(o.ability?8:o.uses.includes('delay')?-6:2)-(late?3:0));(o.flags||[]).forEach(x=>S.flags.push(x));
if(o.ability)S.ab[o.ability]=(S.ab[o.ability]||0)+1;if(e.kind=='sudden'){S.sudT++;if(o.ability)S.sud++}
return hp}
function burstDog(bad){const r=$('#dw').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,bad)}
function nar(d){const it=SEQ[S.pi];if(!it||it.t!='q')return;const q=EV(it.id),tg=q&&TG[q.id],n=tg&&B[S.b].n[tg];if(n)setTimeout(()=>say('<p>'+n+'</p>',1),500)}
function say(x,raw){const sc=$('#scn');if(!sc)return;$$('.bub',sc).forEach(v=>v.remove());const d=document.createElement('div');d.className='bub';if(raw)d.innerHTML=x;else d.textContent=fill(x);sc.append(d);setTimeout(()=>d.remove(),7000)}
function pick(btn){const lf=btn.closest('.leaf'),ops=btn.parentNode;if(ops.classList.contains('dn'))return;ops.classList.add('dn');
const e=D.q.find(q=>q.id==lf.dataset.id),o=e.options[+btn.dataset.i],h0=S.health+S.happy,hp=apply(e,o);(S.hist=S.hist||[]).push({d:S.day,e,o});
$$('.opt',ops).forEach(x=>x.classList.add(x==btn?'on':'off'));
say(o.result+(hp&&o.helper?'（'+o.helper+'）':''));hud();burstDog(S.health+S.happy<h0);
clearTimeout(S.at);S.at=setTimeout(()=>tear(lf),1000/(S.sp||1))}
/* 隨機突發事件視窗 */
function plan(){return[]}
function dayStart(){clearTimeout(S.pt);S.pend=0;if(S.sdDays.includes(S.day)&&!S.sdDone.includes(S.day)){S.pend=1;S.pt=setTimeout(showPop,2500+Math.random()*5500)}}
function showPop(){S.pend=0;clearTimeout(S.at);const e=D.s[S.sdDays.indexOf(S.day)];if(!e)return;S.sdDone.push(S.day);S.pop=1;S.ps=SCN[e.id]||'home';hud();
const ec=E[e.id]&&E[e.id](),ex=(D.b4[e.id]||[]).filter(x=>S.ex.includes(x[0])).map(x=>x[1]),tag=TG[e.id],notes=[ec,...ex,tag&&B[S.b].n[tag]].filter(Boolean),U={money:'花基金',time:'花時間',delay:'先放著'};
const m=document.createElement('div');m.className='pop';m.dataset.id=e.id;
m.innerHTML=`<div class="pw" role="dialog" aria-label="突發事件"><div class="pb"><span>● 突發事件・15 秒內決定</span><em><i></i></em><b>15</b></div><div class="ph2"><div class="ic">${e.icon}</div><div><div class="mt">DAY ${String(S.day).padStart(2,'0')} · ${e.topic}</div><h2>${e.title}</h2></div></div><p class="sc">${fill(e.scene)}</p>${notes.length?`<p class="nt">${notes.join('<br>')}</p>`:''}<div class="ops">${e.options.map((o,i)=>`<button class="opt" data-a="ppick" data-i="${i}"><i>${'ABC'[i]}</i><span><b>${fill(o.label)}</b><em>${o.uses.map(u=>U[u]).filter(Boolean).join(' · ')}</em></span></button>`).join('')}</div><div class="pf" hidden><button class="tr2" data-a="pclose">繼續 →</button></div></div>`;
$('#app').append(m);const st=Date.now();clearInterval(S.iv);
S.iv=setInterval(()=>{const r=Math.max(0,15-(Date.now()-st)/1000);$('.pb i',m).style.width=r/15*100+'%';$('.pb b',m).textContent=Math.ceil(r);if(r<=0){clearInterval(S.iv);const k=e.options.findIndex(o=>o.uses.includes('delay'));ppick($$('.opt',m)[k<0?2:k],1)}},100)}
function ppick(btn,late){clearInterval(S.iv);const m=btn.closest('.pop'),ops=btn.parentNode;if(ops.classList.contains('dn'))return;ops.classList.add('dn');
const e=D.s.find(q=>q.id==m.dataset.id),o=e.options[+btn.dataset.i],h0=S.health+S.happy,hp=apply(e,o,late);S.pop=2;
$$('.opt',ops).forEach(x=>x.classList.add(x==btn?'on':'off'));
ops.insertAdjacentHTML('afterend',`<div class="rs"><small>RESULT</small>${late?'<p class="hp2 late">時間到——牠等不及了，你還沒做出決定。</p>':''}<p>${fill(o.result)}</p>${hp?`<p class="hp2">${o.helper}。</p>`:''}</div>`);
$('.pf',m).hidden=false;$('.pb',m).classList.add('end');hud();burstDog(S.health+S.happy<h0)}
function pclose(){clearInterval(S.iv);const m=$('.pop');if(m)m.remove();S.pop=0;S.ps=null;hud();sched()}
function sched(){clearInterval(S.rv);const l=$('.leaf:not(.tear)');if(!l||l.dataset.k!='t')return;l._p=l._p||0;let last=Date.now();
S.rv=setInterval(()=>{const n=Date.now();if(S.sp)l._p+=(n-last)*S.sp;last=n;const z=$('.pz',l);if(z)z.textContent=S.sp?'':'已暫停・按 1× 繼續';if(l._p>=(+l.dataset.du||3600)){clearInterval(S.rv);tear(l)}},80)}
function tear(btn){const lf=btn.closest('.leaf');if(!lf||lf.classList.contains('tear')||S.pi>=SEQ.length-1)return;clearTimeout(S.at);clearInterval(S.rv);S.pi++;if(SEQ[S.pi].t=='f')setTimeout(()=>farewell(),RM?0:120);const pd=SEQ[S.pi].d;if(pd!=S.day)S.time=cl(S.time+10);S.day=pd;const nx=leaf(S.pi),d=.95/(S.sp||1);
lf.style.animationDuration=d+'s';lf.classList.add('tear');$('.cal').append(nx);setTimeout(()=>lf.remove(),RM?320:d*1000+40);hud();nar(S.day);sched();
if(matchMedia('(max-width:900px)').matches)scrollTo({top:0,behavior:'smooth'})}
function go(fn,x,y){if(RM||S.tr){fn();return}S.tr=1;const c=$('.cover');if(c)c.classList.add('go');root.style.setProperty('--x',x+'px');root.style.setProperty('--y',y+'px');burst(x,y);
const mk=k=>{const d=document.createElement('div');d.className='tov '+k;document.body.append(d);return d},o=mk('o'),b=mk('b');b.innerHTML='<i>ASSESSMENT</i><strong>01</strong>';
requestAnimationFrame(()=>{o.classList.add('in');b.classList.add('in')});
setTimeout(()=>{fn();o.classList.add('out');b.classList.add('out');setTimeout(()=>{o.remove();b.remove();S.tr=0},900)},780)}
{let dx=0,sx=0,sl=0,rail=null,mv=0;app.addEventListener('pointerdown',e=>{rail=e.pointerType=='mouse'&&e.button==0?e.target.closest('.kg'):null;if(rail){sx=e.clientX;sl=rail.scrollLeft;mv=0}});addEventListener('pointermove',e=>{if(!rail)return;dx=e.clientX-sx;if(Math.abs(dx)>6){mv=1;rail.classList.add('dg')}if(mv)rail.scrollLeft=sl-dx});addEventListener('pointerup',()=>{if(rail){rail.classList.remove('dg');const r=rail;rail=null;if(mv)setTimeout(()=>{mv=0},0)}});app.addEventListener('click',e=>{if(mv){e.stopPropagation();e.preventDefault();mv=0}},true)}
app.addEventListener('click',ev=>{const b=ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,s=ST[S.step];
if(a=='start'){const r=b.getBoundingClientRect();intro(r.left+r.width/2,r.top+r.height/2)}
else if(a=='brd'){S.b=b.dataset.v;$$('.cd,.o').forEach(x=>x.classList.toggle('on',x==b));showDog()}
else if(a=='val'){S.pf[s.k]=isNaN(b.dataset.v)?b.dataset.v:+b.dataset.v;$$('.cd,.o').forEach(x=>x.classList.toggle('on',x==b));const r=b.getBoundingClientRect();burst(r.right-30,r.top+r.height/2);const qd=$('#qzd');if(qd)qd.classList.add('bounce');setTimeout(()=>{if(S.step==4)match();else{S.step++;setup()}},RM?300:720)}
else if(a=='ex'){const v=b.dataset.v,i=S.ex.indexOf(v);if(i>-1)S.ex.splice(i,1);else if(S.ex.length<3)S.ex.push(v);b.classList.toggle('on',S.ex.includes(v));$('.go').disabled=S.ex.length!=3}
else if(a=='go'){if(s.k=='name'){S.name=$('#nm').value.trim()||'小白';return play()}if(s.multi)return match();S.step++;setup()}
else if(a=='kflip')kflip(b.closest('.kc'),0)
else if(a=='kpick')kpick(b)
else if(a=='mdog'){S.b=b.dataset.v;$$('.mtl').forEach(x=>x.classList.toggle('on',x==b));mtop();const r=$('.mdg').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}
else if(a=='mgo')nameModal();else if(a=='nmx'){const m=$('.nmd');if(m)m.remove()}else if(a=='nmchip'){$('#nm2').value=b.dataset.v;$('#nm2').focus()}else if(a=='nmgo'){S.name=$('#nm2').value.trim()||'小白';play()}else if(a=='mback'){S.step=4;setup()}
else if(a=='back'){if(S.step==5)match(1);else if(S.step==0)cover();else{S.step--;setup()}}
else if(a=='home'){stopAll();cover()}else if(a=='nav'){stopAll();const i=+b.dataset.i,P=S.pf,ks=['home','athome','members','outing','budget'],u=ks.findIndex(k=>!P[k]);if(i==0){S.step=0;setup()}else if(u<0)match();else{S.step=u;setup()}}
else if(a=='ppick')ppick(b);else if(a=='pclose')pclose();else if(a=='pick')pick(b);else if(a=='tear')tear(b);
else if(a=='spd'){S.sp=+b.dataset.v;root.style.setProperty('--t',1/(S.sp||1));$$('#spd button').forEach(x=>x.classList.toggle('on',+x.dataset.v==S.sp));sched()}
else if(a=='swap'){clearInterval(S.iv);clearTimeout(S.at);clearTimeout(S.pt);S.pop=0;S.pend=0;S.step=0;setup()}else if(a=='memo'){memo()}else if(a=='again'){clearInterval(S.iv);clearTimeout(S.at);clearTimeout(S.pt);S.pop=0;S.pend=0;S.pf={};S.ex=[];S.name='';cover()}});
app.addEventListener('keydown',ev=>{if((ev.key=='Enter'||ev.key==' ')&&ev.target.matches('[role=button]')){ev.preventDefault();ev.target.click()}});
/* ===== 回憶錄 ===== */
const QZ=[
['狗狗的 1 歲，相當於人類幾歲？（以中型犬為例）',['大約 1 歲，跟人一樣','大約 15 歲，已經是青少年','大約 30 歲，已經成年很久'],1,'狗的時間走得比人快：中型犬 1 歲約等於人類 15 歲，2 歲約 24 歲，之後每年約再加 4–5 歲。所以牠的健檢和照顧不能用人的節奏來想。'],
['下列哪一種食物，不能隨便餵給狗？',['煮熟、無調味的雞胸肉','巧克力、葡萄、洋蔥','少量的白開水'],1,'巧克力、葡萄／葡萄乾、洋蔥、大蒜、木糖醇都可能讓狗中毒。誤食要儘快聯絡獸醫。'],
['狗狗把身體壓低、前腳伸直、屁股翹高、尾巴搖不停，牠想說什麼？',['我要攻擊你','來玩吧！','我很不舒服'],1,'這是「玩耍鞠躬」，是狗狗邀請你或同伴一起玩的訊號。要判斷情緒，要同時看耳朵、尾巴和全身姿勢，不能只看尾巴有沒有搖。'],
['一隻中型犬的一生，花費大約是下列哪一個等級？（教育模擬估算）',['幾萬元就夠了','約數十萬元，含食物、醫療、用品與美容','只要買狗的錢，之後幾乎不用花'],1,'食物、疫苗、驅蟲、健檢、生病醫療、美容與用品加起來，一生常常是數十萬元以上，老年期的醫療往往是最大的一筆。'],
['「狗狗搖尾巴，就代表牠很開心」這句話是真的還是迷思？',['是真的，搖尾巴一定是開心','是迷思，搖尾巴只代表情緒被激起','是真的，但只有小型犬適用'],1,'搖尾巴代表情緒被激起，可能是開心，也可能是緊張或戒備。要同時觀察尾巴的高度、速度、耳朵與身體的鬆緊。']];
function farewell(){
if(document.querySelector('.fw')||document.querySelector('.mm'))return;
const nm=S.name,dk=A[B[S.b].k],SC=[['感謝','謝謝你，來到我的生命裡',['謝謝你陪我度過這段美好的時光。','謝謝你用自己的方式，讓我的生活變得不一樣。','能夠認識你、照顧你，是我很珍惜的事。','謝謝你成為我的家人，帶給我好多回憶。']],
['不捨','我真的很捨不得你',['我還有好多事情想和你一起做。','雖然想到要和你分開，我還是會很難過。','我會想念你跑向我的樣子，還有你撒嬌的時候。','如果可以，我希望能再多陪你一點時間。']],
['愛與陪伴','希望你知道，你一直都很重要',['不管你在哪裡，你永遠都是我最珍惜的家人。','你不需要做得很好，我都一樣愛你。','即使不能再摸摸你，我對你的愛也不會消失。','你曾經被好好愛著，這件事永遠不會改變。']],
['思念','我會帶著回憶繼續生活',['以後看到和你有關的事物，我還是會想起你。','雖然你不在身邊了，但我們一起生活的回憶還在。','我會把你帶給我的快樂，好好收藏在心裡。','想你的時候，我會記得我們曾經有多幸福。']],
['祝福','希望你在另一個地方也能好好的',['希望你在另一個地方，也能自由自在地奔跑。','希望你沒有煩惱，每一天都能安心地睡覺。','謝謝你陪我走過一段路，接下來也要好好的。','如果有下一次相遇，希望我們還能再成為家人。']]],
SAY=SC.flatMap(c=>c[2]),
IC={flower:'<svg viewBox="0 0 80 80"><polygon points="40,12 52,30 40,38 28,30" fill="#E58A7A"/><polygon points="40,38 52,30 62,44 48,48" fill="#F2B48B"/><polygon points="40,38 28,30 18,44 32,48" fill="#D9604F"/><polygon points="40,38 48,48 40,58 32,48" fill="#F4C46D"/><polygon points="39,58 41,58 42,72 38,72" fill="#7C9A68"/><polygon points="42,66 56,58 52,70" fill="#9FB87C"/></svg>',
bone:'<svg viewBox="0 0 80 80"><g transform="translate(0 22.9) scale(0.1786)"><path fill="#ebdec9" stroke="#ebdec9" stroke-width="1.2" stroke-linejoin="round" fill-rule="evenodd" d="M282.0 143.0L302.0 168.0L354.3 158.3L384.6 137.6L386.9 88.9L412.2 62.2L420.0 34.0L401.9 15.1L353.2 14.2L299.5 53.5L145.2 53.8L111.5 2.5L70.2 0.2L37.2 34.2L43.9 69.5L3.0 113.0L6.0 121.0L59.8 139.2L81.0 136.0L102.0 118.0L134.4 79.4L236.9 81.1L292.5 95.5L295.4 114.4Z"/><path fill="#c9ad8b" stroke="#c9ad8b" stroke-width="1.2" stroke-linejoin="round" fill-rule="evenodd" d="M86.0 178.0L107.4 174.4L143.4 142.4L178.0 136.0L147.3 121.7L102.0 118.0L81.0 136.0ZM420.0 34.0L412.2 62.2L386.9 88.9L384.6 137.6L354.3 158.3L302.0 168.0L322.4 191.6L387.9 191.9L427.9 157.9L425.1 118.1L445.7 76.5Z"/><path fill="#e0ceb1" stroke="#e0ceb1" stroke-width="1.2" stroke-linejoin="round" fill-rule="evenodd" d="M178.0 136.0L282.0 143.0L295.4 114.4L292.5 95.5L236.9 81.1L134.4 79.4L102.0 118.0L147.3 121.7Z"/><path fill="#d2bb98" stroke="#d2bb98" stroke-width="1.2" stroke-linejoin="round" fill-rule="evenodd" d="M6.0 121.0L34.7 173.3L86.0 178.0L81.0 136.0L59.8 139.2Z"/></g></svg>',
blanket:'<svg viewBox="0 0 80 80"><polygon points="12,28 68,22 70,58 10,62" fill="#5F7685"/><polygon points="12,28 40,25 38,60 10,62" fill="#7E96A4"/><polygon points="40,25 68,22 70,58 38,60" fill="#4B6070"/><polygon points="10,62 70,58 72,66 8,70" fill="#EE8A34"/></svg>'},
GF=[['flower','一束小花','希望牠一路上都有花香相伴','你替牠放了一束小花，願牠一路都有花香。'],['bone','最愛的零食','希望牠到了汪星，也能吃到最喜歡的味道','你為牠準備了最愛的零食，到了汪星也吃得到。'],['blanket','溫暖的毯子','希望牠永遠都暖暖的','你替牠蓋上溫暖的毯子，願牠永遠暖暖的。']],
st={w:null,g:null,cat:0},f=document.createElement('div');f.className='fw';f.tabIndex=-1;
const stars=Array.from({length:70},()=>`<i style="left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*72).toFixed(1)}%;--z:${(1+Math.random()*2.2).toFixed(1)}px;--d:${(2+Math.random()*4).toFixed(1)}s;--l:-${(Math.random()*5).toFixed(1)}s"></i>`).join('');
const sk=(a,b)=>{f.classList.add('x');setTimeout(()=>{f.classList.remove('x');b()},380)};
const st1=()=>`<div class="fwb"><small>DAY 30 · 最後一天</small><div class="fwd"><img src="${dk}" alt=""></div><h2>陪牠走完最後一段</h2><p>清晨的光灑進來，${nm}靜靜地靠在你身邊。<br>牠的呼吸很輕，像在說：「我很累了，但我很安心。」</p><button class="tr2" data-f="1">陪牠走完最後一段 →</button></div>`,
PK=[0,1,2,3,4].sort(()=>Math.random()-.5).slice(0,4).map(c=>({c,k:Math.floor(Math.random()*SC[c][2].length)})),base=c=>SC.slice(0,c).reduce((n,x)=>n+x[2].length,0),
st2=()=>`<div class="fwk"><div class="fwkt"><span class="fwke">FAREWELL · 離別儀式</span><span class="fwkp"><i class="now"></i><i></i></span></div>
<div class="fwkn"><b>1</b><span>/ 2</span></div><h2>你想對${nm}說什麼？</h2><p class="fwks">挑一句最接近你現在心情的話，也可以寫下自己的。</p>
<div class="fwka">${PK.map((x,i)=>{const gi=base(x.c)+x.k;return `<button class="fwa${st.w===gi?' on':''}" data-f="w" data-i="${gi}" style="--i:${i}"><i>${'ABCD'[i]}</i><b>「${SC[x.c][2][x.k]}」</b></button>`}).join('')}</div>
<label class="fwi" data-f="own"><span class="fwil"><i>★</i>或者，寫下你自己的話</span><input id="fwin" maxlength="40" placeholder="例如：下輩子，我還要當你的家人" autocomplete="off"></label>
<div class="fwkf"><button class="tr2" data-f="2" disabled>請先選一句話</button></div></div>`,
st3=()=>`<div class="fwk"><div class="fwkt"><span class="fwke">FAREWELL · 離別儀式</span><span class="fwkp"><i class="done"></i><i class="now"></i></span></div>
<div class="fwkn"><b>2</b><span>/ 2</span></div><h2>為${nm}準備一份心意</h2><p class="fwks">選一份你想送給牠的禮物，陪牠走一段路。</p>
<div class="fwga">${GF.map((g,i)=>`<button class="fwg${st.g===i?' on':''}" data-f="g" data-i="${i}" style="--i:${i}"><span class="gi">${IC[g[0]]}</span><b>${g[1]}</b><em>${g[2]}</em></button>`).join('')}</div>
<div class="fwkf"><button class="tr2" data-f="3" disabled>請先選一份心意</button></div></div>`,
st4=()=>`<div class="fwn"><div class="stars">${stars}</div><div class="fwb"><div class="moon"><img src="${dk}" alt=""></div><h2>${nm}回到汪星了</h2><p>你說：「${st.w<0?st.own.replace(/[<>&]/g,''):SAY[st.w]}」<br>${GF[st.g][3]}<br>夜空裡多了一顆星星，牠會一直看著你。</p><button class="tr2" data-f="4">翻開陪伴回憶錄 →</button></div></div>`;
const put=h=>{f.innerHTML=h;f.classList.toggle('night',!!f.querySelector('.fwn'));f.scrollTop=0};
put(st1());document.body.append(f);document.body.style.overflow='hidden';f.focus();
f.addEventListener('input',e=>{if(e.target.id!='fwin')return;const v=e.target.value.trim(),lb=e.target.closest('.fwi'),nb=$('[data-f="2"]',f);st.own=v;lb.classList.toggle('on',!!v);if(v){st.w=-1;$$('[data-f=w]',f).forEach(b=>b.classList.remove('on'));nb.disabled=false;nb.textContent='下一步 →'}else{const any=$('[data-f=w].on',f);nb.disabled=!any;if(!any)nb.textContent='請先選一句話'}});
f.addEventListener('keydown',e=>{e.stopPropagation()});
f.addEventListener('click',e=>{const t=e.target.closest('[data-f]');if(!t||t.disabled)return;const a=t.dataset.f;
if(a=='own'){return}
if(a=='c'){st.cat=+t.dataset.i;$$('[data-f=c]',f).forEach(b=>b.classList.toggle('on',b==t));$('#fwsay',f).innerHTML=sayG();return}
if(a=='w'||a=='g'){const k=a=='w'?'w':'g';st[k]=+t.dataset.i;if(a=='w'){st.own='';const oi=$('#fwin',f);if(oi)oi.value='';$('.fwi',f).classList.remove('on')}$$('[data-f='+a+']',f).forEach(b=>b.classList.toggle('on',b==t));const nb=$('[data-f="'+(a=='w'?2:3)+'"]',f);nb.disabled=false;nb.textContent=a=='w'?'下一步 →':'送出這份心意 →'}
else if(a=='1')sk(0,()=>put(st2()));else if(a=='2')sk(0,()=>put(st3()));else if(a=='3')sk(0,()=>{S.fwMsg=st.w<0?st.own:SAY[st.w];put(st4());if(typeof burst=='function')burst(innerWidth/2,innerHeight*.25)});
else if(a=='4'){f.remove();document.body.style.overflow='';memo()}});
}
function memo(){
if(document.querySelector('.mm'))return;
const H=S.hist||[],gr=h=>h.o.fx.health>=4?2:h.o.fx.health<0?0:1,
pool=H.map((h,i)=>i).sort(()=>Math.random()-.5).slice(0,10).sort((a,b)=>a-b).map(i=>H[i]),
dk=B[S.b].k,sc=h=>SCN[h.e.id]||'home',
SCI={home:A.home,park:A.park,play:A.play,clinic:A.clinic,bath:A.bath,dine:A.dine},
n=pool.length,
bub=h=>{const r=fill(h.o.result||'').split(/[，。]/)[0];return r.length>14?r.slice(0,14)+'…':r},
agef=h=>AGE[Math.min(h.d,30)-1]+' 歲・'+SH[sg(h.d)],
img=(h,s)=>SCI[s]?`<div class="phi" style="background-image:url(${SCI[s]})"></div>`:`<div class="phi">${HOME}</div>`,
pol=(h,i,big)=>{const g=gr(h),s=sc(h),dc=['#C2473B','#D9A03B','#3E8E63'][g];return `<div class="pl${big?' big':''}" ${big?'':`data-i="${i}" role="button" tabindex="0" aria-label="放大查看 DAY ${h.d}"`}><div class="ph" data-s="${s}">${img(h,s)}${(np=>`<img src="${A[np]}" style="width:auto;height:${nph(np,58)}" alt="">`)(npose({t:'q',id:h.e.id},s))}<span class="bb">${bub(h)}</span></div><div class="pc"><div class="pr"><b>DAY ${String(h.d).padStart(2,'0')}</b><em>${agef(h)}</em></div><span class="pt">${h.e.title}</span><span class="po"><i style="background:${dc}"></i>${fill(h.o.label)}</span></div></div>`},
cardW=h=>0,
cats=Object.keys(AB).map(k=>({k,rows:H.filter(h=>(h.e.options.find(o=>o.ability)||{}).ability==k)})).filter(c=>c.rows.length),
good=H.filter(h=>gr(h)==2).length,tot=H.length||1,
mk=['✗','△','✓'],mc=['bad','mid','ok'],
vd=good/tot>=.7?'你把「照顧」放在順位很前面的位置。多數時候你做的是對牠長久來說比較好的決定。':good/tot>=.4?'你有好幾次選了對當下比較輕鬆的做法，這很人性。下面的檢核表會告訴你，哪些地方值得再加強。':'這一生裡，你有不少選擇偏向省事或情緒反應。這不是失敗，而是提醒：領養前，要先看清楚自己的極限。',
m=document.createElement('div');m.className='mm';
m.innerHTML=nav(3)+`<button class="mx" data-m="x" aria-label="返回">← 返回</button>
<section class="m1"><div class="m1h"><div><small>MEMORIES · ${S.name} 的回憶錄</small><h2>${S.name} 的回憶</h2><p>${B[S.b].n0||S.b}・${AGE[29]} 歲・${pool.length} 張照片・點照片放大，按住左右拖曳或用箭頭移動。</p></div><div class="mctl"><button class="mbtn" data-m="prev" aria-label="往前">←</button><button class="mbtn" data-m="next" aria-label="往後">→</button></div></div>
<div class="rpw" id="rpw"><div class="rp"><div class="pi"><img src="${A[dk]}" alt=""><b>${S.name}</b><small>${S.b}</small><span>DAY 01 來到家裡・一起生活 30 天・累計花費 NT$ ${Math.round(S.spent).toLocaleString()}</span></div>${pool.map((h,i)=>pol(h,i)).join('')}</div></div>
<button class="tr2 mdn" data-m="dn">查看模擬評估表 →</button></section>
<section class="m2" id="m2">${(()=>{
const pct=Math.round(good/tot*100),C=2*Math.PI*52,
hd=pct>=70?'你把照顧放在很前面的位置':pct>=40?'你很用心，但還有成長空間':'領養前，還需要多一點準備',
bst=h=>h.e.options.find(o=>o.ability),
stg=SH.map((nm,k)=>{const rows=H.filter(h=>sg(h.d)==k),g=rows.filter(h=>gr(h)==2).length,wr=rows.filter(h=>gr(h)<2).sort((x,y)=>gr(x)-gr(y))[0],bt=rows.find(h=>gr(h)==2),hl=wr||bt||rows[0];return{nm,rows,g,wr,hl}}).filter(x=>x.rows.length),
cs=cats.map(c=>({k:c.k,n:c.rows.length,g:c.rows.filter(h=>gr(h)==2).length,r:c.rows})),
low=cs.slice().sort((x,y)=>x.g/x.n-y.g/y.n)[0],lw=low&&low.g<low.n?low.r.filter(h=>gr(h)<2).sort((x,y)=>gr(x)-gr(y))[0]:null,
GR=[{t:'活動與運動需求型',e:'ACTIVE',d:['哈士奇','黃金獵犬'],ab:['C'],w:'需要大量散步、跑跳，和你一起動起來。',y:'你在運動陪伴上做得穩，也有時間帶牠出門。'},{t:'行為訓練與生活規律型',e:'TRAINING',d:['柴犬','柯基犬'],ab:['E','D'],w:'聰明有主見，要靠耐心訓練和固定的作息。',y:'你願意花心思建立規矩與陪伴，適合需要訓練的牠。'},{t:'毛髮與日常清潔型',e:'GROOMING',d:['貴賓犬','馬爾濟斯'],ab:['B'],w:'毛要天天梳、定期美容，日常清潔不能少。',y:'你對清潔護理很上手，打理毛髮不是難事。'},{t:'個別觀察與日常照護型',e:'OBSERVE',d:['博美犬','米克斯'],ab:['F','A'],w:'每隻狀況不同，要多觀察飲食與身體小變化。',y:'你留意健康與飲食的細節，適合需要細心觀察的牠。'}].map(g=>{const rs=g.ab.map(k=>cs.find(c=>c.k==k)).filter(Boolean),n=rs.reduce((a,c)=>a+c.n,0),st=n?rs.reduce((a,c)=>a+c.g,0)/n:.5,af=g.d.reduce((a,d)=>a+fit(d).pct,0)/2;return {...g,st,af,sc:Math.round(.6*af+.4*(50+st*50))}}).sort((x,y)=>y.sc-x.sc),
_cd=(S.cd={gi:['ACTIVE','TRAINING','GROOMING','OBSERVE'].indexOf(GR[0].e),rb:GR[0].d.slice().sort((a,b)=>fit(b).pct-fit(a).pct)[0],r:'ABCDEF'.split('').map(k=>{const c=cs.find(x=>x.k==k);return c?Math.round(c.g/c.n*100):-1})}),
rec=GR[0],
bar=(l,v)=>`<div class="mbr"><span>${l}</span><i><s style="width:${Math.max(4,Math.min(100,v))}%"></s></i><b>${Math.round(v)}</b></div>`;
return `<nav class="ltb rtb" role="tablist"><button class="on" data-r="0"><b>01</b>總覽</button><button data-r="1"><b>02</b>四季與面向</button><button data-r="2"><b>03</b>推薦犬種</button></nav><div class="rpn on" data-p="0"><div class="rbn" style="background-image:url(${SCI.home})"><img src="${A[dk]}" alt=""><div><small>CHAPTER 02 · CHECKLIST</small><b>模擬評估表</b></div></div><div class="m2h"><small>CHECKLIST · 模擬結果</small><div class="rdy2"><div class="rg3"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(43,29,20,.14)" stroke-width="10"/><circle cx="60" cy="60" r="52" fill="none" stroke="#EE8A34" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C*pct/100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 60 60)"/></svg><b>${pct}<small>%</small></b></div><div><h2>${S.name} 的一生，<br>${hd}。</h2><p class="vd">${vd.replace('下面的檢核表會告訴你，哪些地方值得再加強。','接著看牠的四個季節，和你照顧的六個面向。')}</p></div><figure class="hro"><div class="sph" style="background-image:url(${H.length?SCI[sc(H[0])]:''})"><img src="${A[dk]}" alt=""><em>${S.name}</em></div></figure></div></div>
<div class="fgs"><div><small>理想做法</small><b>${good}<em> / ${tot}</em></b><p>你在 ${tot} 個選擇裡，做了 ${good} 次對牠長久最好的決定。</p></div><div><small>牠的狀態</small>${bar('健康',S.health)}${bar('心情',S.happy)}${bar('羈絆',S.trust)}</div><div><small>陪牠走完</small><b>30<em> 天</em></b><p>累計花費 NT$ ${Math.round(S.spent).toLocaleString()}（約 ${(S.spent/1000).toFixed(1)}K），模擬而已，真實會更多。</p></div></div><button class="tr2 rnx" data-r="1">看牠的四個季節 →</button></div>
<div class="rpn" data-p="1"><div class="rbn" style="background-image:url(${SCI.park})"><img src="${A[dk]}" alt=""><div><small>A LIFE IN FOUR SEASONS</small><b>四季與六個面向</b></div></div><div class="sh2"><small>A LIFE IN FOUR SEASONS</small><h3>牠的一生，四個季節</h3></div>
<div class="ssn">${stg.map((x,k)=>{const h=x.hl,sc0=sc(h),tx=x.wr?`「${h.e.title}」：${(bst(h)?'比較好的做法是「'+fill(bst(h).label)+'」':'再想一想')}`:`「${h.e.title}」：${fill(h.o.label)}，這個決定很好`;return `<figure class="sea"><div class="sph" style="background-image:url(${SCI[sc0]})"><img src="${A[dk]}" alt=""><em>${String(k+1).padStart(2,'0')}</em></div><figcaption><b>${x.nm}</b><span class="sdt">${Array.from({length:x.rows.length},(_,i)=>`<i class="${i<x.g?'on':''}"></i>`).join('')}</span><small>${x.g} / ${x.rows.length} 次理想做法</small><p>${tx}</p></figcaption></figure>`}).join('')}</div>
<div class="sh2"><small>CARE BALANCE</small><h3>六個照顧面向</h3></div>
${(()=>{const N=cs.length,cx=190,cy=165,R=100,pt=(i,r)=>{const t=-Math.PI/2+i*2*Math.PI/N;return [cx+r*Math.cos(t),cy+r*Math.sin(t)]},val=cs.map(c=>c.n?c.g/c.n:0),poly=r=>cs.map((_,i)=>pt(i,r).map(n=>n.toFixed(1)).join(',')).join(' '),vp=val.map((v,i)=>pt(i,R*Math.max(.04,v)));return `<div class="rdr"><svg viewBox="0 0 380 340" role="img" aria-label="六個照顧面向雷達圖">${[.25,.5,.75,1].map(k=>`<polygon points="${poly(R*k)}" fill="${k==1?'rgba(255,255,255,.55)':'none'}" stroke="rgba(59,42,32,.18)" stroke-width="1"/>`).join('')}${cs.map((_,i)=>`<line x1="${cx}" y1="${cy}" x2="${pt(i,R)[0].toFixed(1)}" y2="${pt(i,R)[1].toFixed(1)}" stroke="rgba(59,42,32,.15)"/>`).join('')}<polygon points="${vp.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="rgba(238,138,52,.38)" stroke="#E0701E" stroke-width="2.5" stroke-linejoin="round"/>${vp.map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5" fill="#E0701E" stroke="#fff" stroke-width="2"/>`).join('')}${cs.map((c,i)=>{const [x,y]=pt(i,R+30),an=Math.abs(x-cx)<8?'middle':x>cx?'start':'end',dx=an=='start'?-14:an=='end'?14:0;return `<text x="${(x+dx).toFixed(1)}" y="${(y-2).toFixed(1)}" text-anchor="${an}" class="rl1">${AB[c.k]}</text><text x="${(x+dx).toFixed(1)}" y="${(y+14).toFixed(1)}" text-anchor="${an}" class="rl2">${Math.round(val[i]*100)}%</text>`}).join('')}</svg><p class="rln">越靠外圈，代表那個面向你做的理想決定越多。</p></div>`})()}<button class="tr2 rnx" data-r="2">看推薦的犬種 →</button></div>
<div class="rpn" data-p="2"><div class="rbn" style="background-image:url(${SCI.clinic})"><img src="${A[dk]}" alt=""><div><small>YOUR MATCH</small><b>適合你的牠</b></div></div><div class="sh2"><small>YOUR MATCH</small><h3>綜合你的選擇，推薦這兩隻</h3></div>
<div class="rcm"><div class="rch"><small>${rec.e}</small><h4>${rec.t}</h4><p>${rec.y}${rec.w}</p></div><div class="rcd">${rec.d.map(n=>`<figure class="rcc"><div class="rci"><img src="${A['ic_'+B[n].k]}" alt="${n}"></div><figcaption><b>${n}</b><span class="rcp">${fit(n).pct}<small>% 契合</small></span><small>${B[n].tag}</small></figcaption></figure>`).join('')}</div><div class="rco">${GR.slice(1).map(g=>`<span><b>${g.t}</b>${g.d.join('、')}</span>`).join('')}</div></div>
${lw?`<div class="nxt"><small>下次可以這樣</small><p>你在「${AB[low.k]}」比較吃力。像「${lw.e.title}」那天，你選了「${fill(lw.o.label)}」；${bst(lw)?'更好的做法是「'+fill(bst(lw).label)+'」。':'值得再想想。'}</p></div>`:`<div class="nxt"><small>做得很好</small><p>六個面向你都顧到了。真正的養狗，比這一生模擬更累，也更值得。</p></div>`}
<small class="mlg">每個圓點是一次選擇，亮起的是理想做法。</small><div class="btns"><button class="tr2 ol" data-m="bk1">← 回到回憶錄</button><button class="tr2" data-m="l3">飼養迷思大揭密 →</button></div></div>`})()}</section>
<section class="m3" id="m3"><div class="rbn" style="background-image:url(${SCI.dine})"><img src="${A[dk]}" alt=""><div><small>CHAPTER 03 · BEFORE YOU ADOPT</small><b>成為飼主的必修課</b></div></div><div class="lh3"><small>BEFORE YOU ADOPT · 養狗須知</small><h2>成為飼主的<br>必修課</h2><p>每一堂都能動手玩。答錯沒關係，牠不會知道，但你會記得。</p></div>
<nav class="ltb" id="ltb" role="tablist"><button class="on" data-l="0"><b>01</b>牠幾歲？</button><button data-l="1"><b>02</b>能不能吃</button><button data-l="2"><b>03</b>身體語言</button><button data-l="3"><b>04</b>一生花費</button><button data-l="4"><b>05</b>迷思翻翻卡</button><button data-l="5"><b>06</b>家庭分工</button></nav>
<div class="lpn" id="lpn"></div>
<div class="rcs"><div class="rcl"><small>TAKE IT HOME · 帶走這份紀錄</small><h3>${S.name} 的陪伴紀錄，<br>帶回家收藏</h3><p>用手機掃描你的專屬 QR 碼，就能下載 ${S.name} 的成果小卡，存進相簿或傳給朋友。</p><div class="qrr"><div class="qrbox" id="qrbox"><span class="rcph">正在產生 QR 碼…</span></div><ol class="qst"><li><b>1</b>打開手機相機，對準 QR 碼</li><li><b>2</b>點開連結，看見你的小卡</li><li><b>3</b>按「下載成果小卡」收藏</li></ol></div><p class="qhint" id="qhint" role="status"></p><button class="qdl" data-qv="dl">或直接在這台裝置下載小卡（PNG）</button></div><div class="rcw" id="rcw"><span class="rcph">正在製作成果小卡…</span></div></div>
<div class="btns"><button class="tr2 ol" data-m="bk2">← 回到評估表</button><button class="tr2 ol" data-m="swap">換一種狗</button><button class="tr2" data-m="again">重新體驗 →</button></div></section>`;
document.body.append(m);document.body.style.overflow='hidden';m._h=pool;try{qrMount(m)}catch(e){console.error(e)}
const w=$('#rpw',m);let dn=0,sx=0,sl=0,mv=0,vx=0,lx=0,raf;
w.addEventListener('pointerdown',e=>{if(e.pointerType!='mouse')return;dn=1;mv=0;sx=lx=e.clientX;sl=w.scrollLeft;cancelAnimationFrame(raf);w.classList.add('gb');w.setPointerCapture(e.pointerId)});
w.addEventListener('pointermove',e=>{if(!dn)return;const d=e.clientX-sx;if(Math.abs(d)>5)mv=1;w.scrollLeft=sl-d;vx=e.clientX-lx;lx=e.clientX});
const up=()=>{if(!dn)return;dn=0;w.classList.remove('gb');(function f(){if(Math.abs(vx)<.4)return;w.scrollLeft-=vx;vx*=.94;raf=requestAnimationFrame(f)})()};
w.addEventListener('pointerup',up);w.addEventListener('pointercancel',up);
const lb=p=>{const h=pool[+p.dataset.i],g=gr(h),o=document.createElement('div');o.className='lb';o.innerHTML=`<div class="lbw">${pol(h,0,1)}<div class="lt"><small>DAY ${String(h.d).padStart(2,'0')}・${h.e.topic}</small><h3>${h.e.title}</h3><p>${fill(h.e.scene)}</p><p class="ch"><b>你選了</b>${fill(h.o.label)}</p><p class="rs">${fill(h.o.result)}</p></div><button class="lc" aria-label="關閉">✕</button></div>`;o.onclick=e=>{if(e.target==o||e.target.closest('.lc'))o.remove()};m.append(o);o.querySelector('.lc').focus()};
w.addEventListener('click',e=>{const t=document.elementFromPoint(e.clientX,e.clientY),p=t&&t.closest('.pl');if(p&&!mv)lb(p)});
w.addEventListener('keydown',e=>{if(e.key=='Enter'||e.key==' '){const p=e.target.closest('.pl');if(p){e.preventDefault();lb(p)}}});
m.addEventListener('keydown',e=>{if(e.key=='Escape'){const l=$('.lb',m);l?l.remove():close()}});
/* 導覽列 04 回憶錄、05 模擬評估表、06 必修課：跟著目前頁面亮起；去過的可以點回去 */
const setSt=n=>{m.dataset.st=n;m._rc=Math.max(m._rc||1,n);$$('.top .dk.st',m).forEach((x,i)=>{const s=i-2,rc=s>0&&s<=m._rc;x.classList.toggle('on',s==n);x.classList.toggle('done',s<n);x.classList.toggle('locked',s>m._rc);if(rc){x.dataset.ms=s;x.setAttribute('role','button');x.tabIndex=0}})};
const close=()=>{m.remove();document.body.style.overflow=''},ans=[],zend=()=>{(m._z||[]).forEach(clearTimeout);m._z=[];m.classList.remove('zm','zi');$$('.zbt',m).forEach(x=>x.remove());const b=$('.mdn',m);b.style.visibility=''},
/* 查看模擬評估表：按鈕飛到中間 → 放大蓋滿畫面 → 虛化，露出評估表 */
zoom=()=>{if(m.classList.contains('zm'))return;const show=()=>{setSt(2);m.style.scrollBehavior='auto';m.scrollTop=0;m.classList.add('zi')};m.classList.add('zm');m._z=[];if(RM){show();m._z.push(setTimeout(zend,900));return}
const b=$('.mdn',m),r=b.getBoundingClientRect(),P=80,VW=innerWidth,VH=innerHeight,w=r.width,h=r.height,cl=(VW-w)/2,ct=(VH-h)/2,dx=cl-r.left,dy=ct-r.top,k=Math.max(1.25,Math.min(4,VW*.72/w)),T1=1400,T2=1000,
ip=(l,t,ww,hh,c)=>`inset(${t+P}px ${VW-l-ww+P}px ${VH-t-hh+P}px ${l+P}px round ${c}px)`,z=document.createElement('div'),mvE='cubic-bezier(.6,0,.2,1)',gr='cubic-bezier(.7,0,.25,1)';
z.className='zbt';z.style.inset=-P+'px';z.innerHTML=`<i></i><span style="left:${r.left+P}px;top:${r.top+P}px;width:${w}px;height:${h}px">${b.textContent}</span>`;m.append(z);b.style.visibility='hidden';
$('i',z).animate([{clipPath:ip(r.left,r.top,w,h,h/2),easing:mvE},{clipPath:ip(cl,ct,w,h,h/2),offset:.46,easing:'ease-in-out'},{clipPath:ip(cl+w*.03,ct+h*.05,w*.94,h*.9,h*.45),offset:.56,easing:gr},{clipPath:`inset(0px 0px 0px 0px round 0px)`}],{duration:T1,fill:'both'});
$('span',z).animate([{transform:'none',easing:mvE},{transform:`translate(${dx}px,${dy}px)`,offset:.46,easing:'ease-in-out'},{transform:`translate(${dx}px,${dy}px) scale(.95)`,offset:.56,easing:gr},{transform:`translate(${dx}px,${dy}px) scale(${k})`}],{duration:T1,fill:'both'});
m._z.push(setTimeout(()=>{show();z.animate([{opacity:1,filter:'blur(0px)',transform:'none'},{opacity:.85,filter:'blur(14px)',transform:'scale(1.08)',offset:.35},{opacity:0,filter:'blur(36px)',transform:'scale(1.25)'}],{duration:T2,easing:'ease-in-out',fill:'both'})},T1),setTimeout(zend,T1+T2+50))},go=(n,top)=>{zend();setSt(n);m.style.scrollBehavior='auto';const t=$('#m2',m);m.scrollTop=0;if(n==1)m._tr=0;if(n==3)labInit()};setSt(1);
m.addEventListener('keydown',e=>{const x=e.target.closest('.top [data-ms]');if(x&&(e.key=='Enter'||e.key==' ')){e.preventDefault();x.click()}});
m.addEventListener('click',e=>{const ms=e.target.closest('.top [data-ms]');if(ms){if(ms.dataset.ms!=m.dataset.st)go(+ms.dataset.ms);return}const nv=e.target.closest('.top [data-a]');if(nv){close();const x=document.createElement('button');Object.assign(x.dataset,nv.dataset);x.hidden=true;app.append(x);x.click();x.remove();return}const rt=e.target.closest('[data-r]');if(rt){const r=rt.dataset.r;$$('.m2 .rpn',m).forEach(x=>x.classList.toggle('on',x.dataset.p==r));$$('.rtb button',m).forEach(x=>x.classList.toggle('on',x.dataset.r==r));m.style.scrollBehavior='auto';m.scrollTop=0;return}const t=e.target.closest('[data-m]');if(!t)return;const a=t.dataset.m;
if(a=='prev'||a=='next'){const wd=$('.pl',m).offsetWidth+22;w.scrollBy({left:(a=='next'?1:-1)*wd*1.5,behavior:'smooth'})}else if(a=='x')close();else if(a=='dn')zoom();else if(a=='l3')go(3);else if(a=='bk1')go(1,1);else if(a=='bk2')go(2);else if(t.dataset.r!=null)0;
else if(a=='q'){const q=t.closest('.qq'),i=+q.dataset.q;if(q.dataset.d)return;q.dataset.d=1;const c=QZ[i][2];$$('button',q).forEach(b=>{b.classList.add(+b.dataset.j==c?'ok':b==t?'no':'dim')});$('.qe',q).hidden=false;ans.push(+t.dataset.j==c);if(ans.length==5){const r=ans.filter(Boolean).length;$('#qr',m).textContent=`養狗須知答對 ${r} / 5。${r==5?'你已經準備好認真考慮了。':'沒有答對也沒關係，這就是領養前要先搞清楚的功課。'}`}}
else if(a=='swap'){close();const x=document.createElement('button');x.dataset.a='swap';x.hidden=true;app.append(x);x.click();x.remove()}
else if(a=='again'){close();const x=document.createElement('button');x.dataset.a='again';x.hidden=true;app.append(x);x.click();x.remove()}});

const LP=(seed,pal,w,h,cx,cy)=>{let z=seed*9301+49297;const rn=()=>(z=(z*9301+49297)%233280)/233280,sx=w/cx,sy=h/cy,V=[];for(let j=0;j<=cy;j++){V[j]=[];for(let i=0;i<=cx;i++)V[j][i]=[i*sx+(i&&i<cx?(rn()-.5)*sx*.7:0),j*sy+(j&&j<cy?(rn()-.5)*sy*.7:0)]}
const sh=(c,f)=>'#'+[1,3,5].map(k=>Math.max(0,Math.min(255,Math.round(parseInt(c.substr(k,2),16)*f))).toString(16).padStart(2,'0')).join(''),pk=(t)=>pal[Math.min(pal.length-1,Math.max(0,Math.floor((t+(rn()-.5)*.35)*pal.length)))];let o='';
for(let j=0;j<cy;j++)for(let i=0;i<cx;i++){const a=V[j][i],b=V[j][i+1],c=V[j+1][i+1],d=V[j+1][i],t=(i/cx*.4+j/cy*.6);[[a,b,c],[a,c,d]].forEach(tr=>{o+=`<polygon points="${tr.map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="${sh(pk(t),.9+rn()*.2)}"/>`})}
const id='g'+seed;return `<svg class="lbgp" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .2 0 0 0 0 .14 0 0 0 0 .08 0 0 0 .55 0"/></filter>${o}<rect width="${w}" height="${h}" filter="url(#${id})" opacity=".5"/></svg>`},
P_=(pts,f)=>`<polygon points="${pts}" fill="${f}"/>`,
IC=k=>{const m={
choc:P_('14,20 66,14 68,62 16,68','#6B4430')+P_('14,20 40,17 42,66 16,68','#85563A')+P_('40,17 66,14 68,62 42,66','#4E301F')+P_('40,17 42,66 41,40','#3d2517'),
grape:P_('40,10 44,22 36,22','#7C9A68')+[[28,30],[48,30],[20,44],[40,44],[60,44],[30,58],[50,58],[40,70]].map(([x,y],i)=>P_(`${x},${y-9} ${x+9},${y-4} ${x+9},${y+5} ${x},${y+10} ${x-9},${y+5} ${x-9},${y-4}`,['#7A4F8F','#6A3F80','#8E63A3'][i%3])).join(''),
onion:P_('40,8 46,22 34,22','#B9A56A')+P_('40,20 64,44 52,68 28,68 16,44','#E6C9A0')+P_('40,20 16,44 28,68 40,68','#D4AE80')+P_('40,20 64,44 52,68 40,68','#C79A6B')+P_('40,28 40,68 34,68 26,44','#EBD5B2'),
chicken:P_('24,18 56,18 66,40 48,58 22,44','#E3A06B')+P_('24,18 56,18 40,36','#EFB98A')+P_('40,36 66,40 48,58','#C98250')+P_('44,56 56,62 62,70 52,72 44,66','#F3EAD6')+P_('52,72 62,70 66,76 56,78','#D8C9A8'),
apple:P_('40,22 62,24 68,46 54,68 40,64 26,68 12,46 18,24','#C8503A')+P_('40,22 18,24 12,46 26,68 40,64','#D9644A')+P_('40,22 62,24 68,46 54,68 40,64','#A83F2D')+P_('40,22 40,10 48,6 46,18','#6B4430')+P_('46,16 62,8 60,22','#7C9A68'),
gum:P_('12,26 68,22 70,56 14,60','#7EB6A8')+P_('12,26 40,24 42,58 14,60','#9CCDBF')+P_('40,24 68,22 70,56 42,58','#5F9A8C')+P_('26,38 36,34 40,42 30,46','#F3EAD6')+P_('44,36 56,34 54,44 44,46','#F3EAD6'),
carrot:P_('18,34 62,26 70,36 26,56','#E88A3A')+P_('18,34 62,26 40,40','#F2A55E')+P_('26,56 70,36 40,40','#C46F26')+P_('62,26 66,12 72,14 70,36','#7C9A68')+P_('62,26 74,18 70,30','#9FB87C'),
nut:P_('40,12 62,22 66,46 50,66 30,66 14,46 18,22','#D9B98A')+P_('40,12 18,22 14,46 30,66 40,40','#E8CFA3')+P_('40,12 62,22 66,46 50,66 40,40','#C79F6B'),
clock:P_('40,8 62,16 72,38 62,62 40,72 18,62 8,38 18,16','#E8D8B8')+P_('40,8 18,16 8,38 40,38','#F3EAD6')+P_('40,38 72,38 62,62 40,72','#C9B48A')+P_('38,18 42,18 42,40 38,40','#2b1d14')+P_('40,38 56,46 54,50 38,42','#2b1d14'),
tail:P_('12,64 22,40 40,24 60,18 66,28 48,36 34,50 24,66','#C8A06B')+P_('12,64 22,40 40,24 34,50','#D9B98A')+P_('60,18 66,28 48,36 40,24','#B58850')+P_('60,18 70,12 72,22 66,28','#F3EAD6'),
face:P_('40,10 64,20 70,44 56,66 24,66 10,44 16,20','#E0B88A')+P_('40,10 16,20 10,44 24,66 40,40','#EBCBA3')+P_('26,34 34,34 34,42 26,42','#2b1d14')+P_('46,34 54,34 54,42 46,42','#2b1d14')+P_('28,58 40,50 52,58 40,54','#2b1d14')+P_('10,20 4,8 20,14','#B58850')+P_('70,20 76,8 60,14','#B58850'),
nose:P_('14,34 66,34 66,50 52,64 28,64 14,50','#E3C9A0')+P_('14,34 40,34 40,64 28,64 14,50','#EBD8B6')+P_('30,40 50,40 58,48 40,60 22,48','#2b1d14')+P_('34,44 46,44 40,50','#5a4636'),
paw:P_('40,38 56,48 58,62 40,68 22,62 24,48','#B58850')+P_('40,38 24,48 22,62 40,68','#C8A06B')+P_('12,36 20,26 26,34 22,44 14,44','#B58850')+P_('28,22 36,12 44,20 40,32 30,32','#C8A06B')+P_('46,20 54,12 62,22 56,32 48,32','#B58850')+P_('58,34 64,26 72,36 66,44 58,44','#C8A06B'),
book:P_('10,18 38,22 38,66 10,62','#5F7685')+P_('42,22 70,18 70,62 42,66','#7E96A4')+P_('38,22 42,22 42,66 38,66','#3d5462')+P_('16,28 32,30 32,34 16,32','#F3EAD6')+P_('48,30 64,28 64,32 48,34','#F3EAD6'),
coin:P_('14,56 40,48 66,56 66,64 40,72 14,64','#B8872E')+P_('14,56 40,48 40,72 14,64','#D9A03B')+P_('14,42 40,34 66,42 66,50 40,58 14,50','#C9962F')+P_('14,42 40,34 40,58 14,50','#E8B54E')+P_('20,24 40,18 60,24 60,30 40,36 20,30','#D9A03B')+P_('20,24 40,18 40,36 20,30','#F2C46D')};
return `<svg class="ci" viewBox="0 0 80 80" aria-hidden="true">${m[k]||''}</svg>`},
FI=['choc','chicken','grape','onion','apple','gum','carrot','nut'],MI=['clock','tail','face','nose','paw','book'];
const labInit=()=>{if(m._lab)return;m._lab=1;const P=$('#lpn',m),img=A[dk],E=(h)=>h,
FDa=[
['煮熟的雞胸肉',1,'無調味、去骨、煮熟，是很好的蛋白質點心。','f_chicken','meat'],
['無調味水煮蛋',1,'煮熟、不加鹽，是好吸收的蛋白質，適量當點心。','f_egg','egg'],
['蘋果（去籽）',1,'去掉籽和芯、切小塊，可以當清脆的點心。','f_apple','fruitA'],
['藍莓',1,'少量新鮮藍莓，是低熱量又有抗氧化物的小點心。','f_blueberries','fruitB'],
['香蕉',1,'適量可以，但糖分偏高，只能當偶爾的小獎勵。','f_banana','fruitD'],
['紅蘿蔔',1,'生或煮熟都可以，適量，當作低熱量的零食。','f_carrot','vegA'],
['小黃瓜',1,'低熱量、脆脆的，夏天很適合當點心。','f_cucumber','vegB'],
['煮熟的南瓜',1,'去皮去籽、煮軟，有纖維與水分，少量當配菜。','f_pumpkin','pumpkin'],
['巧克力',0,'含可可鹼，狗代謝很慢，容易中毒，嚴重會抽搐。','f_chocolate','choc'],
['葡萄／葡萄乾',0,'可能造成急性腎衰竭，少量也不要冒險。','f_grapes','grape'],
['洋蔥',0,'會破壞紅血球造成貧血，煮熟、粉狀也一樣。','f_onion','allium'],
['大蒜',0,'和洋蔥同一家族，會傷害紅血球，生熟都不要給。','f_garlic','allium2'],
['木糖醇口香糖',0,'木糖醇會讓血糖急降，並傷害肝臟，非常危險。','f_gum','xylitol'],
['咖啡',0,'含咖啡因，會讓心跳加快、不安，嚴重會抽搐。','f_coffee','caffeine'],
['酒精',0,'狗對酒精極敏感，少量就可能昏睡、低體溫，甚至危及生命。','f_alcohol','alcohol'],
['夏威夷豆',0,'會引起無力、嘔吐與發抖，也不要給。','f_macadamia','nut']
],
BQa=[
['尾巴夾在後腿之間、耳朵向後貼平、身體縮小',['牠很害怕或不安','牠很開心','牠想玩'],0,'夾尾巴、耳朵貼平是害怕的訊號。這時不要硬抱，給牠空間。','fear'],
['躲到沙發後面，不肯出來，身體微微發抖',['牠在跟你玩捉迷藏','牠很害怕，需要安靜的空間','牠想睡覺'],1,'躲起來是在找安全感。不要硬拉牠出來，讓牠自己慢慢走出來。','fear'],
['前腳伸直、屁股翹高、尾巴搖個不停',['牠想攻擊','牠想玩','牠不舒服'],1,'這是「玩耍鞠躬」，是狗狗邀請你一起玩的訊號。','play'],
['把玩具叼到你面前放下，眼睛看著你',['牠想邀請你一起玩','牠想把東西藏起來','牠肚子餓'],0,'叼玩具過來，通常是在邀請你互動，不是要你搶走它。','play'],
['一直舔嘴唇、打哈欠、把頭轉開（不是因為睏）',['牠很放鬆','牠有點壓力，希望你別再靠近','牠肚子餓'],1,'這些叫「安撫訊號」，代表牠有壓力，請放慢或停止互動。','stress'],
['一直重複舔自己的腳，舔到發紅',['牠在享受','牠可能無聊、焦慮，或腳不舒服','牠想洗澡'],1,'偶爾舔很正常，但舔個不停可能是壓力、過敏或疼痛，值得觀察與就醫。','stress'],
['背上的毛豎起、身體僵硬、低吼',['牠在撒嬌','牠在警告，請保持距離','牠想握手'],1,'低吼是溝通，不是壞行為。先退開，不要責罵，找出原因。','warn'],
['皺起鼻子、露出牙齒、身體往前壓低',['牠在微笑','牠在強烈警告，請立刻退後','牠想打哈欠'],1,'露牙是很明確的警告。慢慢退開、不要盯著牠、不要伸手。','warn'],
['突然停下不動、身體僵直、盯著你不放',['牠在發呆','牠情緒升高，可能下一步會有反應','牠想睡覺'],1,'「僵住」是情緒升高的訊號，先停止動作，慢慢拉開距離。','freeze'],
['肚子翻出來，全身鬆鬆軟軟',['牠很放鬆、信任你','牠要攻擊','牠生病了'],0,'身體鬆軟、翻肚，通常代表很安心。但不是每次都想被摸，要看牠的表情。','relax'],
['趴著把下巴放在地上，眼睛溫柔地看著你',['牠很放鬆，想待在你身邊','牠在生氣','牠想逃跑'],0,'放鬆趴著又看著你，是安心、想陪伴的樣子。','relax'],
['嘴巴微張、舌頭放鬆垂下、眼神柔和',['牠很放鬆又開心','牠很緊張','牠要咬人'],0,'放鬆的臉部表情，嘴巴軟軟、眼睛瞇瞇，是心情好的訊號。','happy'],
['互動結束後，像剛洗完澡一樣用力甩全身',['牠冷了','牠在釋放壓力、重新放鬆','牠身上有跳蚤'],1,'這叫「甩身」，是狗狗把緊張或興奮甩掉的方式。','shake'],
['耳朵向前豎起、眼睛盯著前方、身體微微前傾',['牠很專注，注意到了什麼','牠想睡覺','牠要大便'],0,'這是專注警覺的姿勢。牠正在判斷眼前的人事物，先別突然打斷牠。','alert'],
['抬起一隻前腳停在半空，眼睛盯著前方',['牠在握手','牠很專注，正在觀察或鎖定目標','牠腳受傷了'],1,'抬腳停格是高度專注的姿勢，常見於好奇或準備行動時。','alert'],
['尾巴低低地、慢慢左右擺，身體鬆鬆的',['牠很生氣','牠放鬆又友善','牠肚子痛'],1,'放鬆的身體加上緩慢的擺尾，是友善安心的訊號。','friendly'],
['用鼻子輕輕頂你的手，把頭靠在你的腿上',['牠在要求關注與親近','牠想攻擊你','牠要上廁所'],0,'頂手、靠腿，是在表達親近，也是在邀請你摸摸牠。','friendly'],
['眼睛睜很大、露出眼白、頭微微別開',['牠很放鬆','牠覺得不安，想要空間','牠想吃東西'],1,'露出眼白（鯨魚眼）是壓力訊號，請先停止靠近或撫摸。','whale'],
['在草地上一直低頭嗅聞，走走停停',['牠在收集資訊、探索環境','牠生病了','牠在生氣'],0,'嗅聞是狗認識世界的方式，讓牠多聞一會兒，能消耗腦力也能放鬆。','sniff'],
['追著自己的尾巴轉圈圈',['牠可能在玩，也可能無聊或壓力大','牠一定生病了','牠在警告你'],0,'偶爾追尾巴是玩耍；若頻繁、停不下來，可能是無聊或焦慮，要增加活動與陪伴。','tailc']
],
MYa=[
['狗的 1 歲，等於人的 7 歲。',1,'迷思。狗的前兩年長得特別快，1 歲約等於人類 15 歲，之後依體型每年約 4–7 歲。','clock','age'],
['狗搖尾巴，就代表牠很開心。',1,'迷思。搖尾巴代表情緒被激起，可能是開心，也可能是緊張。要看尾巴高度、速度與全身姿勢。','tail','wag'],
['狗做錯事後的「愧疚表情」，代表牠知道自己錯了。',1,'迷思。那通常是牠對你情緒的反應，不是在反省。事後責罵，牠不會懂是為了什麼。','face','guilt'],
['狗的鼻子乾，就代表生病了。',1,'迷思。鼻子乾濕會隨睡眠、環境變化。要看有沒有食慾、精神、嘔吐或腹瀉。','nose','nose'],
['狗每天需要固定的散步與嗅聞時間。',0,'是真的。散步不只是運動，嗅聞也是牠認識世界、消耗腦力的方式。','paw','walk'],
['老狗學不會新東西。',1,'迷思。老狗仍然能學，只是要更有耐心，用短時間、多鼓勵的方式。','book','old'],
['狗吃草，就代表牠生病了。',1,'迷思。偶爾吃草很常見，原因很多。若頻繁嘔吐或精神不好，才需要找獸醫。','paw','grass'],
['夏天把狗剃光，牠會比較涼快。',1,'迷思。毛能隔熱、保護皮膚，剃光反而容易曬傷。涼快靠陰涼、飲水與避開高溫時段。','tail','shave'],
['狗需要定期打疫苗與驅蟲。',0,'是真的。疫苗與驅蟲是預防重病最划算的方式，要依獸醫建議的時程進行。','book','vax'],
['狗只看得到黑白的世界。',1,'迷思。狗看得到藍、黃色，只是對紅綠的分辨較弱，視力也不如人類清楚。','face','color'],
['狗的嘴巴比人的嘴巴乾淨。',1,'迷思。狗嘴裡一樣有大量細菌，舔傷口或親嘴都不是好主意。','nose','mouth'],
['結紮之後，狗一定會變胖變笨。',1,'迷思。結紮不影響智力，只是代謝會變慢，控制食量與運動就能維持體態。','clock','neuter'],
['狗越常洗澡越乾淨、越健康。',1,'迷思。洗太勤會破壞皮脂、讓皮膚乾癢，一般約 2–4 週一次，依毛質與狀況調整。','paw','bath'],
['混種狗一定比純種狗健康。',1,'迷思。混種可能降低某些遺傳病風險，但不是保證，仍然需要定期健檢。','tail','mix'],
['大型犬一定要有大院子才能養。',1,'迷思。重點是每天足夠的運動、陪伴與訓練，而不是房子或院子的大小。','paw','space'],
['小型犬不用出門散步。',1,'迷思。小型犬一樣需要運動、嗅聞與社會化，只在家裡容易無聊、焦慮。','paw','small'],
['啃骨頭可以幫狗清潔牙齒。',1,'迷思。硬骨頭容易斷牙或刺傷腸胃，定期刷牙與適合的潔牙用品才可靠。','book','bone'],
['打狗的鼻子，狗就會學乖。',1,'迷思。體罰只會讓牠害怕你、增加攻擊或逃避，獎勵正確行為才有效。','face','hit'],
['狗聽得懂很長的人話，只是故意不理你。',1,'迷思。牠主要靠語調、手勢與一致的口令學習，指令太長只會讓牠混亂。','face','talk'],
['夏天絕對不能把狗單獨留在車內。',0,'是真的。車內溫度會在幾分鐘內暴衝，狗很容易熱衰竭，甚至死亡。','clock','car'],
['狗需要定期刷牙與口腔檢查。',0,'是真的。牙結石與牙周病很常見，會影響全身健康，從小習慣刷牙最好。','book','teeth'],
['老年犬每年至少要健康檢查一次。',0,'是真的。老狗病情進展快，定期檢查能及早發現腎臟、心臟、關節的問題。','nose','senior'],
['狗需要慢慢練習，才學得會一個人在家。',0,'是真的。獨處也是要訓練的，從短時間開始，逐步拉長，能降低分離焦慮。','clock','alone'],
['結紮後需要調整食量與運動量。',0,'是真的。結紮後基礎代謝會下降，不調整就容易變胖。','tail','neuter']
],
CO={1:[18000,12000,6000,9000],2:[30000,15000,8000,12000],3:[48000,20000,12000,15000]},
sh=a=>a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
let FD,BQ,MY;const PV=new Set();
const pg=(a,n,qt)=>{let pl=sh(a);pl=pl.filter(x=>!PV.has(x[0])).concat(pl.filter(x=>PV.has(x[0])));const out=[],used=new Set(),add=x=>{out.push(x);used.add(x[4])};
if(qt)for(const k in qt){let c=0;for(const x of pl){if(c>=qt[k])break;if(String(x[1])==k&&!used.has(x[4])&&!out.includes(x)){add(x);c++}}}
for(const x of pl){if(out.length>=n)break;if(!out.includes(x)&&!used.has(x[4]))add(x)}a.forEach(x=>PV.delete(x[0]));out.forEach(x=>PV.add(x[0]));return sh(out)},
roll=()=>{FD=pg(FDa,8,{1:4,0:4});MY=pg(MYa,6,{1:3,0:2});BQ=pg(BQa,6)};roll();
const SZB={1:['博美犬','馬爾濟斯'],2:['米克斯','柴犬','柯基犬'],3:['哈士奇','黃金獵犬']},szOf=b=>b=='貴賓犬'?1:+Object.keys(SZB).find(k=>SZB[k].includes(b))||2,ageNote=a=>a<=2?'幼年與青年期長得特別快，生活規則要在這時建立。':a<=7?'壯年期：體力最好，也是花最多時間陪伴與訓練的階段。':a<=11?'邁入老年：開始需要每年健檢，運動量與飲食都要調整。':'高齡：醫療與照護的花費會明顯變多，陪伴比什麼都重要。';
const R={br:S.b,sz:szOf(S.b),age:3,cs:2,cy:14,g:0,i:0,b:0,fs:0,fn:0,bi:0,bs:0,my:0,mn:0};
const human=(y,s)=>{const f=s==3?[12,22,7]:s==1?[15,24,4]:[15,24,5];return y==1?f[0]:y==2?f[1]:f[1]+(y-2)*f[2]};
const seg=(id,v,L)=>`<div class="sg" id="${id}">${L.map(([k,n])=>`<button data-v="${k}" class="${k==v?'on':''}">${n}</button>`).join('')}</div>`;

const FTa=[['feed','每日餵食'],['water','更換飲水'],['walk','每天散步'],['play','陪伴與遊戲'],['groom','梳毛與清潔'],['env','環境整理'],['vet','安排看醫生']],FCc=['#EE8A34','#6FA0C0','#8FB59A','#C99A3B','#B58BC0','#D9564A'];
const FM=()=>R.fm||(R.fm={mem:[{id:'m0',n:'我'},{id:'m1',n:'爸爸'},{id:'m2',n:'媽媽'},{id:'m3',n:'其他家人'}],nx:4,as:{},sel:null}),famN=id=>(FM().mem.find(m=>m.id==id)||{n:'?'}).n,famC=id=>FCc[Math.max(0,FM().mem.findIndex(m=>m.id==id))%FCc.length];
/* 家庭分工：每格最多 2 張卡（FSL）；「我」（m0）不限次數，其他家人最多 2 項 */
const FSL=2,famMax=id=>id=='m0'?Infinity:2,famAt=t=>FM().as[t]||[],famCnt=id=>FTa.filter(t=>famAt(t[0]).includes(id)).length,famPut=(t,id)=>{const F=FM(),a=famAt(t);if(a.includes(id)){F.warn=famN(id)+' 已經在這一格了。';return false}if(a.length>=FSL){F.warn='這一格已經有 2 張卡片了，先取消一張再放。';return false}if(famCnt(id)>=famMax(id)){F.warn=famN(id)+' 已經負責 2 項了，換一位家人，或先取消一項。';return false}F.as[t]=[...a,id];F.warn=null;return true};
const draw=[()=>{const h=human(R.age,R.sz);return `<div class="lart nb">${LP(11,['#F6D3A0','#F0B57A','#E59A62','#D98262'],600,450,8,6)}<img src="${A[B[R.br].k]}" alt=""><span class="lbub">我現在相當於人類 ${h} 歲</span></div><div class="lbody"><h3>狗狗的 1 歲，不等於人的 1 歲。</h3><p class="lx">牠的時間走得比你快。拉動看看，牠現在相當於人類幾歲。</p>${seg('szA',R.sz,[[1,'小型'],[2,'中型'],[3,'大型']])}<label class="slx"><span>狗狗 <b>${R.age}</b> 歲</span><input type="range" id="agR" min="1" max="16" value="${R.age}"></label><div class="aout"><span>相當於人類</span><b>${h}</b><span>歲</span></div><p class="lnote">${ageNote(R.age)}</p></div>`},
()=>`<div class="lbody wide"><div class="ftop"><h3>這個，能給牠吃嗎？</h3><span class="sc3">答對 ${R.fs} / ${R.fn}</span></div><p class="lx">點「可以」或「不行」，翻開看理由。有些人類的日常食物，對牠是毒。</p><div class="fgd">${FD.map((f,i)=>`<div class="fc ${R.fd&&R.fd[i]!=null?'fl '+(R.fd[i]==f[1]?'ok':'no'):''}" data-i="${i}"><div class="ff"><img class="fim" src="${A[FD[i][3]]}" alt=""><b>${f[0]}</b><div><button data-ans="1">可以</button><button data-ans="0">不行</button></div></div><div class="fb"><b>${f[1]?'可以':'不行'}</b><span>${f[2]}</span></div></div>`).join('')}</div><button class="lk" data-lr="f">重新玩一次</button></div>`,
()=>{const q=BQ[R.bi],o=R.bo||(R.bo=sh(q[1].map((t,j)=>[t,j])));return `<div class="lart">${LP(23+R.bi,['#CFE0C0','#A9CBA4','#8FBC9A','#7DA8A8'],600,450,8,6)}<img class="${S.b=='柴犬'?'shf':''}" src="${S.b=='柴犬'?A.shF:img}" alt=""><span class="lbub cue">${q[0]}</span></div><div class="lbody"><div class="ftop"><h3>牠在說什麼？</h3><span class="sc3">${R.bi+1} / ${BQ.length}</span></div><p class="lx">看看牠的身體語言，猜猜牠現在的感受。</p><div class="bo">${o.map(([t,j])=>`<button data-bj="${j}" class="${R.bd!=null?(j==q[2]?'ok':j==R.bd?'no':'dim'):''}">${t}</button>`).join('')}</div>${R.bd!=null?`<p class="why">${q[3]}</p><button class="tr2 sm" data-lr="bn">${R.bi<BQ.length-1?'下一題 →':'再玩一次'}</button>`:''}</div>`},
()=>{const c=CO[R.cs],yr=R.cy,first=20000,gr=R.g?c[3]*yr:0,ins=R.i?15000*yr:0,bd=R.b?12000*yr:0,rows=[['食物',c[0]*yr],['醫療',c[1]*yr],['用品與訓練',c[2]*yr+first],['美容',gr],['保險',ins],['出遊寄宿',bd]],tot=rows.reduce((a,x)=>a+x[1],0),mx=Math.max(...rows.map(x=>x[1]));return `<div class="lbody wide"><h3>一輩子，要準備多少？</h3><p class="lx">選擇體型與照顧方式，看看牠的一生大約花費多少（教育模擬估算）。</p><div class="cctl">${seg('szC',R.cs,[[1,'小型'],[2,'中型'],[3,'大型']])}<label class="slx"><span>壽命 <b>${yr}</b> 年</span><input type="range" id="cyR" min="10" max="17" value="${yr}"></label><div class="chp2"><button data-o="g" class="${R.g?'on':''}">定期美容</button><button data-o="i" class="${R.i?'on':''}">寵物保險</button><button data-o="b" class="${R.b?'on':''}">每年出遊寄宿</button></div></div><div class="cout"><div class="ctot">${IC('coin')}<span>NT$</span><b>${tot.toLocaleString()}</b><em>平均每月約 NT$ ${Math.round(tot/yr/12).toLocaleString()}</em></div><div class="cbs">${rows.map(r=>`<div class="mbr"><span>${r[0]}</span><i><s style="width:${r[1]?Math.max(3,r[1]/mx*100):0}%"></s></i><b>${r[1]?Math.round(r[1]/1000)+'K':'—'}</b></div>`).join('')}</div></div></div>`},
()=>`<div class="lbody wide"><div class="ftop"><h3>是真的，還是迷思？</h3><span class="sc3">答對 ${R.my} / ${R.mn}</span></div><p class="lx">先猜，再翻開卡片。</p><div class="myg">${MY.map((x,i)=>`<div class="mc ${R.md&&R.md[i]!=null?'fl '+(R.md[i]==x[1]?'ok':'no'):''}" data-i="${i}"><div class="mf"><img class="mim" src="${A['m_'+x[4]]}" alt=""><b>${x[0]}</b><div><button data-ma="0">是真的</button><button data-ma="1">是迷思</button></div></div><div class="mb2"><b>${x[1]?'迷思':'是真的'}</b><span>${x[2]}</span></div></div>`).join('')}</div><button class="lk" data-lr="m">重新玩一次</button></div>`,
()=>{const F=FM(),n=FTa.filter(t=>famAt(t[0]).length).length,cnt={};FTa.forEach(t=>famAt(t[0]).forEach(a=>{cnt[a]=(cnt[a]||0)+1}));const mx=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0],note=n==0?'把家人卡片拖進任務格子裡，每格最多放 2 張；「我」不限次數，其他家人最多負責 2 項。也可以先點卡片，再點格子。':n<7?`還有 ${7-n} 項沒有人負責。`:(mx&&mx[1]>=4?`${famN(mx[0])}負責了 ${mx[1]} 項——一個人撐太久會累，想想誰能分擔。`:'七項都有人負責，分配得算平均。記得和家人一起確認。');return `<div class="lbody wide"><div class="ftop"><h3>誰來照顧牠？</h3><span class="sc3">已分配 ${n} / 7</span></div><p class="lx">牠不是一個人的狗。建立家庭照護團隊，把照顧工作分給每位家人。</p><div class="fadd"><input id="fadd" maxlength="4" placeholder="新增家庭成員，例如：姊姊"><button class="tr2 sm" data-fa="add">新增</button></div><div class="ftray">${F.mem.map(m=>`<div class="fcd ${F.sel==m.id?'sel':''} ${famCnt(m.id)>=famMax(m.id)?'full':''}" data-mid="${m.id}" style="--c:${famC(m.id)}"><i></i><b>${m.n}</b><em class="fct">${m.id=='m0'?famCnt(m.id)+' 項':famCnt(m.id)+'/2'}</em>${m.id=='m0'?'':`<button class="fx" data-fa="rm" data-id="${m.id}" aria-label="移除${m.n}">×</button>`}</div>`).join('')}</div><div class="fgrid">${FTa.map((t,i)=>{const a=famAt(t[0]);return `<div class="fsl ${a.length?'ok':''}" data-t="${t[0]}"><small>0${i+1}</small><b>${t[1]}</b><div class="fdp">${a.map(x=>`<span class="fas" style="--c:${famC(x)}">${famN(x)}<button data-fa="clr" data-t="${t[0]}" data-id="${x}" aria-label="取消${famN(x)}">×</button></span>`).join('')}${a.length?a.length<FSL?'<em>還能放 1 張</em>':'':'<em>拖到這裡</em>'}</div></div>`}).join('')}</div><p class="fnote ${F.warn?'w':''}">${F.warn||note}</p><div class="fbt"><button class="lk" data-fa="reset">重新分配</button><button class="lk" data-fa="copy">${R.fcp?'已複製 ✓':'複製分工表'}</button></div></div>`}];
const show=(i)=>{R.t=i;m.dataset.th=i;$$('#ltb button',m).forEach((b,k)=>b.classList.toggle('on',k==i));P.innerHTML=`<article class="lpa${R.na&&i==0?' na':''}">${draw[i]()}</article>`};
$('#ltb',m).addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(b){R.na=0;show(+b.dataset.l)}});
P.addEventListener('input',e=>{if(e.target.id=='agR'){R.age=+e.target.value;const h=human(R.age,R.sz);P.querySelector('.lbub').textContent='我現在相當於人類 '+h+' 歲';P.querySelector('.slx b').textContent=R.age;P.querySelector('.aout b').textContent=h;P.querySelector('.lnote').textContent=ageNote(R.age)}else if(e.target.id=='cyR'){R.cy=+e.target.value;show(3);$('#cyR',m).focus()}});
P.addEventListener('click',e=>{const sl=e.target.closest('.fsl');if(sl&&R.t==5&&R.fm&&R.fm.sel&&!e.target.closest('button')){famPut(sl.dataset.t,R.fm.sel);R.fm.sel=null;show(5);return}
const fb=e.target.closest('[data-fa]');if(fb){const F=FM(),o=fb.dataset.fa;if(o=='add'){const v=($('#fadd',m).value||'').trim().slice(0,4);if(v&&F.mem.length<6)F.mem.push({id:'m'+F.nx++,n:v})}else if(o=='rm'){F.mem=F.mem.filter(x=>x.id!=fb.dataset.id);for(const k in F.as)F.as[k]=F.as[k].filter(x=>x!=fb.dataset.id);if(F.sel==fb.dataset.id)F.sel=null;F.warn=null}else if(o=='clr'){const k=fb.dataset.t;F.as[k]=famAt(k).filter(x=>x!=fb.dataset.id);F.warn=null}else if(o=='reset'){F.as={};F.sel=null;F.warn=null}else if(o=='copy'){const t='我的家庭照護分工表\n'+FTa.map(x=>x[1]+'：'+(famAt(x[0]).map(famN).join('、')||'（未安排）')).join('\n');try{navigator.clipboard.writeText(t)}catch(_){}R.fcp=1}show(5);return}
const t=e.target.closest('button');if(!t)return;
if(t.closest('#szA')){const v=+t.dataset.v;R.sz=v;if(szOf(R.br)!=v){const L=SZB[v];R.br=L[Math.floor(Math.random()*L.length)]}R.na=1;show(0)}else if(t.closest('#szC')){R.cs=+t.dataset.v;show(3)}
else if(t.dataset.o){R[t.dataset.o]=R[t.dataset.o]?0:1;show(3)}
else if(t.dataset.ans!=null){const c=t.closest('.fc'),i=+c.dataset.i;R.fd=R.fd||{};if(R.fd[i]!=null)return;R.fd[i]=+t.dataset.ans;R.fn++;if(R.fd[i]==FD[i][1])R.fs++;show(1)}
else if(t.dataset.bj!=null){if(R.bd!=null)return;R.bd=+t.dataset.bj;R.bn=(R.bn||0)+(R.bd==BQ[R.bi][2]?1:0);show(2)}
else if(t.dataset.lr=='bn'){R.bi=(R.bi+1)%BQ.length;if(R.bi==0)BQ=pg(BQa,6);R.bd=null;R.bo=null;show(2)}
else if(t.dataset.ma!=null){const c=t.closest('.mc'),i=+c.dataset.i;R.md=R.md||{};if(R.md[i]!=null)return;R.md[i]=+t.dataset.ma;R.mn++;if(R.md[i]==MY[i][1])R.my++;show(4)}
else if(t.dataset.lr=='f'){FD=pg(FDa,8,{1:4,0:4});R.fd={};R.fs=0;R.fn=0;show(1)}else if(t.dataset.lr=='m'){MY=pg(MYa,6,{1:3,0:2});R.md={};R.my=0;R.mn=0;show(4)}});
P.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.id=='fadd'){const F=FM(),v=e.target.value.trim().slice(0,4);if(v&&F.mem.length<6)F.mem.push({id:'m'+F.nx++,n:v});show(5)}});
P.addEventListener('pointerdown',e=>{const c=e.target.closest('.fcd');if(!c||e.target.closest('button'))return;const sx=e.clientX,sy=e.clientY,id=c.dataset.mid;let gh=null;
const mv=ev=>{if(!gh&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>6){gh=c.cloneNode(true);gh.className='fcd fgh';gh.style.cssText=c.style.cssText;document.body.append(gh)}
if(gh){gh.style.left=ev.clientX+'px';gh.style.top=ev.clientY+'px';$$('.fsl.ov',P).forEach(x=>x.classList.remove('ov'));const el=document.elementFromPoint(ev.clientX,ev.clientY),s2=el&&el.closest('.fsl');if(s2&&P.contains(s2))s2.classList.add('ov')}};
const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);
if(gh){const el=document.elementFromPoint(ev.clientX,ev.clientY),s2=el&&el.closest('.fsl');gh.remove();if(s2&&P.contains(s2)&&ev.type=='pointerup'){famPut(s2.dataset.t,id);R.fm.sel=null}show(5)}else{R.fm.sel=R.fm.sel==id?null:id;show(5)}};
addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up);e.preventDefault()});
show(0)};
labInit();m.focus();}

cover();
