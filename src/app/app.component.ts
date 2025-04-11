import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'dp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'davidpowell';
  showHireMe = false;
  showLoader = true;

  constructor(
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.showLoader = true;
      window.scrollTo(0, 0);
    });

    this.generalService.getShowHireMeState().subscribe(value => {
      this.showHireMe = value;
    });

    this.generalService.getShowLoaderState().subscribe(value => {
      this.showLoader = value;
    });
  }

  closeHireMe() {
    this.showHireMe = false;
  }
}
