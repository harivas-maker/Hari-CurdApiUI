import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../authservice.service'; // Adjust path
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
  
   }

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private router: Router,
    private toast:ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
   console.log('Submit clicked');
    if (this.loginForm.invalid) {
       console.log('forminvalid');
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
         console.log('creditinals correct');
        this.router.navigate(['/dashboard']); // Navigate on success
      },
      error: (err) => {
       console.log('Login failed:', err);
       this.toast.error('Invalid Credintals!', 'Error', {
         positionClass: 'toast-center-center',
         timeOut: 5000,
          closeButton: true,
          progressBar: true});
        
        
      }
    });
  }
 
  }


