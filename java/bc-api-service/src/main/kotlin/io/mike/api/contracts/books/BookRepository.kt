package io.mike.api.contracts.books

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface BookRepository : JpaRepository<Book, UUID>, JpaSpecificationExecutor<Book>
