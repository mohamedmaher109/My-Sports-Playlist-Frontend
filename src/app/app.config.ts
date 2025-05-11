import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors  } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    //HttpClientModule ,
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([JwtInterceptor,ErrorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
