import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailForm: FormGroup;
  showEmailForm = false; // Controls form visibility

  constructor(private fb: FormBuilder, private readonly supabase: SupabaseService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.emailForm.valid) {
      try {
        console.log('Email submitted:', this.emailForm.value.email);
        await this.supabase.saveEmail(this.emailForm.value.email);
        // Set showEmailForm to false after successful submission
        this.showEmailForm = false;
        console.log('Email saved successfully!');
      } catch (error) {
        console.error('Error saving email:', error);
        alert('There was an error saving your email. Please try again.');
      }
    } else {
      alert('Please enter a valid email address.');
    }
  }
    
  toggleEmailForm() {
    this.showEmailForm = !this.showEmailForm;
  }
}
