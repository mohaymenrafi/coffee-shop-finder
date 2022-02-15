import { getSimplifiedRecord, table } from '../../lib/airTable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const findCoffeeStoreRecord = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      if (findCoffeeStoreRecord.length !== 0) {
        const result = getSimplifiedRecord(findCoffeeStoreRecord);
        res.status(200).json(result);
      } else {
        res.json('No match found with this id');
      }
    } else {
      res.send('no valid id found');
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
};
export default getCoffeeStoreById;
