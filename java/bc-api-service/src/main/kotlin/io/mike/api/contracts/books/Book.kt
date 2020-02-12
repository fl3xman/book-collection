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