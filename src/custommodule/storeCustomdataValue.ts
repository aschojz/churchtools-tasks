import { churchtoolsClient } from '@churchtools/churchtools-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CustomdataValue, LoadingState } from '../types';

export const useCustomdataValueStore = defineStore('customdataValue', () => {
    const customdataValues = ref<Record<string, CustomdataValue>>({});
    const loadingState = ref<LoadingState>('IDLE');

    const createCustomdataValue = async (
        moduleId: number,
        payload: Partial<Omit<CustomdataValue, 'id'>>
    ) => {
        const result: CustomdataValue = await churchtoolsClient.post(
            `/custommodules/${moduleId}/customdatavalues`,
            payload
        );
        customdataValues.value[result.id] = result;
        return result;
    };
    const updateCustomdataValue = async (
        moduleId: number,
        payload: CustomdataValue
    ) => {
        await churchtoolsClient.put(
            `/custommodules/${moduleId}/customdatavalues/${payload.id}`,
            payload
        );
        customdataValues.value[payload.id] = payload;
    };
    const updateCustomdataValues = async (
        moduleId: number,
        payloads: CustomdataValue[]
    ) => {
        const promises: Promise<void>[] = [];
        payloads.forEach(async (payload) => {
            promises.push(
                await churchtoolsClient.put(
                    `/custommodules/${moduleId}/customdatavalues/${payload.id}`,
                    payload
                )
            );
        });
        await Promise.all(promises);
        payloads.forEach((payload) => {
            customdataValues.value[payload.id] = payload;
        });
    };
    const getCustomdataValue = async (moduleId: number, valueId: number) => {
        const result: CustomdataValue = await churchtoolsClient.get(
            `/custommodules/${moduleId}/customdatavalues/${valueId}`
        );
        customdataValues.value[valueId] = result;
    };
    const getCustomdataValues = async (moduleId: number) => {
        try {
            loadingState.value = 'LOADING';
            const result: CustomdataValue[] = await churchtoolsClient.get(
                `/custommodules/${moduleId}/customdatavalues`
            );
            customdataValues.value = Object.fromEntries(
                result.map((r) => [r.id, r])
            );
            loadingState.value = 'SUCCESS';
        } catch (error) {
            loadingState.value = 'ERROR';
        }
    };
    const deleteCustomdataValues = async (
        moduleId: number,
        valueId: number
    ) => {
        await churchtoolsClient.deleteApi(
            `/custommodules/${moduleId}/customdatavalues/${valueId}`
        );
        delete customdataValues.value[valueId];
    };

    return {
        loadingState,
        customdataValues,
        createCustomdataValue,
        updateCustomdataValue,
        getCustomdataValue,
        getCustomdataValues,
        deleteCustomdataValues,
        updateCustomdataValues,
    };
});
