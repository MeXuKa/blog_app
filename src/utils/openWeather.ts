export default interface OpenWeatherData {
    name: string;
    main: { temp: number };
    weather: { description: string, icon: string }[];
}