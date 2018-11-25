import './todo';
import './karpinsky';
import './store';
import './counter';

import { RouterProvider, RouteElement } from '@tiny-lit/router/lib/cjs';

customElements.define('demo-router', RouterProvider);
customElements.define('demo-route', RouteElement);
