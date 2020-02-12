package io.mike.api.contracts.books.authors.support

import java.util.*
import javax.validation.constraints.NotEmpty

class BookAuthorChangeRequest {

    @NotEmpty
    var authorIds: Set<UUID> = emptySet()
}