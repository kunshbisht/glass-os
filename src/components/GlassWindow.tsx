import { useRef, useState, useEffect, useCallback } from "react";
import type { AppConfig } from "../types/AppConfig";
import "./GlassWindow.css";

type GlassWindowProps = {
  initialPosition: { left: number; top: number };
  app: AppConfig;
};

export function GlassWindow({ initialPosition, app }: GlassWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const elRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    };
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        left: e.clientX - offsetRef.current.x,
        top: e.clientY - offsetRef.current.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  function onClose() {
    elRef.current?.remove()
  }

  return (
    <div
      className="window"
      style={{
        left: position.left,
        top: position.top,
        width: app.size.width,
        height: app.size.height,
        position: "absolute",
      }}
      ref={elRef}
    >
      <header className="header" onMouseDown={handleMouseDown}>
        {app.name}
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </header>
      <div className="content">{app.component}</div>
    </div>
  );
}
