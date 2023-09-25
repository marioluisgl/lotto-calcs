import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { globalAnimation } from '../../core/animations/global.animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [globalAnimation]
})
export default class RegisterComponent {
  private _fb =  inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  accessFormGroup = this._fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
  });

  access() {
    if (this.accessFormGroup.valid) {
      const data = {
        name: this.accessFormGroup.get('name')!.value,
        gender: this.accessFormGroup.get('gender')!.value
      };

      this._authService.access(data).subscribe(user => {
        if(user.id) {
          this._router.navigate(['/home']);
        }
      });
    }
  }

}
