import * as Joi from "@hapi/joi";

export interface Validation {
    [attribute: string]: Joi.AnySchema;
}
