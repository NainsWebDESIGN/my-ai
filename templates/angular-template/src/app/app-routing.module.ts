import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { ExampleDefaultComponent } from "./pages/example-default/example-default.component";
import { ExampleSearchComponent } from "./pages/example-search/example-search.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "example/default-layout", component: ExampleDefaultComponent },
  { path: "example/search-option", component: ExampleSearchComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}