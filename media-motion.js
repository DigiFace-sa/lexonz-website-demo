/* Muted editorial previews. No video downloads until near the viewport. */
(()=>{
 const videos=[...document.querySelectorAll('video[data-preview]')],motion=matchMedia('(prefers-reduced-motion:reduce)'),visible=new Set();
 const update=()=>videos.forEach(video=>{
  const active=visible.has(video)&&!document.hidden&&!motion.matches&&!navigator.connection?.saveData&&!document.body.classList.contains('gallery-viewer-open')&&!document.body.classList.contains('circuit-modal-open');
  if(!active){video.pause();return}
  if(!video.getAttribute('src'))video.src=video.dataset.src;
  video.muted=true;video.play().catch(()=>{});
 });
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target)});update()},{threshold:.15});
 videos.forEach(video=>observer.observe(video));document.addEventListener('visibilitychange',update);motion.addEventListener('change',update);
 new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['class']});
})();
