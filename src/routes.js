const {
    addBookHandler, getAllBookHandler, getDetailBookHandlerByID,
    updateBookHandler, deleteBookHandlerByID,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getDetailBookHandlerByID,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandlerByID,
    },

];

module.exports = routes;