import { computed } from 'vue';
// import { useErrors, useToasts } from '../lib';
import { CustomdataCategory, CustomdataValue } from '../types';
import { useCustomdataCategoryStore } from './storeCustomdataCategory';
import { useCustomdataValueStore } from './storeCustomdataValue';
import { useCustommoduleStore } from './storeCustommodule';

export default function useCustommodule(key: string) {
    const moduleStore = useCustommoduleStore();
    const categoryStore = useCustomdataCategoryStore();
    const valueStore = useCustomdataValueStore();
    // const { errorMessage } = useErrors();
    // const { successToast } = useToasts();

    const custommodule = computed(() => {
        const mod = Object.values(moduleStore.custommodules).find(
            (ccm) => ccm.shorty === key
        );
        return mod;
    });

    const categories = computed(() =>
        Object.values(categoryStore.customdataCategories).map(transformCategory)
    );
    const categoryByShorty = (shorty: string) =>
        transformCategory(categoryStore.customdataCategories[shorty]);

    const transformCategory = (category: CustomdataCategory) => {
        const schema = category.schema ? JSON.parse(category.schema) : {};
        return {
            ...schema,
            ...category,
        };
    };
    const createCategory = async (
        payload: Partial<Omit<CustomdataCategory, 'id'>>
    ) => {
        if (custommodule.value?.id) {
            try {
                await categoryStore.createCustomdataCategory(
                    custommodule.value.id,
                    payload
                );
                // successToast('created');
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const updateCategory = async (payload: CustomdataCategory) => {
        if (custommodule.value?.id) {
            try {
                await categoryStore.updateCustomdataCategory(
                    custommodule.value.id,
                    payload
                );
                // successToast('saved');
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const loadCategory = async (id: number) => {
        if (custommodule.value?.id) {
            try {
                await categoryStore.getCustomdataCategory(
                    custommodule.value.id,
                    id
                );
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const loadCategories = async (force?: boolean) => {
        if (
            (categoryStore.loadingState === 'IDLE' || force) &&
            custommodule.value?.id
        ) {
            try {
                await categoryStore.getCustomdataCategories(
                    custommodule.value.id
                );
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const deleteCategory = async (id: number) => {
        if (custommodule.value?.id) {
            try {
                await categoryStore.deleteCustomdataCategory(
                    custommodule.value.id,
                    id
                );
                // successToast('deleted');
            } catch (error) {
                // errorMessage(error);
            }
        }
    };

    const values = computed(() =>
        Object.values(valueStore.customdataValues).map(transformValue)
    );
    const transformValue = (value: CustomdataValue) => ({
        ...JSON.parse(value.value),
        id: value.id,
        dataCategoryId: value.dataCategoryId,
    });
    const valueById = (id: string) =>
        valueStore.customdataValues[id]
            ? transformValue(valueStore.customdataValues[id])
            : undefined;
    const valuesByCategory = computed(() => {
        const valuesByCategory: Record<string, typeof values.value> = {};
        values.value.forEach((v) => {
            valuesByCategory[v.dataCategoryId] ??= [];
            valuesByCategory[v.dataCategoryId].push(v);
        });
        return valuesByCategory;
    });
    const createValue = async (payload: {
        dataCategoryId: number;
        [x: string]: any;
    }) => {
        if (custommodule.value?.id === undefined) {
            return;
        }
        const p = { ...payload };
        delete p.dataCategoryId;
        try {
            return await valueStore.createCustomdataValue(
                custommodule.value.id,
                {
                    dataCategoryId: payload.dataCategoryId,
                    value: JSON.stringify(p),
                }
            );
            // successToast('created');
        } catch (error) {
            // errorMessage(error);
        }
    };
    const updateValue = async (payload: {
        id: number;
        dataCategoryId: number;
        [x: string]: any;
    }) => {
        if (custommodule.value?.id === undefined) {
            return;
        }
        const p = { ...payload };
        delete p.id;
        delete p.dataCategoryId;
        try {
            await valueStore.updateCustomdataValue(custommodule.value.id, {
                id: payload.id,
                dataCategoryId: payload.dataCategoryId,
                value: JSON.stringify(p),
            });
            // successToast('saved');
        } catch (error) {
            // errorMessage(error);
        }
    };
    const updateValues = async (
        payloads: {
            id: number;
            dataCategoryId: number;
            [x: string]: any;
        }[]
    ) => {
        if (custommodule.value?.id === undefined) {
            return;
        }
        const p = payloads.map((payload) => {
            const pay = { ...payload };
            delete pay.id;
            delete pay.dataCategoryId;
            return {
                id: payload.id,
                dataCategoryId: payload.dataCategoryId,
                value: JSON.stringify(pay),
            };
        });
        try {
            await valueStore.updateCustomdataValues(custommodule.value.id, p);
            // successToast('saved');
        } catch (error) {
            // errorMessage(error);
        }
    };
    const loadValue = async (id: number) => {
        if (custommodule.value?.id === undefined) {
            return;
        }
        try {
            await valueStore.getCustomdataValue(custommodule.value.id, id);
        } catch (error) {
            // errorMessage(error);
        }
    };
    const loadValues = async (force?: boolean) => {
        if (
            (valueStore.loadingState === 'IDLE' || force) &&
            custommodule.value?.id
        ) {
            try {
                await valueStore.getCustomdataValues(custommodule.value.id);
            } catch (error) {
                // errorMessage(error);
            }
        }
    };
    const deleteValue = async (id: number) => {
        if (custommodule.value?.id) {
            try {
                await valueStore.deleteCustomdataValues(
                    custommodule.value.id,
                    id
                );
                // successToast('deleted');
            } catch (error) {
                // errorMessage(error);
            }
        }
    };

    return {
        custommodule,
        categories,
        categoryByShorty,
        createCategory,
        updateCategory,
        loadCategory,
        loadCategories,
        deleteCategory,
        values,
        valuesByCategory,
        valueById,
        createValue,
        updateValue,
        updateValues,
        loadValue,
        loadValues,
        deleteValue,
        moduleStore,
        valueStore,
        categoryStore,
    };
}
