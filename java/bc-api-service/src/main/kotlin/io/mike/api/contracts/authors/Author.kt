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

package io.mike.api.contracts.authors

import io.mike.api.contracts.books.Book
import io.mike.foundation.domain.Auditable
import javax.persistence.*

@Entity
@Table(name = "authors", indexes = [
    Index(columnList = "name")
])
class Author : Auditable<String>() {

    @Column
    var name: String? = null

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = [
                CascadeType.PERSIST,
                CascadeType.MERGE
            ]
    )
    @JoinTable(
            name = "author_book",
            joinColumns = [JoinColumn(name = "author_id")],
            inverseJoinColumns = [JoinColumn(name = "book_id")]
    )
    @OrderBy("title ASC")
    var books: MutableList<Book> = mutableListOf()

}

// Extensions

fun Author.addBook(book: Book) {
    books.add(book)
    book.authors.add(this)
}

fun Author.addBooks(books: List<Book>) {
    books.forEach { addBook(it) }
}

fun Author.removeBook(book: Book) {
    books.remove(book)
    book.authors.remove(this)
}
