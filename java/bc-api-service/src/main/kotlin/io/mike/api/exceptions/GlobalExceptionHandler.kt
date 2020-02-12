package io.mike.api.exceptions

import org.springframework.boot.autoconfigure.web.ResourceProperties
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler
import org.springframework.boot.web.reactive.error.ErrorAttributes
import org.springframework.context.ApplicationContext
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.codec.ServerCodecConfigurer
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*

@Component
@Order(value = -2)
class GlobalExceptionHandler(
        attributes: GlobalErrorAttributes,
        context: ApplicationContext,
        codec: ServerCodecConfigurer
) : AbstractErrorWebExceptionHandler(attributes, ResourceProperties(), context) {

    init {
        super.setMessageWriters(codec.writers)
        super.setMessageReaders(codec.readers)
    }

    override fun getRoutingFunction(attribute: ErrorAttributes): RouterFunction<ServerResponse> {
        return RouterFunctions.route(RequestPredicates.all(), HandlerFunction<ServerResponse> {
            getErrorAttributes(it, false).run {
                ServerResponse
                        .status(HttpStatus.valueOf(this["status"] as Int))
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromValue(this))
            }
        })
    }
}
