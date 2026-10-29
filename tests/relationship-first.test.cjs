const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const backend=fs.readFileSync('backend/Code.gs','utf8');
const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

test('both client and backend JavaScript parse',()=>{
  assert.ok(script,'inline script is present');
  assert.doesNotThrow(()=>new vm.Script(script));
  assert.doesNotThrow(()=>new vm.Script(backend));
});

function sandbox(extra={}) {
  const context=vm.createContext({console,...extra});
  vm.runInContext(backend,context);
  return context;
}
test('Allen Cook regression: the initial handoff asks for personal interest, not an automatic UW DM',()=>{
  const c=sandbox();
  const handoff=c.buildHandoffMarkdown({
    name:'Allen Cook',row:4,captureId:'69C4F1A4',profileUrl:'(saved profile)',
    source:'LinkedIn',track:'Cold outreach',relationship:'Cold',sourceUrl:'(saved post)',
    notes:'Adrian shares a genuine interest in esports and volunteered at a Discovery Trust competition.',
    folderUrl:'(saved evidence)',files:[],history:[],refinement:false
  });
  assert.match(handoff,/FIRST PERSONAL DM/);
  assert.match(handoff,/Do NOT introduce UW automatically/);
  assert.match(handoff,/genuine.*shared interest/i);
  assert.match(handoff,/Suggested first personal DM - Draft/);
  assert.match(handoff,/Suggested first DM - Draft/);
  assert.match(handoff,/WITHOUT a note/);
  assert.match(handoff,/Do not browse or research the LinkedIn URLs/);
  assert.ok(!handoff.includes('5. Draft the first UW DM only if appropriate'));
  assert.ok(handoff.indexOf('FIRST PERSONAL DM')<handoff.indexOf('Exception: a transparent first UW DM'));
});
test('reply handoff includes prior real conversation and reply, with no compulsory UW transition',()=>{
  const c=sandbox();
  const handoff=c.buildHandoffMarkdown({name:'Allen Cook',row:4,captureId:'69C4F1A4',
    folderUrl:'folder',notes:'Esports',files:[],refinement:true,
    history:[{date:'28 Oct 2026',type:'First personal DM sent',direction:'Outbound',
      summary:'I volunteered at a Discovery Trust competition - are you involved with esports events?'}],
    replyText:'Thanks Adrian, yes, I work with a few local esports groups.'});
  assert.match(handoff,/Discovery Trust competition/);
  assert.match(handoff,/Thanks Adrian, yes/);
  assert.match(handoff,/genuinely.*UW is never relevant/i);
  assert.match(handoff,/Suggested follow-up response - Draft/);
});
test('new and legacy drafts remain separately retrievable',()=>{
  const rows=[
    ['Allen Cook','','','Suggested first DM - Draft','Old UW-first draft','','','', '', ''],
    ['Allen Cook','','','Suggested first personal DM - Draft','Great to connect - how did you get into esports?','','','', '', ''],
    ['Allen Cook','','','Suggested first DM - Draft','Great to connect - how did you get into esports?','','','', '', ''],
    ['Allen Cook','','','Suggested follow-up response - Draft','That sounds interesting - which competitions?','','','', '', ''],
    ['Allen Cook','','','Potential UW introduction - Draft','Would you be open to hearing about UW?','','','', '', ''],
    ['Alex Other','','','Suggested first DM - Draft','Legacy-only DM','','','', '', '']
  ];
  const ctx=sandbox();
  const ss={getSheetByName:()=>({getLastRow:()=>rows.length+1,getRange:()=>({getDisplayValues:()=>rows})})};
  const a=ctx.latestDraftsForProspect(ss,'Allen Cook');
  assert.equal(a.personal_dm,'Great to connect - how did you get into esports?');
  assert.equal(a.first_dm,a.personal_dm);
  assert.equal(a.first_dm_kind,'personal');
  assert.equal(a.followup_dm,'That sounds interesting - which competitions?');
  assert.equal(a.uw_intro,'Would you be open to hearing about UW?');
  const legacy=ctx.latestDraftsForProspect(ss,'Alex Other');
  assert.equal(legacy.first_dm_kind,'legacy');
  assert.equal(legacy.first_dm,'Legacy-only DM');
});
test('recording one reply writes to the SAME prospect and retry does not duplicate history',()=>{
  const headers=['Name','LinkedIn profile','Source post','Notes','Track','Source','Relationship','Last capture ID',
    'First UW DM sent','First personal DM sent','Status','Next action','Last contact','Draft status',
    'Last reply ID','Latest reply handoff ID','Last prospect reply'];
  const row=['Allen Cook','https://linkedin.com/in/allen','post','Esports','Cold outreach','LinkedIn','Connected',
    '69C4F1A4','',new Date('2026-10-28T10:00:00Z'),'Personal conversation','Wait for a reply','','','','',''];
  const history=[['Allen Cook','28 Oct 2026','Outbound','First personal DM sent','Shared esports experience','','https://linkedin.com/in/allen','','','']];
  const folderFiles=[];
  const fakeFile={getId:()=> 'reply-file-1',getName:()=> 'Reply handoff.md',
    getUrl:()=> 'https://drive.google.com/file/d/reply-file-1',
    getBlob:()=>({getDataAsString:()=>folderFiles[0]?.content||''})};
  const folder={getUrl:()=> 'https://drive.google.com/folder',
    createFile:(name,content)=>{folderFiles.push({name,content});return fakeFile}};
  const prosSheet={
    getLastRow:()=>2,getLastColumn:()=>headers.length,
    getRange:(r,col,rows=1,cols=1)=>({
      getDisplayValues:()=>r===1?[headers.slice(col-1,col-1+cols)]:[row.slice(col-1,col-1+cols).map(x=>x instanceof Date?x.toISOString():String(x||''))],
      getValue:()=>r===1?headers[col-1]:row[col-1],
      setValue:value=>{if(r===1){headers[col-1]=value}else{row[col-1]=value}},
      createTextFinder:term=>({matchEntireCell:()=>({findNext:()=>String(row[col-1])===term?{getRow:()=>2}:null})})
    })
  };
  const histSheet={
    getLastRow:()=>history.length+1,
    getRange:()=>({getDisplayValues:()=>history}),
    appendRow:r=>history.push(r)
  };
  const ss={getSheetByName:n=>n==='Prospects'?prosSheet:histSheet};
  const ctx=sandbox({
    SpreadsheetApp:{openById:()=>ss},
    LockService:{getScriptLock:()=>({waitLock:()=>{},releaseLock:()=>{}})},
    Utilities:{formatDate:()=> '2026-10-29_000000'},
    Session:{getScriptTimeZone:()=> 'Europe/London'},
    MimeType:{PLAIN_TEXT:'text/plain'},
    DriveApp:{getFileById:()=>fakeFile}
  });
  ctx.getOrCreateProspectFolder=()=>folder;
  ctx.listImageFiles=()=>[];
  const payload={capture_id:'69C4F1A4',profile_url:'https://linkedin.com/in/allen',
    prospect_name:'Allen Cook',reply_id:'event-1',reply_text:'We have an esports event next month.'};
  const first=ctx.recordReply(payload);
  assert.equal(first.ok,true);
  assert.equal(first.already_recorded,undefined);
  assert.match(first.handoff_markdown,/Shared esports experience/);
  assert.match(first.handoff_markdown,/We have an esports event next month/);
  assert.equal(row[headers.indexOf('Last capture ID')],'69C4F1A4');
  assert.equal(row[headers.indexOf('First UW DM sent')],'');
  assert.equal(row[headers.indexOf('Next action')],'Process reply handoff');
  const count=history.length;
  const second=ctx.recordReply(payload);
  assert.equal(second.already_recorded,true);
  assert.equal(history.length,count);
  assert.equal(folderFiles.length,1);
});
