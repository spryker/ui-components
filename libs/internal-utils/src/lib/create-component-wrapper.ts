import { ComponentInputs } from '@orchestrator/ngx-testing';

export const createComponentWrapper = <T extends (...args: any) => any>(
    createComponent: T,
    inputs?: ComponentInputs<any>,
    detectChanges = true,
): ReturnType<T> => createComponent(inputs, detectChanges);
