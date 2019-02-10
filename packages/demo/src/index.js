import './todo';
import './karpinsky';
import './store';
import './svg';

import { RouterProvider, RouteElement } from '@tiny-lit/router';

customElements.define('demo-router', RouterProvider);
customElements.define('demo-route', RouteElement);
