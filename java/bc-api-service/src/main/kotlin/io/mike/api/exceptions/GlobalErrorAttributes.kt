package io.mike.api.exceptions

import org.springframework.boot.web.reactive.error.DefaultErrorAttributes
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import javax.persistence.EntityNotFoundException
import javax.validation.ConstraintViolationException
import javax.validation.ValidationException

@Component
class GlobalErrorAttributes : DefaultErrorAttributes(false) {

    override fun getErrorAttributes(request: ServerRequest?, includeStackTrace: Boolean): MutableMap<String, Any> =
            super.getErrorAttributes(request, includeStackTrace).apply {
                when (getError(request).cause ?: getError(request)) {
                    is EntityNotFoundException -> append(this, HttpStatus.NOT_FOUND)
                    is ConstraintViolationException, is ValidationException -> append(this, HttpStatus.BAD_REQUEST)
                }
            }


    private fun append(attributes: MutableMap<String, Any>, status: HttpStatus) {
        attributes["status"] = status.value()
        attributes["error"] = status.reasonPhrase
    }
}

