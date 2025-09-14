require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { connect } = require('./config/db');

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 1*60*1000, max: 100 }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/weather', require('./routes/weather'));

const PORT = process.env.PORT || 4000;
connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
}).catch(err => {
  console.error('Erro conectando ao MongoDB', err);
  process.exit(1);
});
