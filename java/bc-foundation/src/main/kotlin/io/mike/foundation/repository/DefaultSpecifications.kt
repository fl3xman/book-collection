package io.mike.foundation.repository

import org.springframework.data.jpa.domain.Specification

fun <Model> applySearchFilter(params: SearchPageRequestParams, attributes: Set<String> = emptySet()): Specification<Model> = Specification { root, _, builder ->
    params.search?.let { term ->
        builder.or(*attributes.map { builder.like(builder.lower(root.get(it)), "%$term%".toLowerCase()) }.toTypedArray())
    }
}