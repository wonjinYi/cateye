// 특정 조건이 만족될 때까지 정해진 횟수/간격으로 반복하는 함수입니다.

// repeatFunction을 timeInterval(초)의 간격으로 reps번 호출합니다.

// repeatFunction호출의 리턴값이 true이면 반복을 중단합니다.
// repeatFunction호출의 리턴값이 false이면 반복을 계속합니다.
// repeatFunction가 reps번 호출되면 반복을 중단합니다.

// 반복이 중단되면 callbackAfterRepeat을 호출하고 프로그램을 완전 종료합니다.

const repeatUntilBreak = ({reps, timeInterval, repeatFunction, callbackAfterRepeat}) => {
    let cnt = reps;
    const interval_ms = timeInterval*1000;
    const intervalId = setInterval( () => {
        try {
            const breakCondition = repeatFunction();
            if(breakCondition){
                clearInterval(intervalId);
                callbackAfterRepeat();
            } else {
                cnt--;
                if (cnt <= 0) {
                    clearInterval(intervalId);
                    callbackAfterRepeat();
                }
            }
        } catch (err) {
            clearInterval(intervalId);
            console.error('[repeatUntilBreak]error occured : ', err);
        }
    }, interval_ms);
}

export {repeatUntilBreak};