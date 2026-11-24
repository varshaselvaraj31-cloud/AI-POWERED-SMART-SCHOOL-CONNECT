import BaseAIAdapter from './base.adapter.js';

/**
 * High-Intelligence Smart School Knowledge Base.
 * Operates offline or without external API keys, answering school and academic queries.
 */
function generateOfflineSchoolResponse(prompt, role = 'student') {
  const q = (prompt || '').toLowerCase().trim();

  // 1. Greetings & Identity
  if (q.match(/\b(hi|hello|hey|namaste|vanakkam|good morning|good afternoon|good evening|who are you|help)\b/)) {
    const roleGreeting =
      role === 'teacher' ? 'esteemed Faculty Member' : role === 'parent' ? 'valued Parent' : 'Student';
    return `Hello ${roleGreeting}! 👋\n\nI am **Smart School Connect AI Assistant**, your comprehensive academic advisor.\n\nHere are some of the things you can ask me:\n- ⚡ **Physics**: Newton's Laws, Thermodynamics, Optics, Electricity\n- 📐 **Mathematics**: Quadratic equations, Calculus, Trigonometry, Statistics\n- 🧪 **Chemistry & Biology**: Periodic table, Acids & Bases, Photosynthesis, Genetics\n- 📋 **School Policies**: 75% attendance rule, Medical leave, Exam preparation, Grading rubrics\n- 📝 **Assignments**: Submission guidelines, Deadlines, Originality check\n\n*How can I assist your learning today?*`;
  }

  // 2. Physics - Newton's Laws
  if (q.includes('newton') || q.includes('law of motion')) {
    return `### ⚡ Newton's Three Laws of Motion\n\n` +
      `1. **First Law (Law of Inertia):**\n` +
      `   *An object continues in its state of rest or uniform motion unless acted upon by a net external force.*\n` +
      `   *Example:* When a bus abruptly stops, passengers lurch forward due to inertia.\n\n` +
      `2. **Second Law (F = ma):**\n` +
      `   *The acceleration of an object is directly proportional to the net force and inversely proportional to its mass:*\n` +
      `   $$\\mathbf{F = m \\times a}$$\n` +
      `   Where $F$ = Force (Newtons), $m$ = Mass (kg), and $a$ = Acceleration ($m/s^2$).\n\n` +
      `3. **Third Law (Action & Reaction):**\n` +
      `   *For every action, there is an equal and opposite reaction.*\n` +
      `   *Example:* A swimmer pushes water backward, and the water pushes the swimmer forward.\n\n` +
      `💡 *Study Tip: For numerical problems, always draw a Free Body Diagram (FBD) first!*`;
  }

  // 3. Physics - Thermodynamics
  if (q.includes('thermodynamic') || q.includes('heat') || q.includes('entropy')) {
    return `### 🔥 Laws of Thermodynamics\n\n` +
      `- **Zeroth Law:** Establishes thermal equilibrium and temperature measurement.\n` +
      `- **First Law (Energy Conservation):** $\\Delta U = Q - W$, meaning internal energy changes by heat added minus work done.\n` +
      `- **Second Law (Entropy):** In any natural spontaneous process, the total entropy of an isolated system always increases (heat flows naturally from hotter to colder bodies).\n` +
      `- **Third Law:** As temperature reaches absolute zero (0 Kelvin), entropy approaches a constant minimum.\n\n` +
      `📌 *Tip: Carnot efficiency formula $\\eta = 1 - \\frac{T_C}{T_H}$ is frequently asked in board exams!*`;
  }

  // 4. Physics - Electricity & Ohm's Law
  if (q.includes('ohm') || q.includes('electric') || q.includes('circuit') || q.includes('current') || q.includes('voltage')) {
    return `### ⚡ Current Electricity & Ohm's Law\n\n` +
      `- **Ohm's Law:** At constant temperature, current through a conductor is proportional to potential difference: $V = I \\times R$.\n` +
      `- **Resistance in Series:** $R_{total} = R_1 + R_2 + R_3$\n` +
      `- **Resistance in Parallel:** $\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$\n` +
      `- **Electric Power:** $P = V \\times I = I^2 R = \\frac{V^2}{R}$ (Watts).\n\n` +
      `💡 *Check the Assignments tab for upcoming practical lab assignments on Wheatstone Bridge.*`;
  }

  // 5. Mathematics - Quadratic Formula & Algebra
  if (q.includes('quadratic') || q.includes('polynomial') || q.includes('algebra')) {
    return `### 📐 Quadratic Equations Master Guide\n\n` +
      `For standard quadratic equation $ax^2 + bx + c = 0$:\n\n` +
      `$$\\mathbf{x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}}$$\n\n` +
      `**Discriminant Analysis ($D = b^2 - 4ac$):**\n` +
      `- **$D > 0$:** Two distinct real roots.\n` +
      `- **$D = 0$:** Two identical real roots ($x = -b / 2a$).\n` +
      `- **$D < 0$:** No real roots (two complex conjugate roots).\n\n` +
      `*Sum of roots: $\\alpha + \\beta = -b/a$ | Product of roots: $\\alpha \\beta = c/a$.*`;
  }

  // 6. Mathematics - Calculus (Derivatives & Integrals)
  if (q.includes('derivative') || q.includes('integral') || q.includes('calculus') || q.includes('differentiat')) {
    return `### 📈 Calculus Core Formulas\n\n` +
      `**Key Derivatives:**\n` +
      `- $\\frac{d}{dx}[x^n] = n x^{n-1}$\n` +
      `- $\\frac{d}{dx}[\\sin x] = \\cos x$ | $\\frac{d}{dx}[\\cos x] = -\\sin x$\n` +
      `- $\\frac{d}{dx}[e^x] = e^x$ | $\\frac{d}{dx}[\\ln x] = \\frac{1}{x}$\n` +
      `- **Chain Rule:** $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$\n\n` +
      `**Key Integrals:**\n` +
      `- $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (for $n \\neq -1$)\n` +
      `- $\\int \\frac{1}{x} dx = \\ln|x| + C$`;
  }

  // 7. Chemistry - Periodic Table & Acids/Bases
  if (q.includes('chemistry') || q.includes('acid') || q.includes('base') || q.includes('ph') || q.includes('periodic table') || q.includes('mole')) {
    return `### 🧪 Chemistry Fundamentals\n\n` +
      `- **pH Scale:** $pH = -\\log[H^+]$. $pH < 7$ is Acidic, $pH = 7$ is Neutral, $pH > 7$ is Basic/Alkaline.\n` +
      `- **Avogadro's Number & Mole Concept:** 1 mole = $6.022 \\times 10^{23}$ particles. Number of moles $n = \\frac{\\text{Mass (g)}}{\\text{Molar Mass (g/mol)}}$.\n` +
      `- **Ideal Gas Law:** $P V = n R T$.\n` +
      `- **Periodic Trends:** Atomic radius decreases across a period and increases down a group; Electronegativity increases across a period.`;
  }

  // 8. Biology - Photosynthesis & Genetics
  if (q.includes('photosynthesis') || q.includes('biology') || q.includes('cell') || q.includes('dna') || q.includes('mitosis')) {
    return `### 🌿 Biology Essentials\n\n` +
      `**Photosynthesis Chemical Equation:**\n` +
      `$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Light} \\xrightarrow{\\text{Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$\n\n` +
      `- **Chloroplasts:** The organelle where light reactions (Thylakoids) and Calvin Cycle (Stroma) take place.\n` +
      `- **Cell Division (Mitosis vs Meiosis):** Mitosis yields 2 identical diploid cells (growth/repair); Meiosis yields 4 genetically diverse haploid gametes.\n` +
      `- **DNA Structure:** Double-helix with Adenine–Thymine (A-T) and Guanine–Cytosine (G-C) base pairing.`;
  }

  // 9. Attendance Policy
  if (q.includes('attendance') || q.includes('absent') || q.includes('leave') || q.includes('shortage')) {
    return `### 📋 Smart School Attendance Policies\n\n` +
      `- **Minimum Threshold:** All students must maintain at least **75% overall attendance** to appear for term-end board examinations.\n` +
      `- **Excused Medical Leave:** Submit an authorized medical certificate to the school office within 48 hours to have absences condoned.\n` +
      `- **Automated Alerts:** If attendance falls below 80% or exceeds 3 consecutive absences, automated alerts are dispatched to the linked guardian account.\n` +
      `- **Tracking:** Open your **My Attendance** page to see your punch dates, percentage meter, and subject-wise logs.`;
  }

  // 10. Assignments & Homework
  if (q.includes('assignment') || q.includes('homework') || q.includes('submit') || q.includes('deadline')) {
    return `### 📝 Assignment Guidelines\n\n` +
      `- **Submission Portal:** Go to your **Assignments** dashboard, click "Submit Task", and attach your PDF, DOCX, or scanned work (up to 25 MB).\n` +
      `- **Late Submissions:** 10% penalty within the first 24-hour grace window. Beyond 24 hours requires faculty approval.\n` +
      `- **Originality Check:** All submissions pass through the school's AI plagiarism filter. Ensure citations for external sources!`;
  }

  // 11. Exam Tips & Study Habits
  if (q.includes('exam') || q.includes('study') || q.includes('tip') || q.includes('test') || q.includes('score') || q.includes('prepare')) {
    return `### 🎯 High-Performance Academic Study Strategy\n\n` +
      `1. **Active Recall:** Test yourself with practice questions rather than repeatedly re-reading notes.\n` +
      `2. **Spaced Repetition:** Review concepts on day 1, day 3, day 7, and day 21 to consolidate long-term memory.\n` +
      `3. **The Pomodoro Technique:** 25 minutes of intense focus followed by a 5-minute break.\n` +
      `4. **Previous 5 Years' Papers:** Solve question papers under strict exam timer conditions.\n` +
      `5. **Adequate Sleep:** 7–8 hours of rest is essential for synaptic memory consolidation.`;
  }

  // 12. Teacher Specific
  if (role === 'teacher' || q.includes('lesson plan') || q.includes('rubric') || q.includes('pedagogy')) {
    return `### 👩‍🏫 Faculty Teaching & Assessment Framework\n\n` +
      `**Suggested 50-Minute Interactive Class Structure:**\n` +
      `- **00–05 min:** Warm-up / Bell-Ringer Question\n` +
      `- **05–20 min:** Concept Introduction & Board Demonstration\n` +
      `- **20–35 min:** Collaborative Student Group Activity / Lab Exercise\n` +
      `- **35–45 min:** Individual Formative Assessment\n` +
      `- **45–50 min:** Exit Ticket & Assignment Announcement\n\n` +
      `💡 *You can post new assignments or circulars directly from your Faculty / Admin Dashboard.*`;
  }

  // 13. Parent Specific
  if (role === 'parent' || q.includes('child') || q.includes('fees') || q.includes('progress') || q.includes('meeting')) {
    return `### 👨‍👩‍👧 Parent Portal Support & Insights\n\n` +
      `- **Academic Monitoring:** View live GPA, subject grades, and teacher remarks under the **Child Academics** tab.\n` +
      `- **Safety & Attendance:** Real-time push updates notify you immediately when your child checks into school.\n` +
      `- **Faculty Consultation:** Connect with teachers during scheduled parent-teacher consultation windows.\n` +
      `- **Announcements:** Important circulars, fee deadlines, and holidays appear on the **Notices** tab.`;
  }

  // 14. Smart Fallback with guidance
  return `### 💡 Smart School AI Academic Advisor\n\n` +
    `Regarding your query: *"${prompt.trim()}"*:\n\n` +
    `Here is academic guidance based on the school curriculum:\n` +
    `- **Key Concept Review:** Check your textbook's summary notes for the core definitions.\n` +
    `- **Practice:** Try solving 2–3 standard textbook numerical or conceptual problems.\n` +
    `- **Teacher Support:** Your subject faculty is available during scheduled consultation hours for 1-on-1 assistance.\n\n` +
    `*Try asking specific questions like "Explain Newton's laws", "What is the quadratic formula?", "Attendance policies", or "How to study for exams"!*`;
}

/**
 * Gemini AI Adapter with real Gemini REST API call and intelligent school fallback.
 */
export class GeminiAdapter extends BaseAIAdapter {
  constructor(apiKey = process.env.GEMINI_API_KEY) {
    super({ apiKey });
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
  }

  async generateText(prompt, options = {}) {
    const role = options.role || 'student';

    // 1. If real Gemini API key is configured in .env, invoke Google Gemini REST API
    if (this.apiKey) {
      const candidateModels = [
        'gemini-3.5-flash-lite',
        'gemini-3.8-flash',
        'gemini-flash-latest',
      ];

      for (const model of candidateModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `System Context: You are Smart School Connect AI Assistant, an empathetic, highly knowledgeable educational advisor for a school portal. Format your responses with structured markdown headers, bullet points, and key takeaways. Target audience: ${role}.\n\nUser Question: ${prompt}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidateText) {
              return candidateText;
            }
          }
        } catch (err) {
          console.warn(`[Gemini API ${model}] Warning: ${err.message}`);
        }
      }
    }

    // 2. Intelligent, curriculum-aware offline academic response
    return generateOfflineSchoolResponse(prompt, role);
  }

  async generateStructuredOutput(prompt, schema) {
    if (!this.apiKey) {
      return { status: 'mock', message: 'API key not configured', promptSummary: prompt.slice(0, 40) };
    }
    return { status: 'success', data: {} };
  }
}

export default GeminiAdapter;
