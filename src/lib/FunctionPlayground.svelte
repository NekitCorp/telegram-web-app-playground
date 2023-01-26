<script lang="ts">
    import { updateWebAppStore } from "../store";
    import { getFunctionArgs } from "../utils";

    export let name: string;
    export let func: Function;

    const inputs = [];

    function handleInput(index: number) {
        return (e) => {
            inputs[index] = e.target.value;
        };
    }

    function handleClick() {
        updateWebAppStore();
        func(...inputs);
    }
</script>

<div class="container">
    <button on:click={handleClick}>{name}</button>

    <div class="input-container">
        {#each getFunctionArgs(func) as arg, i}
            <label>{arg}<input type="text" on:input={handleInput(i)} disabled={arg === "callback"} /></label>
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
