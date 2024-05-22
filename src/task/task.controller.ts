import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ParseIntWithPositiveValuePipe } from './validator/ParseIntWithPositiveValue.pipe';

@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        try {
            const data = await this.taskService.addTask(
                createTaskDto.name,
                createTaskDto.userId,
                createTaskDto.priority,
            );
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Task created successfully',
                data,
            };
        } catch (error) {
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Missing required fields',
                data: null,
            });
        }
    }

    @Get(':name')
    @UsePipes(ValidationPipe)
    async getTaskByName(@Param('name') name: string): Promise<Task> {
        return this.taskService.getTaskByName(name);
    }

    @Get('user/:userId')
    @UsePipes(ValidationPipe)
    async getUserTasks(
        @Param('userId', ParseIntWithPositiveValuePipe) userId: number,
    ): Promise<Task[]> {
        try {
            return await this.taskService.getUserTasks(userId);
        } catch (error) {
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid user ID',
                data: null,
            });
        }
    }

    @Post('clear')
    async resetData(): Promise<void> {
        return this.taskService.resetData();
    }
}
