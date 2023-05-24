/* eslint-disable no-undef */
const { Events } = require('discord.js');
const client = require('../../app');
const expect = require('chai').expect;

describe('#UserTests', () => {
    describe('-User added', () => {
        it('detects when a new user is added to the guild', () => {
            const user = client.emit(Events.GuildMemberAdd);
            expect(user).to.equal(true);
        });
    });

    describe('-User banned', () => {
        it('detects when a user is banned from the guild', () => {
            const user = client.emit(Events.GuildBanAdd);
            expect(user).to.equal(true);
        });
    });
});
