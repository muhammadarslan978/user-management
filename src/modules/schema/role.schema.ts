import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IRole extends Document {
  role_id: string;
  role_name: string;
  permissions?: string[];
}

const RoleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
    enum: ['User', 'Trainer', 'Coach', 'Admin'],
  },
  permissions: {
    type: [String],
  },
});

const Role = model<IRole>('Role', RoleSchema);
export { RoleSchema, Role, IRole };
