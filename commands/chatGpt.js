const { SlashCommandBuilder } = require('discord.js');
const postInput = require('../utils/openAi-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Responde a tu peticion')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Preguntale o pidele al PerroGPT lo que quieres saber')
            .setRequired(true)),

    async execute(interaction) {
        const userInput = await interaction.options.getString('input');
        console.log(`${interaction.user.username} request: ${userInput}`);
        await interaction.reply(`Generando tu respuesta de: **${userInput}**...`);
        const res = await postInput(userInput);
        console.log(`OpenAi responds: ${res}`);
        await interaction.followUp(res);
    },
};
