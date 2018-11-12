import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './plot/chart/chart.component';

const appRoutes: Routes = [
{
  path: 'chart',
  component: ChartComponent
}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
