import { goraniStore } from './libraries/goraniStore/src/goraniStore.js';
import { getElementByXpath } from './tools/getElementByXpath.js';
import { waitElementLoad } from './tools/waitElementLoad.js';

const xpathList = {
    cabinet : '/html/body/div[1]/div[1]/div[2]/div/div[3]/div',
    labeingTextInput : '/html/body/div[1]/div[1]/div[2]/div/div[3]/div/div[1]/div/div[2]/div[1]/div[2]/textarea',
};

const storeList = {
    fontSize : {
        key : 'cateye_053_fontSize',
        defaultValue : 32,
        type : 'Number',
    },
    show : {
        key : 'cateye_053_show',
        defaultValue : false,
        type : 'Boolean',
    },
    topPos : {
        key : 'cateye_053_topPos',
        defaultValue : 20,
        type : 'Number',
    },
    leftPos : {
        key : 'cateye_053_leftPos',
        defaultValue : 20,
        type : 'Number',
    }
}

export const main = () => {
    console.log('Main is running');

    let show = new goraniStore(storeList.show);
    let fontSize = new goraniStore(storeList.fontSize);
    let topPos = new goraniStore(storeList.topPos);
    let leftPos = new goraniStore(storeList.leftPos);
    let textValue = 'cateye v0.0.2';

    let clientx = 0;
    let clienty = 0;

    const text = document.createElement('h1');
    text.style.position = 'fixed';
    text.style.pointerEvents = 'none';
    text.style.zIndex = '999';
    text.style.position = 'fixed';
    text.style.top = '50%';
    text.style.left = '50%';
    text.style.display = show.get() ? 'block' : 'none';
    text.style.border = '1px solid grey';
    text.style.backgroundColor = 'white'
    text.style.fontSize = `${fontSize.get()}px`;
    text.style.padding = '4px';
    text.textContent = textValue;
    document.body.appendChild(text);

    let isShift = false;
    const handleKeyup = (e) => {
        if (e.key === 'Shift') { isShift = false; }
    };
    const handleKeydown = (e) => {
        if (e.key === 'Shift') { isShift = true; }

        if (isShift) {
            if (e.key === 'd' || e.key === 'D') {
                show.set(!show.get());
                text.style.display = show.get() ? 'block' : 'none';
            } else if (e.key === 'a' || e.key === 'A') {
                fontSize.set( fontSize.get() - 1 )
                text.style.fontSize = `${fontSize.get()}px`;
            } else if (e.key === 's' || e.key === 'S') {
                fontSize.set( fontSize.get() + 1 )
                text.style.fontSize = `${fontSize.get()}px`;
            } else if (e.key === 'ArrowLeft') {
                leftPos.set( leftPos.get() - 2 );
                text.style.left = `${clientx + leftPos.get()}px`;
            } else if (e.key === 'ArrowRight') {
                leftPos.set( leftPos.get() + 2 );
                text.style.left = `${clientx + leftPos.get()}px`;
            } else if (e.key === 'ArrowUp') {
                topPos.set( topPos.get() - 2 );
                text.style.top = `${clienty + topPos.get()}px`;
            } else if (e.key === 'ArrowDown') {
                topPos.set( topPos.get() + 2 );
                text.style.top = `${clienty + topPos.get()}px`;
            }

        }
    };

    const handleMousemove = (e) => {
        clientx = e.clientX;
        clienty = e.clientY;
        text.style.top = `${clienty + topPos.get()}px`;
        text.style.left = `${clientx + leftPos.get()}px`;
    };

    const handleClick = (e) => {
        show.get() && waitElementLoad({
            maxWaitTime : 1, 
            findInterval : 0.01, 
            elementXpath : xpathList.labeingTextInput, 
            callback : ()=>{
                const el = getElementByXpath(xpathList.labeingTextInput)
                textValue = el.value;
                text.textContent = textValue; 
            } 
        });
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mousedown', handleClick);   
}