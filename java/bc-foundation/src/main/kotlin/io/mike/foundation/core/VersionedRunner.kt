package io.mike.foundation.core

import io.mike.foundation.core.support.VersionProvider
import io.mike.foundation.logger.provideLogger
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner

interface VersionedRunner : ApplicationRunner {

    companion object {
        @JvmStatic
        val logger = provideLogger()
    }

    val version: VersionProvider

    override fun run(args: ApplicationArguments?) = args.let { logger.info("Version: ${version.version}") }
}