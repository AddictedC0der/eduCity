import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Exception to throw when something going wrong with validation.
 */
export class ValidationExpection extends HttpException {
    messages
    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST)
        this.messages = response
    }
}

/**
 * Converts plain input into spacific type and validates it.
 */
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length) {
            const messages = errors.map(e => `${e.property}: ${Object.values(e.constraints).join(', ')})`)
            throw new ValidationExpection(messages)
        }
    }
}