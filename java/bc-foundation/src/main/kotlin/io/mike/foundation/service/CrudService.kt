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
import io.mike.foundation.repository.CrudRepositoryProvider
import io.mike.foundation.repository.PageResponse
import io.mike.foundation.repository.SearchPageRequestParams
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor


interface CrudService<Model, ID, R, Output> : DelegatedCrudService<Output>, CrudRepositoryProvider<Model, ID, R>, ModelMapperProvider where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> {

    fun <Input> create(input: Input, modelClass: Class<Model>): Output = create(repository, input, modelClass)
    fun <Input> update(id: ID, input: Input): Output = update(repository, id, input)

    fun delete(id: ID): Unit = delete(repository, id)

    fun findOne(id: ID): Output = findOne(repository, id)
    fun find(params: SearchPageRequestParams, attributes: Set<String> = emptySet()): PageResponse<Output> = find(repository, params, attributes)

    fun findEntity(id: ID): Model = findEntity(repository, id)
    fun findEntities(ids: Set<ID>): List<Model> = findEntities(repository, ids)
}