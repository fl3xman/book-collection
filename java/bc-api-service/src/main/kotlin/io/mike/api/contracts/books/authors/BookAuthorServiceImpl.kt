package io.mike.api.contracts.books.authors

import io.mike.api.contracts.authors.AuthorRepository
import io.mike.api.contracts.books.BookRepository
import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.foundation.service.ResponseBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class BookAuthorServiceImpl : ResponseBuilder<BookExtendedResponse>(BookExtendedResponse::class.java), BookAuthorService {

    @Autowired
    override lateinit var authorRepository: AuthorRepository

    @Autowired
    override lateinit var bookRepository: BookRepository

}
