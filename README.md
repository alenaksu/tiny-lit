# Example

```js
import { html, render } from 'tiny-lit';

const clock = time => html`
    <div>
        <h1>Clock example</h1>
        <hr />
        <p>
            ${time}
        </p>
    </div>
`;

setInterval(() =>
    render(
        clock(
            new Date().toLocaleTimeString()
        ),
        document.body
    );
, 1000);
```
