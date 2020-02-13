import * as Joi from "@hapi/joi";

import { Validation } from "../../../foundation/validator/support";

export const AuthorValidator: Validation = {
    name: Joi.string().min(1).required(),
}