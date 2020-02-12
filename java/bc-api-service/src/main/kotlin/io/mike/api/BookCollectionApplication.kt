package io.mike.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.reactive.config.EnableWebFlux

@EnableWebFlux
@SpringBootApplication(scanBasePackages = [
    "io.mike.api",
    "io.mike.foundation"
])
class BookCollectionApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<BookCollectionApplication>(*args)
        }
    }
}