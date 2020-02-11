import faker from "faker";

let mockData = [];
let singer = faker.name.firstName();
let genre = faker.lorem.word();

for (let i = 0; i < 120; i++) {
  if (i % 4 === 0) {
    singer = faker.name.firstName();
    genre = faker.lorem.word();
  }
  mockData.push({
    id: i,
    singer: singer,
    song: faker.name.title(),
    genre: genre,
    year: 2018 - randomInteger(1, 15)
  });
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export default mockData;
