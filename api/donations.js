export default async function handler(req, res) {
  // Use environment variable or fallback to the provided key
  const apiKey = process.env.EASYDONATE_API_KEY || 'ezdn_v1_prhqed4mt6s6do83zj1w8sjirbk6yb3r';
  
  try {
    const response = await fetch('https://api.easydonate.app/api/v1/donations/stats', {
      headers: {
        'Authorization': 'Bearer ' + apiKey
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch donations' });
    }
    
    const data = await response.json();
    
    // Setup CORS for local testing if needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
