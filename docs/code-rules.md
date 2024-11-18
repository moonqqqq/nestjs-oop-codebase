# OOP management

## Getter, Setter
We dont use Setter on any objects(DTO, Domain Model, etc.) 
but we use Getter on DTO, and Repository layer. it is because blocking Getter on every place makes writing code too cumbersome.
We only blocking using getter on service layer.

## Domain model's fields start with _(underscore)
Domain Model's variable's name starts with _(underscore). you can check "user.domain.ts". To prevent other developers from using setter, getter on service layer. 