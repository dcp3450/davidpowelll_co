import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'dp-recent-work-list',
    templateUrl: './recent-work-list.component.html',
    styleUrls: ['./recent-work-list.component.scss'],
    standalone: false
})
export class RecentWorkListComponent implements OnInit, OnDestroy {
  recentWork = [];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getArchivePage('work')
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any[]) => {
      console.log(res);
      this.recentWork = res;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
