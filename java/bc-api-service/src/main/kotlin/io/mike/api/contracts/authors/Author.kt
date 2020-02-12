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
