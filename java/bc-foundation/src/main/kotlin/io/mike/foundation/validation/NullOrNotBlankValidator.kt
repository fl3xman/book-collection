package io.mike.foundation.validation

import io.mike.foundation.validation.annotation.NullOrNotBlank
import java.util.regex.Pattern
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class NullOrNotBlankValidator : ConstraintValidator<NullOrNotBlank, String> {

    override fun initialize(parameters: NullOrNotBlank?) {
        // Nothing to do here
    }

    override fun isValid(value: String?, constraintValidatorContext: ConstraintValidatorContext): Boolean {
        return when (true) {
            value == null -> true
            value.isEmpty() -> false
            else -> {
                !Pattern.compile("^\\s*$").matcher(value).matches()
            }
        }
    }
}