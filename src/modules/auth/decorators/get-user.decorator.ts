import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
   (data: string, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      const user = req.user;

      if (!user)
         throw new InternalServerErrorException('User not found - make sure that the AuthGuard is used before GetUser Decorator');

      return (!data)
         ? user
         : user[data];
   }
)