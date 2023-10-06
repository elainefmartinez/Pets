const { User } = require("../models");
const {AuthenticationError} = require ("apollo-server-express"); 
const { findByIdAndUpdate} = require("../models/User");
const { signToken } = require("../utils/auth");

