import { churchtoolsClient } from '@churchtools/churchtools-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Custommodule, LoadingState } from '../types';

export const useCustommoduleStore = defineStore('custommodule', () => {
    const custommodules = ref<Record<Custommodule['id'], Custommodule>>({});
    const loadingState = ref<LoadingState>('IDLE');

    const createCustommodule = async (
        payload: Partial<Omit<Custommodule, 'id'>>,
        upload: FormData,
    ) => {
        const result: Custommodule = await churchtoolsClient.post(
            `/custommodules`,
            payload,
        );
        await churchtoolsClient.post(
            `/files/custom_module/${result.id}`,
            upload,
        );
        custommodules.value[result.id] = result;
    };
    const updateCustommodule = async (payload: Custommodule) => {
        await churchtoolsClient.put(`/custommodules/${payload.id}`, payload);
        custommodules.value[payload.id] = payload;
    };
    const getCustommodule = async (
        id: Custommodule['shorty'] | Custommodule['id'],
    ) => {
        const result: Custommodule = await churchtoolsClient.get(
            `/custommodules/${id}`,
        );
        custommodules.value[result.id] = result;
    };
    const getCustommodules = async () => {
        try {
            loadingState.value = 'LOADING';
            const result: Custommodule[] =
                await churchtoolsClient.get(`/custommodules`);
            custommodules.value = Object.fromEntries(
                result.map((r) => [r.id, r]),
            );
            loadingState.value = 'SUCCESS';
        } catch (error) {
            loadingState.value = 'ERROR';
        }
    };
    const deleteCustommodule = async (id: Custommodule['id']) => {
        await churchtoolsClient.deleteApi(`/custommodules/${id}`);
        delete custommodules.value[id];
    };

    return {
        loadingState,
        custommodules,
        createCustommodule,
        updateCustommodule,
        getCustommodule,
        getCustommodules,
        deleteCustommodule,
    };
});
