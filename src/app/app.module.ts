import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SkillsetComponent } from './pages/skillset/skillset.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { CurrentWorkComponent } from './pages/current-work/current-work.component';
import { WorkComponent } from './pages/current-work/work/work.component';
import { RecentWorkListComponent } from './shared/recent-work-list/recent-work-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HireFormComponent } from './shared/hire-form/hire-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        LoaderComponent,
        SkillsetComponent,
        PageTitleComponent,
        AboutMeComponent,
        CurrentWorkComponent,
        WorkComponent,
        RecentWorkListComponent,
        HeaderComponent,
        HireFormComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
