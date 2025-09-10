import type { JSX, ReactNode } from "react";

export interface AppConfig {
  name: string;
  size: { width: number; height: number };
  icon: JSX.Element;
  component: ReactNode;
}
