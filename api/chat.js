export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.GROQ_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const { messages, model, max_tokens, temperature } = req.body

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model:       model       || 'llama-3.1-8b-instant',
        messages:    messages    || [],
        max_tokens:  max_tokens  || 300,
        temperature: temperature || 0.7,
      }),
    })

    const data = await upstream.json()
    res.status(upstream.status).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Upstream request failed' })
  }
}
