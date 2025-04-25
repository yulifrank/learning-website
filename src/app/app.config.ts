import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MonacoEditorModule } from 'ngx-monaco-editor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    MonacoEditorModule,  // Removed .forRoot() if unnecessary
    provideAnimationsAsync() // שימוש בפונקציה הנכונה
  ]
};
