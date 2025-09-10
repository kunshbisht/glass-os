import { useState, useEffect } from 'react';
import './style.css'

export default function Component() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="clock-app-current-time">{time.toLocaleTimeString()}</div>;
}
