import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';
import { FormConfigurationComponent } from './components/form-configuration/form-configuration.component';

const routes: Routes = [
  {path: 'member-registration', component: MemberRegistrationComponent},
  {path: 'form-configuration', component: FormConfigurationComponent},
  {path: '', redirectTo: '/member-registration', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
