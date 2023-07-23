function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
// findAuthorById inputs array of author objects and an id string
// Find author within authors where the input id string matches that author.id
// Return author

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}
// findBookByID inputs array of book object and an id string.
// Find book within books array where the input id string matches the book.id.
// Return book

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    // const borrowed = books[i].borrows;
    const { borrows } = book; // { borrows }(array) => book.borrows = book
    const isReturned = borrows[0].returned; // borrows[0].returned => borrowed[0].returned

    if (isReturned) {
      returnedBooks.push(book);
    } else {
      borrowedBooks.push(book);
    }
  }

  return [borrowedBooks, returnedBooks];
}

// partitionBooksByBorrowedStatus inputs array of book objects and returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array. One array contains borrowed books and the other array contains returned books.
// Assign an empty array to a returnedBooks variable and an empty array to a borrowedBooks variable.
// Iterate thorugh input books array (for loop).
// Assign each book iteration (books[i]) to book in order to push iteration to appropriate array.
// Retrieve borrows array from books with destructuring { borrows } (assigns book.borrows or books[i].borrows to variable borrows), and set it to book, => books[i].borrows = book. Borrows is an array of transaction objects.
// Set the first borrow iteration of returned property to isReturned varaible (isReturned = borrows[0].returned)
// If isReturned is set to true in first iteration (borrows[0].isreturned), push to returnedBooks array. Then the next book iteration starts
// If isReturned is set to false in first iteration of borrows array, push to borrowedBooks array. Then the next book object iteration starts.
// Return array containing returnedBooks array and borrowedBooks array. [returnedBooks, borrowedBooks]

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrowed) => {
    const account = accounts.find((acc) => acc.id === borrowed.id); // account object
    return { ...account, returned: borrowed.returned }; // [{...account, returned: borrowed.returned }, ...{}]
  });
  return borrowers.slice(0, 10);
}
// getBorrowersForBook inputs a book object and an array of account objects, returns an array of borrowers for that book along with the info of whether or not they returned the book
// Map book.borrows array using borrowed for each iteration/transaction; set to variable borrowers
// For each borrowed iteration, find account.id (acc) from input account array that match the borrowed.id from borrows array; set to variable account.
// return  the account object + returned entry from corresponding borrowed iteration/transaction in an object {...account, returned: borrowed.returned }. Will return and object in an array because of .map method.
// Slice borrowers array to keep 10 account objects in array.

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
