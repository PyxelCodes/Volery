

const EPOCH = 1630454400;
let INCREMENT = 0;

export class SnowflakeUtil extends null {
    static generate(timestamp: any = Date.now()) {
        if (timestamp instanceof Date) timestamp = timestamp.getTime();
        if (typeof timestamp !== 'number' || isNaN(timestamp)) {
            throw new TypeError(
                `"timestamp" argument must be a number (received ${isNaN(timestamp) ? 'NaN' : typeof timestamp})`,
            );
        }
        if (INCREMENT >= 4095) INCREMENT = 0;
        const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, '0')}0000100000${(INCREMENT++)
            .toString(2)
            .padStart(12, '0')}`;
        return this.binaryToId(BINARY);
    }

    static binaryToId(num: any) {
        let dec = '';

        while (num.length > 50) {
            const high = parseInt(num.slice(0, -32), 2);
            const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

            dec = (low % 10).toString() + dec;
            num =
                Math.floor(high / 10).toString(2) +
                Math.floor(low / 10)
                    .toString(2)
                    .padStart(32, '0');
        }

        num = parseInt(num, 2);
        while (num > 0) {
            dec = (num % 10).toString() + dec;
            num = Math.floor(num / 10);
        }

        return dec;
    }

    static get EPOCH() {
        return EPOCH;
    }
}