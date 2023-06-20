import React, { useEffect, useState } from "react";
import IDate from "../../types/IDate";
import { convertToDate } from "../../helper/DateHelper";

let timer: null | NodeJS.Timer = null;

const Counter = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [startSecondsFrom, setStartSecondsFrom] = useState<number>(0);

    const startInterval = (startFrom: number) => {
        setSeconds(startFrom);
        timer = setInterval(() => {
            setSeconds((second: number) => second + 1);
        }, 1000);
    }

    const pauseInterval = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    const start = () => {
        startInterval(startSecondsFrom);
    }

    const playPause = () => {
        if (timer) {
            pauseInterval();
        }
        else {
            startInterval(seconds);
        }
    }

    const stop = () => {
        setSeconds(0);
        pauseInterval();
    }

    const onChangeStartSecondsFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        let startFrom: number = parseInt(event.target.value) || 0;
        if (startFrom < 0) startFrom = 0;
        setStartSecondsFrom(startFrom);
    }

    useEffect(() => {
        return () => {
            stop();
        }
    }, []);

    const time: IDate = convertToDate(seconds);

    return (
        <div>
            <h1 className="text-4xl font-medium">Counter App</h1>
            <hr className="mt-4" />
            <div className="mt-4">
                <label className="block mb-1 text-md leading-6 text-gray-900">Start seconds from</label>
                <input
                    type="number"
                    min={0}
                    className="block py-2 px-4 border border-slate-300 rounded text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none"
                    placeholder="Start seconds from"
                    value={startSecondsFrom}
                    onChange={onChangeStartSecondsFrom}
                />
            </div>
            <div className="my-8 flex items-center gap-4">
                <Time text={time.days} description="Days" />
                <Time text={time.hours} description="Hours" />
                <Time text={time.minutes} description="Minutes" />
                <Time text={time.seconds} description="Seconds" />
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    className="rounded-md bg-indigo-600 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-500"
                    onClick={start}
                    disabled={Boolean(timer)}
                >
                    Start
                </button>
                <button
                    className="rounded-md bg-yellow-600 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-yellow-500 disabled:bg-slate-200 disabled:text-slate-500"
                    onClick={playPause}
                    disabled={!Boolean(timer)}
                >
                    Play/Pause
                </button>
                <button
                    className="rounded-md bg-red-500 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-400 disabled:bg-slate-200 disabled:text-slate-500"
                    onClick={stop}
                    disabled={!Boolean(timer)}
                >
                    Stop
                </button>
            </div>
        </div>
    )
}

const Time = ({ text, description }: { text: string, description: string }) => {
    return (
        <div className="">
            <div className="flex items-center justify-center w-16 h-16 shadow-lg shadow-slate-400">
                <p className="text-2xl">{text}</p>
            </div>
            <p className="text-slate-800 text-center text-sm mt-2">{description}</p>
        </div>
    )
}

export default Counter
