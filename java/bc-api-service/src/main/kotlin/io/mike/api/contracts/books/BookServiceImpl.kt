package io.mike.api.contracts.books

import io.mike.api.contracts.books.support.BookExtendedResponse
import io.mike.foundation.service.ResponseBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class BookServiceImpl : ResponseBuilder<BookExtendedResponse>(BookExtendedResponse::class.java), BookService {

    @Autowired
    override lateinit var repository: BookRepository
}