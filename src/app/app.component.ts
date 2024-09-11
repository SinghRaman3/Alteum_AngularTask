// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  animeList: any[] = [];
  filteredAnimeList: any[] = [];
  page: number = 1; // Default page number
  size: number = 30; // Default page size

  animeById: object = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAnimeList();
  }

  async getAnimeList(): Promise<void> {
    try {
      const data = await this.apiService.getAnimeList(this.page, this.size);
      this.animeList = data?.data || [];
      this.filteredAnimeList = this.animeList;
    } catch (error) {
      console.error(error);
    }
  }

  async getAnimeByRank(rank: number): Promise<void> {
    try {
      const data = await this.apiService.getAnimeByRank(rank);
      this.animeById = data?.data || {};
      const arr = [];
      arr.push(this.animeById);
      this.filteredAnimeList = arr;
    } catch (error) {
      console.log(error);
    }
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.getAnimeList();
  }

  onSubmit(searchQuery: string): void {
    const queryNumber = parseFloat(searchQuery); 

    if (!isNaN(queryNumber)) this.getAnimeByRank(queryNumber);
    else {
      console.log('Invalid input number');
      this.filteredAnimeList = this.animeList;
    }
  }

  //Unimplemented
  filter(searchQuery: string): void{
    const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
    if (query) {
      this.filteredAnimeList = this.animeList.filter(anime => {
        // Check if anime.genre is an array and filter based on it
        return anime.genre && Array.isArray(anime.genre) && anime.genre.some((genre: string) =>
          genre.toLowerCase().includes(query)
        );
      });
    } else {
      this.filteredAnimeList = this.animeList;
    }
  }
}
