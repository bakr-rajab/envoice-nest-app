import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Types } from 'mongoose';
import { JwtUser } from '../../guards/jwt.strategy';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,

  ) { }

  // async logout(user: JwtUser): Promise<boolean> {
  //   switch (user.role) {
  //     case WinchRoles.admin:
  //     case WinchRoles.dispatcher:
  //     case WinchRoles.staff:
  //     case WinchRoles.temp_staff:
  //       await this.staffService.StaffModel.findByIdAndUpdate(user._id, { $set: { online: false } }).exec()
  //       break;
  //     case WinchRoles.driver:
  //     case WinchRoles.temp_driver:
  //       await this.driverService.DriverModel.findByIdAndUpdate(user._id, { $set: { online: false } }).exec()
  //       break;
  //     default:
  //       await this.userService.UserModel.findByIdAndUpdate(user._id, { $set: { online: false } }).exec()
  //       break;
  //   }
  //   return true;
  // }

  // async userLogin(user: LoginDto, i18n: I18nContext) {
  //   const userDb = await this.userService.findOneSelect({ phone: user.phone }, '+password')
  //   if (!userDb) {
  //     throw new UnauthorizedException('invalid user');
  //   }

  //   if (!await userDb.checkPassword(user.password)) {
  //     throw new UnauthorizedException('invalid user');
  //   }
  //   // if (userDb.online) {
  //   //   throw new UnauthorizedException('"You are logged in from other device, Please Logout First"');
  //   // }

  //   this.userService.UserModel.findByIdAndUpdate(userDb._id, {
  //     $set: {
  //       online: true,
  //       lastOnlineTime: Date.now()
  //     }
  //   }).exec()

  //   userDb.lang = user.lang;
  //   await userDb.save();
  //   userDb.password = undefined; // remove the password
  //   let payload: TokenDto;
  //   payload = {
  //     _id: userDb._id,
  //     username: userDb.username,
  //     role: WinchRoles.user
  //   }
  //   userDb.password = undefined; // remove the password
  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       user: userDb, token: this.jwtService.sign(payload)
  //     }
  //   }

  // }



  // async userRegister(user: RegisterDto, i18n: I18nContext) {

  //   const userDb = await this.userService.save({
  //     ...user, online: true,
  //     lastOnlineTime: Date.now()
  //   });
  //   let payload: TokenDto;
  //   payload = {
  //     _id: userDb._id,
  //     username: userDb.username,
  //     role: WinchRoles.user
  //   }


  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       user: userDb, token: this.jwtService.sign(payload)
  //     }
  //   }
  // }



  // async driverLogin(user: LoginDto, i18n: I18nContext) {

  //   const userDb = await this.driverService.findOneSelect({ phone: user.phone }, "+password");

  //   if (!userDb) {
  //     throw new UnauthorizedException('invalid user');
  //   }
  //   if (!await userDb.checkPassword(user.password)) {
  //     throw new UnauthorizedException('invalid user');
  //   }
  //   // if (userDb.online) {
  //   //   throw new UnauthorizedException('"You are logged in from other device, Please Logout First"');
  //   // }
  //   this.driverService.DriverModel.findByIdAndUpdate(userDb._id, {
  //     $set: {
  //       online: true,
  //       lastOnlineTime: Date.now()
  //     }
  //   }).exec()

  //   // remove the password
  //   userDb.lang = user.lang;
  //   await userDb.save();
  //   userDb.password = undefined;
  //   let payload: TokenDto;
  //   payload = {
  //     _id: userDb._id,
  //     username: userDb.username,
  //     role: WinchRoles.driver
  //   }
  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       user: userDb, token: this.jwtService.sign(payload)
  //     }
  //   }
  // }


  // async driverRegister(driver: CreateDriverDto, i18n: I18nContext) {
  //   //TODO bycrypt store password
  //   // try {
  //   let driverDb = await this.driverService.save({
  //     ...driver, online: true,
  //     lastOnlineTime: Date.now()
  //   });

  //   let payload: TokenDto;
  //   payload = {
  //     _id: driverDb._id,
  //     username: driverDb.username,
  //     role: WinchRoles.driver
  //   }
  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       driver: driverDb, token: this.jwtService.sign(payload)
  //     }
  //   }
  //   // } catch (error) {
  //   //   throw new NotFoundException(error);
  //   // }

  // }

  // async staffLogin(user: LoginDto, i18n: I18nContext) {
  //   const userDb = await this.staffService.findOneSelect({
  //     $or: [
  //       // user?.email ? { email: user.email }:{phone: user.phone},
  //       { phone: user.phone ?? "null" },
  //       { email: user.email ?? "null" }
  //     ]
  //   }, '+password')

  //   if (!userDb) {
  //     return {
  //       status: false,
  //       message: i18n.t('errors.invalidUser'),

  //     }
  //   }
  //   // if (userDb.online) {
  //   //   throw new UnauthorizedException('"You are logged in from other device, Please Logout First"');
  //   // }

  //   if (!await userDb.checkPassword(user.password)) {
  //     return {
  //       status: false,
  //       message: i18n.t('errors.invalidUser'),

  //     }
  //   }



  //   this.staffService.StaffModel.findByIdAndUpdate(userDb._id, {
  //     $set: {
  //       online: true,
  //       lastOnlineTime: Date.now()
  //     }
  //   }).exec()

  //   userDb.lang = user.lang;
  //   await userDb.save();
  //   userDb.password = undefined; // remove the password
  //   let payload: TokenDto;
  //   payload = {
  //     _id: userDb._id,
  //     username: userDb.username,
  //     role: userDb.role
  //   }
  //   /** subscribe to topic */
  //   if (user.fcmToken) {

  //     /** subscribe to topic admin */
  //     if (userDb.role == 'admin') {
  //       this.notificationService.subscribeToTopic(`admin`, user.fcmToken)
  //     }

  //     this.notificationService.subscribeToTopic(`staff_${userDb._id}`, user.fcmToken)

  //   }




  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       user: userDb, token: this.jwtService.sign(payload)
  //     }
  //   }
  // }
  // async staffLoginByToken(id: string, i18n: I18nContext) {
  //   const userDb = await this.staffService.findOneSelect({
  //     _id: new Types.ObjectId(id)
  //   }, '+password')

  //   if (!userDb) {
  //     return {
  //       status: false,
  //       message: i18n.t('errors.invalidUser'),

  //     }
  //   }





  //   userDb.password = undefined; // remove the password
  //   let payload: TokenDto;
  //   payload = {
  //     _id: userDb._id,
  //     username: userDb.username,
  //     role: userDb.role
  //   }




  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       user: userDb, token: this.jwtService.sign(payload)
  //     }
  //   }
  // }
  // async staffRegister(staff: RegisterDto, i18n: I18nContext) {
  //   //TODO bycrypt store password
  //   // return this.staffService.save(staff);
  //   let staffDb = await this.staffService.save(staff);

  //   let payload: TokenDto;
  //   payload = {
  //     _id: staffDb._id,
  //     username: staffDb.username,
  //     role: WinchRoles.staff
  //   }
  //   return {
  //     status: true,
  //     message: i18n.t('messages.success'),
  //     data: {
  //       staff: staffDb, token: this.jwtService.sign(payload)
  //     }
  //   }

  // }

  // async authenticate(
  //   userDb: User | Staff | Driver,
  //   user: LoginDto,
  //   role: WinchRoles,
  // ) {
  //   if (userDb) {
  //     //TODO bycrypt paassword
  //     if (user.password === userDb.password) {
  //       return {
  //         ...userDb['_doc'],
  //         ...(await this.generateToken(userDb._id, role)),
  //       };
  //     } else {
  //       throw new UnauthorizedException();
  //     }
  //   } else {
  //     throw new NotFoundException();
  //   }
  // }


}
