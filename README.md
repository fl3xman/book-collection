
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

## 2. Typescript

### 2.1 Requirements

* Node 12

### 2.2 Supported Platforms

* IDE (locally)

### 2.3 Installation/Run


### 2.4 Database

In-memory *sqlite*.

### 2.5 Project structure

Project structure follows folders separated via business logic eg. `/contracts/*`.


## References

* [Reactor](https://projectreactor.io)
* [WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html)

