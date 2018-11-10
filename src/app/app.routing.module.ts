import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxComponent } from './tx-settings/tx/tx.component';
import { AppComponent } from './app.component';
import { ChartComponent } from './plot/chart/chart.component';

const appRoutes: Routes = [
{
  path: 'home',
  component: AppComponent
},
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
