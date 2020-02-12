package io.mike.api.contracts.authors.support

import io.mike.foundation.validation.annotation.NullOrNotBlank
import io.mike.foundation.validation.groups.Create
import io.mike.foundation.validation.groups.Update
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

class AuthorRequest {

    @NotBlank(groups = [Create::class])
    @NullOrNotBlank(groups = [Update::class])
    @Size(max = 255)
    var name: String? = null
}