import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
	<defs>
		<path d="M12.232 1c6.203 0 11.231 5.029 11.231 11.232-.005 6.2-5.03 11.226-11.231 11.231C6.029 23.463 1 18.435 1 12.232S6.029 1 12.232 1zm7.137 5.91L7.013 19.476a8.912 8.912 0 0014.131-7.226c0-2.003-.66-3.852-1.775-5.342zm-7.137-3.581v.01a8.912 8.912 0 00-7.153 14.23l12.357-12.56a8.882 8.882 0 00-5.204-1.68z" id="a"/>
	</defs>
	<g fill="none" fill-rule="evenodd">
		<mask id="b" fill="#fff">
			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#a"/>
		</mask>
		<use fill="currentColor" fill-rule="nonzero" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#a"/>
		<g mask="url(#b)" fill="currentColor">
			<path d="M-.045-.045h25.09v25.09H-.044z"/>
		</g>
	</g>
</svg>`;

@NgModule({
  providers: [provideIcons([IconErrorModule])],
})
export class IconErrorModule {
  static icon = 'error';
  static svg = svg;
}
