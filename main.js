document.addEventListener('DOMContentLoaded',()=>{
  // ── Staggered scroll reveal ──
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*70);obs.unobserve(e.target)}
    })
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // ── Header scroll state ──
  const hdr=document.querySelector('.header');
  if(hdr)window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',window.scrollY>30),{passive:true});

  // ── Scroll progress bar ──
  const prog=document.createElement('div');
  prog.className='scroll-progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll',()=>{
    const h=document.documentElement;
    const pct=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    prog.style.width=pct+'%';
  },{passive:true});

  // ── Back to top ──
  const bt=document.createElement('button');
  bt.className='back-top';bt.innerHTML='&#8593;';bt.setAttribute('aria-label','Back to top');
  bt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  document.body.appendChild(bt);
  window.addEventListener('scroll',()=>bt.classList.toggle('show',window.scrollY>500),{passive:true});

  // ── Mobile nav ──
  const tog=document.getElementById('navToggle'),nav=document.getElementById('mainNav');
  if(tog&&nav){
    tog.addEventListener('click',()=>{nav.classList.toggle('open');const s=tog.querySelectorAll('span');
      if(nav.classList.contains('open')){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)'}
      else{s[0].style.transform='none';s[1].style.opacity='1';s[2].style.transform='none'}
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');tog.querySelectorAll('span').forEach(s=>{s.style.transform='none';s.style.opacity='1'})}));
  }

  // ── Active nav highlight ──
  const pg=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav a').forEach(a=>{const h=a.getAttribute('href');if(h===pg||(pg===''&&h==='index.html'))a.classList.add('active')});

  // ── Animated counters (glass stats) ──
  const statObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      statObs.unobserve(e.target);
      const el=e.target;
      const txt=el.textContent.trim();
      const m=txt.match(/^(\d+)(.*)$/);
      if(!m)return;
      const target=parseInt(m[1]),suffix=m[2]||'';
      let cur=0;const dur=1200,start=performance.now();
      el.classList.add('counting');
      function tick(now){
        const p=Math.min((now-start)/dur,1);
        const eased=1-Math.pow(1-p,3);
        cur=Math.round(target*eased);
        el.childNodes[0].nodeValue=cur;
        if(p<1)requestAnimationFrame(tick);
        else{el.childNodes[0].nodeValue=target;el.classList.remove('counting')}
      }
      requestAnimationFrame(tick);
    })
  },{threshold:.5});
  document.querySelectorAll('.glass h3, .glass-stat h3').forEach(el=>{
    if(/^\d/.test(el.textContent.trim()))statObs.observe(el);
  });

  // ── Clay card cursor-follow glow ──
  document.querySelectorAll('.clay').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // ── Smooth anchor scrolling ──
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
    });
  });
});
