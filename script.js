const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Telegram Bot token obtained from BotFather
const token = '6145508781:AAEoUPGYLEsJxR6I50S7Bl7tlNIjELSwpfI';

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to get a random Wikipedia article
async function getRandomWikipediaArticle() {
  try {
    const response = await axios.get(
      'https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json'
    );
    const article = response.data.query.random[0];
    return article.title;
  } catch (error) {
    console.error('Error getting Wikipedia article:', error);
    throw error;
  }
}

// Handle /random command
bot.onText(/\/random/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const articleTitle = await getRandomWikipediaArticle();
    const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;
    bot.sendMessage(chatId, `Random Wikipedia article:\n${articleUrl}`);
  } catch (error) {
    bot.sendMessage(chatId, 'Failed to fetch a random Wikipedia article.');
  }
});

// Start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Welcome to the Wikipedia Random Article Bot!\n\nUse /random to get a random Wikipedia article.'
  );
});

