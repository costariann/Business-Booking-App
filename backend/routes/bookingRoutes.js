import express from 'express';
import { calculateBookingStatus } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const bookingRouter = express.Router();

bookingRouter.get(
  '/bookings/:status',
  calculateBookingStatus,
  expressAsyncHandler(async (req, res) => {
    res.send({
      bookings: res.locals.bookings,
    });
  })
);

export default bookingRouter;
