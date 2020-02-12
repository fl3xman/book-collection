package io.mike.foundation.logger

import org.slf4j.Logger
import org.slf4j.LoggerFactory

inline fun <reified T> T.provideLogger(): Logger =
        if (T::class.isCompanion) LoggerFactory.getLogger(T::class.java.enclosingClass)
        else LoggerFactory.getLogger(T::class.java)
