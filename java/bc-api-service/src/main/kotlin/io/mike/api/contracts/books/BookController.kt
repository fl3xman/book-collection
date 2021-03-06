/*
 *   Copyright (c) 2020 mike.grman@gmail.com
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

package io.mike.api.contracts.books

import io.mike.api.contracts.books.authors.BookAuthorService
import io.mike.api.contracts.books.authors.support.BookAuthorChangeRequest
import io.mike.api.contracts.books.authors.support.BookAuthorRequest
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.api.contracts.books.support.BookRequest
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
        path = ["/books"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
)
class BookController {

    @Autowired
    private lateinit var bookService: BookService

    @Autowired
    private lateinit var bookAuthorService: BookAuthorService

    // Default CRUD

    @GetMapping
    fun find(@Valid params: SearchPageRequestParams): Mono<PageResponse<BookExtendedResponse>> = bookService.findExtended(params).toMono()

    @GetMapping(path = ["/{id}"])
    fun findOne(@PathVariable id: UUID): Mono<BookExtendedResponse> = bookService.findOne(id).toMono()

    @DeleteMapping(path = ["/{id}"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: UUID): Mono<Unit> = bookService.delete(id).toMono()

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun create(
            @Validated(Create::class) @RequestBody input: BookAuthorRequest
    ): Mono<BookExtendedResponse> = bookAuthorService.createBookWithAuthors(input).toMono()

    @PatchMapping(path = ["/{id}"], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun update(
            @PathVariable id: UUID,
            @Validated(Update::class) @RequestBody input: BookRequest
    ): Mono<BookExtendedResponse> = bookService.update(id, input).toMono()

    // Custom CRUD

    @PostMapping(path = ["/{id}/authors"], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun addAuthor(
            @PathVariable id: UUID,
            @Validated @RequestBody input: BookAuthorChangeRequest
    ): Mono<BookExtendedResponse> = bookAuthorService.addAuthors(id, input).toMono()


    @DeleteMapping(path = ["/{id}/authors"], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun removeAuthor(
            @PathVariable id: UUID,
            @Validated @RequestBody input: BookAuthorChangeRequest
    ): Mono<BookExtendedResponse> = bookAuthorService.removeAuthors(id, input).toMono()
}