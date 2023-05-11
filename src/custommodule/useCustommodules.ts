import { computed, onMounted } from 'vue';
// import { useErrors, useToasts } from '../lib';
import { Custommodule } from '../types';
import { useCustommoduleStore } from './storeCustommodule';

export default function useCustommodules() {
    const store = useCustommoduleStore();
    // const { errorMessage } = useErrors();
    // const { successToast } = useToasts();

    onMounted(() => loadModules());

    const custommodules = computed(() => Object.values(store.custommodules));
    const createModule = async (
        payload: Partial<Omit<Custommodule, 'id'>>,
        formData: FormData
    ) => {
        try {
            await store.createCustommodule(payload, formData);
            // successToast('created');
        } catch (error) {
            // errorMessage(error);
        }
    };
    const updateModule = async (payload: Custommodule) => {
        try {
            await store.updateCustommodule(payload);
            // successToast('saved');
        } catch (error) {
            // errorMessage(error);
        }
    };
    const loadModule = async (id: number | string) => {
        try {
            await store.getCustommodule(id);
        } catch (error) {
            // errorMessage(error);
        }
    };
    const loadModules = async (force?: boolean) => {
        if (store.loadingState === 'IDLE' || force) {
            try {
                await store.getCustommodules();
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const deleteModule = async (id: number) => {
        try {
            await store.deleteCustommodule(id);
            // successToast('deleted');
        } catch (error) {
            // errorMessage(error);
        }
    };

    return {
        store,
        custommodules,
        createModule,
        updateModule,
        loadModule,
        loadModules,
        deleteModule,
    };
}
