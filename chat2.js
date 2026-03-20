// ============================================
// KURT'S AI CHAT — FastAPI + Ollama via ngrok
// ============================================

// const BACKEND_URL = ''; // 🔁 update each ngrok restart
const SESSION_ID  = 'sess_' + Math.random().toString(36).slice(2, 10);

const chatFab   = document.getElementById('chatToggle');
const chatWin   = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMsgs  = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend  = document.getElementById('chatSendBtn');

// ── Open / Close ──────────────────────────────────────
chatFab.addEventListener('click', () => {
  const isOpen = chatWin.classList.toggle('chat-open');
  chatFab.classList.toggle('chat-fab-open', isOpen);
  if (isOpen) chatInput.focus();
});
chatClose.addEventListener('click', () => {
  chatWin.classList.remove('chat-open');
  chatFab.classList.remove('chat-fab-open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    chatWin.classList.remove('chat-open');
    chatFab.classList.remove('chat-fab-open');
  }
});

// ── Helpers ───────────────────────────────────────────
function scrollBottom() {
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function addBubble(text, role) {
  const row = document.createElement('div');
  row.className = `chat-msg-row chat-${role}`;

  if (role === 'bot') {
    const av = document.createElement('div');
    av.className = 'chat-msg-avatar';
    av.innerHTML = '<i class="fa-solid fa-robot"></i>';
    row.appendChild(av);
  }

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble chat-bubble-${role}`;
  bubble.textContent = text;
  row.appendChild(bubble);

  chatMsgs.appendChild(row);
  scrollBottom();
  
  return bubble;
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'chat-msg-row chat-bot';
  row.id = 'chat-typing';

  const av = document.createElement('div');
  av.className = 'chat-msg-avatar';
  av.innerHTML = '<i class="fa-solid fa-robot"></i>';

  const tb = document.createElement('div');
  tb.className = 'chat-typing-bubble';
  tb.innerHTML = `
    <span class="chat-dot"></span>
    <span class="chat-dot"></span>
    <span class="chat-dot"></span>
  `;

  row.appendChild(av);
  row.appendChild(tb);
  chatMsgs.appendChild(row);
  scrollBottom();
}

function removeTyping() {
  document.getElementById('chat-typing')?.remove();
}

// Smooth typewriter for streamed text
async function typewriter(bubble, text) {
  const cursor = document.createElement('span');
  cursor.className = 'chat-cursor';
  bubble.textContent = '';
  bubble.appendChild(cursor);

  for (const char of text) {
    const node = document.createTextNode(char);
    bubble.insertBefore(node, cursor);
    scrollBottom();
    await new Promise(r => setTimeout(r, 12));
  }
  cursor.remove();
}

// ── Send ──────────────────────────────────────────────
async function sendMessage() {
  const question = chatInput.value.trim();
  if (!question) return;

  chatInput.value   = '';
  chatInput.disabled = true;
  chatSend.disabled  = true;

  addBubble(question, 'user');
  showTyping();

  try {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        session_id: SESSION_ID,
        username: 'Portfolio Visitor'
      })
    });

    // DELETE everything below and replace with:
const reply = await res.text();
removeTyping();
const bubble = addBubble('', 'bot');
await typewriter(bubble, reply); // pass the text directly now

  } catch (err) {
    removeTyping();
    addBubble(`⚠️ CSomething went wrong. Please try again later. (${err.message})`, 'bot');
  } finally {
    chatInput.disabled = false;
    chatSend.disabled  = false;
    chatInput.focus();
  }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});