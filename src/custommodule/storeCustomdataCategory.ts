import { churchtoolsClient } from '@churchtools/churchtools-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CustomdataCategory, LoadingState } from '../types';

export const useCustomdataCategoryStore = defineStore(
    'customdataCategory',
    () => {
        const customdataCategories = ref<
            Record<CustomdataCategory['shorty'], CustomdataCategory>
        >({});
        const loadingState = ref<LoadingState>('IDLE');

        const createCustomdataCategory = async (
            moduleId: CustomdataCategory['customModuleId'],
            payload: Partial<Omit<CustomdataCategory, 'id'>>
        ) => {
            const result: CustomdataCategory = await churchtoolsClient.post(
                `/custommodules/${moduleId}/customdatacategories`,
                payload
            );
            customdataCategories.value[result.shorty] = result;
        };
        const updateCustomdataCategory = async (
            moduleId: CustomdataCategory['customModuleId'],
            payload: CustomdataCategory
        ) => {
            await churchtoolsClient.put(
                `/custommodules/${moduleId}/customdatacategories/${payload.id}`,
                payload
            );
            customdataCategories.value[payload.shorty] = payload;
        };
        const getCustomdataCategory = async (
            moduleId: CustomdataCategory['customModuleId'],
            catId: CustomdataCategory['id']
        ) => {
            const result: CustomdataCategory = await churchtoolsClient.get(
                `/custommodules/${moduleId}/customdatacategories/${catId}`
            );
            customdataCategories.value[result.shorty] = result;
        };
        const getCustomdataCategories = async (
            moduleId: CustomdataCategory['customModuleId']
        ) => {
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
            moduleId: CustomdataCategory['customModuleId'],
            catId: CustomdataCategory['id']
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
