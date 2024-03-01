import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';

const serviceRouter = express.Router();

serviceRouter.get(
  '/service/:id',
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
      res.status(200).send(service);
    } else {
      res.status(404).send({ message: 'Service not found' });
    }
  })
);

serviceRouter.get(
  '/service',
  expressAsyncHandler(async (req, res) => {
    const service = await Service.find({});

    res.status(200).send(service);
  })
);

serviceRouter.post(
  '/service',
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      description,
      serviceType,
      price,
      paymentMethod,
      slot,
      maxBookings,
    } = req.body;

    try {
      const newService = new Service({
        name,
        description,
        serviceType,
        price,
        paymentMethod,
        slot,
        maxBookings,
      });

      const service = await newService.save();
      res.send({
        _id: service._id,
        name: service.name,
        description: service.description,
        serviceType: service.serviceType,
        price: service.price,
        paymentMethod: service.paymentMethod,
        slot: service.slot,
        maxBookings: service.maxBookings,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error creating service', error });
    }
  })
);

export default serviceRouter;
