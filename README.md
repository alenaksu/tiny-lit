# Tiny-Lit

Just another JavaScript library for building user interfaces using template literals
## Usage

### Html template
```js
import { html, render } from 'tiny-lit';

const quote = message => html`
    <div>
        <blockquote>
            ${message}
        </blockquote>
    </div>
`;

render(
    quote(
        `
        Neque porro quisquam est 
        qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit
        `
    ),
    document.body
);
```

### List of templates

```js
import { html, render, collection } from 'tiny-lit';

const listItem = item => (
    html`<li>${item}</li>`.withKey(item)
);

const list = items => (
    html`
        <ul>
            ${collection(items, listItem)}
        </ul>
    `
);

render(
    list(['pippo', 'pluto', 'paperino']),
    document.body
);
```

### Custom element

```js
import { Element, html } from 'tiny-lit';

class Clock extends Element {
    connectedCallback() {
        setInterval(() => 
            this.setState({
                time: new Date().toLocaleTimeString()
            }), 1000);
    }

    getTemplate() {
        return html`<div>${this.state.time}</div>`;
    }
}
customElement.define('my-clock', Clock);
```

```html
<my-clock></my-clock>
```
