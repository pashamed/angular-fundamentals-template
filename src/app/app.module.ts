import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { CourseInfoComponent } from "@app/features/course-info/course-info.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { CoursesListComponent } from "./features/courses/courses-list/courses-list.component";
import { CoursesComponent } from "./features/courses/courses.component";
import { CoursesModule } from "./features/courses/courses.module";
import { CourseInfoModule } from "./features/course-info/course-info.module";
import { AppRoutingModule } from "./app-routing.module";
import { LoginFormComponent } from "./shared/components";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { DatePipe } from "@angular/common";
import { reducer } from "./store/courses/courses.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CoursesEffects } from "./store/courses/courses.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    CoursesModule,
    CourseInfoModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ courses: reducer }),
    EffectsModule.forRoot([CoursesEffects]),
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true, // This ensures that the interceptor is added to the list of interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
