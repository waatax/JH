import {createRequire} from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(path.join(process.env.CODEX_NODE_MODULES,'playwright'));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/#/library');await page.getByRole('heading',{name:'國一到國三・六學期複習講義'}).waitFor();
 assert.equal(await page.locator('.semester-subject').count()>0,true);
 await page.locator('#library-subject').selectOption('math');
 assert.equal(await page.locator('.download-list li').count(),27);
 await page.locator('#library-term').selectOption('2');
 assert.equal(await page.locator('.download-list li').count()>0,true);
 await page.screenshot({path:'tmp/pdfs/library-desktop.png',fullPage:true});
 await page.goto('http://127.0.0.1:4173/#/pastpapers');await page.locator('#cap-year').waitFor();
 assert.equal(await page.locator('#main tbody tr').count(),27);
 await page.locator('#cap-year').selectOption('109');
 assert.equal(await page.locator('#main tbody tr').count(),28);
 await page.locator('#cap-subject').selectOption('listening');
 assert(await page.locator('#main').innerText().then(t=>t.includes('無題本可下載')));
 await page.goto('http://127.0.0.1:4173/#/alignment');await page.locator('#align-subject').waitFor();
 assert.equal(await page.locator('#main table').count(),6);
 await page.locator('#align-publisher').selectOption('南一');
 assert(await page.locator('#main').innerText().then(t=>t.includes('尚未取得')));
 await page.goto('http://127.0.0.1:4173/#/lesson/math-9');
 assert(await page.getByRole('heading',{name:'多項式長除法與驗算'}).isVisible());
 const pdf=await page.getByRole('link',{name:'下載本章 PDF 複習講義'}).getAttribute('href');
 const response=await page.request.get('http://127.0.0.1:4173/'+pdf.replace('./',''));assert.equal(response.status(),200);assert((await response.body()).subarray(0,5).equals(Buffer.from('%PDF-')));
 await page.setViewportSize({width:390,height:844});
 for(const route of ['library','alignment','pastpapers','lesson/math-9']){
  await page.goto('http://127.0.0.1:4173/#/'+route);
  if(!route.startsWith('lesson'))await page.locator(route==='library'?'#library-subject':route==='alignment'?'#align-subject':'#cap-year').waitFor();
  const sizes=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(sizes.scroll<=sizes.width+1,JSON.stringify({route,...sizes}));
 }
 await page.screenshot({path:'tmp/pdfs/lesson-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Browser routes, filters, download, mobile overflow and runtime errors checked.');
}finally{await browser.close()}
