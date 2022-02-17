import { findCoffeeStoreById } from '../../lib/airTable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const record = await findCoffeeStoreById(id);
      if (record.length !== 0) {
        res.status(200).json(record);
      } else {
        res.status(500).json('ID did not match with any listings');
      }
    } else {
      res.send('no valid id found');
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
};
export default getCoffeeStoreById;
