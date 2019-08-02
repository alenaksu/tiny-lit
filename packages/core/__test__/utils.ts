export const customMatchers = {
    toSameHTML(util, customEqualityTesters) {
        return {
            compare(actual: any, expected) {
                actual = actual
                    .replace(/[\n\r]/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .replace(/\>\s+\</g, '><')
                    .replace(/\<!----\>/g, '')
                    .trim();
                const pass = expected === actual;

                return {
                    pass,
                    message: `Expected "${actual}" to be the same as "${expected}"`
                };
            }
        };
    }
};
