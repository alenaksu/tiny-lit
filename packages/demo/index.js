import './src/todo';
import './src/karpinsky';
import './src/store';
import './src/counter';

import { RouterProvider, RouteElement } from '@tiny-lit/router';

customElements.define('demo-router', RouterProvider);
customElements.define('demo-route', RouteElement);
