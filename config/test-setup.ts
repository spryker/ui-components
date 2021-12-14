import 'core-js/features/reflect';
import { setOutputMock } from '@orchestrator/ngx-testing';

setOutputMock(() => jest.fn());

declare module '@orchestrator/ngx-testing' {
  interface OutputMock<T = any> extends jest.Mock<void, [T]> {}
}
