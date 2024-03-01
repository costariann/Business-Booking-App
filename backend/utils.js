import jwt from 'jsonwebtoken';
import Booking from './models/bookingModel.js';
import Appointment from './models/appointmentModel.js';
import Service from './models/serviceModel.js';
import Slot from './models/slotModel.js';

export const generateToken = (user) => {
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: '2d' }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).json({ meassage: 'No Token' });
  }
};

export const calculateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayStart.getDate() + 1);

    let bookings = [];

    if (status === 'today') {
      // Find bookings for today
      bookings = await Booking.find({
        'appointmentId.date': { $gte: todayStart, $lt: todayEnd },
      }).populate({
        path: 'appointmentId',
        select: 'clientId',
        populate: {
          path: 'clientId',
          select: 'name address',
        },
      });
    } else if (status === 'upcoming') {
      // Find upcoming bookings (after today)
      bookings = await Booking.find({
        'appointmentId.date': { $gte: todayEnd },
      }).populate({
        path: 'appointmentId',
        select: 'clientId',
        populate: {
          path: 'clientId',
          select: 'name address',
        },
      });
    } else if (status === 'completed') {
      // Find completed bookings (before today)
      bookings = await Booking.find({
        'appointmentId.date': { $lt: todayStart },
      }).populate({
        path: 'appointmentId',
        select: 'clientId',
        populate: {
          path: 'clientId',
          select: 'name address',
        },
      });
    }

    res.locals.bookings = bookings.map((booking) => ({
      status: status,
      appointmentId: booking.appointmentId,
    }));

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const appointmentMiddleware = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    //Find appointment details
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ error: 'No appointment found' });
    }

    const { serviceId, date } = appointment;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).send({ error: 'No service found' });
    }

    const slot = await Slot.findById(service.slot);
    if (!slot) {
      return res.status(404).send({ error: 'No slot found' });
    }

    if (!slot.date.includes(date)) {
      return res
        .status(400)
        .status.send({ error: 'Selected date is not available for booking' });
    } else {
      res.send('Appointment booked successfully');
    }

    //Check if maximum Bookings are reached

    const appointmentsCount = await Appointment.countDocuments({
      serviceId,
      date,
    });

    if (appointmentsCount >= service.maxBookings) {
      return res.status(400).send({
        error:
          'Maximum booking for this date reached, please select anothe date',
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
