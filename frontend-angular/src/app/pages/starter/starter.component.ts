import { NgFor } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherForecast } from 'src/app/core/models/weather-forecats';
import { MaterialModule } from 'src/app/material.module';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  standalone: true,
  imports: [MaterialModule, NgFor],
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [WeatherForecastService],
})
export class StarterComponent implements OnInit {
  weatherForecasts: WeatherForecast[] = [];

  constructor(private weatherForecastsService: WeatherForecastService) {}

  ngOnInit() {
    this.loadWeatherForecasts();
  }

  loadWeatherForecasts() {
    this.weatherForecastsService.getWeatherForecast().subscribe((data) => {
      this.weatherForecasts = data as WeatherForecast[];
    });
  }
}
