const axios = require('axios');

async function getAddressFromCEP(cep){
  const clean = (cep || '').toString().replace(/\D/g, '');
  if(!clean) return {};
  const res = await axios.get(`https://viacep.com.br/ws/${clean}/json/`);
  return res.data;
}

async function getCoordsFromCEPViaOpenWeather(cep, openWeatherKey){
  const clean = (cep || '').toString().replace(/\D/g, '');
  if(!clean) return null;
  try{
    const res = await axios.get('http://api.openweathermap.org/geo/1.0/zip', {
      params: { zip: `${clean},BR`, appid: openWeatherKey }
    });
    return { lat: res.data.lat, lon: res.data.lon };
  }catch(e){
    const addr = await getAddressFromCEP(cep);
    if(addr && addr.localidade){
      const q = `${addr.localidade},${addr.uf},BR`;
      const r2 = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: { q, limit: 1, appid: openWeatherKey }
      });
      const hit = r2.data && r2.data[0];
      if(hit) return { lat: hit.lat, lon: hit.lon };
    }
    return null;
  }
}

async function getWeatherForCoords(lat, lon, openWeatherKey){
  const res = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: { lat, lon, exclude: 'minutely,hourly', appid: openWeatherKey, units: 'metric' }
  });
  return res.data;
}

module.exports = { getAddressFromCEP, getCoordsFromCEPViaOpenWeather, getWeatherForCoords };
