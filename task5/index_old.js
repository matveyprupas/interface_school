// interface RenderItem {
//     id: string; // идентификатор элемента
//     priority: number; // приоритет рендеринга - сначала рендерим элементы с наибольшим приоритетом
//     render: () => Promise<RenderItem[]>; // асинхронная функция, которая выполняет рендеринг текущего элемента и возвращает список вложенных элементов для рендеринга либо null
// }


// function renderAsync(renderItems: RenderItem[], n: Number): Promise<string[]>;
// ["B","A","B.1","B.2","B.3","A.1","B.4","A.1.1","B.5","B.6"]


module.exports = async function (renderItems, n) {  
    const result = [];

    function renderAsync (renderItems, n) {
        const childs = [];
        renderItems.sort((a, b) => b.priority - a.priority);

        renderItems.forEach(async (el, index, array) => {
            result.push(el.id);
            // console.log(childrenArray);
    
            const children = await el.render();
            console.log(array, childs);
    
            if(children) {
                childs.push(...children);
                // console.log(childs);

                if(index === array.length - 1) {
                    const childrenArray = renderAsync(childs, n);
                    console.log('childrenArray', childrenArray);
                    result.push(...childrenArray);
                }

            } else {
                return;
            }
        });
        return childs;
    }

    renderAsync (renderItems, n);
    
    return result;
}