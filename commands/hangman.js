
let hangmanGame = null;

function createHangmanGame(citel) {
  // Select a random word from the hangmanWords array
  const hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
  
  let hangmanState = Array(hangmanWord.length).fill("_");
  let hangmanIncorrectGuesses = 0;
  const maxIncorrectGuesses = 6; // الحد الأقصى للتخمينات الخاطئة المسموح بها

  const hangmanCmd = cmd(
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

  const hangmanTextCmd = cmd(
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
        // Remove the command handlers
        hangmanCmd.remove();
        hangmanTextCmd.remove();
        // Reset the hangman game
        hangmanGame = null;
        return;
      }

      await Void.sendMessage(citel.chat, {
        text: hangmanStatus,
      });
      
      // Check if the maximum incorrect guesses reached
      if (hangmanIncorrectGuesses >= maxIncorrectGuesses) {
        await Void.sendMessage(citel.chat, {
          text: `لقد نفذت جميع المحاولات الخاطئة! الكلمة الصحيحة كانت: ${hangmanWord}`,
        });
        // Remove the command handlers
        hangmanCmd.remove();
        hangmanTextCmd.remove();
        // Reset the hangman game
        hangmanGame = null;
      }
    }
  );

  hangmanGame = {
    hangmanCmd,
    hangmanTextCmd,
    hangmanWord,
    hangmanState,
    hangmanIncorrectGuesses,
    maxIncorrectGuesses
  };
}

cmd(
  {
    pattern: "hangman",
    desc: "يلعب لعبة المشنقة",
    filename: __filename,
    category: "العاب",
  },
  async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    
    if (!hangmanGame) {
      createHangmanGame(citel);
      citel.reply("لقد بدأت لعبة المشنقة. قم بتخمين الحروف الصحيحة لتخمين الكلمة!");
    } else {
      citel.reply("يوجد لعبة المشنقة جارية حاليًا.");
    }
  }
);
