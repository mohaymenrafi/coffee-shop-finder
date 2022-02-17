import {
  findCoffeeStoreById,
  getSimplifiedRecord,
  table,
} from '../../lib/airTable';

const updateVoting = async (req, res) => {
  const { id } = req.body;
  if (req.method === 'PUT') {
    try {
      if (id) {
        const record = await findCoffeeStoreById(id);
        if (record.length !== 0) {
          const voteIncrement = record[0].voting + 1;
          const updateRecord = await table.update([
            {
              id: record[0].recordId,
              fields: {
                voting: voteIncrement,
              },
            },
          ]);
          res.status(200).json(getSimplifiedRecord(updateRecord));
        } else {
          res.status(500).json('issue while fetching store');
        }
      } else {
        req.status(400).json('No id found');
      }
    } catch (err) {
      console.log('error finding coffee store for upvoting', { err });
    }
  }
};

export default updateVoting;
