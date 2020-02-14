import "reflect-metadata";

import { bootServer } from "./server";
import { LoggerTag } from "./foundation/logger";

((async () => {
    const server = await bootServer({
        port: 3000,
        host: "localhost",
        debug: {
            log: [LoggerTag.Info, LoggerTag.Error],
            request: [LoggerTag.Info, LoggerTag.Error],
        }
    });
    await server.start();
    server.log([LoggerTag.Info], `Server started at: ${server.info.uri}, port: ${server.info.port}.`);
})());
