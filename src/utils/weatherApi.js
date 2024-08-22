export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
  `).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
  const weather = {};
  console.log(weather);
  result.city = data.name;
  /*result.temp = { F: data.main.temp };*/
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

// weather.temperature.F = `${(data.main.temp)}F`;
// weather.temperature.C = `${Math.round((data.main.temp - 32) * 5/9)} C`;

//   temp: {
//     F: Math.round(result.temp),
//      C: Math.round(((result.temp - 32) * 5) / 9),
//    },
//  };