# How to write code with OOP style

Don't need to be much strict on OOP. Just follow basic concepts of OOP, DDD.

1. Repository layer only do simple CRUD features. It doesn't have business logics.

2. Domain object is for business logics.

3. If it is unclear which domain have some feature, create a domain service and pass it to domain function as parameter. Or use domain service which have domains as parameter.

