package io.mike.api.contracts.authors

import io.mike.api.contracts.authors.support.AuthorExtendedResponse
import io.mike.api.contracts.authors.support.AuthorRequest
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.api.contracts.books.support.BookResponse
import io.mike.foundation.repository.PageResponse
import io.mike.foundation.repository.SearchPageRequestParams
import io.mike.foundation.service.CrudService
import java.util.*

interface AuthorService : CrudService<Author, UUID, AuthorRepository, AuthorExtendedResponse> {

    fun create(input: AuthorRequest): AuthorExtendedResponse = create(input, Author::class.java)

    fun find(params: SearchPageRequestParams): PageResponse<AuthorExtendedResponse> = find(params, setOf("name"))
    fun findAuthorBooks(authorId: UUID): PageResponse<BookResponse> {
        val books = findOne(authorId).books
        return PageResponse(books, null, books.count().toLong())
    }
}