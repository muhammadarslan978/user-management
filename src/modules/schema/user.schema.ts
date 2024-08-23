import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IUser extends Document {
  email: string;
  password?: string;
  roles: string[];
  first_name: string;
  last_name: string;
  age?: number;
  gender?: string;
  fitness_goals?: string[];
  preferences?: Record<string, any>;
  selected_workouts?: string[];
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ['User', 'Trainer', 'Coach', 'Admin'],
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  fitness_goals: {
    type: [String],
  },
  preferences: {
    type: Schema.Types.Mixed,
  },
  selected_workouts: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update the `updated_at` field before each save
UserSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const User = model<IUser>('User', UserSchema);
export { UserSchema, User, IUser };
