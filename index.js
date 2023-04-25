// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

let Ajv = require('ajv');
let ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    vertical: {
      type: 'string',
    },
    shipment_id: {
      type: 'string',
    },
    order_id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    country_code: {
      type: 'string',
    },
  },
  required: ['vertical', 'shipment_id', 'order_id'],
  anyOf: [
    {
      required: ['phone', 'country_code'],
    },
    {
      required: ['email'],
      not: {
        anyOf: [{ required: ['phone'] }, { required: ['country_code'] }],
      },
    },
  ],
};

const payload = {
  vertical: 'beauty',
  shipment_id: '89137398h3939h',
  order_id: '17363929363Q',
  email: 'ajz@mail.com',
  phone: '183638',
  country_code: '+91',
};

function schemaValidation(schema, payload) {
  return ajv.validate(schema, payload);
}

const result = schemaValidation(schema, payload);

console.log(result);
