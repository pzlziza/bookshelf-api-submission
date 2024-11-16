const { nanoid } = require("nanoid");
const book = require("./book");

const addBookHandler = (req, h) => {
  let { name, year, author, summary, publisher, pageCount, readPage, reading } =
    req.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();

  const updatedAt = insertedAt;

  let finished = false;

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

  book.push(newBook);

  const isSuccess = book.filter((b) => b.id === id).length > 0;

  if (isSuccess) {
    if (pageCount == readPage) {
      finished = true;

      reading = false;
    } else if (name === undefined) {
      const response = h.response({
        status: "fail",

        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });

      response.code(400);

      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: "fail",

        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });

      response.code(400);

      return response;
    } else {
      finished = false;

      reading = true;
    }

    const response = h.response({
      status: "success",

      message: "Buku berhasil ditambahkan",

      data: {
        id: id,

        name: name,

        year: year,

        author: author,

        summary: summary,

        publisher: publisher,

        pageCount: pageCount,

        readPage: readPage,

        finished: finished,

        reading: reading,

        insertedAt: insertedAt,

        updatedAt: updatedAt,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: "fail",

    message: "Gagal menambahkan buku. Mohon isi nama buku",
  });

  response.code(400);

  return response;
};

const getBookHandler = () => ({
  status: "success",

  data: {
    books: book.map((b) => ({
      id: b.id,

      name: b.name,

      publisher: b.publisher,
    })),
  },
});

const getDetailBookHandler = (req, h) => {
  const { bookId } = req.params;

  const selectbook = book.filter((b) => b.id === bookId)[0];

  if (selectbook !== undefined) {
    return {
      status: "success",

      data: {
        book: selectbook,
      },
    };
  }

  const response = h.response({
    status: "fail",

    message: "Buku tidak ditemukan",
  });

  response.code(404);

  return response;
};

const updateBookHandler = (req, h) => {
  const { bookId } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const index = book.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: "fail",

        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });

      response.code(400);

      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: "fail",

        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });

      response.code(400);

      return response;
    }

    book[index] = {
      ...book[index],

      name,

      year,

      author,

      summary,

      publisher,

      pageCount,

      readPage,

      reading,
    };

    const response = h.response({
      status: "success",

      message: "Buku berhasil diperbarui",
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: "fail",

    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);

  return response;
};

const deleteBookHandler = (req, h) => {
  const { bookId } = req.params;

  const index = book.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    book.splice(index, 1);

    const response = h.response({
      status: "success",

      message: "Buku berhasil dihapus",
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: "fail",

    message: "Gagal menghapus buku. Id tidak ditemukan",
  });

  response.code(404);

  return response;
};

module.exports = {
  addBookHandler,
  getBookHandler,
  getDetailBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
