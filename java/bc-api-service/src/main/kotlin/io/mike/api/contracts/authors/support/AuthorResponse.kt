package io.mike.api.contracts.authors.support

import com.fasterxml.jackson.annotation.JsonFormat
import io.mike.foundation.mapper.DateFormat
import java.time.LocalDateTime
import java.util.*

open class AuthorResponse {
    var id: UUID? = null
    var name: String = ""

    @JsonFormat(pattern = DateFormat.ISO_8601)
    var createdAt: LocalDateTime? = null

    @JsonFormat(pattern = DateFormat.ISO_8601)
    var updatedAt: LocalDateTime? = null
}