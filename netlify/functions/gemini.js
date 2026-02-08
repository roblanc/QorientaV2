exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    console.log("Function invoked. Checking credentials..."); // Force redeploy to pick up new env vars

    if (!API_KEY) {
        // Return error in the format frontend expects (data.error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: "Server Configuration Error: Missing API Key" } })
        };
    }

    try {
        const requestBody = JSON.parse(event.body);
        const query = requestBody.query;

        if (!query) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: { message: "Missing query" } })
            };
        }

        // Call Google Gemini API - using gemini-2.5-flash (stable)
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Ești un expert în piața muncii din România și Europa. Utilizatorul întreabă: "${query}". 
            Returnează un răspuns în format HTML MINIMAL și CURAT (fără carduri, fără border-uri, fără fundal colorat).
            Folosește acest format exact:
            
            <h4 class="text-lg font-bold text-slate-800 mb-3 text-center">[Titlu scurt al răspunsului]</h4>
            <p class="text-3xl md:text-4xl font-black text-primary text-center mb-6">[Salariu estimat sau număr principal]</p>
            <div class="space-y-4 text-sm text-slate-600">
              <p><span class="font-semibold text-slate-800">Cerere în piață:</span> [High/Medie/Low cu explicație scurtă de 5-10 cuvinte]</p>
              <div>
                <p class="font-semibold text-slate-800 mb-2">Abilități cheie:</p>
                <ul class="list-disc list-inside space-y-1 text-slate-600">
                  <li>[Abilitate 1]</li>
                  <li>[Abilitate 2]</li>
                  <li>[Abilitate 3]</li>
                </ul>
              </div>
              <p class="text-slate-500 italic pt-2 border-t border-slate-100">[Concluzie de un rând]</p>
            </div>
            
            NU folosi div-uri cu border, shadow, rounded, bg-color. Păstrează designul curat și minimal. Răspunde în limba română.`
                    }]
                }]
            })
        });

        let data = await response.json();

        // Fallback to gemini-2.5-flash-lite if primary fails
        if (data.error) {
            console.log("Gemini 2.5 Flash failed, trying fallback to gemini-2.5-flash-lite...", data.error);
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Ești un expert în piața muncii. Răspunde scurt la: "${query}". Format HTML simplu cu clase Tailwind pentru text (text-slate-800, font-bold, etc). Fără carduri sau borduri.`
                        }]
                    }]
                })
            });
            data = await response.json();
        }

        if (data.error) {
            return { statusCode: 502, body: JSON.stringify({ error: { message: data.error.message || "Gemini API Error (All models failed)" } }) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: { message: "Internal Server Error: " + error.message } }) };
    }
};
