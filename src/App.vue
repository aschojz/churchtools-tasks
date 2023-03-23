<script setup lang="ts">
import { onMounted, ref, provide } from 'vue';
import useCustomModule from './composables/useCustomModule';
import { KEY } from './main';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue';
import {
    defaultStyles,
    mergeStyles,
    vanillaRenderers,
} from '@jsonforms/vue-vanilla';
import '@jsonforms/vue-vanilla/vanilla.css';
import inputTester from './renderers/inputTester';
import Input from './renderers/Input.vue';

const { init } = useCustomModule(KEY);
onMounted(async () => {
    await init();
});

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: 'mylabel' } });
const originalRenderers = [
    ...vanillaRenderers,
    // here you can add custom renderers
    { tester: inputTester, renderer: Input },
];
const schema = ref({
    properties: {
        nameinput: {
            type: 'string',
            minLength: 1,
            description: "The task's name",
        },
        description: {
            title: 'Long Description',
            type: 'string',
        },
        done: {
            type: 'boolean',
        },
        dueDate: {
            type: 'string',
            format: 'date',
            description: "The task's due date",
        },
        rating: {
            type: 'integer',
            maximum: 5,
        },
        recurrence: {
            type: 'string',
            enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
        },
        recurrenceInterval: {
            type: 'integer',
            description: 'Days until recurrence',
        },
    },
});
const uischema = ref({
    type: 'HorizontalLayout',
    elements: [
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/nameinput',
                },
                {
                    type: 'Control',
                    scope: '#/properties/description',
                    options: {
                        multi: true,
                    },
                },
                {
                    type: 'Control',
                    scope: '#/properties/done',
                },
            ],
        },
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/dueDate',
                },
                {
                    type: 'Control',
                    scope: '#/properties/rating',
                },
                {
                    type: 'Control',
                    scope: '#/properties/recurrence',
                },
                {
                    type: 'Control',
                    scope: '#/properties/recurrenceInterval',
                },
            ],
        },
    ],
});

// freeze renderers for performance gains
const renderers = ref(Object.freeze(originalRenderers));

const data = ref({
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    recurrence: 'Daily',
    rating: 3,
});
const onChange = (event: JsonFormsChangeEvent) => {
    data.value = event.data;
};
provide('styles', myStyles);
</script>
<template>
    <div class="myform p-6">
        <json-forms
            :data="data"
            :renderers="renderers"
            :schema="schema"
            :uischema="uischema"
            @change="onChange"
        />
    </div>
    <div class="bg-gray-100 min-h-screen">
        <div class="mx-auto max-w-screen-lg pt-12 flex flex-col gap-4">
            <RouterView />
        </div>
    </div>
</template>
<style>
html {
    font-size: 62.5%;
}
body {
    font-size: 1.4rem;
}
</style>
