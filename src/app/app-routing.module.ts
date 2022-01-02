import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/main-view", pathMatch: "full" },
  {
    path: "main-view",
    loadChildren: () => import('./modules/main-view/main-view.module').then(m => m.MainViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
