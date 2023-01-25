// @ts-check

function main() {
    // Because we copy the content of the table from
    // https://core.telegram.org/bots/webapps#initializing-web-apps
    // without manual edits in the HTML code, we need to replace
    // all local links to telegram site.
    document.querySelectorAll("a").forEach((a) => {
        const href = a.getAttribute("href");

        if (href?.startsWith("#")) {
            a.href = `https://core.telegram.org/bots/webapps${href}`;
        } else if (href?.startsWith("/")) {
            a.href = `https://core.telegram.org${href}`;
        }
    });

    const webApp = /** @type {any} */ (window).Telegram.WebApp;
    const table = /** @type {HTMLTableElement} */ (document.querySelector(".table"));

    table.querySelectorAll("tbody > tr").forEach((tr) => {
        const name = getFieldName(tr);
        const value = name && webApp[name];

        if (!name || !isDefined(value)) return;

        const td = document.createElement("td");

        // debug
        console.log({ name, value, type: typeof value });

        switch (typeof value) {
            case "number":
            case "boolean":
                td.appendChild(createCodeElement(value.toString()));
                break;
            case "string":
                td.appendChild(value.length > 20 ? createPreElement(value) : createCodeElement(value));
                break;
            case "object": {
                td.appendChild(createPreElement(JSON.stringify(value, null, 2)));

                Object.keys(value).forEach((key) => {
                    if (typeof value[key] === "function") {
                        td.appendChild(createFunctionHandler(key, value[key]));
                    }
                });

                break;
            }
            case "function":
                td.appendChild(createFunctionHandler(name, value));
                break;
        }

        tr.appendChild(td);
    });
}

/**
 * @param {Element} tr
 * @returns {string | null | undefined}
 */
function getFieldName(tr) {
    // take first td element
    const firstTd = tr.firstElementChild;

    // take first text node (exclude `sup` element)
    let text = firstTd?.firstChild?.textContent;

    // exclude function arguments in name
    text = text?.split("(")[0];

    // just trim
    text = text?.trim();

    return text;
}

/**
 * @param {string} content
 * @returns {HTMLElement} ```<code>{content}</code>```
 */
function createCodeElement(content) {
    const code = document.createElement("code");
    code.textContent = content;
    return code;
}

/**
 * @param {string} content
 * @returns {HTMLPreElement} ```<pre><code>{content}</code></pre>```
 */
function createPreElement(content) {
    const pre = document.createElement("pre");
    pre.appendChild(createCodeElement(content));
    return pre;
}

/**
 * @param {string} content
 * @param {() => void} onClick
 * @returns {HTMLButtonElement} ```<button onClick={onClick}>{content}</button>```
 */
function createButtonElement(content, onClick) {
    const button = document.createElement("button");
    button.addEventListener("click", onClick);
    button.textContent = content;
    return button;
}

/**
 * @param {string} name
 * @param {Function} func
 * @returns {HTMLDivElement}
 */
function createFunctionHandler(name, func) {
    const inputs = [];

    const container = document.createElement("div");
    container.classList.add("function-container");

    container.appendChild(createButtonElement(name, () => func(...inputs)));

    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("inputs-container");

    getFunctionArgs(func).forEach((name, i) => {
        const label = document.createElement("label");
        label.appendChild(document.createTextNode(name));
        const input = document.createElement("input");
        input.addEventListener("change", (e) => (inputs[i] = /** @type {HTMLInputElement} */ (e.target).value));
        label.appendChild(input);
        inputsContainer.appendChild(label);

        if (name === "callback") {
            input.disabled = true;
        }
    });

    container.appendChild(inputsContainer);

    return container;
}

/**
 * https://stackoverflow.com/a/31194949/8439123
 * @param {Function} func
 * @returns {string[]}
 */
function getFunctionArgs(func) {
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

/**
 * @param {any} value
 * @returns {boolean}
 */
function isDefined(value) {
    return value !== null && value !== undefined;
}

main();
