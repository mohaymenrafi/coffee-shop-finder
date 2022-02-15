const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

const table = base('coffee-stores');

const getSimplifiedRecord = (record) => record.map((item) => item.fields);

export { table, getSimplifiedRecord };
