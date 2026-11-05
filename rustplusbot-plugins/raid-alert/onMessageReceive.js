console.log('onMessageReceive Event:', obj);

// ======================= SETTINGS =======================
const CHANNEL_ID   = '';                       // Discord channel ID to post in. Leave '' to use the bot's Main Discord channel.
const VOICE_TEXT   = 'You are being raided!';  // What the RustPlusBot voice client says in your voice channel.
const COOLDOWN_SEC = 30;                       // Seconds before !alert / !alarm can ping @everyone again (stops spam).
const DISCORD_TTS  = false;                    // true = Discord's built-in text-to-speech also reads the message out.
// ========================================================

var msg = obj.message,
    m = msg.toLowerCase().trim(),
    prefix = await this.app.getPrefix('all'),
    cmd = m.split(' ')[0];

if (cmd == prefix + 'alert' || cmd == prefix + 'alarm') {
    var app = this.app,
        since = this.raidAlertLast ? getTimeDifference(this.raidAlertLast) : Infinity;

    if (since < COOLDOWN_SEC) {
        app.sendTeamMessage('Raid alert already sent, try again in ' + Math.ceil(COOLDOWN_SEC - since) + 's');
    }
    else {
        this.raidAlertLast = new Date();

        // Anything typed after the command is added to the alert, e.g. "!alert north wall"
        var extra = msg.trim().substring(cmd.length).trim(),
            discordMsg = '@everyone :rotating_light: **RAID ALERT!** You are being raided! :rotating_light:\n' +
                         'Sent from game by **' + obj.name + '**' + (extra ? ': ' + extra : '');

        // 1) Text alert with @everyone
        if (CHANNEL_ID) {
            app.postDiscordMessage({ message: discordMsg, channel: CHANNEL_ID, tts: DISCORD_TTS });
        }
        else {
            app.postDiscordMessage(discordMsg);
        }

        // 2) Voice alert through the RustPlusBot voice client
        app.sendDiscordVoiceMessage(VOICE_TEXT);

        // 3) Confirm in team chat
        app.sendTeamMessage('Raid alert sent to Discord!');
    }
}
