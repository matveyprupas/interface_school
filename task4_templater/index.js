const entryPoint1 = document.querySelector('entry.example1');
const entryPoint2 = document.querySelector('entry.example2');
const entryPoint3 = document.querySelector('entry.example3');
const entryPoint4 = document.querySelector('entry.example4');

function solution(entryPoint) {
    const childNodesArray = [...entryPoint.children];
    if(!childNodesArray.length) {
        return;
    } else {
        const xMakeObj = {
            'copy': [],
            'remove': [],
            'removeChildren': [],
            'switch': []
        };
        childNodesArray.reduce((acc, element) => {
            const xMakeAttr = element.getAttribute('x-make')
            
            if(!xMakeAttr) {
                return acc;
            }
            if(xMakeAttr.includes('copy')) xMakeObj.copy.push(element);
            if(xMakeAttr.includes('remove')) {
                if(xMakeAttr.includes('removeChildren')) {
                    xMakeObj.removeChildren.push(element);
                } else {
                    xMakeObj.remove.push(element)
                }
            };
            
            if(xMakeAttr.includes('switch')) xMakeObj.switch.push(element);
            
            return acc;
        }, xMakeObj);

        xMakeObj.copy.forEach(copyElement => {
            const xMakeCopyArr = copyElement.getAttribute('x-make').split(':');
            copyElement.removeAttribute('x-make');

            for (let i = 0; i < +xMakeCopyArr[1]; i++) {
                const newElement = copyElement.cloneNode(true);
                copyElement.after(newElement);
            }
        });

        xMakeObj.remove.forEach(removeElement => {
            const xMakeRemoveArr = removeElement.getAttribute('x-make').split(':');
            removeElement.removeAttribute('x-make');

            for (let i = 0; i < +xMakeRemoveArr[1]; i++) {
                const removingElement = removeElement.nextElementSibling
                if(removingElement) {
                    removingElement.remove();
                } else {
                    break;
                }
            }
        });

        xMakeObj.removeChildren.forEach(removeChildrenElement => {
            const xMakeRemoveChildrenArr = removeChildrenElement.getAttribute('x-make').split(':');
            removeChildrenElement.removeAttribute('x-make');
            const elementsForRemove = [...removeChildrenElement.children].slice(0, +xMakeRemoveChildrenArr[1])
            elementsForRemove.forEach(element => element.remove());
        });

        xMakeObj.switch.forEach(switchElement => {
            console.log(xMakeObj);
            // debugger
            if(!switchElement.getAttribute('x-make')) {
                return
            }
            const xMakeswitchArr = switchElement.getAttribute('x-make').split(':');
            const parentSwitchElement = switchElement.parentElement;
            if(!parentSwitchElement) {
                return
            }
            const parentChildrens = [...parentSwitchElement.children];
            const selfIndex = parentChildrens.indexOf(switchElement);
            const pasteIndex = +xMakeswitchArr[1] >= parentChildrens.length ? +xMakeswitchArr[1] % parentChildrens.length : +xMakeswitchArr[1];

            switchElement.removeAttribute('x-make');

            if(+xMakeswitchArr[1] > parentChildrens.length) {
                parentSwitchElement.insertBefore(parentChildrens[pasteIndex], parentChildrens[selfIndex])
            } else {
                parentSwitchElement.insertBefore(parentChildrens[pasteIndex], parentChildrens[selfIndex]);
                parentSwitchElement.insertBefore(parentChildrens[selfIndex], parentChildrens[pasteIndex])
            }
            if(!xMakeObj.switch.length) {
                solution(parentSwitchElement);
            }
        });

        childNodesArray.forEach(element => solution(element));
    }
}

solution(entryPoint1);
solution(entryPoint2);
solution(entryPoint3);
solution(entryPoint4);
