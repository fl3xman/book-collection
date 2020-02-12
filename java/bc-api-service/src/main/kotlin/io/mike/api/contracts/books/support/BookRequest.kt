package io.mike.api.contracts.books.support

import io.mike.foundation.validation.annotation.NullOrNotBlank
import io.mike.foundation.validation.groups.Create
import io.mike.foundation.validation.groups.Update
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

open class BookRequest {

    @NotBlank(groups = [Create::class])
    @NullOrNotBlank(groups = [Update::class])
    @Size(max = 255)
    var title: String? = null

    @NotBlank(groups = [Create::class])
    @NullOrNotBlank(groups = [Update::class])
    @Size(max = 255)
    var description: String? = null
}