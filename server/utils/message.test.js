var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate a message object', () => {
        let from = 'Tim';
        let text = 'Hey, this is a test';
        let message = generateMessage(from, text);
        expect(message !== undefined).toBeTruthy();
        expect(typeof message.from).toEqual('string');
        expect(typeof message.text).toEqual('string');
        expect(message).toMatchObject({
            from,
            text
        });
        expect(typeof message.createdAt).toEqual('number');
    });
});