import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.9999 16C14.5333 16 13.2777 15.4778 12.2333 14.4333C11.1888 13.3889 10.6666 12.1333 10.6666 10.6667C10.6666 9.20001 11.1888 7.94445 12.2333 6.90001C13.2777 5.85557 14.5333 5.33334 15.9999 5.33334C17.4666 5.33334 18.7221 5.85557 19.7666 6.90001C20.811 7.94445 21.3333 9.20001 21.3333 10.6667C21.3333 12.1333 20.811 13.3889 19.7666 14.4333C18.7221 15.4778 17.4666 16 15.9999 16ZM5.33325 26.6667V22.9333C5.33325 22.1778 5.5277 21.4833 5.91659 20.85C6.30547 20.2167 6.82214 19.7333 7.46659 19.4C8.84436 18.7111 10.2444 18.1945 11.6666 17.85C13.0888 17.5056 14.5333 17.3333 15.9999 17.3333C17.4666 17.3333 18.911 17.5056 20.3333 17.85C21.7555 18.1945 23.1555 18.7111 24.5333 19.4C25.1777 19.7333 25.6944 20.2167 26.0833 20.85C26.4721 21.4833 26.6666 22.1778 26.6666 22.9333V26.6667H5.33325ZM7.99992 24H23.9999V22.9333C23.9999 22.6889 23.9388 22.4667 23.8166 22.2667C23.6944 22.0667 23.5333 21.9111 23.3333 21.8C22.1333 21.2 20.9221 20.75 19.6999 20.45C18.4777 20.15 17.2444 20 15.9999 20C14.7555 20 13.5221 20.15 12.2999 20.45C11.0777 20.75 9.86659 21.2 8.66659 21.8C8.46659 21.9111 8.30547 22.0667 8.18325 22.2667C8.06103 22.4667 7.99992 22.6889 7.99992 22.9333V24ZM15.9999 13.3333C16.7333 13.3333 17.361 13.0722 17.8833 12.55C18.4055 12.0278 18.6666 11.4 18.6666 10.6667C18.6666 9.93334 18.4055 9.30557 17.8833 8.78334C17.361 8.26112 16.7333 8.00001 15.9999 8.00001C15.2666 8.00001 14.6388 8.26112 14.1166 8.78334C13.5944 9.30557 13.3333 9.93334 13.3333 10.6667C13.3333 11.4 13.5944 12.0278 14.1166 12.55C14.6388 13.0722 15.2666 13.3333 15.9999 13.3333Z" fill="currentColor"/>
  </svg>
`;

@NgModule({
    providers: [provideIcons([IconUserModule])],
})
export class IconUserModule {
    static icon = 'user';
    static svg = svg;
}
