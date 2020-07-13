import { provideContextSerializationStrategies } from './serialization-strategy';
import { ArrayContextSerializationStrategy } from './serialization-strategies';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    provideContextSerializationStrategies([ArrayContextSerializationStrategy]),
  ],
})
export class DefaultContextSerializationModule {}
