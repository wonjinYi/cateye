const removeElement = (el) => {
    if(el && el.parentNode){
        el.parentNode.removeChild(el);
        return true;
    } else {
        console.error("[removeElement]Undefined element")
        return false;
    }
}

export {removeElement};