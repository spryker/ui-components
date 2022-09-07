import { NgModule } from '@angular/core';
import { WebComponentsModule } from '../../../src';
import { StorybookComponent } from './storybook.component';

@NgModule({
    imports: [
        WebComponentsModule.forRoot(),
        WebComponentsModule.withComponents([
            {
                component: StorybookComponent,
                isRoot: true,
            },
        ]),
    ],
    exports: [StorybookComponent],
    declarations: [StorybookComponent],
})
export class StorybookModule {}
