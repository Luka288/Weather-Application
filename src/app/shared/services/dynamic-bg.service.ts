import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicBgService {
  private videoPaths: { [key: string]: string } = {
    'clear-day': 'assets/videos/clear-day.mp4',
    'clear-night': 'assets/videos/clear-night.mp4',
    cloudy: 'assets/videos/cloudy.mp4',
    fog: 'assets/videos/fog.mp4',
    hail: 'assets/videos/hail-weather.mp4',
    'partly-cloudy-day': 'assets/videos/partly-cloudy-day.mp4',
    'partly-cloudy-night': 'assets/videos/partly-cloudy-night.mp4',
    'rain-snow-showers-day': 'assets/videos/rain-snow-showers-day.mp4',
    'rain-snow-showers-night': 'assets/videos/rain-snow-showers-night.mp4',
    'rain-snow': 'assets/videos/rainSnow.mp4',
    rain: 'assets/videos/rain.mp4',
    'showers-day': 'assets/videos/showers-day.mp4',
    'showers-night': 'assets/videos/showers-night.mp4',
    snow: 'assets/videos/snow.mp4',
    'thunder-rain': 'assets/videos/thunder-rain.mp4',
    'thunder-showers-day': 'assets/videos/thunder-showers-day.mp4',
    'thunder-showers-night': 'assets/videos/thunder-showers-night.mp4',
    thunder: 'assets/videos/thunder.mp4',
    wind: 'assets/videos/wind.mp4',
  };

  getVideoPath(icon: string | undefined): string {
    const defaultPath = 'assets/videos/default.mp4';
    return this.videoPaths[icon || 'default'] || defaultPath;
  }
}
