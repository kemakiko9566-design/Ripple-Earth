import fs from 'fs';
const p = 'D:\\SynologyDrive\\SynologyDrive\\wzq\\Project\\JA Ripple Earth\\ripple-earth-next\\src\\app\\page.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace('import { Globe, EarthCanvas } from "@/components/Earth";\n', '');
c = c.replace(', useCallback', '');
c = c.replace('<div className="fixed inset-0 z-0">\n        <Globe progress={progress} />\n      </div>\n\n', '<Earth progress={progress} visible={true} />\n\n');
c = c.replace('<EarthCanvas progress={progress} visible={scene02Visible} />\n\n\n\n\n', '');
fs.writeFileSync(p, c, 'utf8');
console.log('done');
