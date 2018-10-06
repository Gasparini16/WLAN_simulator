import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxComponent } from './tx-settings/tx/tx.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
{
  path: 'main',
  component: TxComponent
}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
