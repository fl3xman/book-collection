/*
 *   Copyright (c) 2020 mike.grman@gmail.com
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import * as Hapi from "@hapi/hapi";
import * as Joi from "@hapi/joi";

import { LoggerTag } from "../foundation/logger";
import { bootPlugin } from "../foundation/plugin";
import { InversifyPlugin } from "../plugins/inversify";
import { SequelizePlugin } from "../plugins/sequelize";
import { RouterPlugin } from "../plugins/router";

export const bootServer = async (options?: Hapi.ServerOptions): Promise<Hapi.Server> => {
    const server = new Hapi.Server(options);

    try {

        // Register validators

        server.validator(Joi);

        // Register plugins

        await server.register([
            bootPlugin(InversifyPlugin, { debug: true }),
            bootPlugin(SequelizePlugin, {
                database: "books",
                dialect: "sqlite",
                username: "book",
                password: "book",
                storage: ":memory:"
            }),
            bootPlugin(RouterPlugin, {})
        ]);


        server.log([LoggerTag.Info], "Plugins successfuly registered.");
    } catch (error) {
        server.log([LoggerTag.Error], `Plugins failed to register with error: ${error}.`);
    }

    return server;
}