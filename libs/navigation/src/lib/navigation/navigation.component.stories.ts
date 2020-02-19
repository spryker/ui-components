import { NavigationModule } from '../navigation.module';
import { NavigationComponent } from './navigation.component';
import { CommonModule } from "@angular/common";
import { NzMenuModule } from "ng-zorro-antd";

export default {
  title: 'NavigationComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [CommonModule, NzMenuModule],
  },
  component: NavigationComponent,
  props: {
  }
})
