import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.seller) {
      return true;
    }
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
