const Appointment = require('../models/Appointment');
const { getAddressFromCEP } = require('../utils/externalApis');

exports.create = async (req,res) => {
  const { title, date, cep, number, complement, notes } = req.body;
  const addressInfo = cep ? await getAddressFromCEP(cep) : {};
  const appointment = new Appointment({
    user: req.user._id,
    title,
    date,
    address: {
      cep,
      street: addressInfo.logradouro || '',
      city: addressInfo.localidade || '',
      state: addressInfo.uf || '',
      number,
      complement
    },
    notes
  });
  await appointment.save();
  res.json(appointment);
};

exports.listForUser = async (req,res) => {
  const appts = await Appointment.find({ user: req.user._id }).sort({ date: 1 });
  res.json(appts);
};

exports.listAll = async (req,res) => {
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const appts = await Appointment.find().populate('user','name email').sort({ date: 1 });
  res.json(appts);
};
