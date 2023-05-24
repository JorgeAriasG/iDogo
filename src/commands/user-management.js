const { SlashCommandBuilder } = require('discord.js');

// const permissions = (1 << 5).toString();

module.exports = [
    {
        data: new SlashCommandBuilder()
        .setName('expulsar')
        .setDescription('Expulsa a un usuario del servidor'),
        // .setDefaultMemberPermissions(permissions),

        async execute(interaction) {
            console.log('user kicked test');
            interaction.reply('User kicked test');

        },
    },
];