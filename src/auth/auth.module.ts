import { JwtStrategy } from './jwt.strategy';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
