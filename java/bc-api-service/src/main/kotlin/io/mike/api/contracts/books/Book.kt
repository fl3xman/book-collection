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

package io.mike.api.contracts.books

import io.mike.api.contracts.authors.Author
import io.mike.foundation.domain.Auditable
import javax.persistence.*

@Entity
@Table(name = "books", indexes = [
    Index(columnList = "title,description")
])
class Book : Auditable<String>() {

    @Column
    var title: String? = null

    @Column
    var description: String? = null

    @ManyToMany(
            mappedBy = "books", fetch = FetchType.LAZY,
            cascade = [
                CascadeType.PERSIST,
                CascadeType.MERGE
            ]
    )
    @OrderBy("name ASC")
    var authors: MutableList<Author> = mutableListOf()
}

// Extensions

fun Book.addAuthor(author: Author) {
    authors.add(author)
    author.books.add(this)
}

fun Book.addAuthors(authors: List<Author>) {
    authors.forEach { addAuthor(it) }
}

fun Book.removeAuthor(author: Author) {
    authors.remove(author)
    author.books.remove(this)
}

fun Book.removeAuthors(authors: List<Author>) {
    authors.forEach { removeAuthor(it) }
}