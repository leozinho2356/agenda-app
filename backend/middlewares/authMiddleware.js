const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req,res,next){
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if(!token) return res.status(401).json({ message: 'Token ausente' });
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-passwordHash');
    if(!req.user) return res.status(401).json({ message: 'Usuário não encontrado' });
    next();
  }catch(err){
    return res.status(401).json({ message: 'Token inválido' });
  }
}
