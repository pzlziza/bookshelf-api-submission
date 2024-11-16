const { nanoid } = require("nanoid");
const book = require("./book");

const addBookHandler = (req, h) => {
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
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const isFinished = (readpage, pagecount) => {
    if (readpage === pagecount) {
      return true;
    }
    if (readpage < pagecount) {
      return false;
    }
    return false;
  };
  const finished = isFinished(readPage, pageCount);
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
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  book.push(newBook);
  const isSuccess = book.filter((b) => b.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
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

const deleteBookHandler = (req, h) => {
  const deleteBookHandler = (req, h) => {
    const { bookId } = req.params;
    const index = book.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      book.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
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
