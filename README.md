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
import { html, render } from 'tiny-lit';

const listItem = item => (
    html`<li>${item}</li>`.withKey(item)
);

const list = items => (
    html`
        <ul>
            ${items.map(listItem)}
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
import { Element, html, withElement } from 'tiny-lit';

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

class Select extends withElement(HTMLSelectElement) {
    getTemplate() {
        return html`
            ${this.state.options.map( 
                option => html`
                    <option value=${option.value}>
                        ${option.label}
                    </option>`.withKey(option.value)
            )}
        `;
    }
}
customElement.define('my-select', Select);
```

```html
<my-clock></my-clock>
```

#### Observed props

All observed props will trigger an update when they change

```js
import { Element, html, withProps } from 'tiny-lit';

class Clock extends withProps(Element) {

    static get properties() {
        return {
            title: 'My Clock'
        };
    }

    connectedCallback() {
        setInterval(() => 
            this.setState({
                time: new Date().toLocaleTimeString()
            }), 1000);
    }

    getTemplate() {
        return html`
            <h1>${this.title}</h1>
            <div>${this.state.time}</div>
        `;
    }
}
customElement.define('my-clock', Clock);
```

```html
<my-clock id="clock"></my-clock>

<script>
    const clock = document.querySelector('#clock');
    clock.title = 'The clock';
</script>
```
