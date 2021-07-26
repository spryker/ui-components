import { NgModule } from '@angular/core';

import { ArrayContextSerializationStrategy } from './serialization-strategies';
import { provideContextSerializationStrategies } from './serialization-strategy';

@NgModule({
  providers: [
    provideContextSerializationStrategies([ArrayContextSerializationStrategy]),
  ],
})
export class DefaultContextSerializationModule {}
