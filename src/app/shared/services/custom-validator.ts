import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const dateOfBirth = control.value;
    const currentDate = new Date();
    if (new Date(dateOfBirth) > currentDate) {
      return { futureDate: true };
    }

    return null;
  };
}


export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    // Regex pour accepter divers formats de numéro de téléphone
    const phoneNumberRegex = /^(\+\d{1,4}\s?)?(\d{1,4}[-.\s]?){1,5}\d{1,10}$/;

    const phoneNumber = control.value;

    if (!phoneNumberRegex.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}

export function minimumAgeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const dateOfBirth = new Date(control.value);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const monthsDiff = currentDate.getMonth() - dateOfBirth.getMonth();
    const daysDiff = currentDate.getDate() - dateOfBirth.getDate();

    // Check if the user is at least 18 years old
    if (yearsDiff < 18 || (yearsDiff === 18 && monthsDiff < 0) || (yearsDiff === 18 && monthsDiff === 0 && daysDiff < 0)) {
      return { minimumAge: true };
    }

    return null;
  };
}

export function invalidDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const dateOfBirth = control.value;

    if (isNaN(Date.parse(dateOfBirth))) {
      return { invalidDate: true };
    }

    return null;
  };
}

export function passwordLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value as string;
    if (password && password.length < 6) {
      return { passwordLength: true };
    }

    return null;
  };
}

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const name = control.value as string;

    if (!name) {
      // If the field is empty, consider it valid (let the required validator handle the empty case)
      return null;
    }

    const regex = /^[A-Za-z]+(?:-[A-Za-z]+)*(?: [A-Za-z]+)*(?<![-\s])$/;

    if (!regex.test(name)) {
      // If the name contains non-alphabetic characters, consider it invalid
      return { invalidName: true };
    }

    return null;
  };
}
