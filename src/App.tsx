import { useState, type JSX } from 'react';
import { Dock } from './components/Dock';
import { ClockApp } from './apps/Clock';
import type { AppConfig } from './types/AppConfig';

const apps: AppConfig[] = [
  ClockApp
];

export function App() {
  const [windows, setWindows] = useState<JSX.Element[]>([]);

  return (
    <>
      <div id="bg"></div>
      <div id="windows">
        {windows}
      </div>
      <div id="frontui">
        <div id="border"></div>
        <Dock apps={apps} setWindows={setWindows} />
      </div>
      <svg style={{ display: 'none' }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
            result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
    </>
  );
}