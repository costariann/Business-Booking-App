import mongoose, { mongo } from 'mongoose';

const slotSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  date: [{
    type: Date,
    required: true,
  }],
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
