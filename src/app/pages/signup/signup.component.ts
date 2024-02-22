import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { directus } from 'src/app/services/directus';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  content!: any;
  list!: any;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.getContent();
    }
  }
  
  async getContent() {
    this.content = await directus
      .items('signup_pages')
      .readByQuery({ sort: ['id'] });
    console.log(this.content);
    this.list = this.content?.data?.description;
  }

  nextStep() {
    window.location.href =
      'https://registry-test.biocommons.org.au/registry/co_petitions/start/coef:140';
  }
}
