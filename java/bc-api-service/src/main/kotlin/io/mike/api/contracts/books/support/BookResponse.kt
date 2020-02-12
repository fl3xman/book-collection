package io.mike.api.contracts.books.support

import com.fasterxml.jackson.annotation.JsonFormat
import io.mike.foundation.mapper.DateFormat
import java.time.LocalDateTime
import java.util.*

open class BookResponse {
    var id: UUID? = null
    var title: String = ""
    var description: String = ""

    @JsonFormat(pattern = DateFormat.ISO_8601)
    var createdAt: LocalDateTime? = null

    @JsonFormat(pattern = DateFormat.ISO_8601)
    var updatedAt: LocalDateTime? = null
}