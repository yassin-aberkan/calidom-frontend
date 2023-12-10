import {Directive, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../services/authentication.service";

@Directive({
  selector: '[ifNotAuthenticated]',
  standalone: true,
  hostDirectives: [{
    directive: NgIf
  }]
})
export class IfNotAuthenticatedDirective {

  private authenticationService = inject(AuthenticationService);
  private ngIfDirective = inject(NgIf);
  ngOnInit() {
    this.ngIfDirective.ngIf = !this.authenticationService.isAuthenticated();
  }

}
