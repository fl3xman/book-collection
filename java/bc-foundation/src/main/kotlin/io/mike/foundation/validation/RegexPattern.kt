package io.mike.foundation.validation

object RegexPattern {
    const val UUID = "\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b"
    const val ORDER = "(ASC|DESC)"
}