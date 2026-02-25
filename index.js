process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

console.log("TOKEN exists?", !!process.env.TOKEN);

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
// 1. 주요 클래스 가져오기
const { Client, Events, GatewayIntentBits } = require('discord.js');
// const { TOKEN } = require('./config.json');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running');
});

// 2. 클라이언트 객체 생성 (Guilds관련, 메시지관련 인텐트 추가)
const client = new Client({ intents: [
GatewayIntentBits.Guilds, 
@@ -34,10 +16,10 @@ console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// TODO: 서버 인원 역할 ID를 여기에 넣으세요
const TARGET_ROLE_ID = "1476185594446090250"; // 예: "123456789012345678"
const TARGET_ROLE_ID = "1476113191389102301"; // 예: "123456789012345678"

// TODO: 메시지를 보낼 채널 ID를 여기에 넣으세요
const CHANNEL_ID = "1476185526829711519"; // 예: "987654321098765432"
const CHANNEL_ID = "1476108273907142679"; // 예: "987654321098765432"

client.on("guildMemberUpdate", (oldMember, newMember) => {
const hadRole = oldMember.roles.cache.has(TARGET_ROLE_ID);
@@ -57,13 +39,4 @@ client.on("guildMemberUpdate", (oldMember, newMember) => {
});

// 5. 시크릿키(토큰)을 통해 봇 로그인 실행
console.log("Trying to login...");

client.login(process.env.TOKEN)
  .then(() => console.log("Discord login success"))
  .catch(err => console.error("Login failed:", err));

client.on("ready", () => {
  console.log("READY EVENT FIRED");
});

client.login(process.env.TOKEN);
