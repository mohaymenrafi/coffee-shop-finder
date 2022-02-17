const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

const table = base('coffee-stores');

const getSimplifiedRecord = (record) =>
  record.map((item) => ({
    ...item.fields,
    recordId: item.id,
  }));

const findCoffeeStoreById = async (id) => {
  const findCoffeeStoreRecord = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getSimplifiedRecord(findCoffeeStoreRecord);
};

export { table, getSimplifiedRecord, findCoffeeStoreById };
