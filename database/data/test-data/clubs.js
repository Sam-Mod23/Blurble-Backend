const clubData = [
  {
    clubName: "Blurble Club",
    description: "test",
    currentBook: "test",
    memberIds: ["1", "2", "3"],
    adminIds: ["1"],
    nominatedBooks: [
      { selfLink: "1", votes: 1, votedIds: ["2"] },
      { selfLink: "2", votes: 2, votedIds: [] },
      { selfLink: "3", votes: 3, votedIds: [] }
    ],
    archivedBooks: [],
    comments: [],
    _id: "1"
  },
  {
    clubName: "Blurble Club 2",
    description: "test",
    currentBook: "test",
    memberIds: ["2"],
    adminIds: ["2"],
    nominatedBooks: [
      { selfLink: "4", votes: 1, votedIds: [] },
      { selfLink: "5", votes: 2, votedIds: [] },
      { selfLink: "6", votes: 3, votedIds: [] }
    ],
    archivedBooks: [],
    comments: [],
    _id: "2"
  },
  {
    clubName: "Blurble Club 3",
    description: "test",
    currentBook: "test",
    memberIds: ["3"],
    adminIds: ["3"],
    nominatedBooks: [
      { selfLink: "7", votes: 1, votedIds: [] },
      { selfLink: "8", votes: 2, votedIds: [] },
      { selfLink: "9", votes: 3, votedIds: [] }
    ],
    archivedBooks: [],
    comments: [],
    _id: "3"
  },
  {
    clubName: "Blurble Club 4",
    description: "test",
    currentBook: "test",
    memberIds: ["4"],
    adminIds: ["4"],
    nominatedBooks: [
      { selfLink: "10", votes: 1, votedIds: [] },
      { selfLink: "11", votes: 2, votedIds: [] },
      { selfLink: "12", votes: 3, votedIds: [] }
    ],
    archivedBooks: [],
    comments: [],
    _id: "4"
  }
];

module.exports = clubData;
