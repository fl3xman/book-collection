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