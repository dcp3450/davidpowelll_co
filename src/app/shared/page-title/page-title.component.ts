import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  @Input() title: string;
  titleItems = [];

  constructor() { }

  ngOnInit() {
    this.titleItems = this.title.split(' ');
  }

}
