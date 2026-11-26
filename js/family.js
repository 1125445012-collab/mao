/* ===== 家長參與與家庭支持 =====
   1. 家長支持度調查：評估第 5 題（預算）答完、進入配對前出現一次（之後回來會帶入上次的回答）
   2. 親子共同討論任務：DAY 07／14／21／28 各一個
      ・真實遊玩（30 天日曆）：走到那一天才開放，第一次到達時自動跳出；左側「親子任務」按鈕可隨時回來完成
      ・快速瀏覽（必修課「家庭分工」分頁）：四個任務全部可以查看、勾選
   3. 模擬評估表的「家庭支持度」區塊：依調查回答與任務完成紀錄產生，不影響分數，也不判定適不適合養狗
   紀錄存在這台裝置的瀏覽器（localStorage 'mpsFam'），重新整理或重新進入網站都會保留。                    */
(() => {
  const KEY = 'mpsFam';
  const load = () => { let v = {}; try { v = JSON.parse(localStorage.getItem(KEY) || '{}') || {} } catch (e) {} return { q1: v.q1 || '', q2: Array.isArray(v.q2) ? v.q2 : [], sAt: v.sAt || 0, t: v.t && typeof v.t == 'object' ? v.t : {} } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(F)) } catch (e) {} };
  let F = load();
  const run = { ps: 0 };

  /* ---------- 調查題目 ---------- */
  const Q1 = [['A', '家人支持，也願意一起照顧'], ['B', '家人支持，但主要由我負責'], ['C', '還沒有和家人討論過'], ['D', '家人目前不同意養狗']];
  const Q2 = [['pay', '協助支付飼養及醫療費用'], ['vet', '陪同狗狗看醫生'], ['daily', '協助日常照顧'], ['away', '在我上學或外出時幫忙照顧'], ['buy', '協助購買狗狗用品'], ['unsure', '目前還不確定']];
  const q2n = k => (Q2.find(x => x[0] == k) || [, ''])[1];
  const has = k => F.q2.includes(k);

  /* ---------- 圖示（幾何色塊：房子、愛心、對話框、狗狗） ---------- */
  const IC = {
    fam: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,6 58,28 6,28" fill="#D9822B"/><polygon points="32,6 58,28 32,28" fill="#C2661E"/><polygon points="12,28 52,28 52,56 12,56" fill="#F6E8CB"/><polygon points="32,28 52,28 52,56 32,56" fill="#EBD9B8"/><path d="M32 50C22 43 24 34 29 35C31 35.5 32 37 32 38C32 37 33 35.5 35 35C40 34 42 43 32 50Z" fill="#E58A7A"/></svg>',
    care: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,4 60,18 60,46 32,60 4,46 4,18" fill="#E9A04A"/><circle cx="23" cy="25" r="7" fill="#FFF6E4"/><circle cx="41" cy="25" r="7" fill="#FFF6E4"/><polygon points="12,48 34,48 30,36 16,36" fill="#8A5A2E"/><polygon points="30,48 52,48 48,36 34,36" fill="#B57A44"/><circle cx="32" cy="40" r="5" fill="#F6E8CB"/></svg>',
    cost: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,4 60,18 60,46 32,60 4,46 4,18" fill="#9FA34F"/><circle cx="32" cy="34" r="16" fill="#F2C46D"/><polygon points="32,18 48,34 32,34" fill="#D9A03B"/><text x="32" y="41" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-weight="800" font-size="18" fill="#7A5A2E">$</text></svg>',
    vet: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,4 60,18 60,46 32,60 4,46 4,18" fill="#7FA7A0"/><polygon points="32,12 48,18 46,36 32,50 18,36 16,18" fill="#F6E8CB"/><polygon points="29,22 35,22 35,28 41,28 41,34 35,34 35,40 29,40 29,34 23,34 23,28 29,28" fill="#C2473B"/></svg>',
    future: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,4 60,18 60,46 32,60 4,46 4,18" fill="#B58BC0"/><polygon points="14,46 28,24 42,46" fill="#F6E8CB"/><polygon points="30,46 42,30 54,46" fill="#E4D3B2"/><circle cx="44" cy="20" r="6" fill="#F2C46D"/><polygon points="10,46 54,46 54,50 10,50" fill="#7A5A2E"/></svg>',
    talk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h12v8H8l-4 3v-3H3z" fill="currentColor"/><path d="M17 9h4v8h-1v3l-4-3h-5v-2h6z" fill="currentColor" opacity=".55"/></svg>'
  };

  /* ---------- 四個親子任務 ---------- */
  const PT = [
    { d: 7, id: 'care', tag: '家庭照顧分工', t: '家庭照顧分工',
      sc: '養狗不是一個人的事情，家人也需要一起討論照顧方式。請和家長討論，未來誰負責餵食、散步、清潔及就醫，讓每個人都清楚自己的責任。',
      qs: ['平日誰負責餵食？', '誰負責散步與陪伴？', '狗狗生病時，由誰陪同就醫？', '全家外出時，由誰照顧狗狗？'],
      ok: '我已經和家長討論過照顧分工',
      tip: '把討論好的分工寫下來，貼在冰箱上。每個人都知道自己負責什麼，狗狗才不會今天吃兩餐、明天沒人餵。必修課的「家庭分工」也可以排排看。' },
    { d: 14, id: 'cost', tag: '飼養費用', t: '養狗需要多少錢？',
      sc: '飼料吃完了、要打疫苗、毛長了要美容……每一樣都要花錢。請和家長一起看看養狗的花費，討論家裡每個月可以準備多少。',
      qs: ['飼料、用品、美容、醫療，每個月大約要花多少？', '我們家每個月可以為牠準備多少預算？', '如果狗狗突然要看病或開刀，費用從哪裡來？'],
      ok: '我已經和家長討論過飼養預算',
      tip: '教育估算：中型犬每月日常花費約 NT$3,000–5,000；一次突發手術可能要好幾萬元。很多家庭會另外存一筆「毛孩醫療預備金」，需要時才不會手忙腳亂。必修課的「一生花費」可以算算看。' },
    { d: 21, id: 'vet', tag: '醫療安排', t: '如果狗狗生病了',
      sc: '狗狗今天沒精神、不想吃飯，可能是生病了。看醫生、付醫藥費、決定要不要治療，都需要家長一起幫忙。請和家長討論生病時的安排。',
      qs: ['狗狗生病時，誰帶牠去動物醫院？', '誰負責聯絡動物醫院、記下獸醫交代的事？', '緊急醫療費用要怎麼準備？', '需要做治療決定時，家長會怎麼和我一起決定？'],
      ok: '我已經和家長討論過就醫安排',
      tip: '小飼主帶狗狗看醫生，通常需要家長陪同；手術、住院這些醫療決定，也需要大人簽名同意。可以先把常去的動物醫院和夜間急診的電話記下來。' },
    { d: 28, id: 'future', tag: '未來生活', t: '未來生活的改變',
      sc: '狗狗可能陪你 10 到 15 年。這段時間裡，家裡會出遊、可能搬家，你也會升學、變得更忙。請和家長想一想，生活改變時，牠要怎麼辦。',
      qs: ['如果全家出遊，狗狗該怎麼安排？', '如果搬家或生活作息改變，該如何照顧牠？', '當我升學、課業變忙時，誰能繼續陪伴狗狗？'],
      ok: '我已經和家長討論過未來的安排',
      tip: '先想好「如果我不在家」的備案：可以請誰幫忙、附近有沒有可靠的寄宿或保母。替牠預先準備，就是對牠一輩子的承諾。' }
  ];
  const DAYS = PT.map(t => t.d);
  const done = id => !!F.t[id];
  const nDone = () => PT.filter(t => done(t.id)).length;
  const inPlay = () => !!document.querySelector('.lf');
  const curDay = () => (typeof S != 'undefined' && S.day) || 0;
  const open = t => !inPlay() || t.d <= curDay() || done(t.id);   // 30 天中：到那天才開放；其他地方（必修課）全部開放
  const dd = d => String(d).padStart(2, '0');

  /* 依調查回答給每個任務一句個別提醒 */
  const pnote = t => {
    if (!F.q1) return '';
    if (F.q1 == 'D') return '你說家人目前不同意養狗。可以先聽聽家人擔心什麼，把這個任務當成一次溝通的機會。';
    if (F.q1 == 'C') return '你還沒和家人討論過養狗。這個任務就是一個很好的開始！';
    const m = {
      care: has('daily') || has('away') ? `家長願意${[has('daily') && '協助日常照顧', has('away') && '在你外出時幫忙'].filter(Boolean).join('、')}，可以一起把每一項排清楚。` : F.q1 == 'B' ? '你說主要由你負責，也想想你不在家的時候誰能幫忙。' : '',
      cost: has('pay') || has('buy') ? `家長願意${[has('pay') && '協助支付費用', has('buy') && '協助購買用品'].filter(Boolean).join('、')}，可以一起確認每個月的預算上限。` : '你還不確定家長能不能協助費用，這次可以好好問問。',
      vet: has('vet') ? '家長願意陪狗狗看醫生，可以先一起找好附近的動物醫院。' : '就醫通常需要家長陪同，問問家長生病時能不能一起去。',
      future: has('away') ? '家長願意在你外出時幫忙，也想想全家一起出門時怎麼辦。' : '想想你上學、全家出遊時，牠可以交給誰。'
    };
    return m[t.id] || '';
  };

  /* ---------- 1. 家長支持度調查（評估最後一題後、配對前） ---------- */
  window.famSurvey = next => {
    if (document.querySelector('.fsv')) return;
    const m = document.createElement('div'); m.className = 'rgm fsv'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'fsvt');
    m.innerHTML = `<form class="rgb fsb" novalidate><i class="fsi">${IC.fam}</i><small class="rge0">FAMILY · SUPPORT</small><h2 id="fsvt">家人怎麼想？</h2><p class="rgs">養狗是全家的事。回答兩個小問題，後面的 30 天會和你一起準備。</p>
<fieldset class="fsq"><legend><b>1</b>家人知道你想養狗嗎？<em>（單選）</em></legend><div class="fso">${Q1.map(([k, t]) => `<label class="fsc"><input type="radio" name="q1" value="${k}"${F.q1 == k ? ' checked' : ''}><i>${k}</i><span>${t}</span></label>`).join('')}</div></fieldset>
<fieldset class="fsq"><legend><b>2</b>如果真的養狗，家長願意提供哪些協助？<em>（可複選）</em></legend><div class="fso two">${Q2.map(([k, t]) => `<label class="fsc ck"><input type="checkbox" name="q2" value="${k}"${has(k) ? ' checked' : ''}><i></i><span>${t}</span></label>`).join('')}</div></fieldset>
<p class="fsn">家人目前不同意，不代表你不適合養狗；這些回答只是幫你看看，還有哪些地方需要和家人溝通。</p><em class="rge" id="fse"></em>
<button type="submit" class="rgo">完成，看看適合我的狗狗 →</button><button type="button" class="rgh">← 回上一題</button></form>`;
    const f = m.querySelector('form'), er = m.querySelector('#fse');
    f.addEventListener('change', e => {
      const x = e.target; er.textContent = '';
      if (x.name == 'q2') { const un = f.querySelector('[value=unsure]'); if (x.value == 'unsure' && x.checked) f.querySelectorAll('[name=q2]').forEach(c => { if (c != un) c.checked = false }); else if (x.checked) un.checked = false }
    });
    f.addEventListener('submit', ev => {
      ev.preventDefault(); const a = f.querySelector('[name=q1]:checked'), b = [...f.querySelectorAll('[name=q2]:checked')].map(x => x.value);
      if (!a) { er.textContent = '請先回答第 1 題'; f.querySelector('[name=q1]').focus(); return }
      if (!b.length) { er.textContent = '第 2 題至少選一項（不確定也可以選「目前還不確定」）'; return }
      F.q1 = a.value; F.q2 = b; F.sAt = Date.now(); save();
      m.classList.add('out'); setTimeout(() => m.remove(), 300);
      const r = f.querySelector('.rgo').getBoundingClientRect(); if (typeof burst == 'function') burst(r.left + r.width / 2, r.top + r.height / 2);
      next && next();
    });
    m.querySelector('.rgh').addEventListener('click', () => { m.remove(); if (typeof setup == 'function') setup() });
    document.body.append(m);
  };

  /* ---------- 2. 親子任務 ---------- */
  const card = t => {
    const ok = done(t.id), op = open(t);
    return `<li class="ptc${ok ? ' ok' : ''}${op ? '' : ' lock'}"><button type="button" data-pt="${op ? 'open' : 'lock'}" data-id="${t.id}"${op ? '' : ' aria-disabled="true"'}><i class="pti">${IC[t.id]}</i><span><small>親子任務・DAY ${dd(t.d)}</small><b>${t.t}</b><em>${ok ? '✓ 已完成' : op ? '還沒完成・點開來討論' : `DAY ${dd(t.d)} 開放`}</em></span></button></li>`;
  };
  const listHTML = () => `<ul class="ptl">${PT.map(card).join('')}</ul>`;

  /* 30 天中開視窗時先暫停翻頁，關掉後恢復原本的速度 */
  const pause = () => { if (inPlay() && S.sp && !run.ps) { run.ps = S.sp; S.sp = 0 } };
  const resume = () => { if (document.querySelector('.ptm')) return; if (run.ps) { S.sp = run.ps; run.ps = 0; if (typeof sched == 'function') sched() } };

  const taskModal = (t, auto) => {
    document.querySelectorAll('.ptm').forEach(x => x.remove());
    pause();
    const m = document.createElement('div'); m.className = 'ptm'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.dataset.id = t.id;
    const pn = pnote(t), ok = done(t.id);
    m.innerHTML = `<div class="ptb${ok ? ' ok' : ''}"><button class="ach-x" data-pt="x" aria-label="關閉">✕</button>
<div class="pth"><i class="pti">${IC[t.id]}</i><div><span class="ptg">${IC.talk}親子任務・DAY ${dd(t.d)}</span><h2>${t.t}</h2></div></div>
<p class="pts">${t.sc}</p>
<div class="ptq"><small>和家長一起討論</small><ol>${t.qs.map(q => `<li>${q}</li>`).join('')}</ol></div>
${pn ? `<p class="ptn">${pn}</p>` : ''}
<label class="rgk ptk"><input type="checkbox" data-pt="ck"${ok ? ' checked' : ''}><span><b>${t.ok}</b>${ok ? `<small>${new Date(F.t[t.id].at).toLocaleDateString('zh-TW')} 完成</small>` : ''}</span></label>
<div class="ptt"${ok ? '' : ' hidden'}><small>小知識</small><p>${t.tip}</p></div>
<div class="ptf"><button class="tr2 ol" data-pt="x">${ok ? '關閉' : auto ? '之後再討論' : '先保留，之後再完成'}</button>${inPlay() ? `<button class="tr2" data-pt="x">繼續 30 天 →</button>` : ''}</div>
<p class="ptm0">不用每天陪著操作，找一個大家都有空的時間聊聊就好。</p></div>`;
    document.body.append(m);
    const k = m.querySelector('.ptk input'); setTimeout(() => k && k.focus(), 50);
    m.addEventListener('keydown', e => { if (e.key == 'Escape') close(m) });
    m.addEventListener('click', e => { if (e.target === m) close(m) });
  };
  const close = m => { m.remove(); refresh(); resume() };
  const toggle = (m, on) => {
    const id = m.dataset.id, t = PT.find(x => x.id == id);
    if (on) F.t[id] = { at: Date.now() }; else delete F.t[id]; save();
    const b = m.querySelector('.ptb'); b.classList.toggle('ok', on); m.querySelector('.ptt').hidden = !on;
    m.querySelector('.ptk span').innerHTML = `<b>${t.ok}</b>${on ? `<small>${new Date().toLocaleDateString('zh-TW')} 完成</small>` : ''}`;
    const x = m.querySelector('.ptf .ol'); if (x) x.textContent = on ? '關閉' : '先保留，之後再完成';
    if (on) { const r = m.querySelector('.ptk').getBoundingClientRect(); if (typeof burst == 'function') burst(r.left + 30, r.top + r.height / 2) }
    refresh();
  };

  /* 30 天裡的清單視窗 */
  const listModal = () => {
    document.querySelectorAll('.ptm').forEach(x => x.remove()); pause();
    const m = document.createElement('div'); m.className = 'ptm'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = `<div class="ptb"><button class="ach-x" data-pt="x" aria-label="關閉">✕</button><div class="pth"><i class="pti">${IC.fam}</i><div><span class="ptg">${IC.talk}FAMILY · TALK</span><h2>親子共同討論任務</h2></div></div>
<p class="pts">每到第 7、14、21、28 天，會開放一個要和家長一起討論的任務。沒完成的可以先保留，之後再回來勾選。</p><p class="ptp">已完成 <b>${nDone()} / ${PT.length}</b></p>${listHTML()}</div>`;
    document.body.append(m);
    m.addEventListener('click', e => { if (e.target === m) close(m) });
    m.addEventListener('keydown', e => { if (e.key == 'Escape') close(m) });
  };

  /* 左側的「親子任務」按鈕（只在 30 天日曆裡） */
  const pillHTML = () => { const pend = PT.some(t => open(t) && !done(t.id)); return `${IC.talk}<span>親子任務</span><b>${nDone()}/${PT.length}</b>${pend ? '<i class="ptd" aria-label="有任務還沒完成"></i>' : ''}` };
  window.ptStart = () => {
    const h = document.querySelector('#hud'); if (!h || document.querySelector('#ptp')) return;
    const b = document.createElement('button'); b.id = 'ptp'; b.type = 'button'; b.dataset.pt = 'list'; b.innerHTML = pillHTML();
    h.append(b);
  };
  window.ptDay = d => {
    refresh();
    const t = PT.find(x => x.d == d);
    if (t && !done(t.id)) setTimeout(() => { if (inPlay() && curDay() == d && !document.querySelector('.ptm,.pop,.fw')) taskModal(t, 1) }, 700);
  };

  /* 必修課「家庭分工」分頁裡的親子任務清單（快速瀏覽：四個都能看） */
  window.ptLab = () => `<div class="ptlab"><div class="ftop"><h3>${IC.talk}親子共同討論任務</h3><span class="sc3">已完成 ${nDone()} / ${PT.length}</span></div><p class="lx">排好分工之後，和家長真的坐下來聊一聊。點任務看討論問題，聊完就打勾。</p>${listHTML()}</div>`;

  const refresh = () => {
    const p = document.querySelector('#ptp'); if (p) p.innerHTML = pillHTML();
    document.querySelectorAll('.ptlab').forEach(s => { s.outerHTML = window.ptLab() });
    document.querySelectorAll('.ptm .ptl').forEach(l => { l.outerHTML = listHTML() });
    document.querySelectorAll('.ptm .ptp b').forEach(b => { b.textContent = `${nDone()} / ${PT.length}` });
    document.querySelectorAll('.fam-rp').forEach(s => { s.outerHTML = window.famReport() });
  };

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-pt]'); if (!b) return; const a = b.dataset.pt;
    if (a == 'list') listModal();
    else if (a == 'open') { const t = PT.find(x => x.id == b.dataset.id); if (t) taskModal(t) }
    else if (a == 'lock') { const t = PT.find(x => x.id == b.dataset.id); const em = b.querySelector('em'); if (em && t) { em.textContent = `走到 DAY ${dd(t.d)} 就會開放`; b.classList.add('shk'); setTimeout(() => b.classList.remove('shk'), 400) } }
    else if (a == 'x') { const m = b.closest('.ptm'); if (m) close(m) }
  });
  document.addEventListener('change', e => { const c = e.target.closest('[data-pt=ck]'); if (c) toggle(c.closest('.ptm'), c.checked) });

  /* ---------- 3. 模擬評估表：家庭支持度 ---------- */
  const STA = { good: ['已具備支持', 'good'], talk: ['已初步討論', 'talk'], todo: ['尚待討論', 'todo'], prep: ['需要更多準備', 'prep'] };
  const rows = () => {
    const unsure = has('unsure'), weak = F.q1 == 'C' || F.q1 == 'D' || !F.q1;
    const st = (help, id) => { const t = done(id); return help && t ? 'good' : t ? 'talk' : help ? 'todo' : (weak || unsure) ? 'prep' : 'todo' };
    const q1s = F.q1 == 'A' ? 'good' : F.q1 == 'B' ? 'talk' : F.q1 == 'C' ? (nDone() ? 'talk' : 'todo') : F.q1 == 'D' ? (nDone() >= 2 ? 'talk' : 'prep') : 'todo';
    const q1d = { A: '家人支持，也願意一起照顧。', B: '家人支持，不過主要由你負責。', C: nDone() ? '前測時還沒討論，30 天裡已經和家人聊過。' : '還沒有和家人討論過想養狗這件事。', D: '家人目前不同意養狗，還需要多一些溝通。' }[F.q1] || '還沒有填寫家長支持度調查。';
    const tx = (help, id, h) => `${h ? '家長願意' + h + '。' : '家長的協助還不確定。'}${done(id) ? '已經完成親子討論。' : '親子討論還沒完成。'}`;
    const hs = ks => ks.filter(has).map(q2n).join('、');
    return [
      { n: '家長支持意願', s: q1s, d: q1d },
      { n: '日常照顧分工', k: '日常照顧的分工', s: st(has('daily'), 'care'), d: tx(has('daily'), 'care', hs(['daily'])) },
      { n: '飼養費用安排', k: '每月的飼養預算', s: st(has('pay') || has('buy'), 'cost'), d: tx(0, 'cost', hs(['pay', 'buy'])) },
      { n: '醫療與突發狀況', k: '生病時的就醫安排', s: st(has('vet') || has('pay'), 'vet'), d: tx(0, 'vet', hs(['vet', 'pay'])) },
      { n: '外出及未來生活', k: '外出時的照顧安排', s: st(has('away'), 'future'), d: tx(0, 'future', hs(['away'])) }
    ];
  };
  const advice = R => {
    const need = R.slice(1).filter(r => r.s == 'todo' || r.s == 'prep').map(r => r.k);
    const j = a => a.length > 1 ? a.slice(0, -1).join('、') + '和' + a[a.length - 1] : a[0];
    let s = '';
    if (!F.q1) s = '你還沒有填寫家長支持度調查。回到「評估」重新走一次，就能看到更完整的家庭支持度。';
    else if (F.q1 == 'D') s = '家人目前還不同意養狗，這不代表你不適合，只是還需要更多溝通。可以先聽聽家人擔心的是什麼，例如費用、時間或誰來照顧，再一起想辦法。';
    else if (F.q1 == 'C') s = nDone() ? '你已經開始和家人聊養狗這件事了，這是很重要的一步。' : '你還沒和家人討論過養狗。先找一個大家都有空的時間，說說你為什麼想養狗吧。';
    else s = nDone() == PT.length ? '你和家人已經把照顧、費用、就醫和未來的安排都討論過了，大家都清楚自己的責任。' : '你已經開始了解養狗需要哪些家庭支持。';
    if (F.q1 && need.length) s += `接下來可以和家人一起討論${j(need)}，讓每個人都清楚自己的責任。`;
    if (F.q1 == 'B') s += '你說主要由你負責，也記得替自己準備「我忙不過來時」的幫手。';
    if (has('unsure')) s += '家長能提供哪些協助還不確定，可以直接問問看，答案會讓準備更踏實。';
    return s;
  };
  window.famReport = () => {
    const R = rows();
    return `<section class="fam-rp"><div class="ach-rh"><div><small>FAMILY · SUPPORT · 家庭支持度</small><h3>養牠，是全家的事</h3></div><button class="tr2 ol" data-pt="list">親子任務 ${nDone()} / ${PT.length} →</button></div>
<ul class="fmr">${R.map(r => `<li class="${STA[r.s][1]}"><b>${r.n}</b><span class="fms">${STA[r.s][0]}</span><p>${r.d}</p></li>`).join('')}</ul>
<p class="fma">${IC.talk}<span>${advice(R)}</span></p>
<p class="ach-s">家庭支持度只是幫你看看還有哪些地方需要和家人溝通，不會影響評估分數，也不代表你適不適合養狗。</p></section>`;
  };
  window.famData = () => JSON.parse(JSON.stringify(F));
})();
