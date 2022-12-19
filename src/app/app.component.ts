import { Component } from '@angular/core';
import { API } from 'aws-amplify';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngAmplify';

  apiName = "ngAmplifyApi"

  constructor() {
    from(API.get(this.apiName, '/posts', {}))
      .subscribe({next: console.log})
  }

}
