import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'students', loadComponent: () => import('./pages/student/student.component').then(m => m.StudentComponent) },
    {path:'course',loadComponent:()=> import('./pages/course/course.component').then(m=>m.CourseComponent)},
    {path:'faculity',loadComponent:()=>import('./faculity/faculity.component').then(m=>m.FaculityComponent)}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
