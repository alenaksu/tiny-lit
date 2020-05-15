import './todo/index.js';
import './scheduler/index.js';
import './store/index.js';
import './svg/index.js';

import { RouterProvider, RouteElement } from '@tiny-lit/router';

customElements.define('demo-router', RouterProvider);
customElements.define('demo-route', RouteElement);
