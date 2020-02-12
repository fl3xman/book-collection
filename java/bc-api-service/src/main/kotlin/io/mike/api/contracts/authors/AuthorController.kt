package io.mike.api.contracts.authors

import io.mike.api.contracts.authors.support.AuthorExtendedResponse
import io.mike.api.contracts.authors.support.AuthorRequest
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.api.contracts.books.support.BookResponse
import io.mike.foundation.repository.PageResponse
import io.mike.foundation.repository.SearchPageRequestParams
import io.mike.foundation.validation.groups.Create
import io.mike.foundation.validation.groups.Update
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import java.util.*
import javax.validation.Valid

@RestController
@RequestMapping(
        path = ["/authors"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
)
class AuthorController {

    @Autowired
    private lateinit var authorService: AuthorService

    // Default CRUD

    @GetMapping
    fun find(@Valid params: SearchPageRequestParams): Mono<PageResponse<AuthorExtendedResponse>> = authorService.find(params).toMono()

    @GetMapping(path = ["/{id}"])
    fun findOne(@PathVariable id: UUID): Mono<AuthorExtendedResponse> = authorService.findOne(id).toMono()

    @DeleteMapping(path = ["/{id}"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: UUID): Mono<Unit> = authorService.delete(id).toMono()

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun create(
            @Validated(Create::class) @RequestBody input: AuthorRequest
    ): Mono<AuthorExtendedResponse> = authorService.create(input).toMono()

    @PatchMapping(path = ["/{id}"], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun update(
            @PathVariable id: UUID,
            @Validated(Update::class) @RequestBody input: AuthorRequest
    ): Mono<AuthorExtendedResponse> = authorService.update(id, input).toMono()

    // Custom CRUD

    @GetMapping(path = ["/{id}/books"])
    fun findAuthorBooks(@PathVariable id: UUID): Mono<PageResponse<BookResponse>> = authorService.findAuthorBooks(id).toMono()
}