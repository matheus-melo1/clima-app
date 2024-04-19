document.querySelector('#search').addEventListener('click', async () => {
  let cityName = document.querySelector('#input').value;

  if(!cityName) {
    alert('Escreva o nome corretamente.');
  }

  const key = '8a60b2de14f7a17c7a11706b2cfcd87c';
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${key}&units=metric&lang=pt_br`;

  const results = await fetch(APIUrl);
  const json = await results.json();
  
  if(json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      humidity: json.main.humidity,
      wind: json.wind.speed,
      description: json.weather[0].description,
      icon: json.weather[0].icon,
    })
  } else {
    alert('Nao foi possivel achar.');
  }
});

function showInfo(json) {
  document.querySelector('.weather-box').classList.add('show');
  
  document.querySelector('#city').innerHTML = `${json.city}, ${json.country}`;
  document.querySelector('#temp').innerHTML = `${json.temp.toFixed(0)} <span>°C</span>`;
  document.querySelector('#desc').innerHTML = `${json.description}`;
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
  document.querySelector('#wind').innerHTML = `${json.wind}km/h`;
  document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.icon}@2x.png`);
}