import * as Joi from "@hapi/joi";

import { Validation } from "./support";

export const IdentityValidator: Validation = {
    id: Joi.string().required().uuid(),
}