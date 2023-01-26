<script lang="ts">
    import { webAppStore } from "../store";
    import { isDefined } from "../utils";
    import FunctionPlayground from "./FunctionPlayground.svelte";

    export let name: string;

    $: value = $webAppStore[name];
</script>

{#if name && isDefined(value)}
    {#if typeof value === "number" || typeof value === "boolean"}
        <code>{value}</code>
    {:else if typeof value === "string"}
        {#if value.length > 20}
            <pre><code>{value}</code></pre>
        {:else}
            <code>{value}</code>
        {/if}
    {:else if typeof value === "object"}
        <pre><code>{JSON.stringify(value, null, 2)}</code></pre>
        {#each Object.keys(value).filter((key) => typeof value[key] === "function") as key}
            <FunctionPlayground name={key} func={value[key]} />
        {/each}
    {:else if typeof value === "function"}
        <FunctionPlayground {name} func={value} />
    {:else}
        <p>Unsupported type {typeof value}.</p>
    {/if}
{:else}
    <p>Value {name} not found.</p>
{/if}
