import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { globalAnimation } from '../../../core/animations/global.animations';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { GenderEnum, IUser, RoleEnum, User } from '~/models/user.model';
import { Helpers } from '~/core/utils/helpers';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatIconModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [globalAnimation]
})
export default class RegisterComponent implements OnInit {
  @Input() modelData: IUser;

  private _fb =  inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  registerFormGroup = this._fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    gender: [GenderEnum.MALE, Validators.required],
  });

  loading = false;

  ngOnInit(): void {
    this.modelData = null == this.modelData ? new User() : this.modelData;
  }

  register = () => {
    this.loading = true;
    this.modelData.name = this.registerFormGroup.get('name').value;
    this.modelData.lastname = this.registerFormGroup.get('lastname').value;
    this.modelData.email = this.registerFormGroup.get('email').value;
    this.modelData.password = this.registerFormGroup.get('password').value;
    this.modelData.gender = this.registerFormGroup.get('gender').value
    this.modelData.role = RoleEnum.ADMIN;

    let modelDataCopy = structuredClone(this.modelData);
    modelDataCopy = Helpers.convertToStringify(Helpers.removeNulls(modelDataCopy));

    this._authService.register_user_data({data: modelDataCopy}).subscribe({
      next: (data) => {
        if (data._id) {
          this.loading = false;
          this._router.navigate(['/login']);
        }
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
      },
    });

  };

}
