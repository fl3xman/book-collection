package io.mike.api.contracts.books

import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.foundation.repository.PageResponse
import io.mike.foundation.repository.SearchPageRequestParams
import io.mike.foundation.service.CrudService
import java.util.*

interface BookService : CrudService<Book, UUID, BookRepository, BookExtendedResponse> {

    fun find(params: SearchPageRequestParams): PageResponse<BookExtendedResponse> = find(params, setOf("title", "description"))
}