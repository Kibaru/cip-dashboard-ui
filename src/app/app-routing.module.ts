import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesListComponent } from './pages/activities/components/activities-list/activities-list.component';
import { ActivityNewItemComponent } from './pages/activities/components/activity-new-item/activity-new-item.component';
import { ActivityComponent } from './pages/activities/components/activity/activity.component';
import { AgentsListComponent } from './pages/activities/components/agents-list/agents-list.component';
import { AirlinesListComponent } from './pages/activities/components/airlines-list/airlines-list.component';
import { BookingsReportComponent } from './pages/activities/components/bookings-report/bookings-report.component';
import { CompaniesListComponent } from './pages/activities/components/companies-list/companies-list.component';
import { PackageComponent } from './pages/activities/components/package/package.component';
import { VerifyAgentVoucherComponent } from './pages/activities/components/verify-agent-voucher/verify-agent-voucher.component';
import { AdminAgentUsersComponent } from './pages/admin-agent-users/admin-agent-users.component';
import { AgentUsersComponent } from './pages/agent-users/agent-users.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { AgentDashboardComponent } from './pages/home/agent-dashboard/agent-dashboard.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingDashboardComponent } from './pages/home/loading-dashboard/loading-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: CompaniesListComponent,
  },
  {
    path: 'activities/:company_id',
    component: ActivitiesListComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'agent-dashboard',
    component: AgentDashboardComponent,
  },
  {
    path: 'activity/:activity_id',
    component: ActivityComponent,
  },
  {
    path: 'package/:package_id',
    component: PackageComponent,
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: '',
        component: LoadingDashboardComponent,
        outlet: 'home_view',
      },
      {
        path: 'admin',
        component: DashboardComponent,
        outlet: 'home_view',
      },
      {
        path: 'agent',
        component: AgentDashboardComponent,
        outlet: 'home_view',
      },
      {
        path: 'verify_voucher',
        component: VerifyAgentVoucherComponent,
        outlet: 'home_view',
      },
      {
        path: 'products',
        component: CompaniesListComponent,
        outlet: 'home_view',
      },
      {
        path: 'products/activities/:company_id',
        component: ActivitiesListComponent,
        outlet: 'home_view',
      },
      {
        path: 'agents-list',
        component: AgentsListComponent,
        outlet: 'home_view',
      },
      {
        path: 'airlines-list',
        component: AirlinesListComponent,
        outlet: 'home_view',
      },
      {
        path: 'reports',
        component: BookingsReportComponent,
        outlet: 'home_view',
      },
      {
        path: 'users',
        component: UsersComponent,
        outlet: 'home_view',
      },
      {
        path: 'agent-users',
        component: AgentUsersComponent,
        outlet: 'home_view',
      },
      {
        path: 'admin-agent-users',
        component: AdminAgentUsersComponent,
        outlet: 'home_view',
      },
      {
        path: 'configurations',
        component: ConfigurationsComponent,
        outlet: 'home_view',
      },
      {
        path: 'products/activities/:company_id/activity/:activity_id',
        component: ActivityComponent,
        outlet: 'home_view',
      },
      {
        path: 'products/activities/:company_id/activity/:activity_id/package/:package_id',
        component: PackageComponent,
        outlet: 'home_view',
      },
      {
        path: 'products/activities/:company_id/new',
        component: ActivityNewItemComponent,
        outlet: 'home_view',
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
