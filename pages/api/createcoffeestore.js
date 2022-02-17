import {
  table,
  getSimplifiedRecord,
  findCoffeeStoreById,
} from '../../lib/airTable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, voting, neighborhood, imgUrl } = req.body;
    try {
      if (id) {
        const coffeeStoreRecord = await findCoffeeStoreById(id);
        if (coffeeStoreRecord.length !== 0) {
          res.status(200).json(coffeeStoreRecord);
        } else if (name) {
          const createRecord = await table.create([
            {
              fields: {
                id,
                name,
                address,
                voting,
                neighborhood,
                imgUrl,
              },
            },
          ]);
          const newRecord = getSimplifiedRecord(createRecord);
          res.json(newRecord);
        } else {
          res.status(400).json('Name is missing');
        }
      } else {
        res.status(400).json('Id is missing');
      }
    } catch (err) {
      res.status(500).json({ error: 'Error creating or finding a store' });
    }
  }
};
export default createCoffeeStore;
