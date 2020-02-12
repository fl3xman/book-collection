package io.mike.foundation.service

import io.mike.foundation.repository.PageResponse
import org.springframework.data.domain.Page

interface ResponseProvider<Output> {

    fun <Input> Input.toResponse(): Output
    fun <Input> Page<Input>.toPageResponse(): PageResponse<Output>
}