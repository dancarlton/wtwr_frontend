import WeatherCard from '../WeatherCard/WeatherCard'
import './Main.css'

function Main(){
    return (
        <main className="main">
            <WeatherCard />
            <section className="cards">
                <p className="cards__text">Today is 75 &deg; F/ You want to wear: </p>
            </section>
        </main>
    )
}

export default Main
