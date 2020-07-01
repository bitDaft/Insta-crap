import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const SAVE_BOOKMARK = 'INSTACRAP_BOOKMARK';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts = [];
  bookmarked = [];

  constructor(private http: HttpClient) {
    const bkm = localStorage.getItem(SAVE_BOOKMARK);
    const data: Array<String> = JSON.parse(bkm);
    if (data && data.length) {
      this.bookmarked = data;
    } else {
      this.bookmarked = [];
    }
  }

  private fetchPosts(): Observable<Object[]> {
    return this.http.get<Object[]>(environment.postUrl);
  }

  getPosts(): Observable<Object[]> {
    if (!this.posts.length) return this.fetchPosts();
    else return of(this.posts);
  }

  getComments(): Observable<Object[]> {
    return this.http.get<Object[]>(environment.commentsUrlD);
  }

  private saveBookmarks() {
    localStorage.setItem(SAVE_BOOKMARK, JSON.stringify(this.bookmarked));
  }
  getBookmarks() {
    return this.bookmarked;
  }

  addBookmark(id) {
    if (!~this.bookmarked.indexOf(id)) {
      this.bookmarked.push(id);
      this.saveBookmarks();
    }
  }
  removeBookmark(id) {
    let ind = this.bookmarked.indexOf(id);
    if (~ind) {
      this.bookmarked.splice(ind, 1);
      this.saveBookmarks();
    }
  }
  checkIfInBookmarks(id): Boolean {
    return !!~this.bookmarked.indexOf(id);
  }
}
