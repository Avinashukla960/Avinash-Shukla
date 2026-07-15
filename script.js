(function(){
    const pl = document.getElementById('preloader');
    const bar = document.getElementById('plBar');
    const pct = document.getElementById('plPct');
    if (!pl) return;
    let n = 0;
    const tick = () => {
      n += Math.random() * 14 + 4;
      if (n >= 100) n = 100;
      bar.style.width = n + '%';
      pct.textContent = Math.floor(n) + '%';
      if (n < 100) { setTimeout(tick, 120 + Math.random()*120); }
      else {
        setTimeout(() => {
          pl.classList.add('done');
          document.body.classList.remove('loading');
          setTimeout(() => pl.remove(), 1100);
        }, 450);
      }
    };
    setTimeout(tick, 900);
  })();

  (function(){
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved === 'light') { document.body.classList.add('light'); btn.textContent = '☀️'; }
    btn.addEventListener('click', () => {
      const light = document.body.classList.toggle('light');
      btn.textContent = light ? '☀️' : '🌙';
      localStorage.setItem('theme', light ? 'light' : 'dark');
    });
  })();

  const y = new Date().getFullYear();
  const yEl = document.getElementById('year'); if (yEl) yEl.textContent = y;

  (function(){
    const el = document.getElementById('typed'); if (!el) return;
    const roles = ['Full-Stack Web Developer', 'DSA Learner', 'Problem Solver', 'CSE Student', 'Builder'];
    let ri = 0, ci = 0, deleting = false;
    function type(){
      const word = roles[ri];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci === word.length + 1){ deleting = true; return setTimeout(type, 1400); }
      if (deleting && ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
      setTimeout(type, deleting ? 45 : 90);
    }
    type();
  })();

  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => { burger.classList.toggle('active'); mobileMenu.classList.toggle('open'); });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('active'); mobileMenu.classList.remove('open'); }));

  ['marquee','marquee2'].forEach(id => { const m = document.getElementById(id); if (m) m.innerHTML += m.innerHTML; });

  document.querySelectorAll('.head h2').forEach(h2 => {
    h2.classList.add('words');
    const nodes = Array.from(h2.childNodes);
    h2.innerHTML = '';
    nodes.forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(part => {
          if (part.trim() === '') { h2.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className='w';
          const inner = document.createElement('span'); inner.textContent = part;
          w.appendChild(inner); h2.appendChild(w);
        });
      } else if (node.classList && node.classList.contains('outline')) {
        const w = document.createElement('span'); w.className='w';
        const inner = document.createElement('span'); inner.className='outline'; inner.textContent = node.textContent;
        w.appendChild(inner); h2.appendChild(w);
      } else { h2.appendChild(node); }
    });
    const wio = new IntersectionObserver((en)=>en.forEach(e=>{ e.isIntersecting ? h2.classList.add('show') : h2.classList.remove('show'); }), {threshold:.4});
    wio.observe(h2);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); else e.target.classList.remove('show'); });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, t = +el.dataset.target, sfx = el.dataset.suffix || '';
      let c = 0; const step = Math.max(1, Math.ceil(t / 55));
      (function tick(){ c += step; if (c >= t) el.textContent = t + sfx; else { el.textContent = c + sfx; requestAnimationFrame(tick);} })();
      cObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count').forEach(c => cObs.observe(c));

  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 30);
    topBtn.classList.toggle('show', h.scrollTop > 600);
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if (window.matchMedia('(pointer:fine)').matches) {
    document.body.classList.add('has-cursor');

    const glow = document.getElementById('cursorGlow');
    let gx=innerWidth/2, gy=innerHeight/2, cx=gx, cy=gy;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let rx=gx, ry=gy;
    addEventListener('mousemove', e => {
      gx=e.clientX; gy=e.clientY;
      dot.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
    });
    (function loop(){
      cx+=(gx-cx)*.12; cy+=(gy-cy)*.12;
      glow.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      rx+=(gx-rx)*.18; ry+=(gy-ry)*.18;
      ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .chip, .skill-card, .proj-card, .ach, .blog-card, .social, .stat').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.classList.add('hovering'); dot.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { ring.classList.remove('hovering'); dot.classList.remove('hovering'); });
    });

    document.querySelectorAll('.skill-card, .proj-card, .ach, .blog-card').forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width - .5;
        const py = (e.clientY - r.top)/r.height - .5;
        card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-py*7}deg) rotateY(${px*7}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    document.querySelectorAll('.btn, .social').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.25}px, ${(e.clientY-r.top-r.height/2)*.35}px) translateY(-4px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }

  (function(){
    const canvas = document.getElementById('morphCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, S = 0;
    const COUNT = window.innerWidth < 760 ? 1000 : 2000;

    function resize(){
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = Math.round(window.innerWidth * DPR);
      H = canvas.height = Math.round(window.innerHeight * DPR);
      S = Math.min(W, H) * (window.innerWidth < 981 ? 0.34 : 0.21);
      buildAllTargets();
    }

    const dots = [];
    for (let i = 0; i < COUNT; i++){
      dots.push({ x: (Math.random()-.5)*W, y:(Math.random()-.5)*H, tx:0, ty:0, push:0, seed: Math.random()*6.28 });
    }

    let spherePts = null;
    function makeSphere(n){
      const out = []; const golden = Math.PI*(3-Math.sqrt(5));
      for (let i=0;i<n;i++){ const y=1-(i/(n-1))*2; const r=Math.sqrt(1-y*y); const th=golden*i;
        out.push({x:Math.cos(th)*r, y:y, z:Math.sin(th)*r}); }
      return out;
    }

    function sampleDraw(drawFn, n){
      const off = document.createElement('canvas');
      const size = 400; off.width = size; off.height = size;
      const o = off.getContext('2d');
      o.clearRect(0,0,size,size);
      o.fillStyle = '#fff';
      drawFn(o, size);
      const data = o.getImageData(0,0,size,size).data;
      const filled = [];
      for (let y=0;y<size;y+=2){ for (let x=0;x<size;x+=2){
        if (data[(y*size+x)*4+3] > 128) filled.push({x, y});
      }}
      const out = [];
      if (!filled.length) return out;
      for (let i=0;i<n;i++){
        const p = filled[Math.floor(i/n*filled.length)] || filled[i % filled.length];
        out.push({ x:(p.x/size-0.5)*2, y:(p.y/size-0.5)*2 });
      }
      return out;
    }

    function textTargets(txt, n){
      return sampleDraw((o,size)=>{
        o.textAlign='center'; o.textBaseline='middle';
        let fs = size*0.42; o.font = `900 ${fs}px Arial`;
        while (o.measureText(txt).width > size*0.9 && fs>10){ fs-=4; o.font=`900 ${fs}px Arial`; }
        o.fillText(txt, size/2, size/2);
      }, n);
    }
    function starTargets(n){
      return sampleDraw((o,size)=>{
        const cx=size/2, cy=size/2, R=size*0.42, r=R*0.42, sp=5;
        o.beginPath();
        for (let i=0;i<sp*2;i++){ const rad=(i%2?r:R); const a=Math.PI/sp*i - Math.PI/2;
          const X=cx+Math.cos(a)*rad, Y=cy+Math.sin(a)*rad; i?o.lineTo(X,Y):o.moveTo(X,Y); }
        o.closePath(); o.fill();
      }, n);
    }
    function cubeTargets(n){
      return sampleDraw((o,size)=>{
        o.lineWidth = size*0.03; o.strokeStyle='#fff'; o.fillStyle='#fff';
        const s=size*0.34, cx=size/2, cy=size/2, d=size*0.16;
        function sq(ox,oy){ o.strokeRect(cx-s/2+ox, cy-s/2+oy, s, s); }
        sq(-d/2, d/2); sq(d/2,-d/2);
        o.beginPath();
        const f=[[cx-s/2-d/2,cy-s/2+d/2],[cx+s/2-d/2,cy-s/2+d/2],[cx-s/2-d/2,cy+s/2+d/2],[cx+s/2-d/2,cy+s/2+d/2]];
        const b=[[cx-s/2+d/2,cy-s/2-d/2],[cx+s/2+d/2,cy-s/2-d/2],[cx-s/2+d/2,cy+s/2-d/2],[cx+s/2+d/2,cy+s/2-d/2]];
        for(let i=0;i<4;i++){ o.moveTo(f[i][0],f[i][1]); o.lineTo(b[i][0],b[i][1]); }
        o.stroke();
      }, n);
    }
    function envelopeTargets(n){
      return sampleDraw((o,size)=>{
        o.lineWidth=size*0.03; o.strokeStyle='#fff';
        const w=size*0.6,h=size*0.42, x=(size-w)/2, y=(size-h)/2;
        o.strokeRect(x,y,w,h);
        o.beginPath(); o.moveTo(x,y); o.lineTo(x+w/2,y+h*0.55); o.lineTo(x+w,y); o.stroke();
      }, n);
    }

    const SHAPES = {
      home:        { kind:'sphere', side:'right' },
      about:       { kind:'text',  value:'AVINASH', side:'left'  },
      skills:      { kind:'text',  value:'<!/>',    side:'right' },
      projects:    { kind:'cube',                  side:'left'  },
      experience:  { kind:'text',  value:'PATH',   side:'right' },
      achievements:{ kind:'star',                  side:'left'  },
      blog:        { kind:'text',  value:'READ',   side:'right' },
      contact:     { kind:'envelope',              side:'left'  }
    };

    let targetsCache = {};
    function buildAllTargets(){
      spherePts = makeSphere(COUNT);
      targetsCache = {};
      for (const key in SHAPES){
        const s = SHAPES[key];
        if (s.kind==='text') targetsCache[key] = textTargets(s.value, COUNT);
        else if (s.kind==='star') targetsCache[key] = starTargets(COUNT);
        else if (s.kind==='cube') targetsCache[key] = cubeTargets(COUNT);
        else if (s.kind==='envelope') targetsCache[key] = envelopeTargets(COUNT);
      }
    }

    resize();
    window.addEventListener('resize', resize);

    const sections = ['home','about','skills','projects','experience','achievements','blog','contact']
      .map(id => document.getElementById(id)).filter(Boolean);
    let current = 'home';
    function updateActive(){
      const mid = window.innerHeight*0.45;
      let best='home', bestD=1e9;
      sections.forEach(sec=>{
        const r = sec.getBoundingClientRect();
        const c = r.top + r.height/2;
        const d = Math.abs(c - mid);
        if (r.top < window.innerHeight*0.6 && r.bottom > window.innerHeight*0.2 && d<bestD){ bestD=d; best=sec.id; }
      });
      current = best;
    }
    window.addEventListener('scroll', updateActive, { passive:true });
    updateActive();

    let mouse = { x:-9999, y:-9999, active:false };
    window.addEventListener('mousemove', e=>{ mouse.x=e.clientX*DPR; mouse.y=e.clientY*DPR; mouse.active=true; });
    window.addEventListener('mouseout', ()=> mouse.active=false);

    const isLight = ()=> document.body.classList.contains('light');
    let rotY = 0;
    let posX = W*0.72, posY = H*0.5;

    function frame(){
      rotY += 0.004;
      ctx.clearRect(0,0,W,H);

      const shape = SHAPES[current] || SHAPES.home;
      const tcx = shape.kind==='sphere'
        ? (window.innerWidth < 981 ? W*0.5 : W*0.70)
        : (shape.side==='left' ? W*0.24 : W*0.76);
      const tcy = H*0.5;
      posX += (tcx - posX)*0.06;
      posY += (tcy - posY)*0.06;

      const cosY=Math.cos(rotY), sinY=Math.sin(rotY);
      const cosX=Math.cos(-0.35), sinX=Math.sin(-0.35);
      const targets = targetsCache[current];

      const Sh = S * (shape.kind==='sphere' ? 1.6 : 1.35);
      for (let i=0;i<dots.length;i++){
        const d = dots[i];
        let tx, ty;
        if (shape.kind==='sphere'){
          const p = spherePts[i];
          let x=p.x*cosY - p.z*sinY;
          let z=p.x*sinY + p.z*cosY;
          let y=p.y*cosX - z*sinX;
          tx = x*Sh; ty = y*Sh;
        } else {
          const t = targets && targets[i] ? targets[i] : {x:0,y:0};
          tx = t.x*Sh; ty = t.y*Sh;
        }
        d.tx = posX + tx;
        d.ty = posY + ty;

        d.x += (d.tx - d.x) * 0.07;
        d.y += (d.ty - d.y) * 0.07;

        let push = 0;
        if (mouse.active){
          const dx=d.x-mouse.x, dy=d.y-mouse.y; const dist=Math.hypot(dx,dy);
          const reach = S*0.7;
          if (dist < reach && dist>0.001){
            const f = (1-dist/reach);
            d.x += (dx/dist) * f * S*0.25;
            d.y += (dy/dist) * f * S*0.25;
            push = f;
          }
        }
        d.push += (push - d.push)*0.2;

        const size = Math.max(0.5, (1.0 + d.push*1.4) * DPR);
        const alpha = 0.45 + d.push*0.55;
        if (isLight()) ctx.fillStyle = `rgba(20,17,18,${alpha})`;
        else { const red=Math.min(1,d.push*2.2); ctx.fillStyle=`rgba(255,${Math.round(255-red*200)},${Math.round(255-red*200)},${alpha})`; }
        ctx.beginPath(); ctx.arc(d.x, d.y, size, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    frame();
  })();
