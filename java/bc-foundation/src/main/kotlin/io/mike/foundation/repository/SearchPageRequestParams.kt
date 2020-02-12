package io.mike.foundation.repository

import io.mike.foundation.validation.annotation.NullOrNotBlank

open class SearchPageRequestParams : SortedPageRequestParams() {

    @NullOrNotBlank
    var search: String? = null
}