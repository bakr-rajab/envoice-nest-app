import { UserService } from './user.service';
import { User, UserDocument } from './../../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Controller } from '@nestjs/common';
import { Model } from 'mongoose';

@Controller('user')
export class UserController {
    constructor(private readonly clientService: UserService) {}
}
