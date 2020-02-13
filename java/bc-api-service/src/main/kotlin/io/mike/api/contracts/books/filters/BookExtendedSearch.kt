package io.mike.api.contracts.books.filters

import io.mike.api.contracts.authors.Author
import io.mike.api.contracts.books.Book
import io.mike.foundation.repository.SearchPageRequestParams
import org.springframework.data.jpa.domain.Specification





fun applyBookSearchFilter(
        params: SearchPageRequestParams,
        bookAttributes: Set<String> = emptySet(),
        authorAttributes: Set<String> = emptySet()
): Specification<Book> = Specification { root, _, builder ->
    params.search?.let { term ->
        val related = root.joinList<Book, Author>("authors")
        builder.or(
                *bookAttributes.map { builder.like(builder.lower(root.get(it)), "%$term%".toLowerCase()) }.toTypedArray(),
                *authorAttributes.map { builder.like(builder.lower(related.get(it)), "%$term%".toLowerCase()) }.toTypedArray()
        )
    }
}