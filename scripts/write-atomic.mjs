import fs from 'node:fs';

// Avoid partial JSON responses and transient sharing locks in synced Windows folders.
export function writeAtomic(path, data, options) {
  const temp = `${path}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(temp,data,options);
    for(let attempt=0;;attempt++) {
      try {fs.renameSync(temp,path);return;}
      catch(error) {
        if(attempt>=19 || !['EBUSY','EPERM','EACCES','UNKNOWN'].includes(error.code))throw error;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,50);
      }
    }
  } finally {
    if(fs.existsSync(temp))fs.unlinkSync(temp);
  }
}
