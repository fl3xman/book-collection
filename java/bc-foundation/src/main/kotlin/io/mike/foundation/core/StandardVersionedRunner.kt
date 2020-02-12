package io.mike.foundation.core

import io.mike.foundation.core.support.VersionEnvironment
import io.mike.foundation.core.support.VersionProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier

abstract class StandardVersionedRunner : VersionedRunner {

    @Autowired
    @Qualifier(VersionEnvironment.STANDARD_VERSION_PROVIDER)
    override lateinit var version: VersionProvider
}