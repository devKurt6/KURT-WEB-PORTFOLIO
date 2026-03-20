exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { question, session_id } = JSON.parse(event.body);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // stored in Netlify env vars

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // cheapest and fast
        messages: [
          {
            role: 'system',
            content: `You are Kurt Decena's AI assistant on his portfolio website. 
                      He is a Software Developer specializing in embedded systems, 
                      computer vision, and web development. 
                      Answer questions about his skills and projects helpfully.`
          },
          { role: 'user', content: question }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: reply
    };

  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
