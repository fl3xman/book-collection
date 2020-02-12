package io.mike.foundation.repository

import org.springframework.data.domain.PageRequest
import javax.validation.constraints.Max
import javax.validation.constraints.Min

// page.cursor=0&page.limit=1

open class PageRequestParams {

    @Min(0)
    var cursor: Int = 0

    @Min(1)
    @Max(100)
    var limit: Int = 50
}

fun PageRequestParams.toPageRequest(sort: SortRequestParams?): PageRequest =
        sort?.let {
            PageRequest.of(cursor, limit, it.toSort())
        } ?: PageRequest.of(cursor, limit)