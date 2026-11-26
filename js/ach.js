/* ===== 成就系統 =====
   依使用者在 30 天裡的實際選擇（S.hist）、完成的階段與必修課紀錄判斷，不隨機發放。
   解鎖紀錄存在這台裝置的瀏覽器（localStorage），重新進入網站仍會保留；同一成就只會解鎖一次。
   成就只是學習歷程紀錄，不用來判斷適不適合養狗。

   判斷用到的資料：
   ・S.hist：每一題的 {d 天數, e 事件, o 選擇}；選項 fx.health >= 4 視為「理想做法」（和回憶錄、評估表同一個標準）
   ・30 天走完時由 farewell() 呼叫 achCheck('end')
   ・必修課切換分頁、身體語言測驗作答時由 app.js 呼叫 achLab()                                          */
(() => {
  const KEY = 'mpsAch';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {} } catch (e) { return {} } };
  const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch (e) {} };
  let got = load();
  const run = { start: Date.now(), ids: [], bq: [], tabs: new Set(), fam: 0, done: false };

  /* 小工具 */
  const H = () => S.hist || [];
  const ideal = h => ((h.o.fx || {}).health || 0) >= 4;
  const pickOf = id => H().find(h => h.e.id == id);
  const okOf = id => { const h = pickOf(id); return !!h && ideal(h) };
  const okCount = ids => ids.filter(okOf).length;
  const okAbility = ls => H().filter(h => ideal(h) && ls.includes(h.o.ability)).length;

  /* 圖示（低飽和幾何色塊，64×64） */
  const P = (pts, c) => `<polygon points="${pts}" fill="${c}"/>`;
  const svg = (bg, body) => `<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,2 58,16 58,48 32,62 6,48 6,16" fill="${bg}"/><polygon points="32,2 58,16 32,32 6,16" fill="#fff" opacity=".18"/>${body}</svg>`;
  const heart = (x, y, s, c) => `<path d="M${x} ${y + s * .9}C${x - s * 1.4} ${y - s * .1} ${x - s * .6} ${y - s * 1.1} ${x} ${y - s * .3}C${x + s * .6} ${y - s * 1.1} ${x + s * 1.4} ${y - s * .1} ${x} ${y + s * .9}Z" fill="${c}"/>`;
  const paw = (x, y, s, c) => `<ellipse cx="${x}" cy="${y + s * .35}" rx="${s * .55}" ry="${s * .45}" fill="${c}"/>${[[-.62, -.2], [-.24, -.62], [.24, -.62], [.62, -.2]].map(([dx, dy]) => `<ellipse cx="${x + dx * s}" cy="${y + dy * s}" rx="${s * .2}" ry="${s * .26}" fill="${c}"/>`).join('')}`;
  const IC = {
    care: svg('#E9A04A', P('16,36 48,36 44,48 20,48', '#8A5A2E') + P('16,36 48,36 46,40 18,40', '#B57A44') + heart(32, 22, 7, '#FFF6E4')),
    health: svg('#7FA7A0', P('32,12 48,18 46,36 32,50 18,36 16,18', '#F6E8CB') + P('32,12 48,18 46,36 32,50', '#E4D3B2') + P('29,22 35,22 35,28 41,28 41,34 35,34 35,40 29,40 29,34 23,34 23,28 29,28', '#C2473B')),
    play: svg('#9FA34F', paw(26, 30, 11, '#FFF6E4') + `<circle cx="44" cy="42" r="7" fill="#E58A7A"/>` + P('44,35 51,42 44,42', '#C9604F')),
    train: svg('#8BA7C4', P('25,8 39,8 36,24 28,24', '#C2473B') + `<circle cx="32" cy="38" r="15" fill="#F2C46D"/>` + P('32,23 47,38 32,38', '#D9A03B') + paw(32, 39, 7, '#7A5A2E')),
    family: svg('#D9822B', P('32,12 52,30 12,30', '#8A4F36') + P('16,30 48,30 48,50 16,50', '#F6E8CB') + P('32,30 48,30 48,50 32,50', '#E4D3B2') + heart(32, 40, 5.5, '#C2473B')),
    life: svg('#B58BC0', P('32,8 38,18 50,18 41,26 45,38 32,31 19,38 23,26 14,18 26,18', '#F2C46D') + heart(32, 44, 8, '#FFF6E4') + paw(32, 45, 3.6, '#B58BC0')),
    observe: svg('#7FA7A0', `<circle cx="28" cy="28" r="13" fill="#F6E8CB"/><circle cx="28" cy="28" r="9" fill="#BFE0F1"/>` + P('36,37 40,33 52,45 48,49', '#8A5A2E') + paw(28, 28, 5, '#7FA7A0')),
    snack: svg('#E9A04A', `<circle cx="19" cy="25" r="5" fill="#FFF6E4"/><circle cx="23" cy="20" r="5" fill="#FFF6E4"/><circle cx="41" cy="44" r="5" fill="#FFF6E4"/><circle cx="45" cy="39" r="5" fill="#FFF6E4"/>` + P('22,26 26,22 44,38 40,42', '#FFF6E4') + `<circle cx="44" cy="20" r="9" fill="#9FA34F"/>` + P('39,20 42,23 49,16 50,18 42,26 38,22', '#fff')),
    safe: svg('#9FA34F', P('32,10 50,26 14,26', '#8A4F36') + P('18,26 46,26 46,48 18,48', '#F6E8CB') + P('32,30 42,34 41,42 32,48 23,42 22,34', '#7FA7A0') + P('28,38 31,41 37,34 38,36 31,44 27,40', '#fff')),
    mind: svg('#E58A7A', P('14,20 22,10 26,22', '#8A5A2E') + P('50,20 42,10 38,22', '#8A5A2E') + `<ellipse cx="32" cy="32" rx="16" ry="14" fill="#F6E8CB"/>` + `<circle cx="26" cy="30" r="2.2" fill="#2b1d14"/><circle cx="38" cy="30" r="2.2" fill="#2b1d14"/>` + P('29,36 35,36 32,39', '#2b1d14') + heart(46, 46, 6, '#C2473B')),
    witness: svg('#D9822B', P('14,16 50,16 50,50 14,50', '#FFF6E4') + P('14,16 50,16 50,24 14,24', '#C2473B') + `<circle cx="22" cy="16" r="2.4" fill="#5a3a20"/><circle cx="42" cy="16" r="2.4" fill="#5a3a20"/>` + `<text x="32" y="45" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-weight="800" font-size="18" fill="#8A4F36">30</text>`)
  };

  /* 成就清單：k 觸發方式（單次／累積／完成）、how 解鎖條件、test 判斷、why 解鎖原因 */
  const AC = [
    { id: 'care', cat: '日常照護', n: '貼心照護小達人', k: '累積', how: '在餵食、飲水、清潔等日常照護事件中，做出 3 次理想的選擇。',
      test: () => okAbility(['A', 'B']) >= 3, why: () => `你在日常照護裡做了 ${okAbility(['A', 'B'])} 次理想的選擇，記得牠每天的需要。` },
    { id: 'health', cat: '健康醫療', n: '醫療安全守護者', k: '累積', how: '發現身體異常時及時處理（皮膚紅點或特別安靜的一天），並且正確安排健康檢查或就醫。',
      test: () => (okOf('e_itch') || okOf('e_abnormal')) && (okOf('r_checkup') || okOf('e_medical')), why: () => '牠身體不舒服時你沒有拖延，也願意帶牠做檢查、好好治療。' },
    { id: 'play', cat: '陪伴活動', n: '最佳陪伴夥伴', k: '累積', how: '在散步、遊戲與陪伴時間的事件中，做出 3 次理想的選擇。',
      test: () => okCount(['r_activity', 'r_pace', 'r_social', 'r_overtime']) >= 3, why: () => '你替牠安排散步和陪伴，也注意到牠不同時期的活動需求。' },
    { id: 'train', cat: '行為訓練', n: '耐心訓練師', k: '累積', how: '在如廁、居家規矩與破壞行為的事件中，3 次用正確、溫和的方式引導。',
      test: () => okCount(['r_safezone', 'r_potty', 'e_pee', 'e_chew']) >= 3, why: () => '牠犯錯時你沒有責罵，而是耐心引導，讓牠知道怎麼做才對。' },
    { id: 'family', cat: '家庭責任', n: '家庭責任小隊長', k: '累積', how: '安排家庭照顧分工（開家庭會議，或在必修課把 7 項任務都分配好），並考慮飼養費用或突發支出。',
      test: () => (okOf('r_family') || run.fam >= 7) && (okOf('r_budget') || okOf('e_medical') || okOf('r_longplan')), why: () => '你讓家人一起分擔照顧，也替牠的花費和突發狀況預先做好準備。' },
    { id: 'life', cat: '長期責任', n: '一生相伴守護者', k: '完成', how: '陪牠走完 30 天，並且在幼年、青年、中年、老年四個生命階段，每個階段都至少做出 1 次理想的選擇。',
      test: () => run.done && [0, 1, 2, 3].every(s => H().some(h => ideal(h) && sg(h.d) == s)), why: () => '從幼犬到老年，你在每個生命階段都用心照顧牠，也陪牠面對老去。' },
    { id: 'observe', hid: 1, cat: '隱藏成就', n: '細心觀察家', k: '單次', how: '牠喝水變多、吃飯變少時，記下飲水與食量並帶給獸醫參考。', hint: '老年期留意牠吃喝的小變化。',
      test: () => okOf('r_appetite'), why: () => '你注意到牠吃喝的小變化，還記錄下來給獸醫參考。' },
    { id: 'snack', hid: 1, cat: '隱藏成就', n: '零食控制高手', k: '累積', how: '在「第一頓晚餐」和「聞一聞就走開」兩個事件中，都沒有用零食解決問題。', hint: '幼年期，忍住用零食哄牠的念頭。',
      test: () => ['r_dinner', 'e_noeat'].every(id => { const h = pickOf(id); return h && !/零食/.test(h.o.label) }), why: () => '牠不吃飯的時候，你沒有拿零食哄牠，幫牠養成好的飲食習慣。' },
    { id: 'safe', hid: 1, cat: '隱藏成就', n: '居家安全專家', k: '單次', how: '牠到處亂咬時，先收好電線與小物，再準備能咬的玩具。', hint: '牠剛到家時，先想想家裡哪裡危險。',
      test: () => okOf('r_safezone'), why: () => '你先把家裡的電線和小東西收好，替牠準備了一個安全的家。' },
    { id: 'mind', hid: 1, cat: '隱藏成就', n: '情緒讀心師', k: '完成', how: '在必修課「身體語言」中，一輪 6 題答對 5 題以上。', hint: '必修課裡，有一堂課在教你看懂牠的心情。',
      test: () => run.bq.length >= 6 && run.bq.slice(-6).filter(Boolean).length >= 5, why: () => `你在「身體語言」答對 ${run.bq.slice(-6).filter(Boolean).length} / 6 題，看得懂牠的心情。` },
    { id: 'witness', hid: 1, cat: '隱藏成就', n: '30天陪伴見證者', k: '完成', how: '完整走完 30 天的模擬飼養。', hint: '陪牠走到最後一天。',
      test: () => run.done, why: () => '你陪牠走完了 30 天，見證了牠的一生。' }
  ];
  const TOTAL = AC.length;

  /* 解鎖通知（排隊一個一個顯示） */
  const Q = []; let busy = false;
  const toastNext = () => {
    if (busy || !Q.length) return; busy = true; const a = Q.shift();
    const t = document.createElement('div'); t.className = 'ach-toast'; t.setAttribute('role', 'status');
    t.innerHTML = `<i class="ach-ic">${IC[a.id]}</i><div><small>解鎖成就！${a.hid ? '・隱藏成就' : ''}</small><b>${a.n}</b><p>${got[a.id].why}</p></div>`;
    document.body.append(t);
    const done = () => { if (t._d) return; t._d = 1; t.classList.add('out'); setTimeout(() => { t.remove(); busy = false; toastNext() }, 350) };
    t.addEventListener('click', done); setTimeout(done, 4600);
  };
  const unlock = a => {
    if (got[a.id]) return; let why = ''; try { why = a.why() } catch (e) {}
    got[a.id] = { at: Date.now(), why }; save(got); run.ids.push(a.id); Q.push(a); toastNext(); badge();
    if (typeof burst == 'function') burst(innerWidth / 2, 90);
  };
  const check = () => { AC.forEach(a => { if (!got[a.id]) { let ok = false; try { ok = a.test() } catch (e) {} if (ok) unlock(a) } }) };

  /* 給 app.js 呼叫 */
  window.achCheck = w => { if (w == 'end') run.done = true; if (w == 'start') { run.start = Date.now(); run.ids = []; run.done = false; run.fam = 0 } check() };
  window.achLab = (type, v, R) => {
    if (type == 'tab' && R && R.fm) { run.fam = Object.values(R.fm.as || {}).filter(x => x && x.length).length }
    if (type == 'bq') run.bq.push(!!v);
    check();
  };

  /* 成就收藏 */
  const n = () => AC.filter(a => got[a.id]).length;
  const tile = (a, mine) => {
    const g = got[a.id], hide = a.hid && !g;
    return `<li class="ach-t${g ? ' on' : ''}${mine ? ' new' : ''}"><i class="ach-ic">${IC[a.id]}</i><div><small>${a.cat}・${a.k}觸發</small><b>${hide ? '？？？' : a.n}</b><p>${g ? g.why : hide ? '提示：' + a.hint : a.how}</p>${g ? `<em>${new Date(g.at).toLocaleDateString('zh-TW')} 解鎖${mine ? '・本次新獲得' : ''}</em>` : ''}</div></li>`;
  };
  const listHTML = () => AC.map(a => tile(a, run.ids.includes(a.id))).join('');
  window.achOpen = () => {
    if (document.querySelector('.ach-m')) return;
    const m = document.createElement('div'); m.className = 'ach-m'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = `<div class="ach-b"><button class="ach-x" aria-label="關閉">✕</button><small class="ach-e">ACHIEVEMENTS</small><h2>成就收藏</h2>
<div class="ach-n"><b>已解鎖 ${n()} / ${TOTAL}</b><i><s style="width:${n() / TOTAL * 100}%"></s></i></div>
<p class="ach-s">在 30 天裡做出好的照顧選擇、走完生命階段或完成必修課，就會解鎖成就。成就是你的學習紀錄，不代表適不適合養狗。</p>
<ul class="ach-g">${listHTML()}</ul><button class="ach-r">清除這台裝置的成就紀錄</button></div>`;
    const close = () => m.remove();
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.ach-x')) close() });
    m.querySelector('.ach-r').addEventListener('click', () => { if (confirm('要清除這台裝置上的所有成就紀錄嗎？清除後無法復原。')) { got = {}; save(got); run.ids = []; badge(); close(); window.achOpen() } });
    m.addEventListener('keydown', e => { if (e.key == 'Escape') close() });
    document.body.append(m); m.querySelector('.ach-x').focus();
  };

  /* 成果報告（模擬評估表）裡的成就區塊 */
  window.achReport = () => {
    const mine = AC.filter(a => got[a.id]);
    /* 評估表裡只放精簡版：小圖示一排（未解鎖為灰色），點「看全部」開成就收藏 */
    return `<section class="ach-rp mini"><div class="mrh"><small>ACHIEVEMENTS · 成就紀錄</small><b>${mine.length}<em> / ${TOTAL}</em></b></div>
<ul class="mic">${AC.map(a => { const g = got[a.id], hide = a.hid && !g; return `<li class="${g ? 'on' : ''}" title="${hide ? '隱藏成就' : a.n}${g ? '（已解鎖）' : ''}"><i class="ach-ic">${IC[a.id]}</i></li>` }).join('')}</ul>
<p class="mrs">${mine.length ? `最新：${mine.slice().sort((x, y) => got[y.id].at - got[x.id].at).slice(0, 2).map(a => a.n).join('、')}` : '這次還沒有解鎖成就'}・只是學習紀錄，不代表適不適合養狗</p>
<button class="mrb" data-ach="open">看全部成就 →</button></section>`;
  };

  /* 右上角的成就按鈕（放在聲音按鈕旁） */
  const btn = document.createElement('button'); btn.id = 'achb'; btn.type = 'button'; btn.setAttribute('aria-label', '成就收藏');
  const badge = () => { btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v3a5 5 0 0 1-10 0z" fill="currentColor"/><path d="M5 4H3v2a4 4 0 0 0 4 4M19 4h2v2a4 4 0 0 1-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 13h4l1 5H9z" fill="currentColor"/><path d="M7 21h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><span>${n()}/${TOTAL}</span>` };
  badge();
  btn.addEventListener('click', () => window.achOpen());
  const mount = () => { const r = document.querySelector('#sndw .sndr'); if (r && !btn.isConnected) r.prepend(btn); else if (!r) setTimeout(mount, 200) };
  mount();
  document.addEventListener('click', e => { if (e.target.closest('[data-ach=open]')) window.achOpen() });
})();
