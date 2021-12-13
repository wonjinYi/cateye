import { getElementByXpath } from './getElementByXpath.js';

// maxWaitTime : 최대한 기다릴 시간 (초)
// findInterval : 어떤 엘리먼트 획득을 시도할 시간간격 (초)
// elementXpath : 획득할 엘리먼트의 XPath
// callback : 어떤 엘리먼트를 획득하면 실행할 함수

const waitElementLoad = ({ maxWaitTime, findInterval, elementXpath, callback }) => {
    let cnt = parseInt(maxWaitTime / findInterval);
    const findInterval_ms = findInterval * 1000

    const intervalId = setInterval(() => {
        try {
            const el = getElementByXpath(elementXpath);
            if (el) {
                clearInterval(intervalId);
                callback();
            } else {
                cnt--;
                if (cnt <= 0) {
                    clearInterval(intervalId);
                    console.info('[waitElementLoad]can not find element : ', elementXpath);
                }
            }
        } catch (err) {
            clearInterval(intervalId);
            console.error('[waitElementLoad]error occured : ', err);
        }
    }, findInterval_ms)



}

export { waitElementLoad };