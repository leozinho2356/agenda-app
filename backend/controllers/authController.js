const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const registerSchema = Joi.object({ name: Joi.string().min(2).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required() });

exports.register = async (req,res) => {
  const { error, value } = registerSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.message });
  const { name, email, password } = value;
  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({ message: 'Email já cadastrado' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7*24*60*60*1000
  });
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
};

exports.login = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message: 'Credenciais inválidas' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({ message: 'Credenciais inválidas' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7*24*60*60*1000
  });
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.logout = async (req,res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
  res.json({ message: 'Desconectado' });
};
