import express from 'express';
import Business from '../models/businessModel.js';
import expressAsyncHandler from 'express-async-handler';

const businessRouter = express.Router();

businessRouter.get(
  '/business/:id',
  expressAsyncHandler(async (req, res) => {
    const business = await Business.findById(req.params.id);

    if (business) {
      res.status(200).send(business);
    } else {
      res.status(404).send({ message: 'Business not found' });
    }
  })
);

businessRouter.get(
  '/business',
  expressAsyncHandler(async (req, res) => {
    const businesses = await Business.find({});
    res.status(200).send(businesses);
  })
);

businessRouter.post(
  '/business',
  expressAsyncHandler(async (req, res) => {
    const { name, industry, address, country, email, mobile, description } =
      req.body;

    try {
      const newBusiness = new Business({
        name,
        industry,
        address,
        country,
        email,
        mobile,
        description,
      });

      const business = await newBusiness.save();

      res.send({
        _id: business._id,
        name: business.name,
        industry: business.industry,
        address: business.address,
        country: business.country,
        email: business.email,
        mobile: business.mobile,
        description: business.description,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error creating business', error });
    }
  })
);

export default businessRouter;
