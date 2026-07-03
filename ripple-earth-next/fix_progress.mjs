import fs from 'fs';
const p = 'D:\\SynologyDrive\\SynologyDrive\\wzq\\Project\\JA Ripple Earth\\ripple-earth-next\\src\\app\\page.tsx';
let c = fs.readFileSync(p, 'utf8');
// Replace progress with sceneProgress for Earth and WireframeGlobe
c = c.replace('<Earth progress={progress}', '<Earth progress={sceneProgress}');
c = c.replace('progress={progress} visible={scene02Visible} />', 'progress={sceneProgress} visible={scene02Visible} />');
// Update scene02Visible to use sceneProgress
c = c.replace('var scene02Visible = progress > 0.18 && progress < 0.70;', 'var scene02Visible = sceneProgress > 0.15 && sceneProgress < 0.70;');
fs.writeFileSync(p, c, 'utf8');
console.log('Done');
