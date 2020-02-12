package io.mike.api.contracts.authors.support

import io.mike.api.contracts.books.support.BookResponse

class AuthorExtendedResponse : AuthorResponse() {

    var books: List<BookResponse> = emptyList()
}