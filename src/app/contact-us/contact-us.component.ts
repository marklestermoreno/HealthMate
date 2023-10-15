import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { environment } from 'src/environments/environment';
import emailjs from 'emailjs-com';

@Component({
  selector: 'ContactUs',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  contactForm: FormGroup;
  isLoading: boolean = false;

  responseMessage: string = '';
  classStatus: string = '';
  status: number = 0;

  nameErrorMessage: string = '';
  emailErrorMessage: string = '';
  subjectErrorMessage: string = '';
  messageErrorMessage: string = '';

  EMAILJS_PUBLIC_KEY = environment.EMAILJS_PUBLIC_KEY;
  EMAILJS_SERVICE_ID = environment.EMAILJS_SERVICE_ID;
  EMAILJS_TEMPLATE_ID = environment.EMAILJS_TEMPLATE_ID;

  constructor(private modalService: ModalService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  closeModal() {
    this.modalService.closeModal();

  }

  async ngOnInit() {
    await emailjs.init(this.EMAILJS_PUBLIC_KEY);
    this.subscribeToFormChanges();
  }

  sendEmail() {

    this.isLoading = true;

    this.markFormGroupTouched(this.contactForm);
    this.updateErrorMessages();

    if (this.contactForm.valid) {

      const templateParams = {
        email: this.contactForm.value.email,
        from_name: this.contactForm.value.name,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
      };

      emailjs
        .send(
          this.EMAILJS_SERVICE_ID,
          this.EMAILJS_TEMPLATE_ID,
          templateParams,
          this.EMAILJS_PUBLIC_KEY
        )
        .then((response) => {
          console.log(response.text);
          this.status = response.status;

          this.responseMessage = "Successfully Sent";
          this.classStatus = "text-green";
        

        })
        .catch((error) => {
          console.log(error.text);
          this.status = error.status;
          this.responseMessage = "Something went wrong! Please try again."
          this.classStatus = "text-red";


        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  updateErrorMessages() {
    const controls = ['name', 'email', 'subject', 'message'];

    controls.forEach((controlName) => {
      const control = this.contactForm.get(controlName);

      if (control?.hasError('required')) {
        (this as any)[`${controlName}ErrorMessage`] = `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }

      if (control?.hasError('email')) {
        (this as any)[`${controlName}ErrorMessage`] = 'Invalid email format.';
      }
    });
  }

  private subscribeToFormChanges(): void {
    this.contactForm.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    this.contactForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

}
