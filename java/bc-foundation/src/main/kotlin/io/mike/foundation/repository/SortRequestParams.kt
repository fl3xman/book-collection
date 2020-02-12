package io.mike.foundation.repository

import io.mike.foundation.validation.RegexPattern
import org.springframework.data.domain.Sort
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern

// sort.order=ASC&sort.attribute=name

class SortRequestParams {

    @NotBlank
    var attribute: String = ""

    @Pattern(regexp = RegexPattern.ORDER)
    var order: String = "ASC"
}

fun SortRequestParams.toSort(): Sort = Sort.by(Sort.Direction.fromString(order.toUpperCase()), attribute)