import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/userRole.enum';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/userType.enum';

export type UserDocument = User & Document;

export class Address {
    @Prop()
    @ApiProperty()
    branchID: string
    @Prop()
    @ApiProperty()
    country: string
    @Prop()
    @ApiProperty()
    governate: string
    @Prop()
    @ApiProperty()
    regionCity: string
    @Prop()
    @ApiProperty()
    street: string
    @Prop()
    @ApiProperty()
    buildingNumber: string
    @Prop()
    @ApiProperty()
    postalCode: string
    @Prop()
    @ApiProperty()
    floor: string
    @Prop()
    @ApiProperty()
    landmark: string
    @Prop()
    @ApiProperty()
    additionalInformation: string
}

@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class User extends OBaseEntity {
    @ApiProperty()
    @Prop({})
    name: string;

    @ApiProperty()
    @Prop({})
    email: string;

    @ApiProperty()
    @Prop({})
    password: string;

    @ApiProperty()
    @Prop({})
    tax_number: number;
    
    @ApiProperty()
    @Prop({})
    activityCode: number;

    @ApiProperty()
    @Prop({})
    phone: string

    @ApiProperty()
    @Prop({})
    clientId: string

    @ApiProperty()
    @Prop({})
    clientSecret: string

    @ApiProperty()
    @Prop({})
    client_secret: string
    
    @ApiProperty()
    @Prop({})
    address: Address
  
    @ApiProperty()
    @Prop({default:UserType.Busniss})
    type: string

    @ApiProperty()
    @Prop({ enum: [UserRole.USER, UserRole.ADMIN, UserRole.SUBUSER], default: UserRole.USER })
    role: string;

    async checkPassword(candidatePassword: string) {
        return bcrypt.compare(candidatePassword, this.password);
    };
}

export const UserSchema = SchemaFactory.createForClass(User);

// hash password pre save user
UserSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword
    }

    next();
});

// UserSchema.pre('updateOne', async function (next) {
//     let user = this;
//     if (user?._update.password) {
//         const salt = await bcrypt.genSalt(10);
//         let hashedPassword = await bcrypt.hash(user._update.password, salt);
//         user._update.password = hashedPassword
//     }
//     next();
// });

UserSchema.loadClass(User);