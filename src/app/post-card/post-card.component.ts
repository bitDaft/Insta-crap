import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit, OnDestroy {
  @Input('post') post: any;
  comments: Array<Object>;
  showFullTitle: Boolean;
  dummyTitle: String;
  bookmarked: Boolean;

  constructor(private postService: PostsService) {
    this.showFullTitle = false;
    this.bookmarked = false;
  }

  ngOnInit(): void {
    this.bookmarked = this.postService.checkIfInBookmarks(this.post.id);
    this.showFullTitle = this.post.title.length < 50;
    this.setTitle();
  }

  ngOnDestroy(): void {}

  setTitle() {
    if (this.showFullTitle) {
      this.dummyTitle = this.post.title;
    } else {
      this.dummyTitle = this.post.title.slice(0, 50).trim() + '...';
    }
  }

  toggleTitleShow() {
    this.showFullTitle = !this.showFullTitle;
    this.setTitle();
  }

  toggleBookmark() {
    if (this.bookmarked) {
      this.postService.removeBookmark(this.post.id);
    } else {
      this.postService.addBookmark(this.post.id);
    }
    this.bookmarked = !this.bookmarked;
  }
}
