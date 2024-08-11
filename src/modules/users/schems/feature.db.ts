import { User, UserSchema } from './user';
import { Role, RoleSchema } from './role';

export default [
  { name: User.name, schema: UserSchema },
  { name: Role.name, schema: RoleSchema },
];
