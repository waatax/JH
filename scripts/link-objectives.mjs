import fs from 'node:fs';
import {units} from '../dist/curriculum.js';
import {reviewedQuestions} from '../dist/cap-reviewed.js';
const data=JSON.parse(fs.readFileSync('dist/alignment-data.json','utf8'));
// Candidate routes assist navigation only. They never change a coverage decision.
const rules=[
 ['chinese','字義|字音|字形|詞語|修辭',['chinese-1']],['chinese','造字|六書',['chinese-7']],['chinese','標點',['chinese-8']],['chinese','圖表|應用文本|訊息|資訊',['chinese-4']],['chinese','人物|情感|文意|寫作用意',['chinese-2','chinese-14']],['chinese','論點|論據|評鑑|觀點',['chinese-5']],['chinese','文言',['chinese-3']],['chinese','詩歌|詩句',['chinese-6','chinese-9']],
 ['english','圖表|公告|推論|訊息|整合|文意',['english-6','english-16']],['english','比較|最高級',['english-4','english-10']],['english','現在|過去|時態',['english-1','english-3']],['english','被動|關係子句|完成式',['english-5']],['english','介系詞',['english-13']],['english','動名詞|不定詞',['english-4']],
 ['science','細胞|顯微鏡',['biology-1']],['science','光合|呼吸作用',['biology-2']],['science','消化|養分',['biology-3','biology-14']],['science','神經|內分泌',['biology-4','biology-13']],['science','遺傳|染色體',['biology-5','biology-11']],['science','分類|生態|食物鏈|生物多樣性',['biology-6','biology-12']],['science','密度|測量|天平',['physics-1']],['science','聲|波動',['physics-2']],['science','折射|反射|成像|光線',['physics-3','physics-14']],['science','溫度|熱量|熱傳',['physics-4']],['science','運動|速度|加速度|位移|牛頓',['physics-5']],['science','功率|力學能|動能|位能|機械',['physics-6','physics-15']],['science','電流|電壓|電路|電阻',['physics-7']],['science','浮力',['physics-8']],['science','壓力|氣壓',['physics-9']],['science','電磁|磁場',['physics-12','physics-13']],['science','原子|元素|週期表',['chemistry-2']],['science','質量守恆|反應式|分子量',['chemistry-3','chemistry-14']],['science','濃度|溶液|溶解度',['chemistry-4']],['science','酸鹼|中和|pH',['chemistry-5','chemistry-10']],['science','氧化|還原',['chemistry-6']],['science','反應速率',['chemistry-7']],['science','有機|石油|燃料',['chemistry-11']],['science','岩石|板塊|地震|地層',['earth-1','earth-7','earth-8','earth-11']],['science','氣象|鋒面|季風',['earth-3','earth-9']],['science','月相|四季|潮汐',['earth-4','earth-10']],['science','太陽系|日食|月食',['earth-5','earth-12']],
 ['social','臺灣.*氣候|臺灣.*災害|臺灣.*地形',['geography-2']],['social','臺灣.*人口|臺灣.*產業|臺灣.*農業',['geography-3']],['social','地圖|比例尺|經緯|時區',['geography-1']],['social','亞洲|東亞|中國.*氣候',['geography-4','geography-9']],['social','西亞|伊斯蘭|石油',['geography-12']],['social','歐洲|非洲|美洲|全球.*分布',['geography-5','geography-6']],['social','原住民|南島',['history-9']],['social','荷蘭|西班牙|鄭氏',['history-2']],['social','清領|日治',['history-3','history-13']],['social','古希臘|羅馬',['history-12']],['social','明清|清帝國',['history-11']],['social','工業革命|世界大戰',['history-8']],['social','冷戰|解殖',['history-15']],['social','人權|法治|程序',['civics-4']],['social','民法|刑法|行政法',['civics-8']],['social','民主|選舉|政府|權力',['civics-3','civics-11']],['social','市場|價格|供需|成本',['civics-5','civics-9']],['social','文化|認同|性別',['civics-1']],['social','家庭|學校|公共參與',['civics-2']],['social','媒體|消費|環保',['civics-6']],['social','貿易|國際分工',['civics-12']]
];
const codeUnits=new Map();
for(const b of data.books.filter(b=>b.subject==='math'))for(const c of b.chapters)for(const code of c.codes){const list=codeUnits.get(code)||new Set();c.unitIds.forEach(id=>list.add(id));codeUnits.set(code,list)}
const reviewed=Object.fromEntries(reviewedQuestions.map(q=>[q.id,q]));
for(const q of data.questions){
 if(reviewed[q.id])Object.assign(q,reviewed[q.id]);
 const candidate=new Set();
 if(q.subject==='math')for(const code of q.officialCodes||[])if(/^[A-Z]-[789]-/.test(code))for(const id of codeUnits.get(code)||[])candidate.add(id);
 for(const [subject,pattern,ids] of rules)if(q.subject===subject&&new RegExp(pattern).test(q.officialObjective||''))ids.forEach(id=>candidate.add(id));
 q.candidateUnitIds=[...candidate].slice(0,4);
}
data.summary.officialObjectives=data.questions.filter(q=>q.officialObjective).length;
fs.writeFileSync('dist/alignment-data.json',JSON.stringify(data,null,2));
const audit=JSON.parse(fs.readFileSync('docs/coverage-audit.json','utf8'));
Object.assign(audit,data.summary,{candidateLinked:data.questions.filter(q=>q.candidateUnitIds.length).length});
audit.limitations=audit.limitations.filter(s=>!s.startsWith('聽力ZIP'));
audit.limitations.push('111–115年英聽105題已匯入官方評量目標；110年英聽逐題對照尚待建檔。','自動主題候選不計為已核對或已涵蓋。');
fs.writeFileSync('docs/coverage-audit.json',JSON.stringify(audit,null,2));
console.log({objectives:data.summary.officialObjectives,candidates:audit.candidateLinked});
