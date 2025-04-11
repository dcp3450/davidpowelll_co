import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'dp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navItems = [];
  @Input() alignText = 'center';
  @Input() loader = 'false';
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.generalService.getNavigation()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(res => {
      this.navItems = res['items'];

      if (this.loader) {
        this.generalService.setShowLoaderState(false);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  checkFunction(functionClass) {
    if (functionClass === 'trigger-hire') {
      this.generalService.setShowHireMeState(true);
    }
  }
}
