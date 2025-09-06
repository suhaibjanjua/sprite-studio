import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { App as AppComponent } from './app';
import { routes } from './app.routes';
import { SpriteStudioModule } from './features/sprite-studio/sprite-studio/sprite-studio-module';

// AppModule removed: Standalone bootstrap via main.ts
