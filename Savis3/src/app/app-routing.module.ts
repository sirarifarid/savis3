import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { OneProportionComponent } from "./one-proportion/one-proportion.component";
import { TempComponent } from "./temp/temp.component";

const routes: Routes = [
    {path: '', component: TempComponent, children: [] }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }