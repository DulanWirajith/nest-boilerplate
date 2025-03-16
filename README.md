# Nest Boilerplate

A boilerplate project for building a backend projects using Nest.js.

## Description

Nest Boilerplate is a comprehensive solution for rapidly developing APIs to manage within your organization. It leverages the power of Nest.js, a progressive Node.js framework, to provide a robust and scalable architecture for your backend services. With built-in support for authentication, data validation, logging, and more, Nest Boilerplate accelerates your development process while ensuring code quality and maintainability.

Key features include:

- **Modular Design**: Easily extend and customize functionality with Nest.js modules.
- **Dependency Injection**: Utilize Nest.js's dependency injection system for clean and maintainable code.
- **Swagger Integration**: Automatically generate API documentation with Swagger.
- **Testing Support**: Built-in support for unit tests, end-to-end tests, and test coverage reports.
- **Environment Configuration**: Manage environment-specific configuration using .env files.
- **Linting and Formatting**: Enforce code style and formatting standards with ESLint and Prettier.

---
## Installation

```bash
$ pnpm install
```

---
## Running the app

### Locally

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
### Using Docker
Build and run the Docker container for development:

```bash
# build
$ docker build -t my-app -f .docker/dev-env.Dockerfile .

# run
$ docker run -p 4000:4000 my-app
```

Build and run the Docker container for production:

```bash
# build
$ docker build -t my-app -f .docker/prod-env.Dockerfile .

# run
$ docker run -p 4000:4000 my-app
```

### Using Docker Compose
Build and run the Docker container:
```bash
# build and run
$ docker-compose up
```

--- 
## Swagger API Documentation
The Swagger API documentation is automatically generated and can be accessed at `/api-doc` on your server. The title, description, version, and tag for the Swagger documentation can be configured using the `SWAGGER_TITLE`, `SWAGGER_DESCRIPTION`, `SWAGGER_VERSION`, and `SWAGGER_TAG` environment variables, respectively.

---
## Rate Limiting
The rate of requests to the server can be controlled using the `THROTTLE_LIMIT` environment variable. This is useful for preventing abuse and ensuring fair usage of your API.

---
## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
---
## Configuration and Validation

Here's how you can use the `ConfigService` and add new environment variables in your application:

### Using ConfigService

The `ConfigService` is used to access the environment variables in your application. Here's an example of how to use it:
```
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

someMethod() {
  const port = this.configService.get<number>('PORT');
  // use the port variable
}
```

### Adding New Environment Variables

To add a new environment variable, follow these steps:
1. Add the new variable to your `.env` file:
```
NEW_VARIABLE = value
```

2. Update the `EnvironmentVariables` class in `src/utils/config/dto/environment-variables.dto.t`s to include the new variable:
```
class EnvironmentVariables {
  // existing variables...

  @IsString()
  NEW_VARIABLE: string;
}
```

3. Use the `ConfigService` to access the new variable in your application:

```
const newVariable = this.configService.get<string>('NEW_VARIABLE');
```

### Validation
For validation, you can use decorators from the `class-validator` package. For example, if your new variable is a number and should be within a certain range, you can use the `@IsNumber()`, `@Min()`, and `@Max()` decorators:

```
class EnvironmentVariables {
  // existing variables...

  @IsNumber()
  @Min(1)
  @Max(100)
  NEW_VARIABLE: number;
}
```

This will ensure that `NEW_VARIABLE` is a number between 1 and 100. If the validation fails, the application will not start and an error message will be logged.

If you want to add a `default value` to `NEW_VARIABLE` in the `EnvironmentVariables` class, you can simply assign a value to it in the class definition. Here's how you can do it:

```
class EnvironmentVariables {
  // existing variables...

  @IsNumber()
  @Min(1)
  @Max(100)
  NEW_VARIABLE: number = 10;
}
```

In this example, if `NEW_VARIABLE` is not set in the `environment variables(.env file)`, it will default to `10`.

---

## Committing without running pre-commit hook
```
git commit -m 'commit message' --no-verify
```

## Committing using commitizen package
commitizen package helps to work with conventional commits

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

```
git cz
```