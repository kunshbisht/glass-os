import type { AppConfig } from '../../types/AppConfig';
import Component from './components/main';
import Icon from './components/icon';

export const TerminalApp: AppConfig = {
  name: "Terminal",
  size: {
	width: 400,
	height: 300
  },
  icon: <Icon />,
  component: <Component />
};