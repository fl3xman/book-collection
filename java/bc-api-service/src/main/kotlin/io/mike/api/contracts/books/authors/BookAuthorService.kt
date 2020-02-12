package io.mike.api.contracts.books.authors

import io.mike.api.contracts.authors.AuthorRepository
import io.mike.api.contracts.books.Book
import io.mike.api.contracts.books.BookRepository
import io.mike.api.contracts.books.addAuthors
import io.mike.api.contracts.books.authors.support.BookAuthorChangeRequest
import io.mike.api.contracts.books.authors.support.BookAuthorRequest
import io.mike.api.contracts.books.removeAuthors
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.foundation.service.DelegatedCrudService
import java.util.*

interface BookAuthorService : DelegatedCrudService<BookExtendedResponse> {

    val authorRepository: AuthorRepository
    val bookRepository: BookRepository

    fun createBook(input: BookAuthorRequest): BookExtendedResponse {
        val book = mergeClass(input, Book::class.java).also { it.addAuthors(findEntities(authorRepository, input.authorIds)) }
        return bookRepository.save(book).toResponse()
    }

    fun addAuthors(bookId: UUID, input: BookAuthorChangeRequest): BookExtendedResponse {
        val book = findEntity(bookRepository, bookId).also { it.addAuthors(findEntities(authorRepository, input.authorIds)) }
        return bookRepository.save(book).toResponse()
    }

    fun removeAuthors(bookId: UUID, input: BookAuthorChangeRequest): BookExtendedResponse {
        val book = findEntity(bookRepository, bookId).also { it.removeAuthors(findEntities(authorRepository, input.authorIds)) }
        return bookRepository.save(book).toResponse()
    }
}