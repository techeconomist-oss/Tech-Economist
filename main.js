document.addEventListener('DOMContentLoaded',()=>{
  // Scroll reveal
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*50);obs.unobserve(e.target)}
    })
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Header scroll
  const hdr=document.querySelector('.header');
  if(hdr)window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',window.scrollY>30));

  // Mobile nav
  const tog=document.getElementById('navToggle'),nav=document.getElementById('mainNav');
  if(tog&&nav){
    tog.addEventListener('click',()=>{nav.classList.toggle('open');const s=tog.querySelectorAll('span');
      if(nav.classList.contains('open')){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)'}
      else{s[0].style.transform='none';s[1].style.opacity='1';s[2].style.transform='none'}
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');tog.querySelectorAll('span').forEach(s=>{s.style.transform='none';s.style.opacity='1'})}));
  }

  // Active nav
  const pg=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav a').forEach(a=>{const h=a.getAttribute('href');if(h===pg||(pg===''&&h==='index.html'))a.classList.add('active')});

  // Contact form — handled by EmailJS on individual pages
});
