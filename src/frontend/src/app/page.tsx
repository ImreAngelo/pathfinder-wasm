"use client";

import { useEffect, useState } from 'react';
import adder from './cpp/add.js';

function wasmAdd(a: number, b: number) {
    return new Promise<number>(async (resolve) => {
        const res = await adder().then(async instance => await instance._add(a, b))
        resolve(res);
    });
}

export default function Home() {
    const [wasmResult, setWasmResult] = useState<number | null>(0);

    // Load WebAssembly when the component mounts
    useEffect(() => {
        wasmAdd(5, 3).then(setWasmResult);
    }, []);  

    return (
        <div>
            <h1>Wasm in Next.js Example</h1>
            <p>Result of 5 + 3 is {wasmResult}</p>
        </div>
    );
}
