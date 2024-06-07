import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsYYYYMMDD(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isYYYYMMDD',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return `${validationArguments.property} must be a valid date format (YYYY-MM-DD)`;
        },
      },
    });
  };
}
