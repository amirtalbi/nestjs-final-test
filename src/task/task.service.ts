import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        return this.tasksRepository.save({ name, userId, priority });
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.tasksRepository.findOne({ where: { name } });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({ where: { userId } });
    }

    async resetData(): Promise<void> {
        return this.tasksRepository.clear();
    }
}
