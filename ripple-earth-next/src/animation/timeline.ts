import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export interface SceneTimeline {
  id: string;
  start: number;
  end: number;
}

export function createMasterTimeline(
  scenes: SceneTimeline[],
  onProgress: (sceneId: string, progress: number) => void
) {
  scenes.forEach((scene) => {
    ScrollTrigger.create({
      trigger: document.body,
      start: `${scene.start * 100}%`,
      end: `${scene.end * 100}%`,
      onUpdate: (self) => { onProgress(scene.id, self.progress); },
    });
  });
}

export { gsap, ScrollTrigger };
