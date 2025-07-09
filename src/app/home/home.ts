import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  public readonly posts = signal<any[]>([]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.fetchPosts();
      }, 2000);
    }
  }

  private fetchPosts() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe({
        next: (data) => {
          this.posts.set(data.slice(0, 10));
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
  }
}
