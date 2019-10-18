import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
})
export class AuthModule {}
