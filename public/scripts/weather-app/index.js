const setDailyForecast = (daily, i) => {
    const url = 'https://openweathermap.org/img/wn/' + daily.icon + '.png';

    document.querySelector(`.day${i}`).innerHTML = daily.day;
    document.querySelector(`.weather${i}`).src = url;
    document.querySelector(`.temp${i}__max`).innerHTML = daily.tempMax;
    document.querySelector(`.temp${i}__min`).innerHTML = daily.tempMin;

    if (document.body.clientWidth < 500) {
        document.querySelector(`.weather${i}`).style.width = '40px';
    }
    if (document.body.clientWidth < 400) {
        document.querySelector(`.weather${i}`).style.width = '30px';
    }
    if (document.body.clientWidth < 300) {
        document.querySelector(`.weather${i}`).style.width = '20px';
    }
};

const renderData = (dataObj) => {
    if (dataObj.date.minute < 10) {
        console.log('runs');
        dataObj.date.minute = '0' + dataObj.date.minute;
    }
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
        'https://nominatim.openstreetmap.org/reverse?lat=' +
        pos.lat +
        '&lon=' +
        pos.lon +
        '&format=json';

    const data = await fetchData(url);
    if (data.address.hasOwnProperty('hamlet')) {
        return data.address.hamlet;
    } else if (data.address.hasOwnProperty('village')) {
        return data.address.village;
    } else if (data.address.hasOwnProperty('city')) {
        return data.address.city;
    } else if (data.address.hasOwnProperty('municipality')) {
        return data.address.municipality;
    } else if (data.address.hasOwnProperty('county')) {
        return data.address.county;
    } else if (data.address.hasOwnProperty('state')) {
        return data.address.state;
    } else {
        return data.address.country;
    }
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
            icon: dataObj[i].weather[0].icon,
            tempMin: Math.round(dataObj[i].temp.min) + '°',
            tempMax: Math.round(dataObj[i].temp.max) + '°',
        };
    }
    arr[0].weather = dataObj[0].weather[0].description;
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
    const filteredData = await filterData(weatherData, pos);
    renderData(filteredData);
}

parseData();

const handlePermission = () => {
    const main = document.querySelector('main');
    const prompt = document.querySelector('.overlay');
    prompt.style.display = 'none';

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state == 'denied') {
            prompt.style.display = 'inline';
            main.style.display = 'none';
        }
        result.onchange = function () {
            if (result.state == 'denied') {
                prompt.style.display = 'inline';
                main.style.display = 'none';
            }
            if (result.state == 'granted') {
                prompt.style.display = 'none';
                main.style.display = 'flex';
            }
        };
    });
};

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();
