import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './../../dtos/create-user.dto';
import { User, UserDocument } from './../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto)



    }
}