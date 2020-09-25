/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {init, setAdapters, use} from 'open-leancloud-storage';
import {LiveQuery} from 'open-leancloud-storage/live-query';
import * as adapters from '@leancloud/platform-adapters-react-native';

setAdapters(adapters);
use(LiveQuery);
init({
  appId: 'ozewwcwsyq92g2hommuxqrqzg6847wgl8dtrac6suxzko333',
  appKey: 'ni0kwg7h8hwtz6a7dw9ipr7ayk989zo5y8t0sn5gjiel6uav',
  serverURL: 'https://ozewwcws.lc-cn-n1-shared.com',
});

AppRegistry.registerComponent(appName, () => App);
