<script lang="ts">
    import { updateWebAppStore } from "../store";
    import { getFunctionArgs } from "../utils";

    export let name: string;
    export let func: Function;

    type ArgName = string;
    type ArgValue = string;

    const CALLBACK_ARG_NAME: ArgName = "callback";
    const funcArgsNames: ArgName[] = getFunctionArgs(func);
    const inputs: Record<ArgName, ArgValue> = funcArgsNames.reduce((acc, arg) => ({ ...acc, [arg]: "" }), {});

    function handleInput(argName: ArgName) {
        return (e) => {
            inputs[argName] = e.target.value;
        };
    }

    function handleClick() {
        const funcArgs = Object.keys(inputs).map((argName: ArgName) =>
            argName === CALLBACK_ARG_NAME
                ? (...props: unknown[]) => {
                      inputs[argName] = JSON.stringify(props);
                  }
                : inputs[argName]
        );

        updateWebAppStore();
        func(...funcArgs);
    }
</script>

<div class="container">
    <button on:click={handleClick}>{name}</button>

    <div class="input-container">
        {#each funcArgsNames as argName}
            <label>
                {argName}
                <input
                    type="text"
                    on:input={handleInput(argName)}
                    disabled={argName === CALLBACK_ARG_NAME}
                    bind:value={inputs[argName]}
                />
            </label>
        {/each}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border: 1px dashed #eee;
        padding: 4px;
        gap: 4px;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    label {
        display: flex;
        gap: 2px;
        align-items: center;
        justify-content: end;
    }
</style>
