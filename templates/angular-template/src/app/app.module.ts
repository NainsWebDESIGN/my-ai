import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";

// Pages
import { HomeComponent } from "./pages/home/home.component";
import { ExampleDefaultComponent } from "./pages/example-default/example-default.component";
import { ExampleSearchComponent } from "./pages/example-search/example-search.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleDefaultComponent,
    ExampleSearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}