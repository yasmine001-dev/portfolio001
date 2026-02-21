/* ============================================================
   CONFIG
============================================================ */
const DISPLAY_CURRENCIES = [
  { code:'EGP', name:'Egyptian Pound',    nameAr:'الجنيه المصري',    flag:'🇪🇬', toUSD: 1/50.85 },
  { code:'USD', name:'US Dollar',         nameAr:'الدولار الأمريكي', flag:'🇺🇸', toUSD: 1       },
  { code:'EUR', name:'Euro',              nameAr:'اليورو',           flag:'🇪🇺', toUSD: 1/1.08  },
  { code:'SAR', name:'Saudi Riyal',       nameAr:'الريال السعودي',   flag:'🇸🇦', toUSD: 1/3.75  },
  { code:'AED', name:'UAE Dirham',        nameAr:'الدرهم الإماراتي', flag:'🇦🇪', toUSD: 1/3.67  },
  { code:'GBP', name:'British Pound',     nameAr:'الجنيه الإسترليني',flag:'🇬🇧', toUSD: 1/0.79  },
  { code:'KWD', name:'Kuwaiti Dinar',     nameAr:'الدينار الكويتي',  flag:'🇰🇼', toUSD: 1/0.31  },
  { code:'JPY', name:'Japanese Yen',      nameAr:'الين الياباني',    flag:'🇯🇵', toUSD: 1/149   },
];

const EXCHANGE_RATES = [
  { code:'USD', flag:'🇺🇸', nameEn:'US Dollar',          nameAr:'الدولار الأمريكي',    base: 50.85 },
  { code:'EUR', flag:'🇪🇺', nameEn:'Euro',               nameAr:'اليورو',              base: 54.90 },
  { code:'GBP', flag:'🇬🇧', nameEn:'British Pound',      nameAr:'الجنيه الإسترليني',   base: 63.20 },
  { code:'SAR', flag:'🇸🇦', nameEn:'Saudi Riyal',        nameAr:'الريال السعودي',      base: 13.55 },
  { code:'AED', flag:'🇦🇪', nameEn:'UAE Dirham',         nameAr:'الدرهم الإماراتي',    base: 13.85 },
  { code:'KWD', flag:'🇰🇼', nameEn:'Kuwaiti Dinar',      nameAr:'الدينار الكويتي',     base: 164.50},
  { code:'CHF', flag:'🇨🇭', nameEn:'Swiss Franc',        nameAr:'الفرنك السويسري',     base: 55.80 },
  { code:'JPY', flag:'🇯🇵', nameEn:'Japanese Yen',       nameAr:'الين الياباني',       base:  0.335},
];

/* ============================================================
   STATE
============================================================ */
let lang = 'en';
let selectedCurrency = 'EGP';

const BASE = {
  gold:   { price: 2341.50, open: 2328.00 },
  silver: { price: 29.35,   open: 29.10   },
};

const history = {
  gold:   Array.from({length:20},(_,i)=> 2328 + Math.sin(i*0.4)*15 + Math.random()*10),
  silver: Array.from({length:20},(_,i)=> 29.10 + Math.sin(i*0.5)*0.4 + Math.random()*0.3),
};

let state = {
  gold:   { ...BASE.gold,   low: BASE.gold.price-18,    high: BASE.gold.price+22   },
  silver: { ...BASE.silver, low: BASE.silver.price-0.5, high: BASE.silver.price+0.7 },
  rates:  EXCHANGE_RATES.map(c=>({...c, price:c.base, prev:c.base})),
  usdEGP: 50.85,
};

/* ============================================================
   TRANSLATIONS
============================================================ */
const T = {
  en: {
    welcomeSub:    'Live prices for gold, silver & currencies',
    currLabel:     'Display prices in:',
    enterBtn:      'Enter →',
    live:          'Live',
    eyebrow:       '✦ Real-Time Live Data',
    heroTitle:     'Gold & Currencies<br/>at a Glance',
    heroDesc:      'Track gold, silver and global currencies — updated every few seconds.',
    lastUpdated:   'Last updated:',
    secMetals:     'Precious Metals',
    secCurrencies: 'Exchange Rates vs EGP',
    goldName:      'Gold 24K — Troy Ounce',
    silverName:    'Silver — Troy Ounce',
    goldUnit:      (sym,val) => `USD / oz &nbsp;·&nbsp; In ${sym}: ${val}`,
    silverUnit:    (sym,val) => `USD / oz &nbsp;·&nbsp; In ${sym}: ${val}`,
    lblLow:  'Day Low', lblHigh: 'Day High', lblOpen: 'Open',
    footerCredit: 'Built with HTML / CSS / JS',
    footerNote:   '⚠️ Prices for educational purposes only',
    currUnit:      'EGP',
  },
  ar: {
    welcomeSub:    'أسعار الذهب والفضة والعملات لحظياً',
    currLabel:     'عرض الأسعار بعملة:',
    enterBtn:      'ادخل ←',
    live:          'مباشر',
    eyebrow:       '✦ بيانات لحظية مباشرة',
    heroTitle:     'الذهب والعملات<br/>في لمحة',
    heroDesc:      'تابع أسعار الذهب والفضة والعملات العالمية — تحديث كل ثوانٍ.',
    lastUpdated:   'آخر تحديث:',
    secMetals:     'المعادن الثمينة',
    secCurrencies: 'أسعار العملات مقابل الجنيه',
    goldName:      'الذهب عيار 24 — أوقية',
    silverName:    'الفضة — أوقية',
    goldUnit:      (sym,val) => `دولار / أوقية &nbsp;·&nbsp; بـ${sym}: ${val}`,
    silverUnit:    (sym,val) => `دولار / أوقية &nbsp;·&nbsp; بـ${sym}: ${val}`,
    lblLow:  'أدنى اليوم', lblHigh: 'أعلى اليوم', lblOpen: 'الافتتاح',
    footerCredit: 'صُنع بـ HTML / CSS / JS',
    footerNote:   '⚠️ الأسعار للأغراض التعليمية فقط',
    currUnit:      'جنيه',
  }
};

/* ============================================================
   WELCOME SCREEN
============================================================ */
function buildWelcomeCurrencies(){
  const sel = document.getElementById('currSelector');
  sel.innerHTML = '';
  DISPLAY_CURRENCIES.forEach(c => {
    const div = document.createElement('div');
    div.className = 'curr-opt' + (c.code===selectedCurrency?' selected':'');
    div.innerHTML = `<span class="co-flag">${c.flag}</span>
      <div class="co-info">
        <div class="co-name">${lang==='ar'?c.nameAr:c.name}</div>
        <div class="co-code">${c.code}</div>
      </div>`;
    div.onclick = () => {
      selectedCurrency = c.code;
      document.querySelectorAll('.curr-opt').forEach(el=>el.classList.remove('selected'));
      div.classList.add('selected');
    };
    sel.appendChild(div);
  });
}

function setLang(l){
  lang = l;
  const html = document.documentElement;
  html.setAttribute('lang', l);
  html.setAttribute('dir', l==='ar'?'rtl':'ltr');

  // welcome
  document.getElementById('welcomeSub').textContent = T[l].welcomeSub;
  document.getElementById('welcomeCurrLabel').textContent = T[l].currLabel;
  document.getElementById('btnEnter').textContent = T[l].enterBtn;
  document.getElementById('wLangAr').classList.toggle('active', l==='ar');
  document.getElementById('wLangEn').classList.toggle('active', l==='en');

  // nav
  document.getElementById('navLangAr').classList.toggle('active', l==='ar');
  document.getElementById('navLangEn').classList.toggle('active', l==='en');

  buildWelcomeCurrencies();
  applyTranslations();
}

function applyTranslations(){
  const t = T[lang];
  document.getElementById('liveTxt').textContent       = t.live;
  document.getElementById('heroEyebrow').textContent   = t.eyebrow;
  document.getElementById('heroTitle').innerHTML       = t.heroTitle;
  document.getElementById('heroDesc').textContent      = t.heroDesc;
  document.getElementById('lastUpdateWrap').innerHTML  = t.lastUpdated + ' <span id="lastUpdate">--:--:--</span>';
  document.getElementById('secMetals').textContent     = t.secMetals;
  document.getElementById('secCurrencies').textContent = t.secCurrencies;
  document.getElementById('goldName').textContent      = t.goldName;
  document.getElementById('silverName').textContent    = t.silverName;
  document.getElementById('lblLow').textContent        = t.lblLow;
  document.getElementById('lblHigh').textContent       = t.lblHigh;
  document.getElementById('lblOpen').textContent       = t.lblOpen;
  document.getElementById('lblLow2').textContent       = t.lblLow;
  document.getElementById('lblHigh2').textContent      = t.lblHigh;
  document.getElementById('lblOpen2').textContent      = t.lblOpen;
  document.getElementById('footerCredit').textContent  = t.footerCredit;
  document.getElementById('footerNote').textContent    = t.footerNote;
  updateTime();
  renderMetals();
  buildCurrencyCards();
  buildCurrDropdown();
}

function enterSite(){
  const overlay = document.getElementById('welcomeOverlay');
  overlay.classList.add('hide');
  setTimeout(()=>{ overlay.style.display='none'; }, 500);
  applyTranslations();
  buildCurrencyCards();
  buildTicker();
  renderMetals();
  updateTime();
}

/* ============================================================
   UTILS
============================================================ */
function fmt(n, dec=2){ return n.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}); }

function convertFromUSD(usdVal){
  const cur = DISPLAY_CURRENCIES.find(c=>c.code===selectedCurrency);
  if(!cur) return usdVal;
  // usdVal → selected currency
  return usdVal / cur.toUSD;
}

function fmtLocal(usdVal){
  return fmt(convertFromUSD(usdVal)) + ' ' + selectedCurrency;
}

function pct(now,open){ const p=(now-open)/open*100; return (p>=0?'▲ +':'▼ ')+fmt(Math.abs(p))+'%'; }
function pctClass(now,open){ return now>=open?'change-up':'change-down'; }

/* ============================================================
   MINI CHART
============================================================ */
function drawChart(canvasId, data, color){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const dpr = window.devicePixelRatio||1;
  const W = canvas.offsetWidth*dpr||300;
  const H = 46*dpr;
  canvas.width=W; canvas.height=H;
  const ctx = canvas.getContext('2d');
  const min=Math.min(...data), max=Math.max(...data), range=max-min||1;
  const pts = data.map((v,i)=>[i/(data.length-1)*W, H-((v-min)/range)*(H*0.8)-H*0.1]);
  ctx.clearRect(0,0,W,H);
  const grad=ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,color+'40'); grad.addColorStop(1,color+'00');
  ctx.beginPath(); ctx.moveTo(pts[0][0],H);
  pts.forEach(p=>ctx.lineTo(p[0],p[1]));
  ctx.lineTo(pts[pts.length-1][0],H); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
  pts.forEach(p=>ctx.lineTo(p[0],p[1]));
  ctx.strokeStyle=color; ctx.lineWidth=2*dpr; ctx.lineJoin='round'; ctx.stroke();
}

/* ============================================================
   RENDER METALS
============================================================ */
function renderMetals(){
  const g=state.gold, s=state.silver;
  const isDark = document.documentElement.getAttribute('data-theme')==='dark';
  const goldCol  = isDark?'#d4a843':'#b8870a';
  const silvCol  = isDark?'#c0c8d8':'#606880';
  const t = T[lang];

  flashSet('goldPrice',   fmt(g.price), g.price, g.prev);
  flashSet('silverPrice', fmt(s.price), s.price, s.prev);

  document.getElementById('goldChange').textContent  = pct(g.price,g.open);
  document.getElementById('goldChange').className   = 'metal-change '+pctClass(g.price,g.open);
  document.getElementById('silverChange').textContent= pct(s.price,s.open);
  document.getElementById('silverChange').className  = 'metal-change '+pctClass(s.price,s.open);

  document.getElementById('goldUnit').innerHTML   = t.goldUnit(selectedCurrency, fmtLocal(g.price));
  document.getElementById('silverUnit').innerHTML = t.silverUnit(selectedCurrency, fmtLocal(s.price));

  document.getElementById('goldLow').textContent    = fmt(g.low);
  document.getElementById('goldHigh').textContent   = fmt(g.high);
  document.getElementById('goldOpen').textContent   = fmt(g.open);
  document.getElementById('silverLow').textContent  = fmt(s.low);
  document.getElementById('silverHigh').textContent = fmt(s.high);
  document.getElementById('silverOpen').textContent = fmt(s.open);

  drawChart('goldChart',   history.gold,   goldCol);
  drawChart('silverChart', history.silver, silvCol);
}

function flashSet(id, val, now, prev){
  const el=document.getElementById(id); if(!el) return;
  if(prev!==undefined && now!==prev){
    el.classList.remove('flash-up','flash-down');
    void el.offsetWidth;
    el.classList.add(now>prev?'flash-up':'flash-down');
    setTimeout(()=>el.classList.remove('flash-up','flash-down'),800);
  }
  el.textContent = val;
}

/* ============================================================
   CURRENCY CARDS
============================================================ */
function buildCurrencyCards(){
  const grid = document.getElementById('currenciesGrid');
  grid.innerHTML='';
  state.rates.forEach(c=>{
    const change=((c.price-c.base)/c.base*100);
    const chStr=(change>=0?'+':'')+fmt(change)+'%';
    const cc=change>=0?'var(--up)':'var(--down)';
    const cbg=change>=0?'var(--up-dim)':'var(--down-dim)';
    const name = lang==='ar' ? c.nameAr : c.nameEn;
    const div=document.createElement('div');
    div.className='currency-card'; div.id='curr_'+c.code;
    div.innerHTML=`
      <div class="curr-flag">${c.flag}</div>
      <div class="curr-info">
        <div class="curr-name">${name}</div>
        <div class="curr-code">${c.code} / EGP</div>
        <div class="curr-price" id="cval_${c.code}">${fmt(c.price)}</div>
      </div>
      <div class="curr-right">
        <div class="curr-change" id="cchg_${c.code}" style="color:${cc};background:${cbg}">${chStr}</div>
        <div class="curr-egp" id="cunit_${c.code}">${T[lang].currUnit}</div>
      </div>`;
    grid.appendChild(div);
  });
}

function updateCurrencyCards(){
  state.rates.forEach(c=>{
    const prev=c.price;
    c.price=c.base*(1+(Math.random()-0.5)*0.004);
    const el=document.getElementById('cval_'+c.code);
    if(el){
      el.classList.remove('flash-up','flash-down');
      void el.offsetWidth;
      el.classList.add(c.price>prev?'flash-up':'flash-down');
      setTimeout(()=>el.classList.remove('flash-up','flash-down'),700);
      el.textContent=fmt(c.price);
    }
    const chg=((c.price-c.base)/c.base*100);
    const chEl=document.getElementById('cchg_'+c.code);
    if(chEl){
      chEl.style.color=chg>=0?'var(--up)':'var(--down)';
      chEl.style.background=chg>=0?'var(--up-dim)':'var(--down-dim)';
      chEl.textContent=(chg>=0?'+':'')+fmt(chg)+'%';
    }
  });
  const usd=state.rates.find(c=>c.code==='USD');
  if(usd) state.usdEGP=usd.price;
}

/* ============================================================
   TICKER
============================================================ */
function buildTicker(){
  const items=[
    {name:'XAU/USD', price:fmt(state.gold.price),   up:state.gold.price>=state.gold.open},
    {name:'XAG/USD', price:fmt(state.silver.price), up:state.silver.price>=state.silver.open},
    ...state.rates.map(c=>({name:c.code+'/EGP', price:fmt(c.price), up:c.price>=c.base})),
  ];
  const all=[...items,...items];
  document.getElementById('tickerTrack').innerHTML=all.map(it=>`
    <div class="ticker-item">
      <span class="ticker-name">${it.name}</span>
      <span class="ticker-price">${it.price}</span>
      <span class="${it.up?'ticker-up':'ticker-down'}">${it.up?'▲':'▼'}</span>
    </div>`).join('');
}

/* ============================================================
   TIME
============================================================ */
function updateTime(){
  const el=document.getElementById('lastUpdate');
  if(el) el.textContent=new Date().toLocaleTimeString(lang==='ar'?'ar-EG':'en-US');
}

/* ============================================================
   SIMULATE
============================================================ */
function tick(){
  const g=state.gold;
  g.prev=g.price; g.price+=(Math.random()-0.48)*3.5;
  g.low=Math.min(g.low,g.price); g.high=Math.max(g.high,g.price);
  history.gold.push(g.price); history.gold.shift();

  const s=state.silver;
  s.prev=s.price; s.price+=(Math.random()-0.48)*0.08;
  s.low=Math.min(s.low,s.price); s.high=Math.max(s.high,s.price);
  history.silver.push(s.price); history.silver.shift();

  updateCurrencyCards();
  renderMetals();
  buildTicker();
  updateTime();
}

/* ============================================================
   CURRENCY SWITCHER DROPDOWN
============================================================ */
function buildCurrDropdown(){
  const items = document.getElementById('dropItems');
  items.innerHTML = '';
  DISPLAY_CURRENCIES.forEach(c => {
    const div = document.createElement('div');
    div.className = 'drop-item' + (c.code===selectedCurrency?' active':'');
    div.innerHTML = `
      <span class="di-flag">${c.flag}</span>
      <span>${lang==='ar'?c.nameAr:c.name}</span>
      <span class="di-code">${c.code}</span>
      ${c.code===selectedCurrency?'<span class="di-check">✓</span>':''}
    `;
    div.onclick = () => changeCurrency(c.code);
    items.appendChild(div);
  });
  // update label
  document.getElementById('dropLabel').textContent = lang==='ar' ? 'اختر العملة' : 'Currency';
}

function toggleCurrDropdown(e){
  e.stopPropagation();
  document.getElementById('currSwitcher').classList.toggle('open');
}

function changeCurrency(code){
  selectedCurrency = code;
  const cur = DISPLAY_CURRENCIES.find(c=>c.code===code);
  document.getElementById('csbFlag').textContent = cur.flag;
  document.getElementById('csbCode').textContent = cur.code;
  document.getElementById('currSwitcher').classList.remove('open');
  buildCurrDropdown();
  renderMetals();
}

// close dropdown when clicking outside
document.addEventListener('click', ()=>{
  document.getElementById('currSwitcher').classList.remove('open');
});

/* ============================================================
   THEME — FIXED
============================================================ */
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', isDark?'light':'dark');
  setTimeout(renderMetals,50);
}

/* ============================================================
   INIT
============================================================ */
buildWelcomeCurrencies();
setLang('en'); // default English
buildCurrDropdown();

// init switcher btn display
const _initCur = DISPLAY_CURRENCIES.find(c=>c.code===selectedCurrency);
document.getElementById('csbFlag').textContent = _initCur.flag;
document.getElementById('csbCode').textContent = _initCur.code;

setInterval(tick, 3000);
setInterval(updateTime, 1000);
window.addEventListener('resize', renderMetals);
