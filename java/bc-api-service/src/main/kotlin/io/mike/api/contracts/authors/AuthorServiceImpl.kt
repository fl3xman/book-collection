package io.mike.api.contracts.authors

import io.mike.api.contracts.authors.support.AuthorExtendedResponse
import io.mike.foundation.service.ResponseBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class AuthorServiceImpl : ResponseBuilder<AuthorExtendedResponse>(AuthorExtendedResponse::class.java), AuthorService {

    @Autowired
    override lateinit var repository: AuthorRepository
}
