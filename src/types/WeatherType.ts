export default interface WeatherType {
    name: string;
    main: { temp: number };
    weather: { description: string, icon: string }[];
}