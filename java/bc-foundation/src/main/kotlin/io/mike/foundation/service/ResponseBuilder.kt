package io.mike.foundation.service

import io.mike.foundation.mapper.ModelMapperProvider
import io.mike.foundation.repository.PageResponse
import org.modelmapper.ModelMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page

abstract class ResponseBuilder<Output>(private val outputClass: Class<Output>) : ResponseProvider<Output>, ModelMapperProvider {

    @Autowired
    override lateinit var modelMapper: ModelMapper

    override fun <Input> Input.toResponse(): Output = mergeClass(this, this@ResponseBuilder.outputClass)

    override fun <Input> Page<Input>.toPageResponse(): PageResponse<Output> = PageResponse(
            this.content.map { mergeClass(it, this@ResponseBuilder.outputClass) },
            if (this.hasNext()) this.nextPageable().pageNumber else null,
            this.totalElements
    )
}