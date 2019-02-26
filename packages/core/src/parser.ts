import { Expression, CacheEntry } from './types';
import { linkExpressions, resolve } from './linker';
import { text, TEXT_ELEMENT } from './utils';

const TemplateCache: WeakMap<TemplateStringsArray, CacheEntry> = new WeakMap();

function createCacheEntry(html: string, context?: string): CacheEntry {
    const template = document.createElement('template');
    template.innerHTML = context ? `<${context}>${html}</${context}>` : html;

    let content = template.content;
    if (context) {
        const range = document.createRange();
        range.selectNodeContents(content.firstChild!);
        content = range.extractContents();
    }

    // HACK ie11 doesn't import empty text node
    content.insertBefore(text(' '), content.firstChild);
    content.appendChild(text(' '));

    return {
        content,
        expressions: linkExpressions(content)
    };
}

function toHTML(strings: TemplateStringsArray) {
    /**
     * Use this regex to choose the right marker
     * 1. ...<tag...
     * 2. ...<tag...>
     * 3. ...>...
     * 4. ......
     */
    const tagName = `[0-9a-zA-Z]+`,
        attributeName = `[^<\\s\\0"'>\\/=]+`,
        attributeValue = `(?:"[^"]*"?|'[^']*'?|[^\\s'">]*)`,
        attribute = `\\s*${attributeName}(?:\\s*=\\s*${attributeValue})?`,
        tagOpen = `<(${tagName})(?:${attribute})*\\s*(>?)`;
    const NODE_RE = new RegExp(`^[^]*${tagOpen}|[^]*(>)[^]*|[^]*$`, 'i');
    const enum MatchType {
        TagName = 1,
        ClosedTag = 2,
        EndTag = 3
    }

    let isAttribute = false;
    let lastElement;

    let html = strings[0];
    for (let i = 0, l = strings.length; i < l - 1; i++) {
        const marker = `__${i}__`;
        const match = strings[i].match(NODE_RE)!;

        if (match[MatchType.TagName]) {
            lastElement = match[MatchType.TagName];
            isAttribute = !match[MatchType.ClosedTag];
        }

        if (match[MatchType.ClosedTag] || match[MatchType.EndTag]) {
            isAttribute = TEXT_ELEMENT.test(lastElement);
        }
        html += (isAttribute ? marker : `<!--${marker}-->`) + strings[i + 1];
    }

    return html;
}

export function createElement(
    strings: TemplateStringsArray,
    context?: string
): { fragment: DocumentFragment; expressions: Expression[] } {
    /**
     * https://tc39.github.io/ecma262/#sec-gettemplateobject
     * [...]The template objects are frozen and the same template object is
     * used each time a specific tagged Template is evaluated[...]
     */
    let cacheEntry: CacheEntry = TemplateCache.get(strings)!;

    if (!cacheEntry) {
        TemplateCache.set(
            strings,
            (cacheEntry = createCacheEntry(toHTML(strings), context))
        );
    }

    const fragment = document.importNode(cacheEntry.content, true);
    fragment.firstChild!.nodeValue = fragment.lastChild!.nodeValue = '';

    return {
        fragment,
        expressions: resolve(fragment, cacheEntry.expressions)
    };
}
