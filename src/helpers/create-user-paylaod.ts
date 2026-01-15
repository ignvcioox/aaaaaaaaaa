import { User } from '@modules/users/entities/user.entity';

export const createUserPayload = (user: User) => ({
   sub: user.id,
   email: user.email,
   roles: user.roles,
});