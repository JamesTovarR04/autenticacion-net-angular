import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  constructor(private http: HttpClient) {}

  public getWeatherForecast() {
    return this.http.get(`${environment.apiUrl}/WeatherForecast`, {
      withCredentials: true,
    });
  }
}
