package io.mike.foundation.repository

data class PageResponse<T>(
        val source: List<T>,
        val cursor: Int? = null,
        val totalCount: Long? = null
)