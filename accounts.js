function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}
//findAccountById inputs accounts array of account objects, and an id string.
// For each account in accounts, find where the account id matches the input id string and return that account.

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}
//sortAccountsByLastName inputs array of account objects.
//Sort each account (accountA, and accountB) and compare the first last name (accountA.name.last) in the iteration to the next last name (accountB.name.last).
//If true, return positive, 1. (Sorts B before A).
// If false, return negative, -1. (Sorts A before B).
// Returns with array with accounts sorted by last name

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    for (let i = 0; i < book.borrows.length; i++) {
      if (account.id === book.borrows[i].id) {
        total++;
      }
    }
    return total;
  }, 0);
}
//getTotalNumberOfBorrows inputs account object and array of book objects.
// Reduce books using total (accumulator set to 0) and book. (Reducing books array into single number)
//For each book (for loop), iterate over the borrows array (book.borrows.length).
// If the input account.id matches the id of a book.borrows iteration id (book.borrows[i].id), increment total by 1.
//After loop ends, return total (which is a number representing the total number of books.)

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];

  books.forEach((book) => {
    const borrow = book.borrows[0];
    if (borrow.id === account.id && !borrow.returned) {
      const bookWithAuthor = { ...book };
      const author = authors.find((author) => author.id === book.authorId); // {author object}
      bookWithAuthor.author = author; // {...book, author: {author object}}
      result.push(bookWithAuthor);
    }
  });

  return result;
}
// getBooksPossessedByAccount takes in an account object, an array of book objects, and an array of author objects and returns an array of book objects, including author information, that represents all books currently checked out by the given account. It's not just the book object; the author object is nested inside of it.
//Assign empty array to variable (result).
//forEach book in books, assign variable (borrow) to the first iteration (first borrow entry) in each book.borrows array (book.borrows[0]).
//If the id of that first iteration (borrow.id) matches the input account.id AND the returned property is false (!borrow.returned),then assign an object containing the book object ({...book}) [object shorthand w/ spread operator] to bookWithAuthor.
//also, find the author in input authors array where the author.id matches the book author's id (author.id === book.authorId). This gives you the author object with the authorid corresponding to the book.
//Add author property to bookWithAuthor object {...book} and assign the author object found as it's value (bookWithAuthor.author = author),
//Now push that object {...book, author: {author object}} into the empty array (results).
//After interating through everything, return results array containing object above.

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
