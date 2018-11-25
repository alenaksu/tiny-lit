import { Expression, ExpressionMap, CacheEntry } from './types';
import { linkExpressions, resolve } from './linker';

const TemplateCache: Map<string, CacheEntry> = new Map();

function createCacheEntry(html, expressionsMap): CacheEntry {
    const template = document.createElement('template');
    template.innerHTML = html;
    template.normalize();

    return {
        template,
        expressions: linkExpressions(template.content, expressionsMap)
    };
}

const parseTemplate = (html: string, expressionsMap: ExpressionMap): any => {
    if (!TemplateCache.has(html))
        TemplateCache.set(html, createCacheEntry(html, expressionsMap));

    const cacheEntry: CacheEntry = TemplateCache.get(html)!;
    const fragment = document.importNode(cacheEntry.template.content, true);

    return {
        fragment,
        expressions: resolve(fragment, cacheEntry.expressions)
    };
};

const ATTRIBUTE_RE = /^(?:([\s\S]*<[^>]*)|([^<>]+))$/;

export function createElement(
    strings: TemplateStringsArray,
    values: any[]
): { fragment: DocumentFragment; expressions: Expression[] } {
    const expressionsMap: any = new Map();
    let isAttribute = false;

    const html = values.reduce((html: string, value: any, i: number) => {
        const marker = `__${i}__`;
        const match = strings[i].match(ATTRIBUTE_RE)!;

        expressionsMap.set(marker, value);

        isAttribute = match && (!!match[1] || (!!match[2] && isAttribute));

        html += (isAttribute ? marker : `<!--${marker}-->`) + strings[i + 1];

        return html;
    }, strings[0]);

    return parseTemplate(html, expressionsMap);
}
