const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  house_number: String,
  street: String,
  apartment: String,
  city: String,
  state: String,
  zip: String
});

const LocationSchema = new mongoose.Schema({
  longitude: String,
  latitude: String
});

const DueDiligenceSchema = new mongoose.Schema({
  soil_information: {
    documents: [String],
    maps: [String]
  },
  financial_information: {
    cash_flow: Object,
    sales_data: Object,
    expenses_data: Object,
    documents: [String]
  },
  crop_information: Object,
  other: Object
});

const FarmSchema = new mongoose.Schema({
  listing_id: String,
  name: String,
  address: AddressSchema,
  location: LocationSchema,
  property_description: String,
  main_picture: String,
  images: [String],
  videos: [String],
  maps: [String],
  parcel_information: [String],
  due_diligence: DueDiligenceSchema
});

module.exports = mongoose.model('Farm', FarmSchema);

