import { setOutputMock } from '@orchestrator/ngx-testing';
import 'reflect-metadata/lite';

setOutputMock(() => jest.fn());

declare module '@orchestrator/ngx-testing' {
    interface OutputMock<T = any> extends jest.Mock<void, [T]> {}
}
