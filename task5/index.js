// interface RenderItem {
//     id: string; // идентификатор элемента
//     priority: number; // приоритет рендеринга - сначала рендерим элементы с наибольшим приоритетом
//     render: () => Promise<RenderItem[]>; // асинхронная функция, которая выполняет рендеринг текущего элемента и возвращает список вложенных элементов для рендеринга либо null
// }


// function renderAsync(renderItems: RenderItem[], n: Number): Promise<string[]>;
// ["B","A","B.1","B.2","B.3","A.1","B.4","A.1.1","B.5","B.6"]


module.exports = async function (renderItems, n) {  
    renderItems.sort((a, b) => b.priority - a.priority);

    function getFullData (renderItems) {
        const result = renderItems.reduce((acc, el) => {

            // console.log(el.children);

            let children = [];
            el.render()
                .then(res => {
                    if (res === null) {
                        children = null;
                        return children;
                    }
                    children.push(...res);
                    return children;
                })
                .then(res => {
                    console.log(res);
                    if( res ) {
                        getFullData(res);
                    }
                });
            acc.push({...el, children})
            return acc;
        }, []);

        // console.log('result: ', result);

        return result;
    }
    const data = getFullData(renderItems);

    // console.log('data: ', data);
    
    return data;
}