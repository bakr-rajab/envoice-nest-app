import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../../entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private readonly clientRepo: Model<ClientDocument>) { }

    getAll() {
    const clients = this.clientRepo.find({});
        return clients;
    }

    getOne(id: string){
        const client = this.clientRepo.findOne({_id : id});
        return client;
    }

    create

    // functions
}
