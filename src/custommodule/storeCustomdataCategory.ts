import { churchtoolsClient } from '@churchtools/churchtools-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CustomdataCategory, LoadingState } from '../types';

export const useCustomdataCategoryStore = defineStore(
    'customdataCategory',
    () => {
        const customdataCategories = ref<Record<string, CustomdataCategory>>(
            {}
        );
        const loadingState = ref<LoadingState>('IDLE');

        const createCustomdataCategory = async (
            moduleId: number,
            payload: Partial<Omit<CustomdataCategory, 'id'>>
        ) => {
            const result: CustomdataCategory = await churchtoolsClient.post(
                `/custommodules/${moduleId}/customdatacategories`,
                payload
            );
            customdataCategories.value[result.shorty] = result;
        };
        const updateCustomdataCategory = async (
            moduleId: number,
            payload: CustomdataCategory
        ) => {
            await churchtoolsClient.put(
                `/custommodules/${moduleId}/customdatacategories/${payload.id}`,
                payload
            );
            customdataCategories.value[payload.shorty] = payload;
        };
        const getCustomdataCategory = async (
            moduleId: number,
            catId: number
        ) => {
            const result: CustomdataCategory = await churchtoolsClient.get(
                `/custommodules/${moduleId}/customdatacategories/${catId}`
            );
            customdataCategories.value[result.shorty] = result;
        };
        const getCustomdataCategories = async (moduleId: number) => {
            try {
                loadingState.value = 'LOADING';
                const result: CustomdataCategory[] =
                    await churchtoolsClient.get(
                        `/custommodules/${moduleId}/customdatacategories`
                    );
                customdataCategories.value = Object.fromEntries(
                    result.map((r) => [r.shorty, r])
                );
                loadingState.value = 'SUCCESS';
            } catch (error) {
                loadingState.value = 'ERROR';
                throw error;
            }
        };
        const deleteCustomdataCategory = async (
            moduleId: number,
            catId: number
        ) => {
            await churchtoolsClient.deleteApi(
                `/custommodules/${moduleId}/customdatacategories/${catId}`
            );
            delete customdataCategories.value[catId];
        };

        return {
            loadingState,
            customdataCategories,
            createCustomdataCategory,
            updateCustomdataCategory,
            getCustomdataCategories,
            getCustomdataCategory,
            deleteCustomdataCategory,
        };
    }
);
