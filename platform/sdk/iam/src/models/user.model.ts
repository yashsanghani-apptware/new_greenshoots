import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface IContactPoint {
  telephone: string;
  contactType: string;
  email: string;
}

export interface IUser extends Document {
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  telephone: string;
  jobTitle?: string;
  username: string;
  password: string;
  address: IAddress;
  contactPoint: IContactPoint;
  groups?: mongoose.Types.ObjectId[];
  roles?: mongoose.Types.ObjectId[]; 
  policies?: mongoose.Types.ObjectId[]; // Updated to reference Policy model
  organization?: string;
  attr: { [key: string]: any }; // Custom attributes
}

const AddressSchema: Schema = new Schema({
  streetAddress: { type: String, required: true },
  addressLocality: { type: String, required: true },
  addressRegion: { type: String, required: true },
  postalCode: { type: String, required: true },
  addressCountry: { type: String, required: true },
});

const ContactPointSchema: Schema = new Schema({
  telephone: { type: String, required: true },
  contactType: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  telephone: { type: String, required: true },
  jobTitle: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: AddressSchema, required: false },
  contactPoint: { type: ContactPointSchema, required: true },
  groups: [{ type: Schema.Types.ObjectId,  default: [] }],
  roles: [{ type: Schema.Types.ObjectId,  default: [] }],
  policies: [{ type: Schema.Types.ObjectId  }],
  organization: { type: String, required: false, match: /^[a-f\d]{24}$/ },
  attr: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
    default: { version: '1.1' }, // Setting default value for `attr`
  },
});

// Hash password before saving the user
UserSchema.pre<IUser>('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  
  // Proceed to the next middleware
  next();
});

export const User = mongoose.model<IUser>('User', UserSchema);

