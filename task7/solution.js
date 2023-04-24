// на уровне модуля можно писать код, но импортироваться будет только getObserverCallback
function headersRemover (array) {
    const result = [];
    const resultHeaders = [];
    array.reverse().map(el => {
        if(!resultHeaders.includes(el.dataset.header)) {
            result.push(el)
            resultHeaders.push(el.dataset.header);
        }
        return el.dataset.header
    });
    return result.reverse();
}

export function getObserverCallback(updateBreadcrumbs) {
    if(typeof updateBreadcrumbs !== 'function') return ()=>[]; 
    let startEntires = [];
    let startEntiresTargets = [];
    let firstHeaderId;
    let result = [];
    return function (entires) {
        if(!Array.isArray(entires)) {
            updateBreadcrumbs([]);
        }
        if(!startEntires.length) {
            startEntires = [...entires];
            startEntiresTargets = startEntires.map(el => el.target);
            firstHeaderId = startEntires[0].target.id;
            result = [startEntires[0].target];
        }

        let lastHeader;

        lastHeader = entires.filter(el => el.boundingClientRect.top <= 16 && el.boundingClientRect.top >= -16 )[0];
        console.log(lastHeader)
        if(!!lastHeader) {
            const lastTargetId = startEntiresTargets.indexOf(lastHeader.target);
            const scrolledHeadersArray = startEntiresTargets.slice(0, lastTargetId + 1);
            const filteredScrolledHeadersArray = scrolledHeadersArray.filter((el, i, arr) => {
                if (i === 0 || i === arr.length - 1) return true;

                if(el.dataset.header >= arr[arr.length-1].dataset.header) return false;

                return true
            });
            result = headersRemover(filteredScrolledHeadersArray);
        }
        
        updateBreadcrumbs(result.map(el => el.id))
    }
}
