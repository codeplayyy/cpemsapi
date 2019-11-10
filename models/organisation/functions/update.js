const Organisation = require('../schema');
const { ____name } = require('../../../filters');

module.exports = async function (_id, name) {
    // Filter
    const organisation = new Organisation({
        _id: _id,
        name: ____name(name)
    });

    // Validation
    const error = await organisation.validate();

    if (error) {
        throw new Error(error);
    } else {
        // Run
        const query = {
            _id: _id
        };

        return Organisation.findOneAndUpdate(query, organisation, function (error, organisation) {
            if (error) {
                throw new Error(error);
            } else {
                return organisation;
            }
        })
    }
}