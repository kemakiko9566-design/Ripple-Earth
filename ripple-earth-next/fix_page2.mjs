import fs from 'fs';
const p = 'D:\\SynologyDrive\\SynologyDrive\\wzq\\Project\\JA Ripple Earth\\ripple-earth-next\\src\\app\\page.tsx';
let c = fs.readFileSync(p, 'utf8');
let lines = c.split('\r\n');
lines = lines.filter(l => {
  if (l.includes('import { Globe, EarthCanvas }')) return false;
  if (l.includes('<Globe progress')) return false;
  if (l.includes('<EarthCanvas progress')) return false;
  if (l.includes(' Scene 02-04: Wireframe Globe')) return false;
  return true;
});
// Also remove the opening div and closing div for Globe
var result = [];
var skipDiv = false;
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.includes('fixed inset-0 z-0')) { skipDiv = true; continue; }
  if (l.includes('</div>') && skipDiv) { skipDiv = false; continue; }
  if (!skipDiv) result.push(l);
}
c = result.join('\r\n').replace(/\n\n+/g, '\n\n');
fs.writeFileSync(p, c, 'utf8');
console.log('OK, lines:', result.length);
