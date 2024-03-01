import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    paymentMethod: { type: String, required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
    maxBookings: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Service = mongoose.model('Service', serviceSchema);
export default Service;
