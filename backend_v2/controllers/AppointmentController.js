import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Appointment.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllAppointment = async (req, res) => {
  try {
    const items = await Appointment.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const item = await Appointment.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Appointment.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await Appointment.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.status(200).json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
