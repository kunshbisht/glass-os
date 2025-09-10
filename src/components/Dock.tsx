import { useState, useEffect, type JSX } from "react";
import type { AppConfig } from "../types/AppConfig";
import { GlassWindow } from "./GlassWindow";

export function Dock(props: {
  apps: AppConfig[],
  setWindows: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}) {
  const [isDown, setIsDown] = useState<"" | "down">("");

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (e.clientY <= 50) setIsDown("down");
      else setIsDown("");
    }
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function appOnClick(app: AppConfig) {
    const position = {
      left: Math.random() * (innerWidth - app.size.width),
      top: Math.random() * (innerHeight - app.size.height)
    }
    props.setWindows(prev => [
      ...prev,
      <GlassWindow key={Date.now()} app={app} initialPosition={position} />
    ]);
  }

  return (
    <div id="dock" className={isDown}>
      {props.apps.map((app, i) => (
        <div key={i} className="app overflow-hidden" onClick={() => appOnClick(app)}>
          {app.icon}
        </div>
      ))}
    </div>
  );
}
