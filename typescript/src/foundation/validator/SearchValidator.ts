import * as Joi from "@hapi/joi";

import { Validation } from "./support";

export const SearchValidator: Validation = {
    search: Joi.string().min(1).optional()
}