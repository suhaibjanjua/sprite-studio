import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App as AppComponent } from './app';
import { routes } from './app.routes';
import { SpriteStudioModule } from './features/sprite-studio/sprite-studio/sprite-studio-module';

@NgModule({
  imports: [BrowserModule, SpriteStudioModule, AppComponent],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
