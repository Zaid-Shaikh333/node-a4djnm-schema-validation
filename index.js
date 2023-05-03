// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

let Ajv = require('ajv');
let ajv = new Ajv({ allErrors: true });

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

let validator;
function schemaValidation(schema, payload) {
  validator = ajv.compile(schema);
  return validator(payload);
}

const result = schemaValidation(schema, payload);
if (!result) console.log(validator.errors);
console.log(result);
