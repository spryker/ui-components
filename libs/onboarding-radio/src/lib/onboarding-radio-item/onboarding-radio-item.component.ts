import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'spy-onboarding-radio-item',
  templateUrl: './onboarding-radio-item.component.html',
  styleUrls: ['./onboarding-radio-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingRadioItemComponent implements OnInit {
  @Input() value?: string | number;
  @Input() disabled = false;

  @ViewChild('contentTpl') content!: TemplateRef<void>;

  constructor() {}

  ngOnInit(): void {}
}
