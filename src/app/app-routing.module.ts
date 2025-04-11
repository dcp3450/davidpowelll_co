import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SkillsetComponent } from './pages/skillset/skillset.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { CurrentWorkComponent } from './pages/current-work/current-work.component';
import { WorkComponent } from './pages/current-work/work/work.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'skill-set',
    component: SkillsetComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
    path: 'recent-work',
    component: CurrentWorkComponent
  },
  {
    path: 'recent-work/:slug',
    pathMatch: 'full',
    component: WorkComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
