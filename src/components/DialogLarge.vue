<script setup lang="ts">
import { t } from '@churchtools/utils';
import { Button, Dialog } from 'churchtools-styleguide';
import { ref, computed } from 'vue';
type ButtonProps = InstanceType<typeof Button>['$props'];

const props = withDefaults(
    defineProps<{
        context: string;
        overflowHidden?: boolean;
        initialFocus?: HTMLElement;
        hideFooter?: boolean;
        button?: string | ButtonProps;
        cancelButton?: string | ButtonProps;
        preventClose?: () => Promise<void>;
        padding?: boolean;
    }>(),
    {
        preventClose: () => Promise.resolve(),
        padding: true,
    }
);
const emit = defineEmits<{
    (event: 'save', close: () => void): void;
    (event: 'close'): void;
}>();

const mainRef = ref<HTMLElement>();

const buttonBind = computed(() => {
    if (typeof props.button === 'string') {
        return { label: t(props.button, false) };
    }
    return props.button;
});
const cancelButtonBind = computed(() => {
    if (typeof props.cancelButton === 'string') {
        return { label: t(props.cancelButton, false) };
    }
    return props.cancelButton;
});

const onClose = async (close: () => void) => {
    await props.preventClose();
    close();
    emit('close');
};
</script>
<template>
    <Dialog
        class="z-10"
        :prevent-close="preventClose"
        :initial-focus="initialFocus"
        @close="emit('close')"
    >
        <template #default="{ close }">
            <div
                class="dialog__wrapper z-10 relative bg-back my-8 rounded-lg"
                @keydown.enter.meta="emit('save', close)"
            >
                <div
                    class="dialog__header theme-border text-sec flex items-center justify-between gap-4 border-0 border-b border-solid px-8 py-3.5 text-sm"
                >
                    <div>{{ context }}</div>
                    <div class="flex items-center">
                        <slot name="actions"></slot>
                        <div class="ml-4 flex items-center">
                            <button
                                class="icon-close cursor-pointer border-0 bg-transparent transition-all hover:bg-gray-200"
                                @click="onClose(close)"
                            />
                        </div>
                    </div>
                </div>
                <div
                    ref="mainRef"
                    class="dialog__main overflow-hidden"
                    :class="{ 'p-8': padding }"
                >
                    <slot :close="close"></slot>
                </div>
                <div
                    v-if="hideFooter !== true"
                    class="dialog__footer theme-border border-0 border-t border-solid py-3 px-8"
                >
                    <div class="flex justify-between">
                        <div>
                            <slot name="footer-left" :close="close"></slot>
                        </div>
                        <div class="flex gap-3">
                            <slot name="footer-right" :close="close">
                                <Button
                                    :label="t('cancel')"
                                    v-bind="cancelButtonBind"
                                    outlined
                                    @click="onClose(close)"
                                />
                                <Button
                                    :label="t('save')"
                                    v-bind="buttonBind"
                                    @click="emit('save', close)"
                                />
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
<style lang="scss">
.dialog__wrapper {
    width: 100vw;
    max-width: 880px;
    box-shadow: 0 44px 94px #0000008c;
}
.dialog__main {
    max-height: calc(100vh - 64px - 50px - 65px); /* margin-y header footer*/
    overflow-y: auto;
}
.icon-close {
    width: 28px;
    height: 28px;
    padding: 4px;
    margin: -4px;
    border-radius: 4px;
    position: relative;
    &::before,
    &::after {
        content: '';
        width: 24px;
        height: 2px;
        background: var(--gray-700);
        position: absolute;
        top: 13px;
        left: 2px;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
}
</style>
