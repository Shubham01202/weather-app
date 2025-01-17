const apiKey = "38241db9cd2bb3602d856cb0fe5e95dc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

async function checkWeather(city) {
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    try {
        // Set loading state
        cityElement.innerHTML = "Loading...";
        tempElement.innerHTML = "--°C";
        humidityElement.innerHTML = "--%";
        windElement.innerHTML = "-- km/h";

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            // City not found or API error
            document.querySelector(".Weather").style.display = "none";
            document.querySelector(".error").innerHTML = "City not found. Please try again.";
            document.querySelector(".error").style.display = "block";
            return;
        }

        // Parse response data
        const data = await response.json();

        // Update UI with weather data
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + "°C";
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on condition
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "./images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "./images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "./images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "./images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "./images/mist.png";
                break;
            default:
                weatherIcon.src = "./images/default.png";
        }

        // Display weather data and hide error
        document.querySelector(".Weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").innerHTML = "Something went wrong. Please try again.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".Weather").style.display = "none";
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    checkWeather(city);
});

// Event listener for "Enter" key press
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
