import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertComponent } from './convert/convert.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  { path: '', component: ConvertComponent },
  { path: 'convert', component: ConvertComponent },
  { path: 'compare', component: CompareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
