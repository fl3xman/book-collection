package io.mike.foundation.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface CrudRepositoryProvider<Model, ID, R> where R : JpaRepository<Model, ID>, R : JpaSpecificationExecutor<Model> {
    val repository: R
}