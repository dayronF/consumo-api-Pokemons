import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { PokemonList } from './components/pokemon-list/pokemon-list';

@NgModule({
  declarations: [App, PokemonList],
  imports: [BrowserModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
