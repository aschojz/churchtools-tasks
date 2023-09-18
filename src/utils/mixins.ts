export const mixins = {
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        t: function (key: string, _parameter: string | object) {
            return key;
        },
        escapeHtmlRelaxed(string: string) {
            return string;
        },
    },
};
