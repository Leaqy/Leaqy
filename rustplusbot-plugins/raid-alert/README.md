# RustPlusBot plugin: Raid Alert

Type `!alert` or `!alarm` in Rust team chat and the bot will:

1. Post an `@everyone` raid alert in your Discord text channel
2. Say "You are being raided!" through the RustPlusBot voice client
3. Confirm in team chat

Anything typed after the command is added to the alert, e.g. `!alert north wall`.
There is a 30 second cooldown so the command can't spam `@everyone`.

## Setup

1. In the Plugin Studio, open the **onMessageReceive** event and paste the contents of `onMessageReceive.js`. Leave the other events empty.
2. Optional: set `CHANNEL_ID` to post somewhere other than the bot's Main channel (Discord: Developer Mode on, right-click the channel, Copy Channel ID).
3. In Discord, give the RustPlusBot role the **Mention @everyone, @here, and All Roles** permission in that channel, or the ping shows as plain text.
4. For the voice alert, join a voice channel and type `rp!voice_join` in Discord so the voice client is in the channel.
