package io.mike.foundation.mapper

import org.modelmapper.ModelMapper

interface ModelMapperProvider {

    val modelMapper: ModelMapper

    fun <Input, Output> mergeClass(input: Input, outputClass: Class<Output>): Output = modelMapper.map(input, outputClass)
    fun <Input, Output> merge(input: Input, output: Output): Output = modelMapper.map(input, output).run { output }
}