import "reflect-metadata";

import { bootServer } from "./server/Bootstrap";
import { DefaultLoggerTagSet, LoggerTag } from "./foundation/logger";

((async () => {
    const server = await bootServer({
        port: 3000,
        host: "localhost",
        debug: {
            log: [...DefaultLoggerTagSet],
            request: [...DefaultLoggerTagSet],
        }
    });
    await server.start();
    server.log([LoggerTag.Info], `Server started at: ${server.info.uri}, port: ${server.info.port}.`);
})());
