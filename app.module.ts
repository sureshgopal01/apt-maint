  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { RouterModule } from '@angular/router';

  import { AppComponent } from './app.component';
  import { NavComponent } from './components/nav/nav.component';
  import { LoginComponent } from './components/login/login.component';
  import { HomeComponent } from './components/home/home.component';
  import { PropertyListComponent } from './components/property-list/property-list.component';
  import { PropertyComponent } from './components/property/property.component';

  // Services
  import { AuthenticationService } from './services/authentication.service';
  import { PropertyService } from './services/property.service';
  import { AlertService } from './services/alert.service';
  import { AuthGuard } from './guards/auth.guard';


  @NgModule({
    declarations: [
      AppComponent,
      PropertyListComponent,
      PropertyComponent,
      NavComponent,
      HomeComponent,
      LoginComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'properties', component: PropertyListComponent, canActivate: [AuthGuard] },
      { path: 'properties/add', component: PropertyComponent, canActivate: [AuthGuard] },
      { path: 'properties/edit/:id', component: PropertyComponent, canActivate: [AuthGuard] }
    ])
    ],
    providers: [PropertyService,
        AuthenticationService,
        AlertService,
        AuthGuard
        ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
