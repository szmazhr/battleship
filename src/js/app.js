import loadStartPage from './components/start-page';

function createApp() {
  const container = document.querySelector('#container');
  const startPage = loadStartPage();
  container.append(startPage);
}

export default createApp;
