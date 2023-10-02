import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { globalAnimation } from '~/core/animations/global.animations';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '~/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [globalAnimation]
})
export default class LoginComponent {
  private _fb =  inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  accessFormGroup = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  access() {
    if (this.accessFormGroup.valid) {
      const data = {
        username: this.accessFormGroup.get('email')!.value,
        password: this.accessFormGroup.get('password')!.value
      };

      this._authService.auth_user(data).subscribe(user => {
        if(user?._id) {
          this._router.navigate(['/dashboard', 1]);
        }
      });
    }
  }
}
