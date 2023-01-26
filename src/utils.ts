export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== undefined && value !== null;
}

/** https://stackoverflow.com/a/31194949/8439123 */
export function getFunctionArgs(func: Function): string[] {
    return (func + "")
        .replace(/[/][/].*$/gm, "") // strip single-line comments
        .replace(/\s+/g, "") // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, "") // strip multi-line comments
        .split("){", 1)[0]
        .replace(/^[^(]*[(]/, "") // extract the parameters
        .replace(/=[^,]+/g, "") // strip any ES6 defaults
        .split(",")
        .filter(Boolean); // split & filter [""]
}
