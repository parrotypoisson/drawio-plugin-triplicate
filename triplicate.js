Draw.loadPlugin(function(ui){

    mxResources.parse('triplicate=Triplicate');

    ui.actions.addAction('triplicate', function(){
        const graph = ui.editor.graph;

        graph.model.beginUpdate();

        const selected = graph.getSelectionCells().slice();

        for(let i = 0; i < selected.length; i++){
            if(!selected[i].isEdge()){
                graph.moveCells([selected[i]], -10, -10, true);
                graph.orderCells(false, [selected[i]].concat(selected[i].edges));
            }
        }

        for(let i = 0; i < selected.length; i++){
            if(!selected[i].isEdge()){
                graph.moveCells([selected[i]], 10, 10, true);
            }
        }

        graph.model.endUpdate();
    });

    const menu = ui.menus.get('edit');
    const oldFunct = menu.funct;
    menu.funct = function(menu, parent){
        oldFunct.apply(this, arguments);
        ui.menus.addMenuItems(menu, ['-', 'triplicate'], parent);
    };
});
