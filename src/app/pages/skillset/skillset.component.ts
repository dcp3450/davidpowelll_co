import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { GeneralService } from '../../services/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'dp-skillset',
    templateUrl: './skillset.component.html',
    styleUrls: ['./skillset.component.scss'],
    standalone: false
})
export class SkillsetComponent implements OnInit, OnDestroy {
  skillSet = [
    {
      title: 'Front End',
      skills: []
    },
    {
      title: 'Back End',
      skills: []
    },
    {
      title: 'Management',
      skills: []
    }
  ];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private contentService: ContentService,
    private generalService: GeneralService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.generalService.setTitle('David Powell - Skilsets');
    this.generalService.setMeta([
      {'og:title': 'David Powell - Skilsets'},
      {'og:url': this.router.url},
      {'twitter:title': 'David Powell - Skilsets'}
    ]);
    this.contentService.getArchivePage('skill')
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe((res: any[]) => {
      res.forEach(skill => {
        if (skill.postmeta.section[0] === 'Front End') {
          this.skillSet[0].skills.push(skill);
        } else if (skill.postmeta.section[0] === 'Back End') {
          this.skillSet[1].skills.push(skill);
        } else if (skill.postmeta.section[0] === 'Management') {
          this.skillSet[2].skills.push(skill);
        }
      });
      this.skillSet.forEach(set => {
        set.skills.sort((a, b) => {
          if (a.post_title > b.post_title) {
            return 1;
          } else if (a.post_title < b.post_title) {
            return -1;
          } else {
            return 0;
          }
        });
      });

      this.generalService.setShowLoaderState(false);

      setTimeout(() => {
        const bars = document.getElementsByClassName('bar');
        for (let x = 0; x < bars.length; x++) {
          bars[x].classList.add('loaded');
        }
      }, 300);
    });

    this.contentService.getPage('skill-set')
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(res => {
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
      this.renderer.addClass(document.body, res[0].postmeta.pageColor[0]);
      const backgroundImage = res[0].postmeta.bgimg[0];
      const bg = document.getElementById('bg');
      bg.setAttribute('style', `background-image: url('${backgroundImage}');`);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  barClass(knowledge) {
    return knowledge.replace(/\s+/g, '-').toLowerCase();
  }
}
