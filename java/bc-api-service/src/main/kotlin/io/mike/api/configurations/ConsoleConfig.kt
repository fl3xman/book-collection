package io.mike.api.configurations

import org.h2.tools.Server
import org.springframework.context.annotation.Profile
import org.springframework.context.event.ContextClosedEvent
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
@Profile(value = ["test"])
class ConsoleConfig {

    private var web: Server? = null
    private var tcp: Server? = null

    @EventListener(ContextRefreshedEvent::class)
    fun start() {
        web = Server.createWebServer("-webPort", "3082", "-tcpAllowOthers").start()
        tcp = Server.createWebServer("-tcpPort", "3092", "-tcpAllowOthers").start()
    }

    @EventListener(ContextClosedEvent::class)
    fun stop() {
        web?.stop()
        tcp?.stop()
    }
}