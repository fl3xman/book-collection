package io.mike.api.configurations

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.mike.api.contracts.authors.Author
import io.mike.api.contracts.authors.support.AuthorExtendedResponse
import io.mike.api.contracts.authors.support.AuthorRequest
import io.mike.api.contracts.authors.support.AuthorResponse
import io.mike.api.contracts.books.Book
import io.mike.api.contracts.books.authors.support.BookAuthorRequest
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.api.contracts.books.support.BookRequest
import io.mike.api.contracts.books.support.BookResponse
import io.mike.foundation.domain.Auditable
import org.modelmapper.Conditions
import org.modelmapper.ModelMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MappingConfig {

    @Bean
    fun objectMapper(): ObjectMapper = ObjectMapper().apply {
        registerModule(JavaTimeModule())
        enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
    }

    @Bean
    fun modelMapper(): ModelMapper = ModelMapper().apply {
        configuration.propertyCondition = Conditions.isNotNull()
        // configuration.matchingStrategy = MatchingStrategies.STRICT

        // Author
        createTypeMap(AuthorRequest::class.java, Author::class.java).include(Auditable::class.java)
        createTypeMap(Author::class.java, AuthorResponse::class.java)
        createTypeMap(Author::class.java, AuthorExtendedResponse::class.java).setPostConverter { ctx ->
            ctx.destination.also {
                it.books = ctx.source.books.map { book -> this.map(book, BookResponse::class.java) }
            }
        }

        // Book
        createTypeMap(BookRequest::class.java, Book::class.java).include(Auditable::class.java)
        createTypeMap(Book::class.java, BookResponse::class.java)
        createTypeMap(Book::class.java, BookExtendedResponse::class.java).setPostConverter { ctx ->
            ctx.destination.also {
                it.authors = ctx.source.authors.map { author -> this.map(author, AuthorResponse::class.java) }
            }
        }

        // Book & Author
        createTypeMap(BookAuthorRequest::class.java, Book::class.java).include(Auditable::class.java)
    }
}