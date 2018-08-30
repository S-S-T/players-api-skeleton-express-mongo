/* SST */
const mongoose = require('mongoose');
const playerID = new extractPlayerID();

const PlayerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true
  },
  last_name: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  handedness: {
    type: String,
    required: true
  },
  created_by: {
    type: String
  }
}, playerID);
mongoose.model('Player', PlayerSchema);
module.exports = mongoose.model('Player');

// Auto generated ID used for other functionality
function extractPlayerID() {
  return {
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  };
}
