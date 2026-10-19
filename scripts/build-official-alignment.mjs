import fs from 'node:fs';
import {units} from '../dist/curriculum.js';
const sources=JSON.parse(fs.readFileSync('docs/official-curriculum-sources.json','utf8'));
const norm=s=>s.normalize('NFKC').replace(/[–－−]/g,'-').replace(/\s+/g,'');
const pages=Object.fromEntries(sources.map(s=>[s.id,JSON.parse(fs.readFileSync(`tmp/official-curriculum/${s.id}.json`,'utf8')).map(p=>p.normalize('NFKC').replace(/[–－−]/g,'-'))]));
const groups={
 math:['math','n-IV-1',`N-7-3,N-7-5;N-7-1,N-7-2;N-7-3,N-7-8;A-7-2,A-7-3;A-7-4,A-7-5;N-7-9;A-7-7,A-7-8;A-7-6,D-7-1;A-8-1,A-8-3;N-8-1,S-8-6;A-8-4,A-8-5;A-8-6,A-8-7;N-8-4,F-8-1;S-8-4,S-8-5;S-8-3,S-8-9,S-8-12;S-9-1,S-9-2;S-9-6,S-9-7;F-9-1,F-9-2;D-9-2,S-9-13;S-9-8,S-9-9,S-9-10;N-9-1;N-8-5;S-8-2;S-8-10,S-8-11;S-9-6,S-9-7;S-7-2,S-9-13;D-9-1,D-8-1`],
 chinese:['chinese','5-IV-2',`Ab-IV-1,Ab-IV-5;Ba-IV-1,Ad-IV-1;Ab-IV-6,Ab-IV-7;Bc-IV-2,Bc-IV-3;Bd-IV-1,Bd-IV-2;Ad-IV-2,Ad-IV-3;Ab-IV-3;Ac-IV-1,Ac-IV-2;Ad-IV-3;Ad-IV-3,Ca-IV-1;Ad-IV-4;Be-IV-2;Ad-IV-4,Cc-IV-1;Bb-IV-1,Bb-IV-5;Bb-IV-3,Ca-IV-2;Ad-IV-1,Ba-IV-2`],
 english:['english','3-IV-6',`Ad-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;B-IV-2,D-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;Ad-IV-1;B-IV-5;Ad-IV-1;Ad-IV-1;Ae-IV-2,D-IV-2`],
 biology:['science','tr-IV-1',`Da-IV-1,Da-IV-2;Bc-IV-2,Bc-IV-3;Db-IV-1,Db-IV-2,Dc-IV-4;Dc-IV-1,Dc-IV-2;Ga-IV-1,Ga-IV-6,Gb-IV-1;Gc-IV-1,Bd-IV-3;Bc-IV-1;Db-IV-6,Db-IV-8;Db-IV-3,Dc-IV-4;Da-IV-4,Ga-IV-1;Ga-IV-2,Ga-IV-6;Gc-IV-2,Lb-IV-3;Dc-IV-1;Db-IV-1,Bc-IV-1`],
 physics:['science','tr-IV-1',`Ea-IV-1,Ea-IV-2;Ka-IV-1,Ka-IV-5;Ka-IV-8,Ka-IV-9;Bb-IV-1,Bb-IV-3,Bb-IV-4;Eb-IV-8,Eb-IV-10,Eb-IV-11;Ba-IV-5,Ba-IV-7,Eb-IV-7;Kc-IV-7,Kc-IV-8,Kc-IV-4;Eb-IV-6;Eb-IV-5,Ec-IV-1;Eb-IV-4,Eb-IV-10;Kc-IV-1,Kc-IV-2;Kc-IV-4;Kc-IV-6;Ka-IV-8,Ka-IV-9;Ba-IV-7`],
 chemistry:['science','tr-IV-1',`Ab-IV-1,Ab-IV-4;Aa-IV-1,Aa-IV-4;Ja-IV-1,Ja-IV-4;Jb-IV-4;Jd-IV-2,Jd-IV-6;Jc-IV-1,Jf-IV-2;Je-IV-1;Je-IV-2,Je-IV-3;Jb-IV-1,Jb-IV-2;Jd-IV-3,Jd-IV-6;Jf-IV-1,Jf-IV-2;Jf-IV-4;Fa-IV-3,Ca-IV-2;Aa-IV-2,Ja-IV-4`],
 earth:['science','tr-IV-1',`Fa-IV-2,Ia-IV-2,Ia-IV-4;Ia-IV-1,Ic-IV-1;Ib-IV-1,Ib-IV-4,Ib-IV-6;Id-IV-3,Fb-IV-4;Ed-IV-1,Fb-IV-1;Lb-IV-2;Hb-IV-1,Hb-IV-2;Ia-IV-2,Ia-IV-3;Ib-IV-1,Ib-IV-4,Ib-IV-5;Ic-IV-4,Fb-IV-4;Ia-IV-4;Fb-IV-1,Fb-IV-3`],
 history:['social','歷1b-IV-1',`歷Ba-IV-1;歷Bb-IV-1,歷Bb-IV-2;歷Ca-IV-1,歷Ea-IV-1;歷Fa-IV-1,歷Fa-IV-2;歷Ha-IV-1,歷Ha-IV-2;歷Ib-IV-1,歷Ib-IV-2;歷Na-IV-1,歷Na-IV-2,歷Oa-IV-1;歷Qa-IV-2,歷Qc-IV-2,歷Qc-IV-3;歷Ba-IV-2;歷Ha-IV-1;歷Ia-IV-1,歷Ib-IV-1;歷Na-IV-2;歷Ca-IV-2;歷Ka-IV-1,歷Kb-IV-2;歷Qc-IV-3,歷Lb-IV-1`],
 geography:['social','地1a-IV-1',`地Aa-IV-1;地Ab-IV-2,地Ac-IV-2,地Ac-IV-4;地Ad-IV-1,地Ae-IV-2,地Af-IV-2;地Bd-IV-1,地Bd-IV-3;地Be-IV-2,地Bf-IV-2,地Bg-IV-2;地Bh-IV-1,地Bi-IV-1,地Bc-IV-1;地Cb-IV-2,地Bi-IV-4;地Ab-IV-1,地Ac-IV-3;地Be-IV-1,地Bf-IV-1;地Bi-IV-2,地Bi-IV-3;地Af-IV-1,地Af-IV-3;地Bf-IV-1,地Bf-IV-2,地Bf-IV-3;地Bc-IV-1,地Bc-IV-2,地Bc-IV-3`],
 civics:['social','公1a-IV-1',`公Bb-IV-1,公Dc-IV-1;公Ba-IV-1,公Ca-IV-3;公Be-IV-2;公Ad-IV-1,公Bi-IV-3;公Bl-IV-1,公Bl-IV-2,公Bl-IV-4;公Cb-IV-2,公Dd-IV-2;公Bk-IV-1;公Bj-IV-1,公Bi-IV-1,公Bh-IV-1;公Cf-IV-1,公Cf-IV-3;公Be-IV-3,公Ca-IV-2;公Be-IV-2,公Be-IV-3;公Dd-IV-1,公Bl-IV-3`],
 visual:['arts','視1-IV-1',`視E-IV-1;視E-IV-2;視P-IV-2`],
 music:['arts','音1-IV-1',`音E-IV-3;音E-IV-2,音E-IV-4;音A-IV-1,音E-IV-3`],
 performing:['arts','表1-IV-1',`表E-IV-1;表E-IV-2;表E-IV-3`],
 computing:['technology','運t-IV-4',`資A-IV-1;資P-IV-2;資S-IV-3,資H-IV-1,資H-IV-3`],
 technology:['technology','設c-IV-1',`生P-IV-4;生A-IV-2,生P-IV-5;生A-IV-4`],
 health:['health','1a-IV-1',`Db-IV-2,Db-IV-5;Ea-IV-1,Ea-IV-3;Eb-IV-1,Fb-IV-5`],
 pe:['health','4c-IV-3',`Ab-IV-1,Bc-IV-1;Cb-IV-1;Ab-IV-2,Cb-IV-1`],
 home:['integrative','2c-IV-1',`家Da-IV-1,家Da-IV-2;家Ab-IV-2,家Ba-IV-1;家Ca-IV-1,家Ca-IV-2`],
 scout:['integrative','3a-IV-1',`童Aa-IV-2,童Cc-IV-1;童Ca-IV-1,童Ca-IV-2;童Da-IV-2,童Bb-IV-2`],
 guidance:['integrative','1a-IV-1',`輔Aa-IV-1,輔Da-IV-2;輔Ba-IV-2,輔Bb-IV-2;輔Ca-IV-1,輔Cc-IV-2`],
 local:['mindong','1-IV-1',`Aa-IV-1;Ba-IV-1;A-IV-1;Ba-IV-1`]
};
const extensions={
 'math-25':'先掌握圓周角與切線性質；圓內外角的組合公式列為延伸推導，不以背誦公式取代幾何理由。',
 'english-14':'先練習有可能發生的 if 條件句；與事實相反的假設句列為延伸，Ad-IV-1 不表示所有文法細項均為必學。',
 'physics-11':'核心為靜電與電荷吸引排斥；庫侖定律的定量平方反比計算列為延伸。',
 'physics-14':'核心為折射與透鏡成像觀察；折射率、正弦定律與薄透鏡公式的定量計算列為延伸。',
 'chemistry-14':'以原子量、分子量與反應式的粒子個數比為核心；莫耳與阿伏加德羅常數的計量列為延伸。',
 'civics-12':'以全球分工、選擇與機會成本為核心；比較利益的定量生產可能分析列為延伸。',
 'biology-11':'以孟德爾遺傳及性染色體為核心；複雜性聯遺傳族譜推算列為延伸。'
};
const result={}; const errors=[];
const performanceBySubject={chinese:['5-IV-2','5-IV-2','5-IV-4','5-IV-4','5-IV-4','6-IV-2','4-IV-2','6-IV-1','5-IV-2','5-IV-2','5-IV-2','6-IV-2','5-IV-2','6-IV-2','5-IV-2','6-IV-3'],english:['3-IV-6','3-IV-6','3-IV-6','3-IV-6','3-IV-6','3-IV-8','3-IV-6','3-IV-6','3-IV-6','3-IV-6','3-IV-6','3-IV-6','4-IV-5','3-IV-6','3-IV-6','3-IV-4'],visual:['視1-IV-1','視1-IV-2','視3-IV-2'],music:['音1-IV-1','音2-IV-1','音1-IV-2'],performing:['表1-IV-1','表1-IV-2','表2-IV-3'],guidance:['1a-IV-1','1b-IV-1','1c-IV-1'],local:['1-IV-1','2-IV-2','2-IV-1','4-IV-2']};
for(const u of units){
 const [source,defaultPerformance,sequence]=groups[u.subject];
 let sourceId=source, codes=sequence.split(';')[Number(u.id.split('-').at(-1))-1]?.split(','), performance=defaultPerformance;
 if(performanceBySubject[u.subject])performance=performanceBySubject[u.subject][Number(u.id.split('-').at(-1))-1];
 if(u.subject==='math') performance=['n-IV-2','n-IV-1','n-IV-3','a-IV-2','a-IV-4','n-IV-4','a-IV-3','d-IV-1','a-IV-5','s-IV-7','a-IV-5','a-IV-6','f-IV-1','s-IV-9','s-IV-3','s-IV-10','s-IV-14','f-IV-2','d-IV-2','s-IV-11','n-IV-4','n-IV-8','s-IV-2','s-IV-8','s-IV-14','s-IV-16','d-IV-1'][Number(u.id.split('-')[1])-1];
 if(u.id==='local-3'){sourceId='sign';codes=['A-IV-1','Ba-IV-2'];performance='2-IV-1';}
 if(!codes){errors.push(u.id+' missing mapping');continue;}
 const refs=[...codes.map(code=>({code,kind:'學習內容'})),{code:performance,kind:'學習表現'}].map(ref=>{
 const code=norm(ref.code), rx=new RegExp([...code].map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('\\s*')+'(?![0-9])');
 const page=pages[sourceId].findIndex(p=>rx.test(p))+1;
 if(!page)errors.push(`${u.id}: ${sourceId} ${ref.code} absent`);
 return {...ref,page};
 });
 result[u.id]={sourceId,refs,scope:extensions[u.id]||'',...(u.subject==='local'&&u.id!=='local-3'?{scope:'此處以閩東語領綱作語言學習示例；須依學生實際選修語別另核對領綱、詞彙與發音，不能當作所有本土語別的完整教材。'}:{})};
}
if(errors.length)throw new Error(errors.join('\n'));
const names={chinese:'國語文',english:'英語文',science:'自然科學',social:'社會',arts:'藝術',technology:'科技',health:'健康與體育',integrative:'綜合活動',mindong:'閩東語文',sign:'臺灣手語'};
const usedSources=Object.fromEntries(sources.map(s=>[s.id,{url:s.url,label:s.id==='math'?'數學領域課程手冊（113 年 3 月）':`十二年國教${names[s.id]}課程綱要`,pages:pages[s.id].length}]));
fs.writeFileSync('dist/official-alignment-data.js',`// Source codes checked against official PDF text; links use physical PDF page numbers.\nexport const officialSources = ${JSON.stringify(usedSources,null,2)};\nexport const officialAlignment = ${JSON.stringify(result,null,2)};\n`);
fs.writeFileSync('docs/official-alignment-audit.json',JSON.stringify({date:'2026-10-18',unitCount:units.length,mappedUnits:Object.keys(result).length,meaning:'本站單元與官方指標的主題及學習證據對應；不等於完整覆蓋領綱所有指標，也不等於能力認證。',units:result},null,2)+'\n');
console.log(`Verified official source codes for ${Object.keys(result).length} units.`);
