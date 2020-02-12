package io.mike.api.contracts.books.authors.support

import io.mike.api.contracts.books.support.BookRequest
import java.util.*
import javax.validation.constraints.NotEmpty

class BookAuthorRequest : BookRequest() {

    @NotEmpty
    var authorIds: Set<UUID> = emptySet()
}