

module.exports = function (data){
    let tree = data.tree.filter(function (item) { return (item.type == 'tree'); });

    let categories = [];

    tree.forEach(function (item){
        let pathArr     = item.path.split('/');
        let name        = pathArr.pop();
        let parent      = pathArr.join('/');

        let formattedItem = {
            name,
            path    : item.path,
            parent,
        };

        categories.push(formattedItem)
    });

    return categories;
};