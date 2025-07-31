// not-found.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'not-found',
    templateUrl: './not-found.component.html',
    imports: []
})
export class NotFoundComponent {
    constructor(private router: Router) { }
    goHome() {this.router.navigate(['/dashboard']);}
}
