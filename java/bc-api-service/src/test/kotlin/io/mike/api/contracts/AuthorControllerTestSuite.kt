/*
 *   Copyright (c) 2020 mike.grman@gmail.com
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

package io.mike.api.contracts

import io.mike.api.contracts.authors.AuthorController
import io.mike.api.contracts.authors.AuthorServiceImpl
import io.mike.api.contracts.authors.support.AuthorExtendedResponse
import io.mike.api.contracts.authors.support.AuthorRequest
import io.mike.api.exceptions.GlobalErrorAttributes
import io.mike.api.exceptions.GlobalExceptionHandler
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito
import org.mockito.Mockito.times
import org.modelmapper.ModelMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.web.reactive.function.BodyInserters
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.util.*


@ExtendWith(SpringExtension::class)
@WebFluxTest(controllers = [AuthorController::class])
@Import(value = [
    ModelMapper::class,
    GlobalErrorAttributes::class,
    GlobalExceptionHandler::class
])
class AuthorControllerTestSuite {

    @MockBean
    private lateinit var service: AuthorServiceImpl

    @Autowired
    private lateinit var webClient: WebTestClient

    @Test
    fun `create author`() {
        val uuid = UUID.randomUUID()
        val date = LocalDateTime.now()
        val request = AuthorRequest()
        request.name = "Tester"

        val response = AuthorExtendedResponse()
        response.id = uuid;
        response.name = "Tester"
        response.createdAt = date
        response.updatedAt = date

        Mockito
                .`when`(service.create(request))
                .thenReturn(response)

        webClient.post().uri("/authors")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(request))
                .exchange()
                .expectStatus().isOk
                .expectBody()
                .jsonPath("$.name").isNotEmpty
                .jsonPath("$.id").isEqualTo(uuid.toString())
                .jsonPath("$.name").isEqualTo("Tester")

        Mockito.verify(service, times(1)).create(request)
    }

    @Test
    fun `find one author`() {
        val uuid = UUID.randomUUID()
        val date = LocalDateTime.now()
        val response = AuthorExtendedResponse()
        response.id = uuid;
        response.name = "Tester"
        response.createdAt = date
        response.updatedAt = date

        Mockito
                .`when`(service.findOne(uuid))
                .thenReturn(response)

        webClient.get().uri("/authors/{id}", uuid)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk
                .expectBody()
                .jsonPath("$.name").isNotEmpty
                .jsonPath("$.id").isEqualTo(uuid.toString())
                .jsonPath("$.name").isEqualTo("Tester")

        Mockito.verify(service, times(1)).findOne(uuid)
    }
}