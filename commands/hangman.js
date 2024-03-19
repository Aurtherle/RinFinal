const { cmd, parseJid, getAdmin, tlang } = require("../lib/");
const eco = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);
// Read the hangman words from the JSON file
const hangmanWords = JSON.parse(fs.readFileSync('./lib/hangman.json'));

// Select a random word from the hangmanWords array
const hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
let hangmanState = Array(hangmanWord.length).fill("_");
let hangmanIncorrectGuesses = 0;
const maxIncorrectGuesses = 6; // الحد الأقصى للتخمينات الخاطئة المسموح بها

cmd(
  {
    pattern: "hangman",
    desc: "يلعب لعبة المشنقة",
    filename: __filename,
    category: "العاب",
  },
  async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    
    const hangmanString = hangmanState.join(" ");
    const hangmanStatus = `حالة المشنقة: ${hangmanString}\n${"❌".repeat(hangmanIncorrectGuesses)}${"⬛".repeat(maxIncorrectGuesses - hangmanIncorrectGuesses)}`;
    
    return citel.reply(hangmanStatus);
  }
);

cmd(
  {
    on: "text"
  },
  async (Void, citel, text) => {
    if (!citel.isGroup) return;

    if (!/^([a-z]|[أ-ي])$/i.test(citel.text)) return;

    const guess = citel.text.toLowerCase();
    if (hangmanWord.includes(guess)) {
      // Update hangman state with correct guess
      for (let i = 0; i < hangmanWord.length; i++) {
        if (hangmanWord[i] === guess) {
          hangmanState[i] = guess;
        }
      }
    } else {
      // Update hangman state and increment incorrect guesses count
      hangmanIncorrectGuesses++;
    }

    const hangmanString = hangmanState.join(" ");
    const hangmanStatus = `حالة المشنقة: ${hangmanString}\n${"❌".repeat(hangmanIncorrectGuesses)}${"⬛".repeat(maxIncorrectGuesses - hangmanIncorrectGuesses)}`;

    // Check if the word has been guessed completely
    if (!hangmanState.includes("_")) {
      await eco.give(citel.sender, "secktor", 2000); // Reward the player
      await Void.sendMessage(citel.chat, {
        text: `تهانينا! لقد حزرت الكلمة بشكل صحيح وفزت بمكافأة قيمتها 2000💎.`,
      });
      // Reset the game
      hangmanState = Array(hangmanWord.length).fill("_");
      hangmanIncorrectGuesses = 0;
      return;
    }

    await Void.sendMessage(citel.chat, {
      text: hangmanStatus,
    });
  }
);
