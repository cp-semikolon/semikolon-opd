Package.describe({
  name: 'opd-model',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('aldeed:collection2');
  api.use('kadira:flow-router');

  api.addFiles([
    'lib/namespace.js',
    'lib/countries.js',
    // models
    'models/patients.js',
    'models/appointments.js',
    'models/otps.js',

    //schemas
    'schemas/appointments-schema.js',
    // 'schemas/departments-schema.js',
    // 'schemas/diseases-schema.js',
    // 'schemas/dispenses-schema.js',
    // 'schemas/medicines-schema.js',
    'schemas/patients-schema.js',
    // 'schemas/treatments-schema.js',
    // 'schemas/users-schema.js',
    // 'schemas/works-schema.js'
  ]);

  api.export('Model');
  api.export('Schema');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('opd-model');
  api.addFiles('opd-model-tests.js');
});
