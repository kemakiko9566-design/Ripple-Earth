"use client";
import { useEffect } from "react";
export default function Cursor() {
  useEffect(() => { const s = document.createElement("style"); s.textContent = "*{cursor:crosshair}"; document.head.appendChild(s); return () => s.remove(); }, []);
  return null;
}
