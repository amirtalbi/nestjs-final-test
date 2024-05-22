import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        if (!name || !userId || !priority) {
            throw new HttpException(
                'Invalid task data',
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.tasksRepository.save({ name, userId, priority });
    }

    async getTaskByName(name: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { name } });
        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return task;
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        if (!userId) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }
        return this.tasksRepository.find({ where: { userId } });
    }

    async resetData(): Promise<void> {
        return this.tasksRepository.clear();
    }
}
