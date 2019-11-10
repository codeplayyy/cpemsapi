const ObjectId = require('mongoose').Types.ObjectId;
const Organisation = require('../schema');
const { ____name } = require('../../../filters');

module.exports = async function (name) {
    // Filter
    const organisation = new Organisation({
        _id: new ObjectId(),
        name: ____name(name)
    });

    // Validation
    const error = await organisation.validate();

    if (error) {
        throw new Error(error);
    } else {
        // Run
        return organisation.save().then((organisation) => {
            return organisation;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}