// Shared language metadata. Brand marks, photographs and circuit geometry are not mirrored.
window.lexonzCircuits = {
 'Snetterton 300':['سنيترتون 300','نورفولك · المملكة المتحدة · 4.779 كم'],
 'Silverstone Grand Prix':['سيلفرستون، مسار الجائزة الكبرى','نورثامبتونشاير · المملكة المتحدة · 5.891 كم'],
 'Donington Park Grand Prix':['دونينغتون بارك، مسار الجائزة الكبرى','ليسترشاير · المملكة المتحدة · 4.02 كم'],
 'Autodromo Riccardo Paletti':['ريكاردو باليتي، فارانو','فارانو دي ميليغاري · إيطاليا · 2.350 كم'],
 'Tazio Nuvolari · Cervesina':['تازيو نوفولاري، تشيرفيزينا','بافيا · إيطاليا · المسار الكامل: 5.260 كم'],
 'Cremona Circuit':['حلبة كريمونا','لومبارديا · إيطاليا · 3.768 كم · 13 منعطفاً'],
 'Jeddah Corniche Circuit':['حلبة كورنيش جدة','جدة · المملكة العربية السعودية · 6.174 كم'],
 'Bahrain International Circuit':['حلبة البحرين الدولية','الصخير · البحرين · 5.412 كم'],
 'Lusail International Circuit':['حلبة لوسيل الدولية','لوسيل · قطر · 5.419 كم'],
 'Brands Hatch Grand Prix':['براندز هاتش، مسار الجائزة الكبرى','كنت · المملكة المتحدة · 3.916 كم'],
 'Autodromo Enzo e Dino Ferrari':['حلبة إنزو ودينو فيراري، إيمولا','إيمولا · إيطاليا · 4.909 كم']
};
const lexonzLabels = {
 'SNETTERTON':'سنيترتون','SILVERSTONE':'سيلفرستون','DONINGTON':'دونينغتون',
 'VARANO':'فارانو','CERVESINA':'تشيرفيزينا','CREMONA':'كريمونا',
 'JEDDAH':'جدة','BAHRAIN':'البحرين','LUSAIL':'لوسيل','BRANDS HATCH':'براندز هاتش','IMOLA':'إيمولا',
 'NORFOLK · 4.779 KM':'نورفولك · 4.779 كم','NORTHAMPTONSHIRE · 5.891 KM':'نورثامبتونشاير · 5.891 كم',
 'LEICESTERSHIRE · 4.02 KM':'ليسترشاير · 4.02 كم','PARMA · ITALY':'بارما · إيطاليا',
 'TAZIO NUVOLARI · ITALY':'تازيو نوفولاري · إيطاليا','LOMBARDY · 3.768 KM':'لومبارديا · 3.768 كم',
 'SAUDI ARABIA · 6.174 KM':'السعودية · 6.174 كم','SAKHIR · 5.412 KM':'الصخير · 5.412 كم','QATAR · 5.419 KM':'قطر · 5.419 كم',
 'KENT · 3.916 KM':'كنت · 3.916 كم','ITALY · 4.909 KM':'إيطاليا · 4.909 كم',
 'LEXONZ / 01':'ليكسونز / 01','INVEST · DEVELOP · REPRESENT':'نستثمر · نطوّر · نمثّل'
};
document.querySelectorAll('body span,body strong').forEach(el=>{
 const en=el.textContent.trim();
 if(!el.children.length&&!el.hasAttribute('data-en')&&lexonzLabels[en]){el.dataset.en=en;el.dataset.ar=lexonzLabels[en]}
});
const lexonzAttributes = {
 'Close circuit story':'إغلاق قصة الحلبة','Current service pillar':'الركيزة المعروضة حالياً',
 'Services overview':'نظرة عامة على ركائز خدماتنا',
 'Lexonz team preparing a race car':'فريق ليكسونز أثناء تجهيز سيارة السباق',
 'Lexonz driver preparing to race':'سائق ليكسونز يستعد للسباق',
 'Lexonz driver preparing for a session':'سائق ليكسونز يستعد للانطلاق',
 "Close-up of a Lexonz driver's race boots":'تفاصيل حذاء السباق الخاص بسائق ليكسونز',
 'Lexonz driver in the garage':'سائق ليكسونز داخل مرآب الفريق',
 'Lexonz formula car on track':'سيارة ليكسونز للفورمولا على الحلبة',
 'Lexonz driver walking from the paddock tunnel':'سائق ليكسونز يغادر نفق منطقة الفرق'
};
document.querySelectorAll('[aria-label],img[alt]').forEach(el=>{
 for(const attr of ['aria-label','alt']){
  const en=el.getAttribute(attr);
  if(lexonzAttributes[en]){el.setAttribute(`data-${attr}-en`,en);el.setAttribute(`data-${attr}-ar`,lexonzAttributes[en])}
 }
});
document.querySelectorAll('.circuit-card').forEach(card=>{
 const mark=card.querySelector('.circuit-mark');
 mark.setAttribute('data-aria-label-en',mark.getAttribute('aria-label'));
 mark.setAttribute('data-aria-label-ar',`مخطط حلبة ${window.lexonzCircuits[card.dataset.circuit][0]}`);
});
window.lexonzLocalize = lang=>{
 for(const attr of ['aria-label','alt'])document.querySelectorAll(`[data-${attr}-en]`).forEach(el=>el.setAttribute(attr,el.getAttribute(`data-${attr}-${lang}`)));
 document.querySelector('[data-lang-toggle]')?.setAttribute('lang',lang==='ar'?'en':'ar');
};
