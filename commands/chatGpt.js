const { SlashCommandBuilder } = require('discord.js');
const { postInput, postInputImg } = require('../helpers/openAi-helper');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('gpt')
            .setDescription('Responde a tu peticion')
            .addStringOption(option =>
                option.setName('texto')
                .setDescription('Preguntale o pidele al PerroGPT lo que quieres saber')
                .setRequired(true)),

        async execute(interaction) {
            const userInput = await interaction.options.getString('input');
            console.log(`${interaction.user.username} request: ${userInput}`);
            await interaction.reply(`Generando tu respuesta de: **${userInput}**`);
            const res = await postInput(userInput);
            console.log(`OpenAi responds: ${res}`);
            await interaction.followUp(res);
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('img-gpt')
            .setDescription('El bot te genera una imagen de lo que le pidas (beta)')
            .addStringOption(option =>
                option.setName('texto')
                .setDescription('Escribe lo que quieras que genere')
                .setRequired(true)),

            async execute(interaction) {
                const userInput = await interaction.options.getString('texto');
                console.log(`${ interaction.user.username } request: ${userInput}`);
                await interaction.reply(`Generando tu respuesta de: **${userInput}**`);
                const res = await postInputImg(userInput);
                console.log(`OpenAi responds: ${res}`);
                // TODO: return the image embeded instead of just the URL.
                await interaction.followUp(res);
        },
    },
];
