import fs from 'fs';
const p = 'D:\\SynologyDrive\\SynologyDrive\\wzq\\Project\\JA Ripple Earth\\ripple-earth-next\\src\\components\\Scene\\SceneOrigin.tsx';
let c = fs.readFileSync(p, 'utf8');
// Add CharReveal import after ScrollTrigger
c = c.replace('import { ScrollTrigger } from "gsap/ScrollTrigger";', 'import { ScrollTrigger } from "gsap/ScrollTrigger";\nimport { CharReveal } from "@/animations";');
// Replace h1 with CharReveal
const h1Old = '        <h1 ref={headingRef} className="text-[clamp(56px,10vw,140px)] font-[680] leading-[0.88] mb-0">\n          Ripple Earth\n        </h1>';
const h1New = '        <CharReveal as="h1" text="Ripple Earth" className="text-[clamp(56px,10vw,140px)] font-[680] leading-[0.88] mb-0" />';
c = c.replace(h1Old, h1New);
fs.writeFileSync(p, c, 'utf8');
console.log('OK');
