/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import MainPage from '@/pages/Main';

AppRegistry.registerComponent(appName, () => MainPage);
