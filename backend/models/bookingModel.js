import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  status: {
    type: String,
    enum: ['today', 'upcoming', 'completed'],
    default: 'upcoming',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
