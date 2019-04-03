const {render, html, svg} = lighterhtml;
const viewControl = {
    views: []
};

viewControl.add = function (target, source) {
    let key = viewControl.views.find( x => x.target === target);
    if (key) {
        key.source = source;
    }
    else {
        let viewDef = {target: target, source: source};
        viewControl.views.push(viewDef);  
    }  
    console.log(`added key ${target}`);
    render(target, source);
}

viewControl.deleteView = function (target) {
    let key = viewControl.views.find( x => x.target === target);
    if (key) {
        let deleted = viewControl.views.splice(key);
        console.log('deleted view' + deleted);
    }
    render(target, () => html`<span />`);
}

viewControl.deleteAll = function () {
    viewControl.views = [];
}

viewControl.update = function () {
    //get object keys
    //find each target or create if not exists??? TODO should we only allow existing elements here?
    //and render them
    //
    let renders = viewControl.views;
    console.log(renders);
    renders.forEach(x => render(x.target, x.source));
}

export default viewControl;