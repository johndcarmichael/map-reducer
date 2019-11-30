const reducer = require('../src/reducer')

const map = {
  starts: Number,
  wins: Number,
  secondPlaces: Number,
  thirdPlaces: Number,
  topFives: Number,
  topFiveRatio: Number,
  mostRecentRank: {
    event: {
      eventSeriesId: String,
      parentEvent: String,
      name: String,
      date: { from: String, to: String },
      locations: [{ country: String, city: String, timezone: String }],
      sport: String,
      discipline: String,
      photo: String,
      _id: String
    },
    rank: Number
  },
  bestRank: Number
}

it('Should handle null leaf values ', () => {
  const input = {
    starts: 0,
    wins: 0,
    secondPlaces: 0,
    thirdPlaces: 0,
    topFives: 0,
    topFiveRatio: null,
    mostRecentRank: {
      event: {
        locations: [{
          country: null
        }]
      }
    },
    bestRank: null
  }
  expect(reducer(input, map)).toEqual(input)
})
