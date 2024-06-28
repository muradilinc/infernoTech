import {
  Body,
  Controller,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  async register(@Body() registerDto: CreateUserDto) {
    try {
      const { email, password, name } = registerDto;
      const user = new this.userModel({
        email,
        password,
        displayName: name,
      });
      user.generateToken();
      await user.save();
      return {
        message: 'User registered!',
      };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return {
      message: 'Email and password are correct!',
      user: req.user,
    };
  }
}
