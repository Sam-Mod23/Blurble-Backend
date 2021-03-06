const userData = [
  {
    username: "Geocunn",
    name: "George Cunningham",
    isOver18: true,
    email: "george@fakeemail.com",
    blurbles: 310,
    clubs: [
      { club_id: "1", progress: 387, hasNominated: true },
      { club_id: "2", progress: 387, hasNominated: true }
    ],
    avatar: "https://robohash.org/nonaliquameveniet.png?size=50x50&set=set1",
    _id: "1"
  },
  {
    username: "jrickelton",
    name: "James Rickelton",
    isOver18: true,
    email: "james@fakeemail.com",
    blurbles: 280,
    clubs: [
      { club_id: "1", progress: 287, hasNominated: true },
      { club_id: "2", progress: 387, hasNominated: true }
    ],
    avatar: "https://robohash.org/rerumverodignissimos.png?size=50x50&set=set1",
    _id: "2"
  },
  {
    username: "joetilbybaxter",
    name: "Joe Tilby-Baxter",
    isOver18: true,
    email: "joe@fakeemail.com",
    blurbles: 320,
    clubs: [
      { club_id: "1", progress: 295, hasNominated: true },
      { club_id: "2", progress: 387, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/repellatrepellenduslabore.png?size=50x50&set=set1",
    _id: "3"
  },
  {
    username: "N1ck-Benson",
    name: "Nick Benson",
    isOver18: true,
    email: "nick@fakeemail.com",
    blurbles: 290,
    clubs: [
      { club_id: "1", progress: 328, hasNominated: true },
      { club_id: "2", progress: 387, hasNominated: true }
    ],
    avatar: "https://robohash.org/estnemoea.png?size=50x50&set=set1",
    _id: "4"
  },
  {
    username: "Sam-Mod23",
    name: "Sam Modder-Hughes",
    isOver18: true,
    email: "sam@fakeemail.com",
    blurbles: 300,
    clubs: [
      { club_id: "1", progress: 299, hasNominated: true },
      { club_id: "2", progress: 66, hasNominated: true }
    ],
    avatar: "https://robohash.org/sintdoloremeveniet.png?size=50x50&set=set1",
    _id: "5"
  },

  {
    username: "wrevel5",
    name: "Waylon Revel",
    isOver18: true,
    email: "wrevel5@spotify.com",
    blurbles: 445,
    clubs: [
      { club_id: "1", progress: 20, hasNominated: false },
      { club_id: "4", progress: 66, hasNominated: true }
    ],
    avatar: "https://robohash.org/fugiatdistinctioiure.png?size=50x50&set=set1",
    _id: "6"
  },
  {
    username: "sterrans6",
    name: "Stafani Terrans",
    isOver18: false,
    email: "sterrans6@sogou.com",
    blurbles: 55,
    clubs: [
      { club_id: "2", progress: 97, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/nonexpeditaid.png?size=50x50&set=set1",
    _id: "7"
  },
  {
    username: "plevane7",
    name: "Pammi Levane",
    isOver18: true,
    email: "plevane7@wp.com",
    blurbles: 168,
    clubs: [
      { club_id: "3", progress: 45, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/quistemporibussit.png?size=50x50&set=set1",
    _id: "8"
  },
  {
    username: "tsealeaf8",
    name: "Torre Sealeaf",
    isOver18: true,
    email: "tsealeaf8@smh.com.au",
    blurbles: 372,
    clubs: [
      { club_id: "5", progress: 125, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/praesentiumdolorestempora.png?size=50x50&set=set1",
    _id: "9"
  },
  {
    username: "jatwel9",
    name: "Jacqueline Atwel",
    isOver18: false,
    email: "jatwel9@stanford.edu",
    blurbles: 309,
    clubs: [
      { club_id: "3", progress: 128, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/eaqueundeid.png?size=50x50&set=set1",
    _id: "10"
  },
  {
    username: "cmingusa",
    name: "Cindra Mingus",
    isOver18: false,
    email: "cmingusa@zdnet.com",
    blurbles: 333,
    clubs: [
      { club_id: "1", progress: 73, hasNominated: true },
      { club_id: "4", progress: 66, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/velitreprehenderitodio.png?size=50x50&set=set1",
    _id: "11"
  },
  {
    username: "mwhyborneb",
    name: "Meara Whyborne",
    isOver18: false,
    email: "mwhyborneb@reuters.com",
    blurbles: 118,
    clubs: [
      { club_id: "2", progress: 78, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/etbeataeofficia.png?size=50x50&set=set1",
    _id: "12"
  },
  {
    username: "asamsonsenc",
    name: "Ange Samsonsen",
    isOver18: false,
    email: "asamsonsenc@addtoany.com",
    blurbles: 451,
    clubs: [
      { club_id: "3", progress: 39, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/eareprehenderitdeleniti.png?size=50x50&set=set1",
    _id: "13"
  },
  {
    username: "cfilipczakd",
    name: "Chad Filipczak",
    isOver18: true,
    email: "cfilipczakd@soup.io",
    blurbles: 132,
    clubs: [
      { club_id: "4", progress: 62, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/accusantiumexercitationemest.png?size=50x50&set=set1",
    _id: "14"
  },
  {
    username: "mwedgbrowe",
    name: "Matt Wedgbrow",
    isOver18: true,
    email: "mwedgbrowe@mashable.com",
    blurbles: 324,
    clubs: [
      { club_id: "4", progress: 66, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/esseconsecteturdolorum.png?size=50x50&set=set1",
    _id: "15"
  },
  {
    username: "jfyndonf",
    name: "Jorey Fyndon",
    isOver18: false,
    email: "jfyndonf@bizjournals.com",
    blurbles: 272,
    clubs: [
      { club_id: "5", progress: 147, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/sitinventorequis.png?size=50x50&set=set1",
    _id: "16"
  },
  {
    username: "cweatherheadg",
    name: "Claire Weatherhead",
    isOver18: false,
    email: "cweatherheadg@hc360.com",
    blurbles: 288,
    clubs: [
      { club_id: "1", progress: 4, hasNominated: false },
      { club_id: "4", progress: 66, hasNominated: true }
    ],
    avatar: "https://robohash.org/autsedet.png?size=50x50&set=set1",
    _id: "17"
  },
  {
    username: "vrawcliffeh",
    name: "Vinnie Rawcliffe",
    isOver18: true,
    email: "vrawcliffeh@umich.edu",
    blurbles: 171,
    clubs: [
      { club_id: "5", progress: 75, hasNominated: false },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/veldoloreautem.png?size=50x50&set=set1",
    _id: "18"
  },
  {
    username: "iklyneri",
    name: "Iver Klyner",
    isOver18: false,
    email: "iklyneri@washingtonpost.com",
    blurbles: 433,
    clubs: [
      { club_id: "3", progress: 86, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/laborerationeerror.png?size=50x50&set=set1",
    _id: "19"
  },
  {
    username: "fyeldingj",
    name: "Farlee Yelding",
    isOver18: true,
    email: "fyeldingj@foxnews.com",
    blurbles: 497,
    clubs: [
      { club_id: "3", progress: 24, hasNominated: false },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/reprehenderitquiexercitationem.png?size=50x50&set=set1",
    _id: "20"
  },
  {
    username: "lorchartk",
    name: "Lewiss Orchart",
    isOver18: false,
    email: "lorchartk@biblegateway.com",
    blurbles: 473,
    clubs: [
      { club_id: "5", progress: 74, hasNominated: false },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/etperspiciatisrepudiandae.png?size=50x50&set=set1",
    _id: "21"
  },
  {
    username: "nshuryl",
    name: "Nahum Shury",
    isOver18: true,
    email: "nshuryl@com.com",
    blurbles: 66,
    clubs: [
      { club_id: "3", progress: 14, hasNominated: false },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/sedfacilisqui.png?size=50x50&set=set1",
    _id: "22"
  },
  {
    username: "madolfm",
    name: "Malorie Adolf",
    isOver18: true,
    email: "madolfm@etsy.com",
    blurbles: 269,
    clubs: [
      { club_id: "2", progress: 111, hasNominated: true },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/magnivoluptatemfacilis.png?size=50x50&set=set1",
    _id: "23"
  },
  {
    username: "cbransgroven",
    name: "Carson Bransgrove",
    isOver18: false,
    email: "cbransgroven@latimes.com",
    blurbles: 149,
    clubs: [
      { club_id: "1", progress: 109, hasNominated: true },
      { club_id: "4", progress: 66, hasNominated: true }
    ],
    avatar:
      "https://robohash.org/sequidoloribusconsequatur.png?size=50x50&set=set1",
    _id: "24"
  },
  {
    username: "wricciardio",
    name: "Wyndham Ricciardi",
    isOver18: true,
    email: "wricciardio@netscape.com",
    blurbles: 488,
    clubs: [
      { club_id: "3", progress: 81, hasNominated: false },
      { club_id: "1", progress: 97, hasNominated: true }
    ],
    avatar: "https://robohash.org/voluptatemetsed.png?size=50x50&set=set1",
    _id: "25"
  }
];

module.exports = userData;
