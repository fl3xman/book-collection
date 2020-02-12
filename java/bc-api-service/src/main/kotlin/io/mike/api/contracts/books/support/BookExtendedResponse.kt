package io.mike.api.contracts.books.support

import io.mike.api.contracts.authors.support.AuthorResponse

class BookExtendedResponse : BookResponse() {

    var authors: List<AuthorResponse> = emptyList()
}