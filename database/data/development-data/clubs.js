const clubData = [
  {
    clubName: "Blurble Book Club",
    description: "Blurble's Global book club",
    currentBook: "https://www.googleapis.com/books/v1/volumes/eVWoxuMSzaIC",
    memberIds: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25"
    ],
    adminIds: [],
    nominatedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/5QRZ4z6A1WwC",
        votes: 5,
        votedIds: ["24", "1", "5", "21", "7"]
      },
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/kotPYEqx7kMC",
        votes: 4,
        votedIds: ["21", "22", "5", "9"]
      }
    ],
    archivedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/EPbnxXJC8toC",
        votes: 0,
        votedIds: []
      }
    ],
    comments: [],
    _id: 1
  },
  {
    clubName: "Northcoders Book Club",
    description: "Northcoders Book Club",
    currentBook: "https://www.googleapis.com/books/v1/volumes/iptCAwAAQBAJ",
    memberIds: ["1", "2", "3", "4", "5", "7", "12", "23"],
    adminIds: ["3", "5"],
    nominatedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/8CHcJQzDPCkC",
        votes: 2,
        votedIds: ["1", "4"]
      },
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/-bK-DQAAQBAJ",
        votes: 2,
        votedIds: ["7", "23"]
      }
    ],
    archivedBooks: ["https://www.googleapis.com/books/v1/volumes/ffYZDQAAQBAJ"],
    comments: [],
    _id: 2
  },
  {
    clubName: "Science Fiction Book Club",
    description: "A club for science fiction enthusiasts!",
    currentBook: "https://www.googleapis.com/books/v1/volumes/RBRXzgEACAAJ",
    memberIds: ["8", "10", "13", "19", "20", "22", "25"],
    adminIds: ["8", "10"],
    nominatedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/8CHcJQzDPCkC",
        votes: 2,
        votedIds: ["8", "10"]
      },
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/BHhCzgEACAAJ",
        votes: 2,
        votedIds: ["8", "10"]
      },
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/6PYDCwAAQBAJ",
        votes: 1,
        votedIds: ["8"]
      }
    ],
    archivedBooks: ["https://www.googleapis.com/books/v1/volumes/V5s14nks9I8C"],
    comments: [],
    _id: 3
  },
  {
    clubName: "Mystery Book Club",
    description: "Whodunnit? ",
    memberIds: ["6", "11", "14", "15", "17", "24"],
    adminIds: ["6"],
    currentBook: "https://www.googleapis.com/books/v1/volumes/ZgfbDwAAQBAJ",
    nominatedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/ZgfbDwAAQBAJ",
        votes: 1,
        votedIds: ["6"]
      }
    ],
    archivedBooks: [],
    _id: 4
  },
  {
    clubName: "Spooky books",
    description: "Books for haunted house fans",
    memberIds: ["5", "6", "11", "14", "15", "17", "24"],
    adminIds: ["18"],
    currentBook: "https://www.googleapis.com/books/v1/volumes/-6aSDwAAQBAJ",
    nominatedBooks: [
      {
        selfLink: "https://www.googleapis.com/books/v1/volumes/zVq8BF_5vSUC",
        votes: 3,
        votedIds: ["6", "15", "17"]
      }
    ],
    archivedBooks: [],
    _id: 5
  }
];

module.exports = clubData;
