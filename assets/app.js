const header=document.querySelector('.header');
const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
const onScroll=()=>header?.classList.toggle('scrolled',scrollY>32);
onScroll();addEventListener('scroll',onScroll,{passive:true});
menu?.addEventListener('click',()=>{
  const open=nav?.classList.toggle('open');
  document.body.classList.toggle('no-scroll',!!open);
  menu.setAttribute('aria-expanded',open?'true':'false');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');document.body.classList.remove('no-scroll')}));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -3% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  btn.closest('.filters')?.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}));

const galleryImages=[...document.querySelectorAll('.gallery-immersive figure img')];
if(galleryImages.length){
  const box=document.createElement('div');box.className='lightbox';box.innerHTML='<button class="lightbox-close" aria-label="Fechar">×</button><img alt="Imagem ampliada">';document.body.appendChild(box);
  const boxImg=box.querySelector('img');
  galleryImages.forEach(img=>img.parentElement.addEventListener('click',()=>{boxImg.src=img.src;boxImg.alt=img.alt;box.classList.add('open');document.body.classList.add('no-scroll')}));
  const close=()=>{box.classList.remove('open');document.body.classList.remove('no-scroll')};
  box.querySelector('.lightbox-close').addEventListener('click',close);box.addEventListener('click',e=>{if(e.target===box)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
