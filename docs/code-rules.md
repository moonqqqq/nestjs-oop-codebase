# OOP management

## Getter, Setter
We dont use Setter on any objects(DTO, Domain Model, etc.) 
but we use Getter on DTO, and Repository layer. it is because blocking Getter on every place makes writing code too cumbersome.
We only blocking using getter on service layer.

## Domain model's fields start with _(underscore)
Domain Model's variable's name starts with _(underscore). you can check "user.domain.ts". To prevent other developers from using setter, getter on service layer. 

# Test code
We write test code at least on the service and domain layers.

The important points are below.
- We should not test implementation.
- We should test the result of the function.

# Using interfaces
when the module is depense on third party library, we should use interface/abstract class. and inject it on the module.
```ts
@Module({
  imports: [WinstomSettingModule],
  providers: [
    {
      provide: ILoggerService,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
```

# Prisma
We chosse prisma as ORM. it is also third party library. but we use too many types that prisma provides. so we do not use interface/abstract class on prisma.
If we use interfaces and mappings for things prisma provides, it is too cumbersome.
