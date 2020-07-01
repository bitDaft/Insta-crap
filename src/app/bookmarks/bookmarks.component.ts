import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit, OnDestroy {
  posts: Array<Object>;
  subs: Array<Subscription>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.initializeFields();
    const sub: Subscription = this.postService
      .getPosts()
      .subscribe((data: Array<Object>) => {
        const bkm = this.postService.getBookmarks();
        this.posts = data.filter((item: any) => !!~bkm.indexOf(item.id));
        // this.posts = data;
        this.posts.forEach((post) => {
          const subComment: Subscription = this.postService
            .getComments()
            .subscribe((data) => {
              if (data.length > 6) {
                data = data.slice(0, 7);
              }
              post['comments'] = data;
            });
          this.subs.push(subComment);
        });
      });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
  initializeFields() {
    this.posts = [];
    this.subs = [];
  }
}
