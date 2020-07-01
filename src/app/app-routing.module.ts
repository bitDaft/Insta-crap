import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';


const routes: Routes = [
{
  path:"",
  component : MainComponent
},
{
  path:"bookmarks",
  component : BookmarksComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
