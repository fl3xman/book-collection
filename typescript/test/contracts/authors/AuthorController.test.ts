import * as Hapi from "@hapi/hapi";
import * as Lab from "@hapi/lab";

import { expect } from "@hapi/code";

import { bootServer } from "../../../src/server/Bootstrap";
import { HttpMethod, HttpStatus } from "../../../src/foundation/http";
import { provideSequelize } from "../../../src/plugins/sequelize";

const lab = Lab.script();
const { after, before, describe, it } = lab;

export { lab }

describe("author contracts ->", () => {

    let server: Hapi.Server;

    before(async () => {
        server = await bootServer({ port: 3000, host: "localhost" });
        await server.initialize();
    });

    after(async () => {
        await provideSequelize(server).dropAllSchemas({});
        await server.stop();
    });

    it('create author successfully', async () => {
        const result = await server.inject({ url: "/authors", method: HttpMethod.POST, payload: { name: "Tester" } });
        expect(result.statusCode).to.equal(HttpStatus.OK);
    });

    it('create author with wrong payload', async () => {
        const result = await server.inject({ url: "/authors", method: HttpMethod.POST, payload: { name: "" } });
        expect(result.statusCode).to.equal(HttpStatus.BAD_REQUEST);
    });

    it('find authors', async () => {
        const result = await server.inject({ url: "/authors", method: HttpMethod.GET });
        expect(result.statusCode).to.equal(HttpStatus.OK);
    });

    it('find author with not uuid as id', async () => {
        const result = await server.inject({ url: "/authors/test", method: HttpMethod.GET });
        expect(result.statusCode).to.equal(HttpStatus.BAD_REQUEST);
    });

    it('find author with wrong id', async () => {
        const result = await server.inject({ url: "/authors/04b0f11d-20e3-4f70-834d-3279ef234054", method: HttpMethod.GET });
        expect(result.statusCode).to.equal(HttpStatus.NOT_FOUND);
    });
});