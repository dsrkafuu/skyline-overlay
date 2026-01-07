interface ConversionMap {
  [key: string]: string;
}

const classJobMap: ConversionMap = {
  // dps
  acn: 'smn',
  arc: 'brd',
  lnc: 'drg',
  pgl: 'mnk',
  rog: 'nin',
  thm: 'blm',
  // healer
  cnj: 'whm',
  // tank
  gla: 'pld',
  mrd: 'war',
};

const jobClassMap: ConversionMap = {};
Object.keys(classJobMap).forEach((key) => {
  jobClassMap[classJobMap[key]] = key;
});

export function class2job(baseClass: string) {
  return classJobMap[baseClass] || baseClass;
}

export function job2class(job: string) {
  return jobClassMap[job] || job;
}
