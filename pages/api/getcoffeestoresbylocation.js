import { fetchCoffeeStores } from '../../lib/coffe-store';

const getCoffeeStoresByLocation = async (req, res) => {
  const { latlong } = req.query;
  try {
    const response = await fetchCoffeeStores(latlong);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export default getCoffeeStoresByLocation;
