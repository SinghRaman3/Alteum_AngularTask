// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  animeList: any[] = [];
  page: number = 1; // Default page number
  size: number = 30; // Default page size

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAnimeList();
  }

  async getAnimeList(): Promise<void> {
    try {
      const data = await this.apiService.getAnimeList(this.page, this.size);
      this.animeList = data?.data || []; 
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.getAnimeList();
  }

  // filter(): void{
  //   console.log("reached")
  //   this.hotels.sort((a, b) => a.name.localeCompare(b.name));
  // }
}
