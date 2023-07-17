const { nanoid } = require('nanoid');
const books = require('./books');

// Insert book
const addBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher,
        pageCount, readPage, reading,
    } = request.payload;

    // Define ID
    const id = nanoid(16);

    // console.log(id);
    const finished = (pageCount === readPage);

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    console.log({ newBook });

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // Input Buku
    books.push(newBook);

    // Check Duplicate
    if (books.filter((book) => book.id === id).length > 0) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku.',
    });
    response.code(500);
    return response;
};

// Get Book
const getAllBookHandler = (request, h) => {
    const data = books.map((book) => (
        {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }
    ));

    console.log({ data });

    const response = h.response({
        status: 'success',
        data: {
            books: data || [],
        },
    });
    response.code(200);
    return response;
};

// Get Detail Book
const getDetailBookHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((item) => item.id === id);

    if (book.length > 0) {
        const response = h.response({
            status: 'success',
            data: {
                book: book[0],
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Update Book
const updateBookHandler = (request, h) => {
    const { id } = request.params;

    const {
        name, year, author, summary, publisher,
        pageCount, readPage, reading,
    } = request.payload;

    const finished = (pageCount === readPage);

    // const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    // console.log({ books });

    /* Check Payload */
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === id);

    // Update Buku
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Delete Data
const deleteBookHandlerByID = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};
/* {
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
} */

module.exports = {
    addBookHandler,
    getAllBookHandler,
    getDetailBookHandler,
    updateBookHandler,
    deleteBookHandlerByID,
};