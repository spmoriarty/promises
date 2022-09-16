const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');
const crypto = require('crypto');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('get by ID', async () => {
    const cat = {
      name: 'Garfield',
    };
    const id = crypto.randomBytes(1).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(cat));
    const data = new SimpleDb(TEST_DIR);
    const result = await data.getById(id);
    expect(result).toEqual(cat);
  });

  it('Should save file', async () => {
    const car = {
      name: 'Koniegsegg',
    };
    const data = new SimpleDb(TEST_DIR);
    await data.save(car);
    const result = await data.getById(car.id);
    expect(result).toEqual(car);
  });

  it('Should get all', async () => {
    const bugs = [{
      name: 'Mantis',
    }, {
      name: 'Ant',
    }, {
      name: 'Cricket'
    }];
    const data = new SimpleDb(TEST_DIR);
    bugs.forEach((bugs) => {
      return data.save(bugs);
    });
    return data.getAll().then((result) => {
      
      expect(result).toEqual([
        {
          id: expect.any(String),
          name: expect.any(String),
        },
        {
          id: expect.any(String),
          name: expect.any(String),
        },
        {
          id: expect.any(String),
          name: expect.any(String),
        },
      ]);
    });
 
  });

});
