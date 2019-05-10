import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../../models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  user: User;
  errorMessage: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/home'

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  login() {
    this.loading = true;
    console.log("this.model.username:=" + this.model.username);

    console.log("this.returnUrl:=" + this.returnUrl);
    this.user = new User();
    this.user.userName = this.model.username;
    this.user.password = this.model.password;
    this.authenticationService
      .login(this.user)
      /*.subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/

      .subscribe(isLoggedIn => {
        //.subscribe(user => {
        if (isLoggedIn) {
          //if (user) {
          //this.router.navigate(['/home']);
          console.log("this.user.userName:=" + this.user.userName);
          console.log("user.firstName:=" + this.user.firstName);
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/login']);
          this.alertService.error('User is not Logged In');
        }
      }, error => {
        this.errorMessage = 'Either User Id or Password is not Correct. Please Try Again';
        this.loading = false;
      });
  }
}
