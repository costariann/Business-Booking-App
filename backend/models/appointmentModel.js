import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  // clientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Client',
  //   required: true,
  // },
  date: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
