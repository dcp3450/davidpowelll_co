import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { GeneralService } from '../../services/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'dp-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {
  content = '';
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private contentService: ContentService,
    private generalService: GeneralService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.generalService.setTitle('David Powell - About Me');
    this.generalService.setMeta([
      {'og:title': 'David Powell - About Me'},
      {'og:url': this.router.url},
      {'twitter:title': 'David Powell - About Me'}
    ]);
    this.contentService.getPage('about-me')
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
      this.content = res[0].content.rendered;
      this.generalService.setShowLoaderState(false);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
