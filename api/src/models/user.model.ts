import mongoose from 'mongoose';
import {default as mongoosePaginate} from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IConfirmUser {
  email: string;
  token: string;
}
export interface IUser {
  _id?: string,
  name?: string;
  lastname?: string;
  photo?: string;
  email?: string;
  password?: string;
  role?: RoleEnum;
  gender?: GenderEnum;
  active?: boolean;
  valid_token?: string;
}

export enum RoleEnum {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE', 
}

export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE', 
}

const UserSchema = new mongoose.Schema({
  name: {type: String},
  lastname: {type: String},
  photo: {type: String},
  phone: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: RoleEnum},
  gender: {type: String, enum: GenderEnum},
  active: {type: Boolean, default: true},
  valid_token: {type: String},

}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  this.valid_token = crypto.randomBytes(50).toString('hex');
  next();
});

UserSchema.pre('findOneAndUpdate', function(next) {
  // @ts-ignore
  if (this._update.active === false) {
    // @ts-ignore
    this._update.valid_token = crypto.randomBytes(50).toString('hex');
  }

  // @ts-ignore
  if (this._update.active === true && this._update.password) {
    // @ts-ignore
    this._update.password = this.schema.methods.encryptPassword(this._update.password);
  }
  next();
});

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password.toString(), 10);
};

UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

export {User};