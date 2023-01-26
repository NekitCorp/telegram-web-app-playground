<script lang="ts">
    import FieldPlayground from "./FieldPlayground.svelte";

    type FieldsTableRowData = {
        "0": string; // name
        "1": string; // type
        "2": string; // description
    };

    export let data: FieldsTableRowData[];

    function getName(value: string): string {
        // remove all tags
        value = value.split("<")[0];
        // remove all function args
        value = value.split("(")[0];
        // trim
        value = value.trim();

        return value;
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
                    <tr><th>Type</th><td>{@html row[1]}</td></tr>
                    <tr><th>Description</th><td>{@html row[2]}</td></tr>
                    <tr><th>Playground</th><td style="width: 30%;"><FieldPlayground name={getName(row[0])} /></td></tr>
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
