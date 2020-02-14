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