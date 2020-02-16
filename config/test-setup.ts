import { setOutputMock } from '@orchestrator/ngx-testing';

setOutputMock(() => jest.fn());

declare module '@orchestrator/ngx-testing' {
  // tslint:disable-next-line: no-empty-interface
  interface OutputMock<T = any> extends jest.Mock<void, [T]> {}
}
