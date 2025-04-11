import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav = false;
  faBars = faBars;
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
    let timeout;
    const header = document.getElementsByTagName('header');
    window.addEventListener('scroll', (e) => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(() => {
        if (window.scrollY >= 100) {
          console.log('add');
          header[0].classList.add('active');
        } else {
          console.log('remove');
          header[0].classList.remove('active');
        }
      });
    });
  }

  triggerMenu() {
    this.showNav = !this.showNav;
  }
}
