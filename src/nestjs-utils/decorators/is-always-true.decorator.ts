import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsAlwaysTrue(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isAlwaysTrue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be true`;
        },
      },
    });
  };
}
