const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/book/{id}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/book/{id}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/book/{id}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
