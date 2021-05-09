export class StartConditions {
    constructor (
        public matrix: Array<Array<number>>,
        public rule: string,
        public steps: number,
        public test
    ) {
    }
}