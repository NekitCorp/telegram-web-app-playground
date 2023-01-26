<script lang="ts">
    import EventsLog from "./EventsLog.svelte";

    type EventsTableRowData = {
        "0": string; // eventType
        "1": string; // description
    };

    export let data: EventsTableRowData[];

    function getName(value: string): string {
        return value.match(/<code>(.+)<\/code>/)[1];
    }
</script>

{#each data as row}
    <details>
        <summary>
            <span>{@html row[0]}</span>
        </summary>
        <div class="content-wrapper">
            <table>
                <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                </colgroup>
                <tbody>
                    <tr><th>Description</th><td>{@html row[1]}</td></tr>
                    <tr><th>Playground</th><td><EventsLog name={getName(row[0])} /></td></tr>
                </tbody>
            </table>
        </div>
    </details>
{/each}

<style>
    .content-wrapper {
        padding: 1rem;
    }

    table {
        table-layout: fixed;
    }
</style>
