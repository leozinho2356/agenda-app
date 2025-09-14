const { getCoordsFromCEPViaOpenWeather, getWeatherForCoords, getAddressFromCEP } = require('../utils/externalApis');

exports.weatherByCepAndDate = async (req,res) => {
  const { cep, date } = req.params;
  const key = process.env.OPENWEATHER_KEY;
  if(!key) return res.status(500).json({ message: 'OpenWeather key não configurada' });
  const coords = await getCoordsFromCEPViaOpenWeather(cep, key);
  if(!coords) return res.status(404).json({ message: 'Não foi possível localizar coordenadas para o CEP' });
  const weather = await getWeatherForCoords(coords.lat, coords.lon, key);
  const addr = await getAddressFromCEP(cep);
  res.json({ address: addr, coords, weather });
};
