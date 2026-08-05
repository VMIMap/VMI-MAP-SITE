let CLIENT_ID = '';

// Lấy Client ID từ Server
fetch('/api/config')
  .then(res => res.json())
  .then(data => { CLIENT_ID = data.clientId; });

function loginWithDiscord() {
  if (!CLIENT_ID) return alert("Chưa cấu hình Discord Client ID!");
  const redirectUri = encodeURIComponent(window.location.origin);
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=identify`;
  window.location.href = authUrl;
}

// Kiểm tra Token khi Discord redirect về trang web
window.addEventListener('DOMContentLoaded', () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');

  if (accessToken) {
    fetch('https://discord.com/api/users/@me', {
      headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(user => {
      document.getElementById('discord-btn').style.display = 'none';
      const userInfo = document.getElementById('user-info');
      userInfo.style.display = 'flex';
      document.getElementById('username').innerText = user.username;
      const avatarUrl = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
      document.getElementById('avatar').src = avatarUrl;
    });
  }
});

