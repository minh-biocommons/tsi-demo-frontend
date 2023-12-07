import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlePage } from './pages/article/article.component';
import { NotFoundPage } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: HomePage, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'articles/:id', component: ArticlePage },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
