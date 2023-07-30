const { tlang, ringtone, cmd, fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib');
const ytdl = require('ytdl-secktor');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

// Define videotime variable
const videotime = 3600;

cmd({
  pattern: 'شغل',
  alias: ['song'],
  desc: 'Downloads audio from youtube.',
  category: 'تحميل',
  filename: __filename,
  use: '<text>',
}, async (Void, citel, text) => {
  try {
    const dlsize = 100; // Maximum file size in MB
    const yts = require('secktor-pack');
    const search = await yts(text);
    const anu = search.videos[0];
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    const infoYt = await ytdl.getInfo(anu.url);
    if (infoYt.videoDetails.lengthSeconds >= videotime) {
      return citel.reply(`❌ Video file too big!`);
    }
    const titleYt = infoYt.videoDetails.title;
    const randomName = getRandom('.mp3');
    citel.reply('*شويات بس يحمل:* ' + titleYt);

    // Download the audio file and save it as an MP3
    const stream = ytdl(anu.url, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
    }).pipe(fs.createWriteStream(`./${randomName}`));

    await new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
    });

    // Convert the audio file to AAC format
    const randomNameAac = `${randomName}.aac`;
    ffmpeg(`./${randomName}`)
      .audioCodec('aac')
      .on('end', async () => {
        // Read the converted audio file into a buffer
        const audioBuffer = fs.readFileSync(`./${randomNameAac}`);

        // Send the audio buffer with the new mimetype of 'audio/aac'
        const buttonMessage = {
          audio: audioBuffer,
          mimetype: 'audio/aac',
          fileName: `${titleYt}.aac`,
          headerType: 4,
          contextInfo: {
            externalAdReply: {
              title: titleYt,
              body: citel.pushName,
              renderLargerThumbnail: true,
              thumbnailUrl: search.all[0].thumbnail,
              mediaUrl: text,
              mediaType: 1,
              thumbnail: await getBuffer(search.all[0].thumbnail),
              sourceUrl: text,
            },
          },
        };

        // Send the audio message
        await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });

        // Delete the temporary files
        fs.unlinkSync(`./${randomName}`);
        fs.unlinkSync(`./${randomNameAac}`);
      })
      .save(`./${randomNameAac}`);

    // Check if the file size is bigger than 100mb
    const stats = fs.statSync(`./${randomName}`);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes > dlsize) {
      citel.reply(`❌ File size bigger than 100mb.`);
      fs.unlinkSync(`./${randomName}`);
      fs.unlinkSync(`./${randomNameAac}`);
    }
  } catch (error) {
    console.error(error);
    citel.reply('❌ An error occurred while processing your request.');
  }
});
