import fs from 'node:fs';import path from 'node:path';import {execFile} from 'node:child_process';import {promisify} from 'node:util';
const exec=promisify(execFile),ff=process.env.LEXONZ_FFMPEG||'ffmpeg',dir='public/media/library';fs.mkdirSync(dir,{recursive:true});
const inventory=JSON.parse(fs.readFileSync('.media-work/inventory.json','utf8'));
const run=async args=>exec(ff,['-hide_banner','-loglevel','error','-nostdin','-y',...args],{maxBuffer:2e6});
let done=0;const results=[];
async function processItem(item){const target=`${dir}/${item.id}`,isVideo=item.type==='video';try{
 if(isVideo){
  if(!fs.existsSync(target+'.mp4'))await run(['-i',item.file,'-map','0:v:0','-map','0:a:0?','-vf','fps=24,scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2','-c:v','h264_videotoolbox','-b:v','1600k','-maxrate','2200k','-bufsize','3200k','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',target+'.mp4']);
  if(!fs.existsSync(target+'-poster.jpg'))await run(['-ss','0.5','-i',target+'.mp4','-frames:v','1','-q:v','3',target+'-poster.jpg']);
  if(!fs.existsSync(target+'-thumb.jpg'))await run(['-i',target+'-poster.jpg','-vf','scale=640:640:force_original_aspect_ratio=decrease','-frames:v','1','-q:v','4',target+'-thumb.jpg']);
 }else{
  if(!fs.existsSync(target+'.jpg'))await exec('/usr/bin/sips',['-s','format','jpeg','-s','formatOptions','76','-Z','1600',item.file,'--out',target+'.jpg']);
  if(!fs.existsSync(target+'-thumb.jpg'))await exec('/usr/bin/sips',['-s','format','jpeg','-s','formatOptions','70','-Z','640',target+'.jpg','--out',target+'-thumb.jpg']);
 }
 results.push({...item,src:isVideo?target+'-poster.jpg':target+'.jpg',thumb:target+'-thumb.jpg',...(isVideo?{video:target+'.mp4'}:{})});
 }catch(e){console.log('FAILED',item.file,String(e.message).slice(-250))}if(++done%20===0)console.log('Prepared',done,'/',inventory.length);}
// Start the small edited films first, then run the raw camera footage separately.
const photos=inventory.filter(x=>x.type==='photo'),videos=inventory.filter(x=>x.type==='video').sort((a,b)=>a.bytes-b.bytes);
async function pool(items,n){let next=0;await Promise.all(Array.from({length:n},async()=>{while(next<items.length)await processItem(items[next++])}))}
await Promise.all([pool(photos,4),pool(videos,2)]);
fs.writeFileSync('.media-work/prepared.json',JSON.stringify(results.sort((a,b)=>a.id.localeCompare(b.id)),null,2));console.log('Ready',results.length);
