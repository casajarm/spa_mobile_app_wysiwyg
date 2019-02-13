//startselector.js returns StartSelector Objects
async function getStartSelectors() {

    const query = new Parse.Query(StartSelector);

    try {

        return await query.find();

    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

export default getStartSelectors;