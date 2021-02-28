import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from '../../core/auth/google-auth.service';

@Component({
  selector: 'anms-reset-mot-de-passe',
  templateUrl: './reset-mot-de-passe.component.html',
  styleUrls: ['./reset-mot-de-passe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetMotDePasseComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private googleAuthService: GoogleAuthService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.googleAuthService.reset_password(this.f.username.value)
}
}
