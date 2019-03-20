// SOME TESTS HERE
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";
const id = 'GiZ8X0ePuE';
Channel.populate(id) 
.then( async function() {
    let mainCat = Channel.mainCategory;
    console.log('main category is ' + mainCat.id);
    let mainCategoryLikemojis = Channel.catLikemojis(mainCat);
    console.log('has count mojis: ' + mainCategoryLikemojis.length);
    let testLikemoji = mainCategoryLikemojis[0];
    console.log('lets remove moji id: ' + testLikemoji.id);
//  test removing a likemoji from a channel and then add it back
    await Channel.removeCategoryLikemoji(mainCat, testLikemoji);
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('now category has count mojis:' + mainCategoryLikemojis.length);
    console.log('lets add it back');
    await Channel.addCategoryLikemoji(mainCat, testLikemoji);
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('now category has count mojis:' + mainCategoryLikemojis.length);
// now lets delete the moji from the channel
    let chanLikemojis = Channel.likemojis;
    console.log(`Channel has ${chanLikemojis.length} likemojis`); 
    await Channel.deleteLikemoji(testLikemoji);
    console.log(`Channel has ${chanLikemojis.length} likemojis`); 
    console.log('the category without asking has count: ' + mainCategoryLikemojis.length);
    // value not reference....
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('the category after asking has count: ' + mainCategoryLikemojis.length);
    //what I want to be able to do it Channel.categories[0].likemojis
    if (Channel.subCategories.length == 0) { 
        console.log('no subcategories found for this channel');
        let newClone = mainCat.clone();
        delete newClone.id;
        newClone.set('main', 0);
        await newClone.save(); //it seems we must save it to have the id for the groups array
        await Channel.addCategory(newClone);
           
    }
    let lastCat = Channel.subCategories[Channel.subCategories.length -1];
    console.log('found last category named' + lastCat.get('name'));
    console.log(`Channel has ${Channel.subCategories.length} groups/categories `)
    // create a clone o we can add it back
    let newCat = lastCat.clone();
    delete newCat.objectId;    
    console.log('remove the category');
    await Channel.deleteCategory(lastCat);
    console.log(`Channel now has ${Channel.subCategories.length} groups/categories `);
    Channel.addCategory(newCat); // can we add it without having saved it...we need an id no?
    console.log(`Channel now has ${Channel.subCategories.length} groups/categories `);
    console.log(`Newly added category has ${Channel.catLikemojis(newCat).length} likemojis...add one more`);
    await Channel.addCategoryLikemoji(newCat, Channel.likemojis[Channel.likemojis.length-1]);
    console.log(`category now has ${Channel.catLikemojis(newCat).length} likemojis.`); 

});