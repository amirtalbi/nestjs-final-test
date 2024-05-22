import {
    BadRequestException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntWithPositiveValuePipe implements PipeTransform {
    transform(value: string) {
        const val = parseInt(value, 10);
        if (isNaN(val) || val < 0) {
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid user ID',
                data: null,
            });
        }
        return val;
    }
}
