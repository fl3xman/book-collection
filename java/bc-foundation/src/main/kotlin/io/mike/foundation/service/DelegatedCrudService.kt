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

package io.mike.foundation.service

import io.mike.foundation.mapper.ModelMapperProvider
import io.mike.foundation.repository.PageResponse
import io.mike.foundation.repository.SearchPageRequestParams
import io.mike.foundation.repository.applySearchFilter
import io.mike.foundation.repository.toPageRequest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import javax.persistence.EntityNotFoundException

interface DelegatedCrudService<Output> : ModelMapperProvider, ResponseProvider<Output> {

    fun <Input, Model, ID, R> create(repository: R, input: Input, modelClass: Class<Model>): Output where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            repository.save(mergeClass(input, modelClass)).toResponse()

    fun <Input, Model, ID, R> update(repository: R, id: ID, input: Input): Output where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            findEntity(repository, id).let { repository.save(merge(input, it)) }.toResponse()

    fun <Model, ID, R> delete(repository: R, id: ID): Unit where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            repository.deleteById(id)

    fun <Model, ID, R> findOne(repository: R, id: ID): Output where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            findEntity(repository, id).toResponse()

    fun <Model, ID, R> find(repository: R, params: SearchPageRequestParams, attributes: Set<String> = emptySet()): PageResponse<Output> where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            repository.findAll(applySearchFilter(params, attributes), params.toPageRequest()).toPageResponse()


    fun <Model, ID, R> findEntity(repository: R, id: ID): Model where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            repository.findById(id).orElseThrow { throw EntityNotFoundException("Entity with id: $id does not exist") }

    fun <Model, ID, R> findEntities(repository: R, ids: Set<ID>): List<Model> where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> =
            repository.findAllById(ids)

}