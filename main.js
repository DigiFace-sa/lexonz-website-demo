document.addEventListener('DOMContentLoaded',()=>{
 const root=document.documentElement,body=document.body,toggle=document.querySelector('[data-lang-toggle]'),nav=document.querySelector('.main-nav'),menu=document.querySelector('.menu-toggle');
 const circuitList=document.querySelector('.circuit-list'),circuitSet=document.querySelector('.circuit-set'),circuitModal=document.querySelector('.circuit-modal');
 const circuitMedia={
  'Snetterton 300':[
   {src:'public/media/editorial/snetterton-race.jpg',en:'LEXONZ / SNETTERTON ON TRACK',ar:'ليكسونز / على مسار سنيترتون'},
   {src:'public/media/editorial/snetterton-detail.jpg',en:'LEXONZ / THE DETAILS BEHIND THE DRIVE',ar:'ليكسونز / التفاصيل خلف الأداء'}
  ],
  'Autodromo Riccardo Paletti':[{src:'public/media/circuits/photos/varano-aerial.jpg',en:'VARANO / THE CIRCUIT FROM ABOVE',ar:'فارانو / الحلبة من الأعلى'}],
  'Tazio Nuvolari · Cervesina':[{src:'public/media/circuits/photos/cervesina-aerial.png',en:'CERVESINA / THE CIRCUIT FROM ABOVE',ar:'تشيرفيزينا / الحلبة من الأعلى'}],
  'Cremona Circuit':[{src:'public/media/circuits/photos/cremona.jpg',en:'CREMONA / A VIEW OF THE CIRCUIT',ar:'كريمونا / مشهد من الحلبة'}],
  'Jeddah Corniche Circuit':[
   {src:'public/media/editorial/jeddah-preparation.jpg',en:'LEXONZ / JEDDAH DRIVER PREPARATION',ar:'ليكسونز / استعداد السائق في جدة'},
   {src:'public/media/editorial/jeddah-portrait.jpg',en:'LEXONZ / FOCUS IN THE PADDOCK',ar:'ليكسونز / التركيز في منطقة الفرق'}
  ],
  'Bahrain International Circuit':[{src:'public/media/circuits/photos/bahrain.jpg',en:'BAHRAIN / THE CIRCUIT AT NIGHT',ar:'البحرين / الحلبة تحت الأضواء'}],
  'Lusail International Circuit':[{src:'public/media/circuits/photos/lusail-venue.webp',en:'LUSAIL / THE PIT STRAIGHT AT NIGHT',ar:'لوسيل / المستقيم الرئيسي تحت الأضواء'}],
  'Brands Hatch Grand Prix':[{src:'public/media/circuits/photos/brands-hatch.jpg',en:'BRANDS HATCH / THE STARTING LINE',ar:'براندز هاتش / خط الانطلاق'}],
  'Autodromo Enzo e Dino Ferrari':[{src:'public/media/circuits/photos/imola-venue.jpg',en:'IMOLA / THE MAIN STRAIGHT',ar:'إيمولا / المستقيم الرئيسي'}],
  'Silverstone Grand Prix':[
   {src:'public/media/editorial/silverstone-race.jpg',en:'LEXONZ / SILVERSTONE RACE PACE',ar:'ليكسونز / على مسار سيلفرستون'},
   {src:'public/media/editorial/silverstone-preparation.jpg',en:'LEXONZ / DRIVER PREPARATION',ar:'ليكسونز / استعداد السائق'},
   {src:'public/media/editorial/silverstone-portrait.jpg',en:'LEXONZ / BEHIND THE VISOR',ar:'ليكسونز / خلف الخوذة'}
  ],
  'Donington Park Grand Prix':[
   {src:'public/media/editorial/donington-race.jpg',en:'LEXONZ / DONINGTON ON TRACK',ar:'ليكسونز / على مسار دونينغتون'},
   {src:'public/media/editorial/donington-portrait.jpg',en:'LEXONZ / RACE FOCUS',ar:'ليكسونز / تركيز السباق'},
   {src:'public/media/editorial/donington-corner.jpg',en:'LEXONZ / THROUGH THE CORNER',ar:'ليكسونز / عبور المنعطف'}
  ]
 };
 const circuitSlides=card=>[
  ...(circuitMedia[card.dataset.circuit]||(card.dataset.layoutImage==='true'?[]:[{src:card.dataset.image,en:'LEXONZ / ON TRACK',ar:'ليكسونز / على الحلبة'}])),
  {src:card.dataset.layoutSrc,en:'CIRCUIT LAYOUT / REFERENCE',ar:'مخطط الحلبة / مرجع بصري',layout:true}
 ];
 if(circuitList&&circuitSet){
  circuitSet.querySelectorAll('.circuit-card').forEach(card=>{const photo=circuitMedia[card.dataset.circuit]?.[0];if(photo)card.style.backgroundImage=`linear-gradient(90deg,rgba(11,16,17,.82),rgba(11,16,17,.48)),url("${photo.src}")`});
  const clone=circuitSet.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('button').forEach(button=>button.tabIndex=-1);circuitList.append(clone);requestAnimationFrame(()=>body.classList.add('circuit-ready'));
 }
 let activeCircuit=null,lastCircuitTrigger=null,activeCircuitPhoto=0;
 const updateCircuitModal=card=>{
  if(!card||!circuitModal)return;
  const lang=root.lang==='ar'?'ar':'en',name=card.dataset.circuit,location=card.dataset.location,index=card.querySelector('.circuit-card-copy small')?.textContent.slice(0,2)||'01',image=circuitModal.querySelector('.circuit-modal-media img');
  const arabicCircuit=window.lexonzCircuits[name];
  circuitModal.querySelector('#circuit-modal-title').textContent=lang==='ar'?arabicCircuit[0]:name.toUpperCase();
  circuitModal.querySelector('.circuit-modal-location').textContent=lang==='ar'?arabicCircuit[1]:location;
  circuitModal.querySelector('.circuit-modal-index').textContent=lang==='ar'?`ليكسونز / الحلبة ${index}`:`LEXONZ / TRACK ${index}`;
  circuitModal.querySelector('.circuit-modal-description').textContent=card.dataset[`${lang}Description`];
  circuitModal.querySelector('[data-fact-country]').textContent=card.dataset[lang==='ar'?'countryAr':'countryEn'];
  circuitModal.querySelector('[data-fact-length]').textContent=lang==='ar'?card.dataset.length.replace('KM','كم'):card.dataset.length;
  circuitModal.querySelector('[data-fact-corners]').textContent=card.dataset.corners;
  circuitModal.querySelector('[data-fact-opened]').textContent=card.dataset.opened;
  circuitModal.querySelector('[data-fact-age]').textContent=card.dataset[lang==='ar'?'ageAr':'ageEn'];
  const history=card.dataset[`${lang}History`],historyPanel=circuitModal.querySelector('.circuit-history');
  historyPanel.hidden=!history;
  circuitModal.querySelector('.circuit-history-copy').textContent=history||'';
  circuitModal.querySelector('[data-history-range]').textContent=`${card.dataset.opened} · ${lang==='ar'?'اليوم':'TODAY'}`;
  circuitModal.querySelector('.circuit-facts').setAttribute('aria-label',lang==='ar'?'حقائق الحلبة':'Circuit facts');
  const photos=circuitSlides(card),gallery=circuitModal.querySelector('.circuit-media-gallery'),caption=circuitModal.querySelector('.circuit-media-caption');
  gallery.hidden=photos.length<2;
  gallery.setAttribute('aria-label',lang==='ar'?'صور الحلبة':'Circuit photographs');
  circuitModal.querySelector('.circuit-modal-media').classList.toggle('has-gallery',photos.length>1);
  circuitModal.querySelector('.circuit-modal-media').classList.toggle('has-layout',photos[activeCircuitPhoto].layout===true);
  gallery.replaceChildren();
  if(photos.length){
   photos.forEach((photo,index)=>{const button=document.createElement('button'),thumb=document.createElement('img');button.type='button';button.className='circuit-gallery-thumb';button.dataset.photoIndex=index;button.setAttribute('aria-label',lang==='ar'?`اعرض الصورة ${index+1} من ${photos.length}`:`View photo ${index+1} of ${photos.length}`);button.setAttribute('aria-pressed',index===activeCircuitPhoto?'true':'false');thumb.src=photo.src;thumb.alt='';thumb.loading='lazy';button.append(thumb);gallery.append(button)});
   image.src=photos[activeCircuitPhoto].src;
   image.alt=photos[activeCircuitPhoto].layout?(lang==='ar'?`مخطط حلبة ${arabicCircuit[0]}`:`${name} circuit layout`):(lang==='ar'?`صورة من حلبة ${arabicCircuit[0]}`:`Photograph from ${name}`);
   caption.textContent=photos[activeCircuitPhoto][lang];
  }
 };
 const closeCircuitModal=()=>{if(!circuitModal||!circuitModal.classList.contains('is-open'))return;circuitModal.classList.remove('is-open');circuitModal.setAttribute('aria-hidden','true');body.classList.remove('circuit-modal-open');lenis?.start();lastCircuitTrigger?.focus({preventScroll:true});activeCircuit=null};
 circuitList?.addEventListener('click',event=>{const card=event.target.closest('.circuit-card');if(!card)return;activeCircuit=card;activeCircuitPhoto=0;lastCircuitTrigger=card;updateCircuitModal(card);circuitModal.classList.add('is-open');circuitModal.setAttribute('aria-hidden','false');body.classList.add('circuit-modal-open');lenis?.stop();requestAnimationFrame(()=>circuitModal.querySelector('.circuit-modal-close')?.focus())});
 circuitModal?.querySelector('.circuit-media-gallery')?.addEventListener('click',event=>{const button=event.target.closest('.circuit-gallery-thumb');if(!button||!activeCircuit)return;activeCircuitPhoto=Number(button.dataset.photoIndex);const photo=circuitSlides(activeCircuit)[activeCircuitPhoto];if(!photo)return;const lang=root.lang==='ar'?'ar':'en',arabicCircuit=window.lexonzCircuits[activeCircuit.dataset.circuit],media=circuitModal.querySelector('.circuit-modal-media'),image=media.querySelector('img');image.src=photo.src;image.alt=photo.layout?(lang==='ar'?`مخطط حلبة ${arabicCircuit[0]}`:`${activeCircuit.dataset.circuit} circuit layout`):(lang==='ar'?`صورة من حلبة ${arabicCircuit[0]}`:`Photograph from ${activeCircuit.dataset.circuit}`);media.classList.toggle('has-layout',photo.layout===true);circuitModal.querySelector('.circuit-media-caption').textContent=photo[lang];circuitModal.querySelectorAll('.circuit-gallery-thumb').forEach((thumb,index)=>thumb.setAttribute('aria-pressed',index===activeCircuitPhoto?'true':'false'))});
 circuitModal?.querySelectorAll('.circuit-modal-close,.circuit-modal-backdrop').forEach(button=>button.addEventListener('click',closeCircuitModal));
 const setLanguage=lang=>{const ar=lang==='ar';root.lang=lang;root.dir=ar?'rtl':'ltr';body.classList.toggle('arabic',ar);document.querySelectorAll('[data-en][data-ar]').forEach(el=>el.innerHTML=el.dataset[lang]);toggle.setAttribute('aria-label',ar?'Switch to English':'التبديل إلى العربية');toggle.title=ar?'Switch to English':'التبديل إلى العربية';
 document.title=lang==='ar'?"ليكسونز | الاستثمار والتمثيل في رياضة المحركات":"LEXONZ | Motorsport Investment & Representation";
 document.querySelector('meta[name="description"]').content=lang==='ar'?"ليكسونز شركة سعودية للاستثمار والتمثيل في رياضة المحركات، تدير المواهب وتستثمر فيها بحضور متنامٍ عبر القطاع.":"LEXONZ is a Saudi motorsport investment and representation company, managing and investing in talent with a growing presence across motorsport.";
 nav.setAttribute('aria-label',lang==='ar'?'التنقل الرئيسي':'Main navigation');
 document.querySelector('.brand').setAttribute('aria-label',lang==='ar'?'ليكسونز، الصفحة الرئيسية':'LEXONZ home');
 const menuOpen=menu.getAttribute('aria-expanded')==='true';
 menu.setAttribute('aria-label',lang==='ar'?(menuOpen?'إغلاق القائمة':'فتح القائمة'):(menuOpen?'Close menu':'Open menu'));
 window.lexonzLocalize(lang);if(activeCircuit)updateCircuitModal(activeCircuit);localStorage.setItem('lexonz-language',lang);window.ScrollTrigger?.refresh()};
 const setMenu=open=>{nav.classList.toggle('open',open);menu.classList.toggle('active',open);body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',root.lang==='ar'?(open?'إغلاق القائمة':'فتح القائمة'):(open?'Close menu':'Open menu'))};
 toggle.addEventListener('click',()=>setLanguage(root.lang==='ar'?'en':'ar'));menu.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));setLanguage(localStorage.getItem('lexonz-language')||'en');
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){setMenu(false);closeCircuitModal()}});
 let lenis;
 if(window.Lenis&&window.gsap){gsap.matchMedia().add('(min-width: 801px) and (prefers-reduced-motion: no-preference)',()=>{
  const instance=new Lenis({duration:1.2,smoothWheel:true}),tick=t=>instance.raf(t*1000);
  lenis=instance;instance.on('scroll',window.ScrollTrigger?.update);gsap.ticker.add(tick);
  return ()=>{gsap.ticker.remove(tick);instance.destroy();lenis=undefined};
 })}
 document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  setMenu(false);
  if(lenis)lenis.scrollTo(target,{duration:1.45,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),lock:true});
  else target.scrollIntoView({behavior:'smooth',block:'start'});
  history.replaceState(null,'',link.getAttribute('href'));
 }));
 const insideSlider=document.querySelector('[data-inside-slider]');
 if(insideSlider){
  const slides=[...insideSlider.querySelectorAll('.inside-slide')],thumbs=[...insideSlider.querySelectorAll('[data-cinema-go]')],stage=insideSlider.querySelector('.inside-cinema-stage'),filmstrip=insideSlider.querySelector('.inside-cinema-filmstrip'),copyBlock=insideSlider.querySelector('.inside-cinema-copy'),title=insideSlider.querySelector('[data-cinema-title]'),copy=insideSlider.querySelector('[data-cinema-copy]'),currentLabel=insideSlider.querySelector('[data-cinema-current]'),countLabel=insideSlider.querySelector('[data-cinema-count]'),progress=insideSlider.querySelector('.cinema-progress i'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current=0,timer=null,touchStartX=0,transitioning=false;
  const two=n=>String(n+1).padStart(2,'0');
  const localizeControls=()=>{const ar=root.lang==='ar';insideSlider.setAttribute('aria-label',ar?'رحلة سائق ليكسونز':'Lexonz driver journey');filmstrip.setAttribute('aria-label',ar?'اختر قصة من الحلبة':'Choose a paddock story');insideSlider.querySelector('[data-cinema-prev]').setAttribute('aria-label',ar?'القصة السابقة':'Previous story');insideSlider.querySelector('[data-cinema-next]').setAttribute('aria-label',ar?'القصة التالية':'Next story')};
  const renderCopy=()=>{const lang=root.lang==='ar'?'Ar':'En',slide=slides[current];title.textContent=slide.dataset[`title${lang}`];copy.textContent=slide.dataset[`copy${lang}`];currentLabel.textContent=countLabel.textContent=two(current);localizeControls()};
  const resetProgress=()=>{progress.style.animation='none';progress.offsetWidth;progress.style.animation=''};
  const schedule=()=>{clearTimeout(timer);if(document.hidden)return;resetProgress();timer=setTimeout(()=>goTo((current+1)%slides.length,1,false),3500)};
  const finishTransition=(oldSlide,newSlide)=>{oldSlide.classList.remove('is-leaving');oldSlide.removeAttribute('style');oldSlide.querySelector('img').removeAttribute('style');newSlide.removeAttribute('style');newSlide.querySelector('img').removeAttribute('style');transitioning=false};
  const goTo=(next,direction=1,manual=true)=>{
   next=(next+slides.length)%slides.length;
   if(next===current||transitioning){schedule();return}
   transitioning=true;
   const oldIndex=current,oldSlide=slides[oldIndex],newSlide=slides[next],rtl=root.dir==='rtl',fromRight=(direction>0)!==rtl,startClip=fromRight?'inset(0 0 0 100%)':'inset(0 100% 0 0)';
   current=next;
   oldSlide.classList.remove('is-active');oldSlide.classList.add('is-leaving');oldSlide.setAttribute('aria-hidden','true');
   newSlide.classList.add('is-active');newSlide.setAttribute('aria-hidden','false');
   thumbs.forEach((thumb,index)=>{const active=index===current;thumb.classList.toggle('is-active',active);thumb.setAttribute('aria-selected',active)});
   currentLabel.textContent=countLabel.textContent=two(current);
   if(innerWidth<=800){const thumb=thumbs[current];filmstrip.scrollTo({left:thumb.offsetLeft-(filmstrip.clientWidth-thumb.offsetWidth)/2,behavior:reduced?'auto':'smooth'})}
   if(window.gsap&&!reduced){
    gsap.killTweensOf([oldSlide,newSlide,oldSlide.querySelector('img'),newSlide.querySelector('img'),...copyBlock.children]);
    gsap.set(newSlide,{autoAlpha:1,clipPath:startClip});gsap.set(newSlide.querySelector('img'),{scale:1.09});
    const timeline=gsap.timeline({onComplete:()=>finishTransition(oldSlide,newSlide)});
    timeline.to(oldSlide.querySelector('img'),{scale:1.04,duration:.72,ease:'power2.out'},0)
     .to(oldSlide,{autoAlpha:.32,duration:.42,ease:'power2.out'},0)
     .to(newSlide,{clipPath:'inset(0 0 0 0)',duration:.72,ease:'power4.inOut'},0)
     .to(newSlide.querySelector('img'),{scale:1,duration:.82,ease:'power3.out'},0)
     .to(copyBlock.children,{y:-15,opacity:0,duration:.17,stagger:.018,ease:'power2.in'},0)
     .call(renderCopy,[],.2)
     .fromTo(copyBlock.children,{y:20,opacity:0},{y:0,opacity:1,duration:.38,stagger:.035,ease:'power3.out'},.24);
   }else{renderCopy();finishTransition(oldSlide,newSlide)}
   schedule();
  };
  thumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>goTo(index,index>current?1:-1)));
  insideSlider.querySelector('[data-cinema-prev]').addEventListener('click',()=>goTo(current-1,-1));
  insideSlider.querySelector('[data-cinema-next]').addEventListener('click',()=>goTo(current+1,1));
  stage.addEventListener('keydown',event=>{const rtl=root.dir==='rtl';if(event.key==='ArrowLeft'){event.preventDefault();goTo(current+(rtl?1:-1),rtl?1:-1)}else if(event.key==='ArrowRight'){event.preventDefault();goTo(current+(rtl?-1:1),rtl?-1:1)}else if(event.key==='Home'){event.preventDefault();goTo(0,-1)}else if(event.key==='End'){event.preventDefault();goTo(slides.length-1,1)}});
  stage.addEventListener('pointerdown',event=>{touchStartX=event.clientX;stage.focus({preventScroll:true})});stage.addEventListener('pointerup',event=>{const distance=event.clientX-touchStartX;if(Math.abs(distance)>45){const step=((distance<0)!==(root.dir==='rtl'))?1:-1;goTo(current+step,step)}});
  document.addEventListener('visibilitychange',schedule);
  new MutationObserver(renderCopy).observe(root,{attributes:true,attributeFilter:['lang','dir']});
  renderCopy();schedule();
 }
 if(!window.gsap)return;gsap.registerPlugin(ScrollTrigger);const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 gsap.timeline({onComplete:()=>{document.querySelector('.loader')?.remove();if(location.hash&&location.hash!=='#top')document.querySelector(location.hash)?.scrollIntoView()}}).to('.loader span',{width:190,duration:.65,ease:'power2.inOut'}).to('.loader img,.loader small',{opacity:0,y:-10,duration:.3}).to('.loader',{yPercent:-100,duration:.8,ease:'power4.inOut'}).from('.hero-reveal',{y:45,opacity:0,duration:.8,stagger:.12,ease:'power3.out'},'-=.25');
 if(reduce)return;
 gsap.to('.hero-media',{yPercent:13,scale:1.12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 gsap.to('.speed-lines',{xPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 gsap.from('.circuit-rail-head > *',{y:24,opacity:0,duration:.7,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'.circuit-rail',start:'top 86%'}});
 // MatchMedia also reverts the desktop pin when the viewport becomes a phone.
 gsap.matchMedia().add('(min-width: 801px)',()=>{
  const track=document.querySelector('.manifesto-track');
  const distance=()=>Math.max(0,track.scrollWidth-innerWidth);
  gsap.fromTo(track,
   {x:()=>root.dir==='rtl'?-distance():0},
   {x:()=>root.dir==='rtl'?0:-distance(),ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top top',end:'bottom bottom',scrub:1,pin:track,invalidateOnRefresh:true}}
  );
 });
 // Short entrances run only when a panel arrives; content is never hidden in advance.
 gsap.matchMedia().add('(max-width: 800px) and (prefers-reduced-motion: no-preference)',()=>{
  const animations=[];
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(({target,isIntersecting})=>{
    if(!isIntersecting)return;
    observer.unobserve(target);
    const content=target.querySelectorAll('.micro,h2,.manifesto-slide-top,.mobile-manifesto-copy h3,.mobile-manifesto-copy > p,.manifesto-tags,.image-tag');
    content.forEach((el,index)=>animations.push(el.animate([
     {opacity:.55,transform:'translateY(18px)'},
     {opacity:1,transform:'translateY(0)'}
    ],{duration:650,delay:index*65,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'})));
    const visual=target.querySelector('.giant-index,.panel-image img');
    if(visual)animations.push(visual.animate([
     {opacity:.65,transform:visual.matches('img')?'scale(1.12)':'scale(1.04)'},
     {opacity:1,transform:visual.matches('img')?'scale(1.08)':'scale(1)'}
    ],{duration:1000,easing:'cubic-bezier(.22,1,.36,1)'}));
   });
  },{rootMargin:'0px 0px -12% 0px',threshold:.12});
  document.querySelectorAll('.manifesto-panel').forEach(panel=>observer.observe(panel));
  return ()=>{observer.disconnect();animations.forEach(animation=>animation.cancel())};
 });
 gsap.utils.toArray('.stage').forEach((el,i)=>{gsap.from(el,{y:65,opacity:0,duration:.8,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}});gsap.from(el.querySelector('.stage-line i'),{xPercent:-500,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 78%'}})});
 gsap.from('.inside-head > *',{y:55,opacity:0,stagger:.12,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.inside-head',start:'top 78%'}});gsap.from('.inside-cinema',{y:70,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.inside-cinema',start:'top 88%'}});
 gsap.to('.impact-media',{yPercent:15,ease:'none',scrollTrigger:{trigger:'.impact',start:'top bottom',end:'bottom top',scrub:true}});gsap.from('.impact-copy > *',{y:60,opacity:0,stagger:.12,duration:1,scrollTrigger:{trigger:'.impact-copy',start:'top 70%'}});gsap.to('.join-visual img',{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.join',start:'top bottom',end:'bottom top',scrub:true}});gsap.from('.join-copy > *',{y:45,opacity:0,stagger:.1,duration:.8,scrollTrigger:{trigger:'.join-copy',start:'top 78%'}});
 gsap.matchMedia().add('(min-width: 801px) and (pointer: fine)',()=>{
  const cursor=document.querySelector('.cursor'),move=e=>gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.18,overwrite:true}),enter=()=>gsap.to(cursor,{scale:3,duration:.2,overwrite:'auto'}),leave=()=>gsap.to(cursor,{scale:1,duration:.2,overwrite:'auto'}),links=document.querySelectorAll('a,button');
  document.body.classList.add('dot-cursor');
  addEventListener('pointermove',move);links.forEach(el=>{el.addEventListener('mouseenter',enter);el.addEventListener('mouseleave',leave)});
  return ()=>{document.body.classList.remove('dot-cursor');removeEventListener('pointermove',move);links.forEach(el=>{el.removeEventListener('mouseenter',enter);el.removeEventListener('mouseleave',leave)});gsap.killTweensOf(cursor)};
 });
});
