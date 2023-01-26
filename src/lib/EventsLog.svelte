<script lang="ts">
    import { onMount } from "svelte";

    export let name: string;
    let logs = "Events will be displayed here:\n";

    onMount(() => {
        const onEvent = window.Telegram.WebApp.onEvent;

        if (typeof onEvent === "function") {
            onEvent(name, (...rest) => {
                logs += `${JSON.stringify(rest)}\n`;
            });
        }
    });
</script>

<pre><code>{logs}</code></pre>

<style>
    pre {
        height: 200px;
        margin: 0;
    }
</style>
