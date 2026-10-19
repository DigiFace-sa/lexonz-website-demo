(()=>{
 const media=window.lexonzMedia||[];
 const root=document.documentElement,grid=document.querySelector('.gallery-grid'),viewer=document.querySelector('.gallery-viewer'),nav=document.querySelector('.main-nav'),menu=document.querySelector('.menu-toggle'),toggle=document.querySelector('[data-lang-toggle]');
 const params=new URLSearchParams(location.search),more=document.querySelector('.gallery-more'),collectionSelect=document.querySelector('.gallery-collection');
 let lang=localStorage.getItem('lexonz-language')==='ar'?'ar':'en',filter=['photo','video'].includes(params.get('type'))?params.get('type'):'all',collection=['donington','silverstone','snetterton','paddock'].includes(params.get('collection'))?params.get('collection'):'all',limit=24,active=0,trigger=null;
 collectionSelect.value=collection;
 const ar=()=>lang==='ar',filtered=()=>media.filter(m=>(filter==='all'||m.type===filter)&&(collection==='all'||m.collection===collection)),place=m=>m[ar()?'placeAr':'place'];
 const render=(append=false)=>{
  const start=append?grid.children.length:0;if(!append)grid.replaceChildren();const items=filtered();
  const count=ar()?`${items.length} ${filter==='photo'?'صورة':filter==='video'?'مقطع فيديو':'مادة'}`:`${items.length} ${filter==='photo'?'photographs':filter==='video'?'films':'moments'}`;
  document.querySelector('.gallery-count').textContent=ar()?`عرض ${Math.min(limit,items.length)} من ${count}`:`Showing ${Math.min(limit,items.length)} of ${count}`;
  items.slice(start,limit).forEach((m,offset)=>{const i=start+offset,button=document.createElement('button'),frame=document.createElement('div'),img=document.createElement('img'),badge=document.createElement('span'),title=document.createElement('h2'),location=document.createElement('small');button.type='button';button.className='gallery-item';button.dataset.mediaId=m.id;frame.className='gallery-item-media';img.src=m.thumb||m.src;img.alt=`${m[lang]} / ${place(m)}`;img.loading=i<2?'eager':'lazy';img.decoding='async';badge.className='gallery-badge';badge.textContent=m.type==='video'?(ar()?'شاهد الفيديو':'PLAY FILM'):(ar()?'عرض الصورة':'VIEW PHOTO');title.textContent=m[lang];location.textContent=place(m);frame.append(img,badge);button.append(frame,title,location);button.addEventListener('click',()=>open(i,button));grid.append(button)});
  grid.querySelectorAll('.gallery-item').forEach((card,index)=>{if(card.querySelector('.gallery-item-index'))return;const number=document.createElement('span');number.className='gallery-item-index';number.setAttribute('aria-hidden','true');number.textContent=String(index+1).padStart(3,'0');card.querySelector('.gallery-item-media').append(number)});
  more.hidden=limit>=items.length;document.querySelector('.gallery-empty').hidden=items.length>0;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  document.querySelectorAll('[data-collection]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.collection===collection)));
 };
 const show=()=>{
  const m=filtered()[active],container=document.querySelector('.viewer-media');container.querySelector('video')?.pause();container.replaceChildren();
  document.querySelector('#viewer-title').textContent=m[lang];document.querySelector('.viewer-location').textContent=place(m);document.querySelector('.viewer-count').textContent=`${String(active+1).padStart(2,'0')} / ${String(filtered().length).padStart(2,'0')}`;
  const original=document.querySelector('.viewer-original');original.hidden=m.type!=='video';
  if(m.type==='video'){const video=document.createElement('video');video.src=m.video;video.poster=m.src;video.controls=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label',m[lang]);container.append(video);original.href=m.video;original.textContent=ar()?'افتح الفيديو مباشرة':'Open video directly'}
  else{const img=document.createElement('img');img.src=m.src;img.alt=`${m[lang]} / ${place(m)}`;container.append(img)}
 };
 const open=(index,button)=>{active=index;trigger=button;show();viewer.hidden=false;document.body.classList.add('gallery-viewer-open');document.querySelector('.viewer-close').focus()};
 const close=()=>{viewer.querySelector('video')?.pause();viewer.hidden=true;document.querySelector('.viewer-media').replaceChildren();document.body.classList.remove('gallery-viewer-open');const focusTarget=trigger?.isConnected?trigger:grid.querySelector('.gallery-item');focusTarget?.focus({preventScroll:true})};
 const setMenu=open=>{nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.classList.toggle('active',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',ar()?(open?'إغلاق القائمة':'فتح القائمة'):(open?'Close menu':'Open menu'))};
 const language=()=>{
  root.lang=lang;root.dir=ar()?'rtl':'ltr';document.body.classList.toggle('arabic',ar());document.querySelectorAll('[data-en][data-ar]').forEach(e=>e.innerHTML=e.dataset[lang]);
  document.title=ar()?'معرض الصور والفيديو | ليكسونز':'Gallery | LEXONZ';toggle.setAttribute('aria-label',ar()?'Switch to English':'التبديل إلى العربية');nav.setAttribute('aria-label',ar()?'التنقل الرئيسي':'Main navigation');
  document.querySelector('.gallery-filters').setAttribute('aria-label',ar()?'تصفية المعرض':'Filter gallery');document.querySelector('.viewer-close').setAttribute('aria-label',ar()?'إغلاق العرض':'Close viewer');document.querySelector('.viewer-backdrop').setAttribute('aria-label',ar()?'إغلاق العرض':'Close viewer');document.querySelector('[data-step="-1"]').setAttribute('aria-label',ar()?'العنصر السابق':'Previous item');document.querySelector('[data-step="1"]').setAttribute('aria-label',ar()?'العنصر التالي':'Next item');
  document.querySelector('[data-total-photos]').textContent=media.filter(m=>m.type==='photo').length;document.querySelector('[data-total-films]').textContent=media.filter(m=>m.type==='video').length;
  document.querySelectorAll('[data-collection-count]').forEach(e=>{const count=media.filter(m=>m.collection===e.dataset.collectionCount).length;e.textContent=ar()?`${count} مادة`:`${count} moments`});
  setMenu(false);render();localStorage.setItem('lexonz-language',lang);
 };
 toggle.addEventListener('click',()=>{lang=ar()?'en':'ar';language()});menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;limit=24;render()}));
 collectionSelect.addEventListener('change',()=>{collection=collectionSelect.value;limit=24;render()});more.addEventListener('click',()=>{const start=grid.children.length;limit+=24;render(true);grid.children[start]?.focus({preventScroll:true})});
 const browse=(type='all',group='all')=>{filter=type;collection=group;collectionSelect.value=group;limit=24;render();document.querySelector('#archive').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});};
 document.querySelectorAll('[data-collection]').forEach(button=>button.addEventListener('click',()=>browse('all',button.dataset.collection)));
 document.querySelector('[data-browse-films]').addEventListener('click',event=>{event.preventDefault();browse('video')});
 document.querySelectorAll('[data-feature]').forEach(button=>button.addEventListener('click',()=>{filter='video';collection='all';collectionSelect.value='all';limit=24;render();const index=filtered().findIndex(m=>m.id===button.dataset.feature);if(index>=0)open(index,button)}));
 document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{active=(active+Number(b.dataset.step)+filtered().length)%filtered().length;show()}));
 document.querySelector('.viewer-close').addEventListener('click',close);document.querySelector('.viewer-backdrop').addEventListener('click',close);
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){if(!viewer.hidden)close();else setMenu(false)}
  if(viewer.hidden)return;
  if(event.target.tagName==='VIDEO'&&event.key!=='Tab')return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();active=(active+(event.key==='ArrowRight'?1:-1)+filtered().length)%filtered().length;show()}
  if(event.key==='Tab'){const focusable=[...viewer.querySelectorAll('button,a[href],video')].filter(e=>!e.hidden&&e.getClientRects().length&&!e.classList.contains('viewer-backdrop'));const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 });
 const pointer=matchMedia('(min-width:801px) and (pointer:fine) and (prefers-reduced-motion:no-preference)'),cursor=document.querySelector('.cursor');
 const pointerState=()=>document.body.classList.toggle('dot-cursor',pointer.matches);pointer.addEventListener('change',pointerState);pointerState();window.addEventListener('pointermove',e=>{if(pointer.matches)cursor.style.transform=`translate(${e.clientX-6}px,${e.clientY-6}px)`});
 language();
 const target=params.get('item');if(target){const index=filtered().findIndex(m=>m.id===target);if(index>=0)open(index,grid.querySelector('.gallery-item'))}
})();
