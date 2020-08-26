console.log(`Hello from component WebPack`);

export default class TestClass {
    constructor() {
        const appWrapper = document.querySelector('app');
        const message = `Using ES2015+ syntax`;
        appWrapper.append(message);
    }
}
