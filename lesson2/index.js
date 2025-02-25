console.log('Начало');

setTimeout(() => {
    console.log('Макрозадача (setTimeout)');
}, 0);

Promise.resolve().then(() => {
    console.log('Микрозадача (Promise)');
});

console.log('Конец');

// Начало Конец Микрозадача (Promise) Макрозадача (setTimeout)