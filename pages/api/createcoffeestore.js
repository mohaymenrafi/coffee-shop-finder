import { table, getSimplifiedRecord } from '../../lib/airTable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, voting, neighborhood, imgUrl } = req.body;
    console.log('type', typeof id);
    console.log(req.body);
    try {
      if (id) {
        const findCoffeeStoreRecord = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCoffeeStoreRecord.length !== 0) {
          res.json(getSimplifiedRecord(findCoffeeStoreRecord));
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
