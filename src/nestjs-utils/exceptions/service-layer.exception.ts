/**
 * all the exception below catched by ServiceLayerExceptionToHttpExceptionFilter
 */

import { BaseException } from './base.exception';

export abstract class ServiceLayerException extends BaseException {}

// Do not makes it have the same name with nest.js built-in exception name
export abstract class AuthenticationException extends ServiceLayerException {}
export abstract class AuthorizationException extends ServiceLayerException {}
export abstract class BadInputException extends ServiceLayerException {}
export abstract class DuplicateException extends ServiceLayerException {}

// Authentication
export class NotMatchedOtp extends AuthenticationException {}
export class VerificationExpired extends AuthenticationException {}
export class OtpMaxTryExceed extends AuthenticationException {}

// Authorization
export class NotMyProject extends AuthorizationException {}
export class NoAuthorityToThisCompany extends AuthorizationException {}

// Bad Request
export class WrongLoginCredential extends BadInputException {}
export class NotExistingUser extends BadInputException {}
export class WrongProjectId extends BadInputException {}

// Conflict
export class AlreadyExistingCompany extends DuplicateException {}
export class UserAlreadyExists extends DuplicateException {}
