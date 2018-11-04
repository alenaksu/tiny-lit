# @tiny-lit/element

# Usage

### Custom element

```js
import { html } from '@tiny-lit/core';
import { Element, withElement } from '@tiny-lit/element';

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

All observed props trigger updates when changing

```js
import { html } from '@tiny-lit/core';
import { Element, withProps } from '@tiny-lit/element';

class Clock extends withProps(Element) {
    title = 'My clock';

    static get properties() {
        return {
            title: String
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
