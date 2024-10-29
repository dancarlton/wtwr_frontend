export const weatherOptions = [
  {
    day: true,
    condition: 'sunny',
    url: new URL('../assets/day/sunny.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../assets/day/clouds.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rain',
    url: new URL('../assets/day/rain.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'storm',
    url: new URL('../assets/day/storm.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../assets/day/snow.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'fog',
    url: new URL('../assets/day/fog.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'sunny',
    url: new URL('../assets/night/sunny.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../assets/night/clouds.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rain',
    url: new URL('../assets/night/rain.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'storm',
    url: new URL('../assets/night/storm.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../assets/night/snow.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'fog',
    url: new URL('../assets/night/fog.svg', import.meta.url).href,
  },
]

export const defaultWeatherOptions = {
  day: {
    url: new URL('../assets/day/default.svg', import.meta.url).href,
  },
  night: {
    url: new URL('../assets/night/default.svg', import.meta.url).href,
  },
}

export const coordinates = {
  latitude: 33.66224,
  longitude: -117.81439,
}
