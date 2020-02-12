package io.mike.foundation.core.support

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
@Qualifier(VersionEnvironment.STANDARD_VERSION_PROVIDER)
class StandardVersionPreferences : VersionProvider {

    @Value(VersionEnvironment.VERSION)
    override lateinit var version: String
}