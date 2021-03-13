export interface FormProps {
    prefixPath: string,
    isSub: boolean,
    modelValue: object,
    formItems: any[],
    infoApi: string,
    saveApi: string,
    options: object,
    afterSubmit: string|Function,
    afterReset: string|Function,
    components: object,
    rootData: Function,
    dev: boolean
}
