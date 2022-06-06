import loadApp from './components/app';
import loadStartPage from './components/start-page';

function createApp() {
  const container = document.querySelector('#container');
  const startPage = loadStartPage();
  const app = loadApp();
  container.append(startPage, app);
}

export default createApp;
