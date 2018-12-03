import { Expression, CacheEntry, ExpressionMap } from './types';
import { linkExpressions, resolve } from './linker';
import { text, TEXT_ELEMENT } from './utils';

const TemplateCache: WeakMap<TemplateStringsArray, CacheEntry> = new WeakMap();

function createCacheEntry(html: string, expressionsMap: ExpressionMap): CacheEntry {
    const template = document.createElement('template');
    template.innerHTML = html;
    template.normalize();

    // HACK ie11 doesn't import empty text node
    const content = template.content;
    content.insertBefore(text(' '), content.firstChild);
    content.appendChild(text(' '));

    return {
        template,
        expressions: linkExpressions(content, expressionsMap)
    };
}

/**
 * Use this regex to choose the right marker
 * 1. ...<tag...
 * 2. ...<tag...>
 * 3. ...>...
 * 4. ......
 */
const NODE_RE = /^.*<([0-9a-z\-]+)[^>]*(>)?|.*(>).*|.*$/si;
const enum MatchType {
    TagName = 1,
    ClosedTag = 2,
    EndTag = 3
}

export function createElement(
    strings: TemplateStringsArray,
    values: any[]
): { fragment: DocumentFragment; expressions: Expression[] } {
    let cacheEntry: CacheEntry;

    /**
     * https://tc39.github.io/ecma262/#sec-gettemplateobject
     * [...]The template objects are frozen and the same template object is
     * used each time a specific tagged Template is evaluated[...]
     */
    if (!TemplateCache.has(strings)) {
        const expressionsMap: any = new Map();
        let isAttribute = false;
        let lastElement;

        const html = values.reduce((html: string, value: any, i: number) => {
            const marker = `__${i}__`;
            const match = strings[i].match(NODE_RE)!;

            expressionsMap.set(marker, value);

            if (match[MatchType.TagName]) {
                lastElement = match[MatchType.TagName];
                isAttribute = !match[MatchType.ClosedTag];
            }

            if (match[MatchType.ClosedTag] || match[MatchType.EndTag]) {
                isAttribute = TEXT_ELEMENT.test(lastElement);
            }

            html += (isAttribute ? marker : `<!--${marker}-->`) + strings[i + 1];

            return html;
        }, strings[0]);

        TemplateCache.set(strings, cacheEntry = createCacheEntry(html, expressionsMap));
    } else
        cacheEntry = TemplateCache.get(strings)!;

    const fragment = document.importNode(cacheEntry.template.content, true);
    fragment.firstChild!.nodeValue = fragment.lastChild!.nodeValue = '';

    return {
        fragment,
        expressions: resolve(fragment, cacheEntry.expressions)
    };
}
