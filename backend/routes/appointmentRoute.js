import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { appointmentMiddleware } from '../utils.js';
import Appointment from '../models/appointmentModel.js';

const appointmentRouter = express.Router();

appointmentRouter.get(
  '/appointment/:appointmentId',
  expressAsyncHandler(async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await Appointment.findById(appointmentId).populate({
        path: 'businessId',
        model: 'Business',
      });

      if (!appointment) {
        return res.status(404).send({ error: 'Appointment not found' });
      }
      return res.status(200).send(appointment);
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  })
);

appointmentRouter.post(
  '/appointment',
  appointmentMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      const { date } = req.body;

      const appointment = new Appointment({ date });

      await appointment.save();
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  })
);

export default appointmentRouter;
