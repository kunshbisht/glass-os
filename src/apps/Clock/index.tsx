import type { AppConfig } from '../../types/AppConfig';
import Component from './components/main';
import Icon from './components/icon';

export const ClockApp: AppConfig = {
  name: "Clock",
  size: {
    width: 400,
    height: 300,
  },
  icon: <Icon />,
  component: <Component />,
};
