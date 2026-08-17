export default async function handler(req, res) {
  // Use environment variable or fallback to the provided key
  const apiKey = process.env.EASYDONATE_API_KEY || 'ezdn_v1_prhqed4mt6s6do83zj1w8sjirbk6yb3r';
  
  try {
    // Fetch latest donations with a large size to calculate monthly sum
    // (Bypasses the /stats endpoint which can be delayed/cached)
    const response = await fetch('https://api.easydonate.app/api/v1/donations?size=100', {
      headers: {
        'Authorization': 'Bearer ' + apiKey
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch donations' });
    }
    
    const json = await response.json();
    let totalMonthly = 0;
    
    if (json && json.data && Array.isArray(json.data.histories)) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      json.data.histories.forEach(d => {
        if (d.status === 'SUCCESS') {
          const date = new Date(d.createdAt);
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            totalMonthly += d.amount;
          }
        }
      });
    }

    // Match the previous response structure expected by frontend
    const result = {
      data: {
        monthly: totalMonthly
      }
    };
    
    // Setup CORS
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

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
