const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
mockgoose(mongoose);

const app = require('../../app')(mongoose);

module.exports = app;
