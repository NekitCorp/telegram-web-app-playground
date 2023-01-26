<script lang="ts">
    import { onMount } from "svelte";
    import { updateWebAppStore } from "../store";

    export let name: string;
    let logs = "Events will be displayed here:\n";

    onMount(() => {
        const onEvent = window.Telegram.WebApp.onEvent;

        if (typeof onEvent === "function") {
            onEvent(name, (...rest) => {
                logs += `${JSON.stringify(rest)}\n`;
                updateWebAppStore();
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
