import {ChangeDetectorRef, Directive, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../services/authentication.service";

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true,
  hostDirectives: [{
    directive: NgIf
  }]
})
export class IfAuthenticatedDirective implements OnInit {

  private authenticationService = inject(AuthenticationService);
  private ngIfDirective = inject(NgIf);
  ngOnInit() {
    this.authenticationService.isAuthenticated$.subscribe(isAuthenticated => {
      this.ngIfDirective.ngIf = isAuthenticated;
    });
  }

}
