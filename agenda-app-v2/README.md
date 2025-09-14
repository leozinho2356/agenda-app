# Agenda App v2 (Vue + Node) - Cookie JWT + OpenWeather

Esta versão já inclui suporte a JWT via cookie HttpOnly e um endpoint de previsão do tempo usando OpenWeather.

## Como usar localmente

1. Backend
   - `cd backend`
   - copie `.env.example` para `.env` e preencha os valores (MONGO_URI, JWT_SECRET, OPENWEATHER_KEY)
   - `npm install`
   - `npm run dev`

2. Frontend
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Observações
- O backend seta o cookie `token` como HttpOnly; o frontend usa `withCredentials: true`.
- O endpoint `/api/weather/:cep/:date` tenta obter coordenadas via OpenWeather geocoding e retorna o payload `onecall`.
