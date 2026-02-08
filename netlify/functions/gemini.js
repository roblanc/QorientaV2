exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "Missing API Key" }) };
    }

    try {
        const requestBody = JSON.parse(event.body);
        const query = requestBody.query;

        if (!query) {
            return { statusCode: 400, body: "Missing query" };
        }

        // Call Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Ești un expert în piața muncii din România și Europa. Utilizatorul întreabă: "${query}". 
            Te rog să returnezi un răspuns în format HTML (fără tag-ul html/body, doar div-uri/p-uri) care să conțină:
            1. Un "Salariu Estimat" (format bold, mare).
            2. O secțiune de "Cerere în piață" (High/Medium/Low).
            3. 3 "Abilități cheie" cu bullet points.
            4. O scurtă concluzie de un rând. 
            Folosește clase Tailwind pentru styling (text-slate-800, list-disc, etc). Fii concis și profesional în limba română.`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return { statusCode: 502, body: JSON.stringify({ error: data.error.message }) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
};
