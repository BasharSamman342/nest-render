import { Injectable, SetMetadata } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';

export function SamePassword(validationOptions?: ValidationOptions) {
  return function (object: any, propName: string) {
    registerDecorator({
      name: 'SamePassword',
      target: object.constructor,
      propertyName: propName,
      options: validationOptions,
      validator: SamePasswordRule,
    });
  };
}
@ValidatorConstraint({ name: 'SamePassword' })
@Injectable()
export class SamePasswordRule implements ValidatorConstraintInterface {
  constructor(private i18nService: I18nService) {}

  validate(value: any, validationArguments?: ValidationArguments): boolean {
    if (validationArguments.object['password'] !== value) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return this.i18nService.t('validations.password_not_same');
  }
}
