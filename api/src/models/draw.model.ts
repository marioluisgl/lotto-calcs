import mongoose from 'mongoose';
import {default as mongoosePaginate} from 'mongoose-paginate-v2';

export interface IDraw {
    _id?: string;
    type?: EnumDrawType;
    date?: Date;
    numbers?: number[];
    ball?: number;
}

export enum EnumDrawType {
    POWERBALL = "POWERBALL",
    MEGAMILLION = "MEGAMILLION",
}


const DrawSchema = new mongoose.Schema({
    type: {type: String, enum: ['POWERBALL', 'MEGAMILLION'], required: true},
    date: {type: Date, default: Date.now()},
    numbers: [{type: Number, required: true}],
    ball: {type: Number, required: true}
  
  }, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});
  
  
  DrawSchema.plugin(mongoosePaginate);
  const Draw = mongoose.model('Draw', DrawSchema);
  
  export {Draw};