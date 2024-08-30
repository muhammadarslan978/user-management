import { Document, Schema, model } from 'mongoose';

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
  selected_meal_plan?: {
    mealplan_id: string;
    title: string;
    start_date: Date;
  };
  dietary_restrictions?: string[];
  food_logs?: string[];
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
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
    enum: ['User', 'Trainer', 'GUEST', 'Admin'],
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
  selected_meal_plan: {
    mealplan_id: { type: String },
    title: { type: String },
    start_date: { type: Date },
  },
  dietary_restrictions: {
    type: [String],
  },
  food_logs: [
    {
      type: String,
    },
  ],
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
