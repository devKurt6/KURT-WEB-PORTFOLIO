exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const { question, session_id, username } = JSON.parse(event.body);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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

    // ✅ Check if OpenAI responded correctly
    if (!response.ok) {
      const err = await response.json();
      return {
        statusCode: 500,
        body: `Sorry, I'm having trouble responding right now. Please try again later.`
      };
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: reply
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: `Sorry, I'm unavailable right now. Please try again later.`
    };
  }
};