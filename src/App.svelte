<script lang="ts">
    import data from "../data/table-data.json";
    import EventsTable from "./lib/EventsTable.svelte";
    import FieldsTable from "./lib/FieldsTable.svelte";
</script>

<h3>Available fields for Web Apps</h3>
<FieldsTable data={data.fieldsData} />

<h3>Events Available for Web Apps</h3>
<EventsTable data={data.eventsData} />

<style>
    h3 {
        text-align: center;
    }
</style>
