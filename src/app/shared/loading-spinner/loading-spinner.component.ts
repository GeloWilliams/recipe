import { Component } from "@angular/core";

/* Component Decorator */
@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-hourglass"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})

export class LoadingSpinnerComponent {}