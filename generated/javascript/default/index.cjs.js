const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'app-location-maison',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

