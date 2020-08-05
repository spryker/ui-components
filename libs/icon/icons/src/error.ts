import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Error</title>
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-189.000000, -1303.000000)" fill-rule="nonzero">
            <path d="M200,1303 C206.075132,1303 211,1307.92487 211,1314 C210.994825,1320.07299 206.072987,1324.99482 200,1325 C193.924868,1325 189,1320.07513 189,1314 C189,1307.92487 193.924868,1303 200,1303 Z M206.991311,1308.78877 L194.889387,1321.09566 C196.325942,1322.13489 198.091437,1322.74744 200,1322.74744 C204.820711,1322.74744 208.728669,1318.83948 208.728669,1314.01877 C208.728669,1312.05751 208.082482,1310.24703 206.991311,1308.78877 Z M200,1305.28072 L200,1305.2901 C195.179289,1305.2901 191.271331,1309.19806 191.271331,1314.01877 C191.271331,1315.97088 191.912149,1317.77331 192.9949,1319.22719 L205.097113,1306.92732 C203.66319,1305.89295 201.902897,1305.28276 200,1305.28072 Z" id="error"></path>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconErrorModule])],
})
export class IconErrorModule {
  static icon = 'error';
  static svg = svg;
}
