import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'insta-crap';

  constructor() {}

  ngOnInit(): void {}
}
