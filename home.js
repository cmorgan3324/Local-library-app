function getTotalBooksCount(books) {
  return books.reduce((total, book) => {
    if (book) {
      total++;
    }
    return total;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((total, account) => {
    if (account) {
      total++;
    }
    return total;
  }, 0);
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    if (book.borrows[0].returned === false) {
      total++;
    }
    return total;
  }, 0);
}

function sortTopFive(arr) {
  return arr
    .sort((a, b) => {
      return b.count - a.count;
    })
    .slice(0, 5);
}

function getMostCommonGenres(books) {
  const genreCounts = {}; // {genre: 3, Science: 1, ...}

  for (let i = 0; i < books.length; i++) {
    const genre = books[i].genre; // genre is key of genreCounts object
    if (genreCounts[genre]) {
      // if genre exists as a key
      genreCounts[genre]++; // {genre: 4}
    } else {
      genreCounts[genre] = 1; // {History: 1}
    }
  }

  const sortedGenres = []; //[{name: genre, count: genreCounts[genre]}, ...{}]
  for (let genre in genreCounts) {
    sortedGenres.push({ name: genre, count: genreCounts[genre] });
  }

  // sortedGenres.sort(function (a, b) {
  //   return b.count - a.count;
  // });
  // return sortedGenres.slice(0, 5);

  return sortTopFive(sortedGenres);
}

// getMostCommonGenres takes in array of book objects and returns the top five most commons genres.
// Assign an empty object to genreCounts it loops through each book in the input books array.
//For each book, it retrieves the genre property books[i].genre and assigns it to genre
// if the genre exists as a key in the genreCounts object then increment the count/value by 1.
// if the genre doesnt exist as a key, it adds the key and sets the count/value to 1 (genreCounts[genre] = 1)
// After counting the genres, assign an empty array to variable sortedGenres.
// For each genre in genreCounts object, push a new object with properties "name" and "count", set to genre and genreCounts[genre], respectively, {name: genre, count: genreCounts[genre]}, into the sortedGenres array
// Sort genres from most common to least common; sortedGenres.sort(function (a, b) {
//   return b.count - a.count;
// });
// Then return sliced sortedGenres array to include only top 5; return sortedGenres.slice(0, 5);
//Sort and slice are put into one function topFiveSort

function getMostPopularBooks(books) {
  const borrowCounts = {}; //{books[i].title: books[i].borrows.length}

  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;
    borrowCounts[books[i].title] = borrows.length;
  }

  const sortedBooks = [];
  for (let book in borrowCounts) {
    sortedBooks.push({ name: book, count: borrowCounts[book] });
  }

  return sortTopFive(sortedBooks);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {}; // { authorName: 0...},

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const author = authors.find((author) => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;

    if (!authorBorrowCounts[authorName]) {
      // if authorName doesn't exist as a key in authorBorrowCounts object
      authorBorrowCounts[authorName] = book.borrows.length;
    } else {
      authorBorrowCounts[authorName] += book.borrows.length;
    }
  }

  const sortedAuthors = [];
  for (let authorName in authorBorrowCounts) {
    sortedAuthors.push({
      name: authorName,
      count: authorBorrowCounts[authorName],
    });
  }

  return sortTopFive(sortedAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
