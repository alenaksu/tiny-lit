
declare namespace jasmine {
    interface ArrayLikeMatchers<T> {
        toSameHTML(expected: any, expectationFailOutput?: any): boolean;
    }
}