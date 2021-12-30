const setDailyForecast = (daily, i) => {
    let selectedIcon;

    const iconCloud = 'images/weather-app/sprite.svg#icon-cloud';
    const iconSnow = 'images/weather-app/sprite.svg#icon-cloud-snow';
    const iconRain = 'images/weather-app/sprite.svg#icon-cloud-rain';

    switch (daily.weather) {
        case 'Clouds':
            selectedIcon = iconCloud;
            break;
        case 'Snow':
            selectedIcon = iconSnow;
            break;
        case 'Rain':
            selectedIcon = iconRain;
    }

    document.querySelector(`.day${i}`).innerHTML = daily.day;
    document.querySelector(`.weather${i}`).setAttribute('href', selectedIcon);
    document.querySelector(`.temp${i}__max`).innerHTML = daily.tempMax;
    document.querySelector(`.temp${i}__min`).innerHTML = daily.tempMin;
};

const renderData = (dataObj) => {
    //Overview
    document.querySelector('.overview__day').innerHTML = dataObj.date.day;
    document.querySelector('.overview__time').innerHTML =
        dataObj.date.hour.toString() + ':' + dataObj.date.minute.toString();
    document.querySelector('.overview__city').innerHTML = dataObj.location;
    document.querySelector('.overview__weather').innerHTML =
        dataObj.daily[0].weather;
    //Daily Forecast
    for (let i = 0; i < dataObj.daily.length; i++) {
        setDailyForecast(dataObj.daily[i], i);
    }
    //Hourly Forecast
    renderGraph(dataObj);
};

async function reverseGeocoding(pos) {
    const url =
        'https://nominatim.openstreetmap.org/reverse?lat=53.8187279&lon=12.0702051&format=json';

    const data = await fetchData(url);
    return data.address.city;
}

const getDate = () => {
    const time = new Date();
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
        time
    );
    const hour = time.getHours();
    const minute = time.getMinutes();

    return {
        day: day,
        hour: hour,
        minute: minute,
    };
};

const getDailyForecast = (dataObj) => {
    dataObj.pop();
    const arr = [];
    for (let i = 0; i < dataObj.length; i++) {
        const unix_timestamp = dataObj[i].dt;
        const date = new Date(unix_timestamp * 1000);
        const day = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
        }).format(date);

        arr[i] = {
            day: day.substring(0, 2).toUpperCase(),
            weather: dataObj[i].weather[0].main,
            tempMin: Math.round(dataObj[i].temp.min) + '°',
            tempMax: Math.round(dataObj[i].temp.max) + '°',
        };
    }
    return arr;
};

const getHourlyForecast = (dataObj) => {
    const arr = [];
    for (let i = 0; i < dataObj.length; i++) {
        const unix_timestamp = dataObj[i].dt;
        const date = new Date(unix_timestamp * 1000);

        arr[i] = {
            weather: dataObj[i].weather[0].main,
            temp: dataObj[i].temp,
            hour: date.getHours(),
        };
    }
    return arr;
};

async function filterData(weatherData, pos) {
    const date = getDate();
    const hourly = getHourlyForecast(weatherData.hourly);
    const daily = getDailyForecast(weatherData.daily);

    const location = await reverseGeocoding(pos);

    const filteredData = {
        location: location,
        date,
        hourly,
        daily,
    };
    return filteredData;
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

const createURL = (pos) => {
    const pos1 = '?lat=' + pos.lat;
    const pos2 = '&lon=' + pos.lon;
    const link = 'https://api.openweathermap.org/data/2.5/onecall';
    const key = '&APPID=' + config.SECRET_API_KEY;
    const metric = '&units=metric';
    const param = '&exclude=' + 'minutely,' + 'alerts';
    const url = link + pos1 + pos2 + param + metric + key;
    return url;
};

const getPosition = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            resolve({ lat, lon });
        });
    });
};

async function parseData() {
    const pos = await getPosition();
    const url = await createURL(pos);
    const weatherData = await fetchData(url);
    console.log(weatherData);
    const filteredData = await filterData(weatherData, pos);
    renderData(filteredData);
}

parseData();
