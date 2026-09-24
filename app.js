
/* ════ OFFERS DATA ════ */
/* ════ FLYER IMAGES (source unique) ════ */
const FLYER1 = "images/flyer-janvier.jpg";
const FLYER2 = "images/flyer-juin.png";
const FLYER3 = "images/flyer-mai.png";
const FLYER4 = "images/flyer-juillet.jpg";

/* ════ OFFERS DATA — source unique, sync auto accueil ↔ page offres ════ */
let offresData = [
  {
    slogan:"EN JANVIER, FONCEZ SUR LES PRIX !",
    desc:"5% de remise sur tous vos achats*. Du 2 au 31 janvier. *Versés le mois suivant sous forme de chèques-cadeaux.",
    badge:"5% remise",
    img: FLYER1
  },
  {
    slogan:"TOP DÉPART, LES PRIX DÉVALENT !",
    desc:"5% de remise sur tous vos achats*. Du 1ᵉʳ au 30 juin. *Versés le mois suivant sous forme de chèques-cadeaux.",
    badge:"5% remise",
    img: FLYER2
  },
  {
    slogan:"PRENEZ LE VOLANT DES BONNES AFFAIRES !",
    desc:"5% de remise sur tous vos achats*. Du 2 au 31 mai. Chaque tour compte, chaque € aussi ! *Versés le mois suivant sous forme de chèques-cadeaux.",
    badge:"5% remise",
    img: FLYER3
  },
  {
    slogan:"EN ÉTÉ, FAITES DÉRAPER LES PRIX !",
    desc:"5% de remise sur tous vos achats*. Du 2 au 31 juillet. *Versés le mois suivant sous forme de chèques-cadeaux.",
    badge:"5% remise",
    img: FLYER4
  },
];
 
/* ════ RENDER OFFERS — source unique ════ */
function renderOffres(){
  /* ── helper: build flyer image block ── */
  function flyerImg(o, cssClass){
    if(!o.img) return '';
    return `<div class="${cssClass}"><img src="${o.img}" alt="${o.slogan} – EUROGAM" loading="lazy"></div>`;
  }

  /* ── ACCUEIL: 2 premières offres uniquement ── */
  const prev = document.getElementById('offres-preview-container');
  if(prev){
    prev.innerHTML = offresData.slice(0,2).map(o => `
      <div class="offre-card reveal">
        ${flyerImg(o,'offre-flyer-wrap') || `<div class="offre-img" style="background:#1a3a5c"></div>`}
        <div class="offre-body">
          <div class="offre-slogan">${o.slogan}</div>
          <p class="offre-desc">${o.desc}</p>
          <button class="offre-cta" onclick="showPage('contact')">Demander un devis →</button>
        </div>
      </div>`).join('');
  }

  /* ── PAGE OFFRES: toutes les 4 offres ── */
  const full = document.getElementById('offres-full-container');
  if(full){
    full.innerHTML = offresData.map((o,i) => `
      <div class="offre-card-full reveal d${(i%4)+1}">
        ${flyerImg(o,'offre-full-flyer-wrap') || `<div class="offre-full-img" style="background:#1a3a5c"></div>`}
        <div class="offre-full-body">
          <div class="offre-full-badge">${o.badge}</div>
          <div class="offre-full-slogan">${o.slogan}</div>
          <p class="offre-full-desc">${o.desc}</p>
          <div class="offre-full-actions">
            <button class="btn-primary" onclick="showPage('contact')">Demander un devis</button>
            <button style="background:transparent;color:var(--blue);border:2px solid var(--blue);font-family:'Barlow Condensed',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.75rem 1.4rem;border-radius:4px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='var(--blue)';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='var(--blue)'" onclick="showPage('contact')">Demander un devis</button>
          </div>
        </div>
      </div>`).join('');
  }
  initReveal();
}
 
/* ════ PAGE NAV ════ */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,100);
  if(id==='accueil') startCounters();
}
 
/* ════ FAQ ════ */
function toggleFaq(el){el.closest('.faq-item').classList.toggle('open')}
 



/* ════ SCROLL REVEAL ════ */
function initReveal(){
  const els=document.querySelectorAll('.page.active .reveal,.page.active .reveal-left,.page.active .reveal-right');
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.12});
  els.forEach(el=>obs.observe(el));
}
document.addEventListener('DOMContentLoaded',initReveal);
 
/* ════ PARALLAX ════ */
const pbg=document.getElementById('parallax-bg');
window.addEventListener('scroll',()=>{if(pbg)pbg.style.transform=`translateY(${window.scrollY*.3}px)`});
 
/* ════ COUNTERS ════ */
let cStarted=false;
function startCounters(){
  if(cStarted)return;
  document.querySelectorAll('.counter-num').forEach(el=>{
    const target=+el.dataset.target,suffix=el.dataset.suffix||'';
    let cur=0; const step=target/110;
    const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t)}el.textContent=Math.floor(cur)+suffix},16);
  });
  cStarted=true;
}
const cSection=document.querySelector('.counters-section');
if(cSection){const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){startCounters();obs.disconnect()}},{threshold:.3});obs.observe(cSection)}
 

 
/* ════ ADMIN ════ */
const ADMIN_PWD='RodusedeuroG';
let _adminFileTarget = null; // index of row waiting for file upload

function openAdminModal(){
  document.getElementById('admin-modal').classList.add('open');
  document.getElementById('admin-pwd').value='';
  document.getElementById('admin-err').style.display='none';
  setTimeout(()=>document.getElementById('admin-pwd').focus(),100);
}
function closeAdminModal(){document.getElementById('admin-modal').classList.remove('open')}
function checkAdminPwd(){
  if(document.getElementById('admin-pwd').value===ADMIN_PWD){closeAdminModal();openAdminPanel()}
  else{document.getElementById('admin-err').style.display='block';document.getElementById('admin-pwd').value='';document.getElementById('admin-pwd').focus()}
}
function openAdminPanel(){
  const panel=document.getElementById('admin-panel');
  if(!panel) return;
  panel.classList.add('open');
  renderAdminRows();
  setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'start'}),80);
}

/* ── collect current field values back into offresData ── */
function _collectAdminFields(){
  offresData = offresData.map((o,i)=>({
    ...o,
    slogan: document.getElementById(`as-${i}`)?.value || o.slogan,
    desc:   document.getElementById(`ad-${i}`)?.value || o.desc,
    badge:  document.getElementById(`ab-${i}`)?.value || o.badge,
    img:    document.getElementById(`ai-${i}`)?.value  || o.img || '',
  }));
}

/* ── render all admin rows ── */
function renderAdminRows(){
  const list = document.getElementById('admin-offres-list');
  if(!list) return; /* panel not open yet — skip */
  list.innerHTML = offresData.map((o,i)=>{
    const isAccueil = i < 2;
    const thumbHtml = o.img
      ? `<img class="admin-img-thumb" src="${o.img.length > 300 ? o.img.substring(0,80)+'…' : o.img}" id="athumb-${i}" style="width:56px;height:46px;object-fit:cover;border-radius:4px;border:1px solid var(--gray-light)">`
      : `<div class="admin-img-thumb-placeholder" id="athumb-${i}">🖼</div>`;

    return `
    <div class="admin-row" id="adrow-${i}"
         draggable="true"
         ondragstart="adminDragStart(event,${i})"
         ondragover="adminDragOver(event)"
         ondrop="adminDrop(event,${i})"
         ondragend="adminDragEnd()">

      <!-- TOP BAR: handle + position + accueil tag + delete -->
      <div class="admin-row-top" style="display:flex;align-items:center;gap:.6rem">
        <span class="admin-handle" title="Glisser pour réordonner">⠿</span>
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:.75rem;font-weight:700;color:var(--gray-mid);min-width:22px">#${i+1}</span>
        ${isAccueil ? `<span class="admin-accueil-tag">🏠 Accueil</span>` : ''}
        <div class="admin-order-btns" style="margin-left:auto">
          <button class="admin-btn-order" onclick="adminMoveUp(${i})" ${i===0?'disabled':''} title="Monter">▲</button>
          <button class="admin-btn-order" onclick="adminMoveDown(${i})" ${i===offresData.length-1?'disabled':''} title="Descendre">▼</button>
        </div>
        <button class="admin-del" onclick="adminDel(${i})" title="Supprimer cette offre">🗑</button>
      </div>

      <!-- TEXT FIELDS -->
      <div class="admin-row-fields">
        <div>
          <div class="admin-section-lbl">Titre / Slogan</div>
          <input type="text" id="as-${i}" value="${o.slogan.replace(/"/g,'&quot;').replace(/'/g,"&#39;")}" placeholder="Titre de l'offre">
        </div>
        <div>
          <div class="admin-section-lbl">Description</div>
          <textarea id="ad-${i}" placeholder="Description courte">${o.desc}</textarea>
        </div>
        <div>
          <div class="admin-section-lbl">Badge</div>
          <input type="text" id="ab-${i}" value="${o.badge}" placeholder="Ex: 5% remise">
        </div>
      </div>

      <!-- IMAGE -->
      <div style="display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;padding:.6rem .8rem;background:#f8fafc;border-radius:6px;border:1px solid var(--gray-light)">
        <div class="admin-section-lbl" style="margin:0;white-space:nowrap">Image flyer</div>
        ${thumbHtml}
        <button class="admin-file-btn" onclick="adminTriggerUpload(${i})" type="button">📁 Upload</button>
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:.7rem;color:var(--gray-mid)">ou</span>
        <input type="text" id="ai-${i}" class="admin-url-input"
          value="${o.img && o.img.startsWith('data:') ? '' : (o.img||'')}"
          placeholder="URL de l'image (https://…)"
          oninput="adminPreviewUrl(${i})"
          style="flex:1;min-width:180px;font-size:.75rem;padding:.4rem .6rem">
        ${o.img && o.img.startsWith('data:') ? `<span style="font-size:.7rem;color:#166534;font-family:'Barlow Condensed',sans-serif;font-weight:700">✅ Fichier chargé</span>` : ''}
      </div>

    </div>`;
  }).join('');

  initAdminDragDrop();
}

/* ── file upload ── */
function adminTriggerUpload(i){
  _adminFileTarget = i;
  document.getElementById('admin-file-input').value = '';
  document.getElementById('admin-file-input').click();
}
function adminHandleFileUpload(input){
  if(!input.files || !input.files[0]) return;
  const i = _adminFileTarget;
  const reader = new FileReader();
  reader.onload = function(e){
    _collectAdminFields();
    offresData[i].img = e.target.result;
    _saveOffersToStorage();
    renderAdminRows();
    renderOffres();
    _flashSaved('Image mise à jour et sauvegardée !');
  };
  reader.readAsDataURL(input.files[0]);
}

/* ── url preview ── */
function adminPreviewUrl(i){
  const val = document.getElementById(`ai-${i}`)?.value?.trim();
  if(!val) return;
  const thumb = document.getElementById(`athumb-${i}`);
  if(!thumb) return;
  const img = document.createElement('img');
  img.className = 'admin-img-thumb';
  img.style.cssText = 'width:56px;height:46px;object-fit:cover;border-radius:4px;border:1px solid var(--gray-light)';
  img.src = val;
  img.onerror = ()=>{};
  thumb.replaceWith(img);
}

/* ── move up/down ── */
function adminMoveUp(i){
  if(i===0) return;
  _collectAdminFields();
  [offresData[i-1], offresData[i]] = [offresData[i], offresData[i-1]];
  _saveOffersToStorage();
  renderAdminRows();
  renderOffres();
}
function adminMoveDown(i){
  if(i===offresData.length-1) return;
  _collectAdminFields();
  [offresData[i], offresData[i+1]] = [offresData[i+1], offresData[i]];
  _saveOffersToStorage();
  renderAdminRows();
  renderOffres();
}

/* ── drag & drop ── */
let _dragSrcIdx = null;
function initAdminDragDrop(){
  // nothing extra needed: events are inline
}
function adminDragStart(e, i){
  _dragSrcIdx = i;
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function adminDragOver(e){
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  // highlight target
  document.querySelectorAll('.admin-row').forEach(r=>r.classList.remove('drag-over'));
  e.currentTarget.classList.add('drag-over');
}
function adminDrop(e, targetIdx){
  e.preventDefault();
  if(_dragSrcIdx === null || _dragSrcIdx === targetIdx) return;
  _collectAdminFields();
  const moved = offresData.splice(_dragSrcIdx, 1)[0];
  offresData.splice(targetIdx, 0, moved);
  _dragSrcIdx = null;
  _saveOffersToStorage();
  renderAdminRows();
  renderOffres();
}
function adminDragEnd(){
  _dragSrcIdx = null;
  document.querySelectorAll('.admin-row').forEach(r=>{
    r.classList.remove('dragging','drag-over');
  });
}

/* ── delete ── */
function adminDel(i){
  if(!confirm('Supprimer cette offre ?')) return;
  _collectAdminFields();
  offresData.splice(i,1);
  _saveOffersToStorage();
  renderAdminRows();
  renderOffres();
}

/* ── add ── */
function adminAddOffre(){
  _collectAdminFields();
  offresData.push({
    slogan:'Nouvelle offre',
    desc:"Description de l'offre.",
    badge:'Nouveau',
    img:''
  });
  renderAdminRows();
  // scroll to last
  setTimeout(()=>{
    const rows = document.querySelectorAll('.admin-row');
    rows[rows.length-1]?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }, 80);
}

/* ── save & publish ── */
function adminSaveOffres(){
  _collectAdminFields();
  // apply URL fields (not data: ones)
  offresData = offresData.map((o,i)=>{
    const urlVal = document.getElementById(`ai-${i}`)?.value?.trim();
    if(urlVal && urlVal.startsWith('http')){
      o.img = urlVal;
    }
    return o;
  });
  _saveOffersToStorage(); // ← persist to localStorage
  renderOffres();
  renderAdminRows();
  _flashSaved('Offres sauvegardées et publiées !');
}

function _flashSaved(msg){
  const m = document.getElementById('adm-saved');
  if(!m) return;
  m.textContent = msg;
  m.style.display = 'inline-block';
  setTimeout(()=>{ if(m) m.style.display='none'; }, 3500);
}
 

/* ════ IMAGE DATA ════ */

/* ════ PARTICLES ════ */
(function createParticles(){
  const c = document.getElementById('hero-particles');
  if(!c) return;
  for(let i=0;i<20;i++){
    const p = document.createElement('div');
    p.className = 'hparticle';
    const size = 2 + Math.random()*5;
    const isOrange = Math.random() > 0.45;
    p.style.cssText = [
      `left:${Math.random()*100}%`,
      `bottom:${Math.random()*25}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${isOrange ? '#f07010' : 'rgba(255,255,255,0.55)'}`,
      `--pdur:${4+Math.random()*7}s`,
      `--pdelay:${Math.random()*7}s`,
      `--pdrift:${(Math.random()-0.5)*70}px`,
    ].join(';');
    c.appendChild(p);
  }
})();

/* ════ SCROLL TOP ════ */
window.addEventListener('scroll', function(){
  const btn = document.getElementById('scroll-top');
  if(btn) btn.classList.toggle('visible', window.scrollY > 400);
}, {passive:true});

/* ════ ENHANCED COUNTER (replaces basic one) ════ */
(function setupCounters(){
  let done = false;
  const section = document.querySelector('.counters-section');
  if(!section) return;
  const obs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && !done) {
      done = true;
      document.querySelectorAll('.counter-num').forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const steps = 80;
        const inc = target / steps;
        let cur = 0; let step = 0;
        el.textContent = '0' + suffix;
        const t = setInterval(() => {
          step++;
          // ease-out
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          cur = Math.round(target * eased);
          el.textContent = cur.toLocaleString('fr') + suffix;
          if(step >= steps) { el.textContent = target.toLocaleString('fr') + suffix; clearInterval(t); }
        }, duration / steps);
      });
    }
  }, {threshold: 0.35});
  obs.observe(section);
})();

/* ════ PERSISTENCE DES OFFRES (localStorage) ════ */
/*
 * Les offres modifiées dans l'admin sont sauvegardées dans
 * localStorage sous la clé 'eurogam_offres_v1'.
 * Au chargement de la page, si des offres sauvegardées existent
 * elles remplacent les offres par défaut codées en dur.
 * Ainsi, toute modification survive à un rechargement de page.
 *
 * Pour remettre les offres d'origine : dans la console :
 *   localStorage.removeItem('eurogam_offres_v1'); location.reload();
 */
const _OFFERS_KEY = 'eurogam_offres_v1';

function _saveOffersToStorage(){
  try {
    // Sauvegarde sans les images base64 trop grandes si > 500KB
    // (les images base64 des flyers originaux restent dans le code source)
    const toSave = offresData.map(o => ({
      slogan: o.slogan,
      desc:   o.desc,
      badge:  o.badge,
      // On ne sauvegarde l'image que si c'est une URL http ou une petite base64
      img:    (o.img && (o.img.startsWith('http') || o.img.length < 500000))
              ? o.img : '__KEEP_DEFAULT__'
    }));
    localStorage.setItem(_OFFERS_KEY, JSON.stringify(toSave));
  } catch(e) {
    // localStorage plein (images trop grosses) : on sauvegarde sans images
    try {
      const toSave = offresData.map(o=>({slogan:o.slogan,desc:o.desc,badge:o.badge,img:'__KEEP_DEFAULT__'}));
      localStorage.setItem(_OFFERS_KEY, JSON.stringify(toSave));
    } catch(e2){ /* silent */ }
  }
}

function _loadOffersFromStorage(){
  try {
    const raw = localStorage.getItem(_OFFERS_KEY);
    if(!raw) return; // rien de sauvegardé → on garde les offres par défaut
    const saved = JSON.parse(raw);
    if(!Array.isArray(saved) || saved.length === 0) return;
    offresData = offresData.map((orig, i) => {
      if(i >= saved.length) return orig; // offre par défaut s'il y en a plus dans le code
      const s = saved[i];
      return {
        ...orig,                             // garde img, emoji, color du code source
        slogan: s.slogan || orig.slogan,
        desc:   s.desc   || orig.desc,
        badge:  s.badge  || orig.badge,
        img:    (s.img && s.img !== '__KEEP_DEFAULT__') ? s.img : orig.img,
      };
    });
    // Si l'admin a ajouté des offres supplémentaires
    if(saved.length > offresData.length){
      for(let i = offresData.length; i < saved.length; i++){
        const s = saved[i];
        offresData.push({
          slogan: s.slogan || 'Offre',
          desc:   s.desc   || '',
          badge:  s.badge  || 'Promo',
          img:    (s.img && s.img !== '__KEEP_DEFAULT__') ? s.img : '',
        });
      }
    }
    // Si l'admin a supprimé des offres
    if(saved.length < offresData.length){
      offresData = offresData.slice(0, saved.length);
    }
  } catch(e){ /* silent — on garde les offres par défaut */ }
}

/* ════ INIT ════ */
_loadOffersFromStorage(); // charge les offres sauvegardées si elles existent
renderOffres();
