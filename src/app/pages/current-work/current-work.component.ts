import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { GeneralService } from '../../services/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'dp-current-work',
    templateUrl: './current-work.component.html',
    styleUrls: ['./current-work.component.scss'],
    standalone: false
})
export class CurrentWorkComponent implements OnInit, OnDestroy {
  recentWork = [];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private contentService: ContentService,
    private generalService: GeneralService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    this.generalService.setTitle('David Powell - Recent Work');
    this.generalService.setMeta([
      {'og:title': 'David Powell - Recent Work'},
      {'og:url': this.router.url},
      {'twitter:title': 'David Powell - Recent Work'}
    ]);
    this.contentService.getPage('recent-work')
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(res => {
      console.log(res);
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
      this.renderer.addClass(document.body, res[0].postmeta.pageColor[0]);
      const backgroundImage = res[0].postmeta.bgimg[0];
      const bg = document.getElementById('bg');
      bg.setAttribute('style', `background-image: url('${backgroundImage}');`);
      this.generalService.setShowLoaderState(false);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
