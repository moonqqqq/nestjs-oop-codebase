Each module will have below files/directory.

## 1. Controller.ts
Handler for req, res

## 2. Service.ts - Application service layer
Determine the responsibility of a function based on the transaction. (Divide functions according to transaction criteria.)

## 3. Domain.ts - Business Logic
Business Logic is here

## 4. Repository - Database access layer
1. Only for database related code. **Not business logic**
2. The functions on repository Shouldn't throw exceptions not to make the limitation usability
3. Just have few functions like CRUD. (OOP style code usually has only 3 functions, [save, delete, find])

## 5. DTO
It used mainly on the Service layer. and Controller layer.

Service layer has input/output DTO. and if the controller needs same type of DTO, it can use.
validation, sanitization, type change, etc..

**When writing code, you might want to reuse similar-looking DTOs. However, despite their similar structure, each DTO represents a distinct object and should be treated as such. Attempting to reuse them can ultimately make the code more complex.**

## 6. VO
Value Object