import * as Joi from "@hapi/joi";

import { Validation } from "../../../foundation/validator/support";

export const BookCreateValidator: Validation = {
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
}