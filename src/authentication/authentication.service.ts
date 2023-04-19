import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthenticationService {
  generateFakeData() {
    const data = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        date: faker.date.recent().toLocaleDateString(),
        value: faker.datatype.number({ min: 1, max: 100 }),
      });
    }

    return data;
  }

  generateTrafficData = () => {
    const trafficData = {
      organicSearch: { user: 0, percent: 0 },
      referral: { user: 0, percent: 0 },
      direct: { user: 0, percent: 0 },
      social: { user: 0, percent: 0 },
      other: { user: 0, percent: 0 },
      email: { user: 0, percent: 0 },
    };

    for (let i = 0; i < 10000; i++) {
      const user = faker.datatype.number({ min: 1, max: 2000 });

      switch (true) {
        case user <= 600:
          trafficData.organicSearch.user++;
          break;
        case user <= 1000:
          trafficData.referral.user++;
          break;
        case user <= 1400:
          trafficData.direct.user++;
          break;
        case user <= 1700:
          trafficData.social.user++;
          break;
        case user <= 1900:
          trafficData.other.user++;
          break;
        default:
          trafficData.email.user++;
          break;
      }
    }

    const totalTraffic = Object.values(trafficData).reduce(
      (acc, val) => acc + val.user,
      0,
    );

    for (const key in trafficData) {
      const source = trafficData[key];
      const percent = ((source.user / totalTraffic) * 100).toFixed(2);
      source.percent = `${percent}%`;
    }

    return trafficData;
  };

  generateFollow = () => {
    const data = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        followers: faker.datatype.number({ min: 1, max: 100000 }),
        following: faker.datatype.number({ min: 1, max: 100000 }),
        like: faker.datatype.number({ min: 1, max: 10000 }),
        tweet: faker.datatype.number({ min: 1, max: 1000000 }),
        Inactive: faker.datatype.number({ min: 1, max: 10000 }),
        lessTweet: faker.datatype.number({ min: 1, max: 10000 }),
        lessFollowers: faker.datatype.number({ min: 1, max: 10000 }),
        noneAvatar: faker.datatype.number({ min: 1, max: 1000 }),
        spamy: faker.datatype.number({ min: 1, max: 1000 }),
        unevenRatio: faker.datatype.number({ min: 1, max: 1000 }),
        noneBios: faker.datatype.number({ min: 1, max: 10000 }),
        noneLocation: faker.datatype.number({ min: 1, max: 10000 }),
        noneUrl: faker.datatype.number({ min: 1, max: 10000 }),
      });
    }

    return data;
  };
}
