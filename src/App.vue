<script setup lang="ts">
import { computed } from 'vue';
import useCustommodule from './custommodule/useCustommodule';
import useCustommodules from './custommodule/useCustommodules';

const { loadModule } = useCustommodules();
const { loadCategories, loadValues, custommodule, values } =
    useCustommodule('tasks');
const initModule = async () => {
    await loadModule('tasks');
    await loadCategories();
    await loadValues();

    // if (categoryByShorty('pro') === undefined) {
    //     createCategory({
    //         shorty: 'pro',
    //         name: 'Projekt',
    //         description: 'Oberste Ebene der Aufgabenverwaltung',
    //         customModuleId: custommodule.value.id,
    //         securityLevelId: 1,
    //         schema: '',
    //     });
    // }
    // if (categoryByShorty('list') === undefined) {
    //     createCategory({
    //         shorty: 'list',
    //         name: 'Aufgabenliste',
    //         description:
    //             'Zweite Ebene der Aufgabenverwaltung, Listen von Aufgaben',
    //         customModuleId: custommodule.value.id,
    //         securityLevelId: 1,
    //         schema: '',
    //     });
    // }
    // if (categoryByShorty('task') === undefined) {
    //     createCategory({
    //         shorty: 'task',
    //         name: 'Aufgabe',
    //         description: 'Aufgaben-Issue',
    //         customModuleId: custommodule.value.id,
    //         securityLevelId: 1,
    //         schema: '',
    //     });
    // }
};
initModule();
</script>
<template>
    <RouterView></RouterView>
</template>
<style>
html {
    font-size: 62.5%;
}
body {
    font-size: 1.4rem;
}
</style>
