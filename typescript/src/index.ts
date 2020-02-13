import "reflect-metadata";

import { bootServer } from "./server";
import { LoggerTag } from "./foundation/logger";

((async () => {
    const server = await bootServer({ port: 3000 });
    await server.start();

    server.log([LoggerTag.Info], `Server started at: ${server.info.uri}, port: ${server.info.port}.`);
})());
