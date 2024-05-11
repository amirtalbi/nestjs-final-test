import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<User> {
        return await this.usersRepository.save({ email });
    }

    async getUser(email: string): Promise<unknown> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async resetData(): Promise<void> {
        await this.usersRepository.clear();
    }
}
