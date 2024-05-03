import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.usersRepository.save({
            ...createUserDto,
            password: hashedPassword,
        });
    }

    async getUser(email: string): Promise<unknown> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async resetData(): Promise<void> {
        await this.usersRepository.clear();
    }
}
