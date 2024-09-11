// src/app/services/api.service.ts
// src/app/services/tripadvisor.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import animeData from '../../data/jsonData.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://anime-db.p.rapidapi.com/anime';

  constructor() { }

  async getAnimeList(page: number = 1, size: number = 30): Promise<any> {
    const options = {
      method: 'GET',
      url: this.apiUrl,
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: {
        'x-rapidapi-key': "YOUR_RAPIDAPI_KEY", //Sign in to https://rapidapi.com to get your api key.
        'x-rapidapi-host': 'anime-db.p.rapidapi.com'
      }
    };
    
    try {
      let response = await axios.request(options);
      return response.data
    } catch (error) {
      return animeData
    }
  }
}

