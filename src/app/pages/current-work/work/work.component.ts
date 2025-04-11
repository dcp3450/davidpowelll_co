import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { GeneralService } from '../../../services/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'dp-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {
  content = '';
  heroImg = '';
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private generalService: GeneralService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(res => {
      console.log(res);
      this.contentService.getCustomPost('work', res.slug)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(post => {
        console.log(post);
        this.generalService.setTitle(`David Powell - ${post[0].title.rendered}`);
        this.generalService.setMeta([
          {'og:title': `David Powell - ${post[0].title.rendered}`},
          {'og:url': this.router.url},
          {'twitter:title': `David Powell - ${post[0].title.rendered}`}
        ]);
        this.renderer.removeClass(document.body, 'dark');
        this.renderer.removeClass(document.body, 'light');
        this.renderer.addClass(document.body, 'light');
        this.content = post[0].content.rendered;
        this.heroImg = post[0].postmeta.pageHero[0];
        this.generalService.setShowLoaderState(false);
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
