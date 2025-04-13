import { Component, OnInit, Renderer2 } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dp-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  minStars = 50;
  maxStars = 100;

  constructor(
    private renderer: Renderer2,
    private generalService: GeneralService,
    private router: Router
  ) { }

  ngOnInit() {
    this.generalService.setTitle('David Powell');
    this.generalService.setMeta([
      {'og:title': 'David Powell'},
      {'og:url': this.router.url},
      {'twitter:title': 'David Powell'}
    ]);
    const stars = document.getElementById('stars');
    const screenW = window.outerWidth;
    const screenH = window.outerHeight;
    const startCount = Math.random() * (this.maxStars - this.minStars) + this.minStars;
    console.log(screenW, screenH);
    this.renderer.removeClass(document.body, 'dark');
    this.renderer.removeClass(document.body, 'light');
    this.renderer.addClass(document.body, 'dark');

    for (let x = 0; x <= startCount; x++) {
      const xPos = Math.floor(Math.random() * Math.floor(screenW));
      const yPos = Math.floor(Math.random() * Math.floor(screenH));
      const pulseDuration = (Math.random() * (3 - 2) + 2).toFixed(2);
      const hasFlare = Math.floor(Math.random() * Math.floor(startCount)) % 2 === 0;
      const star = document.createElement('div');
      stars.appendChild(star);
      star.classList.add('star');
      if (hasFlare) {
        star.classList.add('flare');
      }
      star.setAttribute('style', `left: ${xPos}px; top: ${yPos}px; animation-duration: ${pulseDuration}s`);
    }
  }

  showHireMe() {
    this.generalService.setShowHireMeState(true);
  }

}
