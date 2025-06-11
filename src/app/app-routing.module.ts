import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

const routes: Routes = [
  /* Add your code here */
  {
    path: "",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    component: CoursesComponent,
    canLoad: [AuthorizedGuard],
  },
  { path: "registration", component: RegistrationFormComponent,canLoad: [AuthorizedGuard], },
  { path: "course-info/:id", component: CourseInfoComponent ,canLoad: [AuthorizedGuard],},
  { path: 'courses/edit/:id', component: CourseFormComponent ,canLoad: [AuthorizedGuard], },
  {path: 'course-form', component: CourseFormComponent ,canLoad:[AuthorizedGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
