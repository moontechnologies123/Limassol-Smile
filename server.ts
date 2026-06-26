import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for Bookings (resets on server restart, but works perfectly for interactive demo)
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "b-1",
    name: "Andreas Christodoulou",
    email: "andreas.c@outlook.com.cy",
    phone: "+357 99 123456",
    treatment: "Invisalign & Clear Aligners",
    preferredDate: "2026-06-28",
    preferredTime: "10:30",
    notes: "I want to ask about payment plans for Invisalign.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "b-2",
    name: "Julia Smirnova",
    email: "j.smirnova@mail.ru",
    phone: "+357 96 789012",
    treatment: "Cosmetic Teeth Whitening",
    preferredDate: "2026-06-29",
    preferredTime: "14:00",
    notes: "First time trying laser whitening. Excited!",
    status: "pending",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "b-3",
    name: "Mark Harrison",
    email: "mark.h@gmail.com",
    phone: "+357 95 345678",
    treatment: "General Checkup & Cleaning",
    preferredDate: "2026-06-30",
    preferredTime: "09:00",
    notes: "Routine 6-month checkup.",
    status: "pending",
    createdAt: new Date().toISOString(),
  }
];

// Lazy initialization of Gemini client to prevent crash if key is missing on start
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or holds placeholder value.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

const systemInstruction = `You are a warm, professional, and helpful virtual dental assistant for "Limassol Smile Studio" in Limassol, Cyprus.
The leading dentist is Dr. Elena Georgiou, DDS.
Clinic Location: 45 Gladstonos Street, Limassol 3041, Cyprus (near Molos/District Office).
Contact: +357 25 345678, email: info@limassolsmile.com.
Operating Hours: Monday - Friday: 08:30 - 18:00, Saturday: 09:00 - 14:00, Sunday: Closed (available for emergencies only).

Services & Prices:
1. General Checkup & Professional Cleaning: €60 - €80
2. Teeth Whitening (Laser & Take-Home): €250 - €400
3. Premium Porcelain Veneers: €450 - €600 per tooth
4. Dental Implants (Premium Swiss/German implants + crown): €1,200 - €1,800
5. Invisalign & Clear Aligners: €2,500 - €4,500
6. Emergency Pain Relief / Root Canal: €150 - €300
7. Pediatric Gentle Cleanings: €40

Key clinic qualities:
- Painless dentistry techniques (using advanced computerized anesthesia and optional sedation).
- Digital 3D smile design: patients can see their results before starting treatment.
- Multilingual staff: we speak Greek, English, and Russian.
- Free first consultation for dental implants and orthodontic alignments.

Tone Guidelines:
- Be extremely compassionate, reassuring, and professional. Many people suffer from dental anxiety!
- Offer helpful dental hygiene tips if appropriate.
- Guide the user towards booking an appointment. Tell them they can easily request an appointment using our "Book Online" form on this webpage.
- Always provide pricing in Euros (€).
- Mention that Limassol Smile Studio is located conveniently in the heart of Limassol, with parking nearby.
- Keep answers relatively concise and highly readable. Use formatting (bullet points, bold text) to present pricing and benefits.`;

// API: Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json({ bookings });
});

// API: Create a booking
app.post("/api/bookings", (req, res) => {
  const { name, email, phone, treatment, preferredDate, preferredTime, notes } = req.body;
  if (!name || !email || !phone || !treatment || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required booking details" });
  }

  const newBooking: Booking = {
    id: `b-${Date.now()}`,
    name,
    email,
    phone,
    treatment,
    preferredDate,
    preferredTime,
    notes,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

// API: Update booking status
app.patch("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const bookingIndex = bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  bookings[bookingIndex].status = status;
  res.json({ success: true, booking: bookings[bookingIndex] });
});

// API: Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid or missing messages parameter." });
  }

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Return a simulated, high-quality, friendly mock dental assistant response if API key is not present.
      // This ensures the application continues to run flawlessly and gracefully.
      const lastUserMessage = messages[messages.length - 1]?.content || "";
      const queryLower = lastUserMessage.toLowerCase();
      let responseText = `Thank you for reaching out to Limassol Smile Studio! Dr. Elena Georgiou and our team are here to help. Since my live AI connection is in offline mode, here is a helpful reply:\n\n`;

      if (queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("whitening") || queryLower.includes("how much")) {
        responseText += `Here are our guide prices for treatments:\n• **Checkup & Professional Cleaning**: €60 - €80\n• **Teeth Whitening (Laser)**: €250 - €400\n• **Porcelain Veneers**: €450 - €600 / tooth\n• **Dental Implants**: €1,200 - €1,800\n• **Invisalign Aligners**: €2,500 - €4,500\n\nWould you like to book a consultation? We offer a free first consultation for dental implants and orthodontic work!`;
      } else if (queryLower.includes("where") || queryLower.includes("location") || queryLower.includes("address") || queryLower.includes("map")) {
        responseText += `We are located at **45 Gladstonos Street, Limassol 3041, Cyprus** (near the Molos area and Limassol District Office). There is public parking directly opposite the clinic.`;
      } else if (queryLower.includes("hours") || queryLower.includes("open") || queryLower.includes("when")) {
        responseText += `Our clinic hours are:\n• **Monday - Friday**: 08:30 - 18:00\n• **Saturday**: 09:00 - 14:00\n• **Sunday**: Closed (Emergencies only)\n\nYou can request an appointment anytime using our "Book Online" form!`;
      } else {
        responseText += `We specialize in advanced restorative, general, and cosmetic dentistry. Under Dr. Elena Georgiou's care, we emphasize comfortable, pain-free treatments with high-tech 3D diagnostics.\n\nPlease feel free to ask about veneers, implants, teeth cleaning, aligners, or how to schedule an appointment. You can also request an appointment directly using our online booking form above!`;
      }

      return res.json({ text: responseText });
    }

    // Convert client-provided message history to the parts/contents schema of @google/genai SDK
    // The history is an array of { role: 'user' | 'model', content: string }
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({ error: "Failed to communicate with AI Assistant. " + error.message });
  }
});

// Vite & Static assets routing setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dental Clinic Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
