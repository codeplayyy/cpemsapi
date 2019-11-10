const mongoose = require('mongoose');
const { __name } = require('../../patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return __name.test(value);
            },
        }
    },
})

module.exports = mongoose.model('Organisation', schema);