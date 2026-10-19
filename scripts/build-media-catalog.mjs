import fs from 'node:fs';import path from 'node:path';
const source=JSON.parse(fs.readFileSync('.media-work/prepared.json','utf8'));
const filmTitles={Concentration:['Concentration','التركيز'],Repair:['The work behind the performance','العمل خلف الأداء'],Silverstone:['Silverstone, in motion','سيلفرستون في مشاهد متحركة'],Organji:['The driver','السائق'],Garage:['Inside the garage','داخل مرآب الفريق'],Walk:['The next step','الخطوة التالية'],Sunset:['After the session','بعد الانطلاق'],Brackley:['From the paddock','من كواليس السباق']};
const seen={};
const items=source.map(item=>{
 const folder=item.file.split('/')[1],stem=path.parse(item.file).name.trim();
 const collection=/^Donington/.test(folder)?'donington':/^Silverstone/.test(folder)?'silverstone':folder==='Snetterton'?'snetterton':'paddock';
 const names={donington:['Donington Park','دونينغتون بارك'],silverstone:['Silverstone','سيلفرستون'],snetterton:['Snetterton','سنيترتون'],paddock:['LEXONZ / Archive','ليكسونز / الأرشيف']};
 const [place,placeAr]=names[collection],n=seen[collection+'-'+item.type]=(seen[collection+'-'+item.type]||0)+1;
 const titles=item.type==='video'?filmTitles[stem]:null;
 return {id:item.id,type:item.type,src:item.src,thumb:item.thumb,...(item.video?{video:item.video}:{}),collection,en:titles?.[0]||`${item.type==='video'?'Film':'Photograph'} ${String(n).padStart(2,'0')}`,ar:titles?.[1]||`${item.type==='video'?'مشاهد':'الصورة'} ${String(n).padStart(2,'0')}`,place,placeAr};
});
const hero=['lexonz-560','lexonz-100','lexonz-127','lexonz-423','lexonz-011','lexonz-173','lexonz-415','lexonz-115','lexonz-350','lexonz-515','lexonz-025','lexonz-341'];
const captions={'lexonz-560':['On the racing line','على خط التسابق'],'lexonz-100':['Race-day preparation','الاستعداد ليوم السباق'],'lexonz-127':['Focus under the visor','تركيز خلف واقي الخوذة'],'lexonz-011':['Ready for the session','جاهز للانطلاق'],'lexonz-173':['Taking the seat','الاستعداد داخل السيارة'],'lexonz-115':['The team behind the driver','الفريق خلف السائق'],'lexonz-350':['Decisions behind performance','قرارات تصنع الأداء'],'lexonz-025':['Eyes on the next lap','التركيز على اللفة التالية'],'lexonz-341':['Commitment at speed','إصرار على الحلبة']};
for(const item of items)if(captions[item.id])[item.en,item.ar]=captions[item.id];
const ordered=[...hero.map(id=>items.find(x=>x.id===id)).filter(Boolean),...items.filter(x=>!hero.includes(x.id))];
fs.writeFileSync('public/media/library/catalog.js',`// Generated from the user-provided Lexonz pics library.\nwindow.lexonzMedia=${JSON.stringify(ordered)};\n`);
fs.writeFileSync('public/media/library/SOURCES.json',JSON.stringify(source.map(({file,hash,id,type,src,video})=>({id,type,original:file,sha256:hash,webImage:src,...(video?{webVideo:video}:{})})),null,2));
console.log('Catalog',ordered.length,ordered.filter(x=>x.type==='video').length,'videos');
