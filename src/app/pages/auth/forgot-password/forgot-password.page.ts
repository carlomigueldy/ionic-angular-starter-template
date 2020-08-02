import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
