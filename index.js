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
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
]});

// 3. 봇이 준비됐을때 한번만(once) 표시할 메시지
client.once(Events.ClientReady, readyClient => {
console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// TODO: 서버 인원 역할 ID를 여기에 넣으세요
const TARGET_ROLE_ID = "1476113191389102301"; // 예: "123456789012345678"

// TODO: 메시지를 보낼 채널 ID를 여기에 넣으세요
const CHANNEL_ID = "1476108273907142679"; // 예: "987654321098765432"

client.on("guildMemberUpdate", (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.has(TARGET_ROLE_ID);
  const hasRole = newMember.roles.cache.has(TARGET_ROLE_ID);

  // 역할이 새로 추가된 경우
  if (!hadRole && hasRole) {
    const channel = newMember.guild.channels.cache.get(CHANNEL_ID);
    if (!channel) return;

    // TODO: 보낼 메시지를 작성하세요
    channel.send(`${newMember}**님 연합연맹에 오신것을 환영합니다~!**
- <#1410296457541714040> 에서 기본적인 안내를 확인하시고
- <#1318956381189181572> <#1339127774643748944> <#1355813336708677673> 가 기본채널입니다~
### **여기에서 자유롭게 활동해보세요~!**`); 
  }
});

// 5. 시크릿키(토큰)을 통해 봇 로그인 실행

client.login(process.env.TOKEN)
  .then(() => console.log("Discord login success"))
  .catch(err => console.error("Login failed:", err));
