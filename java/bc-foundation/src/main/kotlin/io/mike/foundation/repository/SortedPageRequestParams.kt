package io.mike.foundation.repository

import org.springframework.data.domain.PageRequest

open class SortedPageRequestParams : PageRequestParams() {

    var sort: SortRequestParams? = null
}

fun SortedPageRequestParams.toPageRequest(): PageRequest = toPageRequest(sort)