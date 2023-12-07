import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { ArticleComponent } from './components/article/article.component';
import { MoreArticlesComponent } from './components/more-articles/more-articles.component';
import { BackIcon } from './components/icons/back/back.component';
import { LinkIcon } from './components/icons/link/link.component';
import { HomePage } from './pages/home/home.component';
import { ArticlePage } from './pages/article/article.component';
import { GetAssetUrlPipe } from './get-asset-url.pipe';
import { LoginComponent } from './pages/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GuidesComponent } from './pages/guides/guides.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ArticleComponent,
    MoreArticlesComponent,
    BackIcon,
    LinkIcon,
    HomePage,
    ArticlePage,
    GetAssetUrlPipe,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    GuidesComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
