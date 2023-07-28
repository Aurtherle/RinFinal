/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const Secktor = require('../lib/commands')

    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "اوامر",
            alias: ["menu"],
            desc: "Help list",
            category: "general",
            react: "✨",
            filename: __filename
        },
        async(Void, citel, text) => {
            const { commands } = require('../lib');
            if (text.split(" ")[0]) {
                let arr = [];
                const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
                if (!cmd) return await citel.reply("*❌مافيه امر كذا*");
                else arr.push(`*🍁الامر:* ${cmd.pattern}`);
                if (cmd.category) arr.push(`*🧩التصنيف:* ${cmd.category}`);
                if (cmd.alias) arr.push(`*🧩يسمى ايضا:* ${cmd.alias}`);
                if (cmd.desc) arr.push(`*🧩الوصف:* ${cmd.desc}`);
                if (cmd.use) arr.push(`*〽️الاستخدام:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
                return await citel.reply(arr.join('\n'));
            } else {
                const cmds = {}
                commands.map(async(command, index) => {
                    if (command.dontAddCommandList === false && command.pattern !== undefined) {
                        if (!cmds[command.category]) cmds[command.category] = []
                        cmds[command.category].push(command.pattern)
                    }
                })
              const moment = require('moment-timezone')
const os = require('os')

const time = moment().locale('id').tz('Asia/Riyadh').format('HH:mm:ss')
const date = moment().locale('id').tz('Asia/Riyadh').format('DD/MM/YYYY')
const total = await sck1.countDocuments()

const header = `╭────《 ${fancytext(Config.ownername.split(' ')[0], 58)} 》─────⊷\n`
const footer = `*⭐️:* _${prefix} ${prefix}\n*صنع بحب ❤️ من قبل غومونريونغ*_`
const commandList = []

for (const category in cmds) {
  const categoryName = tiny(category)
  const commandNames = cmds[category].map(plugin => fancytext(plugin, 1)).join('\n')
  const commandListEntry = `╭────❏ *${categoryName}* ❏\n${commandNames}\n╰━━━━━━━━━━━━━━──⊷\n`
  commandList.push(commandListEntry)
}

const commandListString = commandList.join('')
const totalMemory = formatp(os.totalmem())
const freeMemory = formatp(os.freemem())
const memoryUsage = `${totalMemory - freeMemory}/${totalMemory}`
const runtimeString = runtime(process.uptime())

const stats = `│ ╭──────────────◆
│ │ اليوزر:- ${citel.pushName}
│ │ البوت:- ${tlang().title}
│ │ رمز التفعيل:- [ ${prefix} ]
│ │ المالك:- ${Config.ownername}
│ │ ؟:- ${commands.length}
│ │ المستخدمين:- ${total}
│ │ وقت التشغيل:- ${runtimeString}
│ │ الذاكرة:- ${memoryUsage}
│ │ الوقت:- ${time}
│ │ التاريخ:- ${date}
│ ╰──────────────◆
`

const statBox = '```' + stats + '```'
const messageHeader = header + statBox + commandListString
const buttonMessage = {
  image: { url: await botpic() },
  caption: messageHeader + footer
}

return await Void.sendMessage(citel.chat, buttonMessage)
    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "قائمة",
            desc: "list menu",
            category: "general"
        },
        async(Void, citel) => {
            const { commands } = require('../lib');
            let str = `
╭━━〘 ` + fancytext(Config.ownername.split(' ')[0], 58) + ` 〙━━──⊷`
            str += `
┃ ⛥╭──────────────      
┃ ⛥│ اليوزر: ${citel.pushName}
┃ ⛥│ البوت: ${tlang().title}
┃ ⛥│ رمز التفعيل: ${prefix}
┃ ⛥│ المالك: ${Config.ownername}
┃ ⛥│ الاوامر: ${commands.length}
┃ ⛥│ وقت التشغيل: ${runtime(process.uptime())}
┃ ⛥│ الذاكرة: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
┃ ⛥│  
┃ ⛥╰───────────
╰━━━━━━━━━━━──⊷\n`
for (let i = 0; i < commands.length; i++) 
{
     if(commands[i].pattern==undefined) continue
     str +=       `╭ ${i+1} *${fancytext(commands[i].pattern,1)}*\n` 
     if(commands[i].desc=undefined) commands[i].desc=""
     str += `╰➛ ${fancytext(commands[i].desc,1)}\n`
}
            return await Void.sendMessage(citel.chat, { image: { url: THUMB_IMAGE }, caption: str })
        }
    )
    //---------------------------------------------------------------------------
Secktor.cmd({
        pattern: "المالك",
        desc: "To find owner number",
        category: "general",
        react: "🐐",
        filename: __filename
    },
    async(Void, citel) => {
        const Config = require('../config')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + Config.ownername + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: Config.ownername,
                    body: 'اضغط هنا',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + citel.pushName,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

Secktor.cmd({
    pattern: "ملف",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "general",
    react: "✨",
    filename: __filename
},
async(Void, citel, text) => {
 const { commands } = require('../lib');
 let arr = [];
        const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
        if (!cmd) return await citel.reply("*❌هذا الامر غير موجود*");
        else arr.push(`*🍁الامر:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*🧩النوع:* ${cmd.category}`);
        if(cmd.filename) arr.push(`✨اسم الملف: ${cmd.filename}`)
        return citel.reply(arr.join('\n'));


})
