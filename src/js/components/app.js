import DOM from '../modules/dom-stuff';
import createAppBody from './app-body';
import createAppHeader from './app-header';
import createFooter from './footer';

const loadApp = (() => {
  const appHeader = createAppHeader();
  const appBody = createAppBody();
  const footer = createFooter();
  const app = DOM.createElement({
    tagName: 'div',
    className: 'main-content',
    children: [appHeader, appBody, footer],
  });
  return () => app;
})();

export default loadApp;
