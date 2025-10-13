document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('messageInput');
  const list = document.getElementById('messagesList');
  const btn = document.getElementById('submitBtn');

  // 从本地读取留言
  const loadMessages = () => {
    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    list.innerHTML = '';
    stored.forEach((msg, index) => {
      const div = document.createElement('div');
      div.className = 'message';
      div.innerHTML = `
        <button class="delete-btn" data-index="${index}">×</button>
        <p>${msg.text}</p>
        <small>${msg.time}</small>
      `;
      list.appendChild(div);
    });
  };

  // 保存留言
  const saveMessage = (text) => {
    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    stored.push({
      text,
      time: new Date().toLocaleString()
    });
    localStorage.setItem('messages', JSON.stringify(stored));
  };

  // 删除留言
  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const idx = e.target.dataset.index;
      const stored = JSON.parse(localStorage.getItem('messages') || '[]');
      stored.splice(idx, 1);
      localStorage.setItem('messages', JSON.stringify(stored));
      loadMessages();
    }
  });

  // 发布按钮
  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    saveMessage(text);
    input.value = '';
    loadMessages();
  });

  loadMessages();
});
