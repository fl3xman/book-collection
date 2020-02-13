import * as Joi from "@hapi/joi";

import { Validation } from "../../../foundation/validator/support";

export const BookUpdateValidator: Validation = {
    title: Joi.string().min(1).optional(),
    description: Joi.string().min(1).optional(),
}