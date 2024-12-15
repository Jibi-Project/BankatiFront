import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  changePasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UsersService, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword } = this.changePasswordForm.value;

      this.userService.changePassword(oldPassword, newPassword).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.changePasswordForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = '';
        }
      });
    }
  }

}