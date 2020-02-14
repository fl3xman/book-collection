
Book Collection: API services
======================================

Set of APIs for accessing the book collection test project.

Projects:
1. Java/Kotlin based
2. Typescript

## 1. Java/Kotlin

### 1.1 Requirements

* Intellij CE 2019.1+ (Only for IDE run)
* Java 1.8+ (OpenJDK 11+)
* Gradle

### 1.2 Supported Platforms

* IDE (locally)

### 1.3 Installation/Run

Run the main method and embedded Netty server will start according to the configuration.
Set spring *profile* to `local` in your IDE. For example, in IntelliJ, you can set your profile in Run Configurations.

```
Run -> Edit Configuration -> Kotlin -> BookCollectionApplication
```

Set the VM options in IDE in case `local`.

```
-Dspring.profiles.active=local
```

or run it via shell

```
SPRING_PROFILES_ACTIVE=local gradle bc-api-service:clean bc-api-service:bootRun
```

### 1.4 Database

In-memory *H2*.

### 1.5 Project structure

Project structure follows folders separated via business logic eg. `io.mike.api.contracts.*`.

Dependencies:
* spring boot webflux - provides full server bootstrap in reactive (WebFlux, Reactor).
* model-mapper - provides easy way to map DTO to domain and vice-versa.


## 2. Typescript

### 2.1 Requirements

* Node.js 12+
* Npm 6+

### 2.2 Supported Platforms

* IDE (locally)

### 2.3 Installation/Run


Install and run with following commands:

```
npm i
npm start
```

### 2.4 Database

In-memory *sqlite*.

### 2.5 Project structure

Project structure follows folders separated via business logic eg. `/contracts/*`.

Dependencies:
* hapi - provides server bootstrap
* inversify - provides IoC container, to help manage dependencies, acts as service reslover.
* sequelize - provides domain modeling

## References

* [Reactor](https://projectreactor.io)
* [WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html)
* [ModelMapper](http://modelmapper.org)
* [Hapi](https://hapi.dev)
* [Inversify](http://inversify.io)
* [Sequelize](https://sequelize.org)

