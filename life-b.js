// AI & digital skills, health, music and photography courses (skill engine). `calc` answers are machine-checked.
(function () {
  const TF = ['True', 'False'];
  const C = window.COURSES;

  C.ai = { name: 'AI Tools', kind: 'skill', group: 'digital', icon: '🤖', iconBg: '#0E8C8F', voice: [], units: [
    { title: 'Understanding AI', desc: 'What AI tools can and can’t do', topics: [
      { card: { t: 'What is generative AI?', x: 'Generative AI tools — like ChatGPT, Claude and Gemini — create text, images or code from your instructions (prompts). They learned patterns from huge amounts of data and generate likely answers; they don’t “look up” a single true answer.', em: '🤖💬' },
        qs: [
          { q: 'The instruction you type into an AI tool is called a…', o: ['prompt', 'password', 'pixel'], a: 0, why: 'Better prompts usually get better results.' },
          { q: 'Generative AI creates answers by…', o: ['predicting likely text based on patterns it learned', 'always searching one official database', 'reading your mind'], a: 0, why: 'That’s why answers can sound right but be wrong.' },
          { q: 'Which is an example of a generative AI tool?', o: ['A chatbot that writes a draft email', 'A basic calculator', 'A paper notebook'], a: 0, why: 'It generates new content.' }
        ] },
      { card: { t: 'Good uses', x: 'AI is great for brainstorming ideas, explaining a topic in simpler words, summarizing long text, drafting emails, and practicing a language. You are still responsible for checking and editing the result.', em: '💡📝' },
        qs: [
          { q: 'Which is a good use of an AI tool?', o: ['Brainstorming ideas for a project', 'Deciding a patient’s medication without a doctor', 'Sending your bank PIN for safekeeping'], a: 0, why: 'Use it to help you think, not to replace experts.' },
          { q: 'Who is responsible for work you submit that an AI helped write?', o: ['You are', 'The AI company', 'Nobody'], a: 0, why: 'Always review and own your work.' },
          { q: '“Explain photosynthesis like I’m 10 years old” is a request to…', o: ['simplify an explanation', 'write code', 'translate to Japanese'], a: 0, why: 'AI can adjust explanations to your level.' }
        ] },
      { card: { t: 'Limits: AI can be wrong', x: 'AI can state false information confidently — often called a “hallucination”. It may also be out of date or biased. Double-check important facts, numbers, quotes and sources with reliable references.', em: '⚠️🔍' },
        qs: [
          { q: 'When an AI confidently gives false information, it’s often called a…', o: ['hallucination', 'firewall', 'download'], a: 0, why: 'It sounds sure, but it’s wrong.' },
          { q: 'AI answers are always correct.', o: TF, a: 1, keep: true, why: 'Always verify important information.' },
          { q: 'An AI gives you a statistic for your report. You should…', o: ['check it in a reliable source', 'copy it without checking', 'make the number bigger'], a: 0, why: 'Statistics are a common place for errors.' }
        ] },
      { card: { t: 'Privacy', x: 'Don’t paste passwords, ID numbers, bank details or confidential work or school information into AI tools unless your organization allows it. Treat what you type as information you are sharing.', em: '🔒' },
        qs: [
          { q: 'Which should you NOT paste into a public AI chatbot?', o: ['Your passwords and bank details', 'A question about grammar', 'A recipe idea'], a: 0, why: 'Protect sensitive information.' },
          { q: 'Before using AI with company data, you should…', o: ['check your company’s rules', 'paste everything in', 'ask a stranger'], a: 0, why: 'Many workplaces have AI policies.' },
          { q: 'It’s safest to treat what you type into an AI tool as…', o: ['information you are sharing', 'completely invisible', 'deleted instantly'], a: 0, why: 'Read the tool’s privacy settings.' }
        ] }
    ] },
    { title: 'Prompting Well', desc: 'Get better results from AI', topics: [
      { card: { t: 'Be specific', x: 'Vague prompts give vague answers. Include the task, context, audience and format you want.', code: 'Vague:  "Write about saving money."\nBetter: "Write 5 simple tips for a college\n        student in Manila to save ₱1,000 a\n        month. Use a bulleted list."' },
        qs: [
          { q: 'Which prompt is better?', o: ['“Write 5 saving tips for a college student in Manila, as a bulleted list.”', '“Write about money.”'], a: 0, keep: true, why: 'It names the task, audience and format.' },
          { q: 'A strong prompt usually includes…', o: ['the task, context and desired format', 'only one word', 'your password'], a: 0, why: 'More useful details → more useful answer.' },
          { q: 'Saying who the answer is for (e.g., “for a Grade 6 student”) helps the AI…', o: ['match the right level', 'go offline', 'write in code'], a: 0, why: 'Audience shapes tone and difficulty.' }
        ] },
      { card: { t: 'Give examples and limits', x: 'Show an example of what you want, and set limits like length, tone or reading level. “Under 100 words, friendly tone” is clearer than “short and nice”.', code: '"Write a 3-sentence product description\nin a friendly tone, like this example: ..."' },
        qs: [
          { q: 'Which limit is clearest?', o: ['“Under 100 words”', '“Not too long”', '“Medium-ish”'], a: 0, why: 'Numbers are precise.' },
          { q: 'Why include an example in your prompt?', o: ['It shows the style and format you want', 'It confuses the AI', 'It’s required'], a: 0, why: 'Examples are powerful instructions.' },
          { q: '“Friendly tone” describes the…', o: ['tone', 'length', 'language'], a: 0, why: 'Tone is how it sounds.' }
        ] },
      { card: { t: 'Iterate', x: 'Your first answer is a draft. Ask follow-ups: “Make it shorter”, “Add an example”, “Explain step 2 more simply”. Improving step by step usually works better than starting over.', em: '🔁' },
        qs: [
          { q: 'If the AI’s first answer isn’t quite right, you should…', o: ['ask a follow-up to improve it', 'give up on AI forever', 'use it as-is anyway'], a: 0, why: 'Conversation lets you refine the answer.' },
          { q: 'Which is a good follow-up prompt?', o: ['“Make it shorter and add one example.”', '“Wrong.”', '“…”'], a: 0, why: 'Specific feedback gets specific changes.' },
          { q: 'The first AI answer should be treated as…', o: ['a draft', 'the final truth'], a: 0, keep: true, why: 'Review and improve it.' }
        ] },
      { card: { t: 'Using AI honestly', x: 'Follow your school’s or workplace’s rules on AI. Don’t submit AI work as your own when that isn’t allowed, and say when you used AI if you’re asked to. Use it to learn — ask it to explain, quiz you or check your reasoning.', em: '🎓✅' },
        qs: [
          { q: 'Your teacher bans AI for an essay. You should…', o: ['write it yourself', 'secretly use AI', 'copy a friend’s'], a: 0, why: 'Follow the rules for each task.' },
          { q: 'Which is a great way to learn with AI?', o: ['Ask it to quiz you on a topic', 'Copy its answers without reading', 'Let it do all your homework'], a: 0, why: 'Active practice builds real skill.' },
          { q: 'If you’re asked whether you used AI, you should…', o: ['answer honestly', 'deny it', 'change the subject'], a: 0, why: 'Honesty builds trust.' }
        ] }
    ] }
  ] };

  C.digital = { name: 'Digital Basics', kind: 'skill', group: 'digital', icon: '💻', iconBg: '#334155', voice: [], units: [
    { title: 'Computer & Online Safety', desc: 'Shortcuts, passwords and safe habits', topics: [
      { card: { t: 'Keyboard shortcuts', x: 'Shortcuts save time. On Windows: Ctrl + C copies, Ctrl + V pastes, Ctrl + X cuts, Ctrl + Z undoes, and Ctrl + S saves. (On a Mac, use Command ⌘ instead of Ctrl.)', code: 'Ctrl + C  copy     Ctrl + Z  undo\nCtrl + V  paste    Ctrl + S  save\nCtrl + X  cut      Ctrl + F  find' },
        qs: [
          { q: 'Which shortcut undoes your last action?', o: ['Ctrl + Z', 'Ctrl + U', 'Ctrl + P'], a: 0, mono: true, why: 'A lifesaver after a mistake.' },
          { q: 'Ctrl + V is used to…', o: ['paste', 'copy', 'save'], a: 0, why: 'C = copy, V = paste.' },
          { q: 'Which shortcut finds a word on a page?', o: ['Ctrl + F', 'Ctrl + W', 'Ctrl + N'], a: 0, mono: true, why: 'F for find.' }
        ] },
      { card: { t: 'Strong passwords', x: 'A strong password is long and unique. A passphrase of several random words is easy to remember and hard to guess. Use a different password for each important account; a password manager can store them. Turn on two-factor authentication.', code: 'Weak:   juan123\nStrong: mango-river-blue-kite-47' },
        qs: [
          { q: 'Which password is strongest?', o: ['mango-river-blue-kite-47', 'juan123', 'password'], a: 0, mono: true, why: 'Long and random beats short and personal.' },
          { q: 'Should you reuse one password everywhere?', o: ['No', 'Yes'], a: 0, keep: true, why: 'One leak would unlock everything.' },
          { q: 'A password manager…', o: ['stores your passwords securely', 'shares your passwords publicly', 'makes passwords shorter'], a: 0, why: 'You remember one strong master password.' }
        ] },
      { card: { t: 'Safe browsing', x: 'Download apps only from official stores, keep your software updated, and be careful with links in messages. A padlock (https) means the connection is encrypted — but it doesn’t prove the site is honest.', em: '🌐🔒' },
        qs: [
          { q: 'The padlock (https) in the address bar means…', o: ['the connection is encrypted', 'the website is guaranteed honest', 'the site is government-owned'], a: 0, why: 'Scam sites can have padlocks too.' },
          { q: 'Where should you download apps from?', o: ['Official app stores', 'Random links in group chats', 'Pop-up ads'], a: 0, why: 'Unofficial apps can contain malware.' },
          { q: 'Why install updates?', o: ['They fix security problems', 'They slow your phone on purpose', 'No reason'], a: 0, why: 'Outdated software is easier to attack.' }
        ] },
      { card: { t: 'Your digital footprint', x: 'What you post online can stay there for a long time — even after you delete it, others may have saved it. Check your privacy settings and think before posting: would you be OK with a future employer seeing it?', em: '👣🌍' },
        qs: [
          { q: 'A digital footprint is…', o: ['the trail of what you do and post online', 'a type of shoe', 'a computer virus'], a: 0, why: 'It can affect your reputation.' },
          { q: 'Once you delete a post, it’s gone forever everywhere.', o: TF, a: 1, keep: true, why: 'Screenshots and copies may remain.' },
          { q: 'Before posting, ask yourself…', o: ['“Would I be OK with an employer seeing this?”', '“Will this get likes?” only', 'nothing'], a: 0, why: 'Think long-term.' }
        ] }
    ] },
    { title: 'Spreadsheets', desc: 'Excel and Google Sheets basics', topics: [
      { card: { t: 'Cells, rows and columns', x: 'A spreadsheet is a grid. Columns are labeled with letters (A, B, C…) and rows with numbers (1, 2, 3…). A cell’s address combines them: B3 is column B, row 3.', code: '   |  A   |  B   |  C\n 1 | Item | Qty  | Price\n 2 | Pen  | 3    | 15\n 3 | Book | 2    | 120   ← B3 = 2' },
        qs: [
          { q: 'In a spreadsheet, columns are labeled with…', o: ['letters', 'numbers', 'colors'], a: 0, why: 'Rows use numbers.' },
          { q: 'The cell in column C, row 5 is…', o: ['C5', '5C', 'R5C'], a: 0, mono: true, why: 'Column letter first, then row number.' },
          { q: 'In the example table, what is in cell B3?', o: ['2', '120', 'Book'], a: 0, why: 'Column B (Qty), row 3 (Book).' }
        ] },
      { card: { t: 'Formulas', x: 'Every formula starts with an equals sign (=). Formulas can use cell addresses, so results update automatically when the data changes.', code: '=B2*C2      → quantity × price\n=A1+A2      → adds two cells' },
        qs: [
          { q: 'Every formula starts with…', o: ['=', '+', '#'], a: 0, mono: true, why: 'The = tells the spreadsheet to calculate.' },
          { q: 'If B2 = 3 and C2 = 15, what does =B2*C2 show?', calc: '3*15', o: ['45', '18', '315'], a: 0, why: '* means multiply.' },
          { q: 'Why use cell addresses in formulas instead of typing numbers?', o: ['Results update automatically when data changes', 'It looks fancier', 'Typed numbers are not allowed'], a: 0, why: 'Change the data, and the total updates.' }
        ] },
      { card: { t: 'Functions', x: 'Functions are built-in formulas. SUM adds a range, AVERAGE finds the mean, MAX and MIN find the largest and smallest, and COUNT counts numbers. A1:A5 means cells A1 through A5.', code: '=SUM(A1:A5)\n=AVERAGE(A1:A5)\n=MAX(A1:A5)' },
        qs: [
          { q: 'A1 = 2, A2 = 4, A3 = 6. What does =SUM(A1:A3) show?', calc: '2+4+6', o: ['12', '6', '246'], a: 0, why: '2 + 4 + 6.' },
          { q: 'With the same cells, what does =AVERAGE(A1:A3) show?', calc: '(2+4+6)/3', o: ['4', '12', '6'], a: 0, why: '12 ÷ 3.' },
          { q: 'Which function finds the largest number?', o: ['MAX', 'MIN', 'COUNT'], a: 0, mono: true, why: 'MIN finds the smallest.' }
        ] },
      { card: { t: 'Sorting, filters and charts', x: 'Sort to order data (A→Z or largest→smallest), filter to show only rows that match, and insert a chart to see patterns. In formulas, a $ makes a reference absolute: $A$1 stays fixed when you copy the formula.', code: '=B2*$E$1   ← E1 stays fixed when copied down' },
        qs: [
          { q: 'To show only rows from one month, you would use a…', o: ['filter', 'chart', 'font'], a: 0, why: 'Filters hide non-matching rows.' },
          { q: 'What does the $ in $E$1 do?', o: ['Keeps the reference fixed when copying the formula', 'Formats it as money', 'Deletes the cell'], a: 0, why: 'It’s an absolute reference.' },
          { q: 'Which helps you SEE trends in data?', o: ['A chart', 'A longer password', 'Bold text'], a: 0, why: 'Visuals reveal patterns.' }
        ] }
    ] }
  ] };

  C.health = { name: 'Health & First Aid', kind: 'skill', group: 'life', icon: '⛑️', iconBg: '#D9414B', voice: [], units: [
    { title: 'First Aid', desc: 'What to do in an emergency', topics: [
      { card: { t: 'Emergency basics', x: 'First check that the scene is safe for you. Then check the person and call for help. In the Philippines, the national emergency hotline is 911. Stay calm and follow the dispatcher’s instructions. (This is general information — take a certified first-aid course to learn hands-on.)', em: '🚨📞' },
        qs: [
          { q: 'What should you check first in an emergency?', o: ['That the scene is safe for you', 'Your social media', 'The person’s wallet'], a: 0, why: 'You can’t help if you get hurt too.' },
          { q: 'The Philippines’ national emergency hotline is…', o: ['911', '117', '143'], a: 0, why: '911 is the national emergency number.' },
          { q: 'On the phone with emergency services, you should…', o: ['stay calm and follow their instructions', 'hang up quickly', 'shout'], a: 0, why: 'They can guide you step by step.' }
        ] },
      { card: { t: 'CPR', x: 'If an adult is unresponsive and not breathing normally, call for help and start chest compressions: push hard and fast in the center of the chest, about 100–120 per minute, at least 5 cm deep. Trained rescuers give 30 compressions then 2 breaths; if untrained, hands-only CPR is fine. Use an AED if available.', code: '30 compressions : 2 breaths\n100–120 compressions per minute' },
        qs: [
          { q: 'How fast should chest compressions be?', o: ['100–120 per minute', '20–30 per minute', '300 per minute'], a: 0, why: 'About the beat of “Stayin’ Alive”.' },
          { q: 'Where do you push for adult CPR?', o: ['The center of the chest', 'The stomach', 'The neck'], a: 0, why: 'On the lower half of the breastbone.' },
          { q: 'If you’re not trained in rescue breaths, you can…', o: ['do hands-only CPR (compressions)', 'do nothing', 'only give water'], a: 0, why: 'Compressions alone still help a lot.' }
        ] },
      { card: { t: 'Choking', x: 'If an adult is choking and can’t speak, cough or breathe, give 5 firm back blows between the shoulder blades, then 5 abdominal thrusts (the Heimlich maneuver). Repeat until the object comes out or help arrives. If they can cough strongly, encourage them to keep coughing.', code: '5 back blows → 5 abdominal thrusts → repeat' },
        qs: [
          { q: 'A choking adult can still cough strongly. You should…', o: ['encourage them to keep coughing', 'give abdominal thrusts right away', 'give them water'], a: 0, why: 'Coughing may clear it on its own.' },
          { q: 'For a choking adult who can’t breathe, alternate…', o: ['5 back blows and 5 abdominal thrusts', '30 compressions and 2 breaths', 'water and food'], a: 0, why: 'Repeat until the object is out or help arrives.' },
          { q: 'Abdominal thrusts are also called the…', o: ['Heimlich maneuver', 'Recovery position', 'Tourniquet'], a: 0, why: 'Named after Dr. Henry Heimlich.' }
        ] },
      { card: { t: 'Burns, cuts and nosebleeds', x: 'Burns: cool under cool running water for about 20 minutes — no ice, butter or toothpaste. Bleeding: press firmly on the wound with a clean cloth. Nosebleed: sit up, lean forward, and pinch the soft part of the nose for 10–15 minutes.', em: '🔥💧🩹' },
        qs: [
          { q: 'What’s the best first aid for a minor burn?', o: ['Cool running water for about 20 minutes', 'Toothpaste', 'Ice directly on the skin'], a: 0, why: 'Toothpaste and butter trap heat and can cause infection.' },
          { q: 'For a nosebleed, you should…', o: ['lean forward and pinch the soft part of the nose', 'tilt your head back', 'lie flat'], a: 0, why: 'Tilting back can make you swallow blood.' },
          { q: 'To stop bleeding from a cut, first…', o: ['press firmly with a clean cloth', 'blow on it', 'pour alcohol and wait'], a: 0, why: 'Direct pressure helps blood clot.' }
        ] }
    ] },
    { title: 'Healthy Habits', desc: 'Move, sleep, eat and stay clean', topics: [
      { card: { t: 'Exercise', x: 'The WHO recommends adults get at least 150–300 minutes of moderate activity (like brisk walking) per week — or 75–150 minutes of vigorous activity — plus muscle-strengthening on 2 or more days. Children and teens need about 60 minutes a day.', code: '30 min × 5 days = 150 min per week' },
        qs: [
          { q: 'How many minutes of moderate activity per week does the WHO recommend for adults (at minimum)?', o: ['150', '30', '1,000'], a: 0, why: '150–300 minutes, or 75–150 vigorous.' },
          { q: 'Walking briskly for 30 minutes on 5 days equals…', calc: '30*5', o: ['150 minutes', '35 minutes', '300 minutes'], a: 0, why: 'That meets the minimum.' },
          { q: 'Children and teens should be active for about…', o: ['60 minutes a day', '10 minutes a week', '5 hours a day'], a: 0, why: 'Mostly moderate to vigorous activity.' }
        ] },
      { card: { t: 'Sleep', x: 'Adults need about 7–9 hours of sleep; teens about 8–10. Keep a regular schedule and limit screens before bed — bright screens can make it harder to fall asleep.', em: '🌙😴' },
        qs: [
          { q: 'How much sleep do most adults need?', o: ['7–9 hours', '4–5 hours', '11–12 hours'], a: 0, why: 'Teens need 8–10.' },
          { q: 'Using bright screens right before bed can…', o: ['make it harder to fall asleep', 'make you sleep instantly', 'have no effect'], a: 0, why: 'Light signals your brain to stay awake.' },
          { q: 'A regular sleep schedule means…', o: ['going to bed and waking at similar times daily', 'sleeping only on weekends', 'napping all day'], a: 0, why: 'It keeps your body clock steady.' }
        ] },
      { card: { t: 'Eating well', x: 'The Pinggang Pinoy guide from the FNRI suggests filling about half your plate with vegetables and fruits, with the rest split between rice or other carbs and protein foods like fish, meat or beans. Drink water instead of sugary drinks.', em: '🥗🍚🐟💧' },
        qs: [
          { q: 'In Pinggang Pinoy, about half the plate should be…', o: ['vegetables and fruits', 'rice', 'fried food'], a: 0, why: 'They provide vitamins, minerals and fiber.' },
          { q: 'The healthiest everyday drink is…', o: ['water', 'soft drinks', 'energy drinks'], a: 0, why: 'Sugary drinks add lots of sugar.' },
          { q: 'Which is a protein food?', o: ['Fish', 'Rice', 'Soft drinks'], a: 0, why: 'Also eggs, meat, beans and tofu.' }
        ] },
      { card: { t: 'Handwashing', x: 'Wash your hands with soap and water for at least 20 seconds — about the time it takes to hum “Happy Birthday” twice — especially before eating and after using the toilet.', em: '🧼👐' },
        qs: [
          { q: 'How long should you wash your hands with soap?', o: ['At least 20 seconds', '2 seconds', '5 minutes'], a: 0, why: 'Long enough to remove germs.' },
          { q: 'When is handwashing especially important?', o: ['Before eating and after using the toilet', 'Only once a week', 'Only after showering'], a: 0, why: 'Those are key moments for spreading germs.' },
          { q: 'Rinsing with water alone is as good as using soap.', o: TF, a: 1, keep: true, why: 'Soap helps lift germs and oils off your skin.' }
        ] }
    ] },
    { title: 'Kitchen Basics', desc: 'Cook safely and confidently', topics: [
      { card: { t: 'Food safety temperatures', x: 'Bacteria grow fastest between about 5 °C and 60 °C — the “danger zone”. Keep cold food cold and hot food hot, and refrigerate leftovers within 2 hours (sooner in very hot weather).', code: 'Danger zone: 5 °C – 60 °C\nRefrigerate leftovers within 2 hours' },
        qs: [
          { q: 'The food “danger zone” is about…', o: ['5 °C to 60 °C', '−20 °C to 0 °C', '100 °C to 200 °C'], a: 0, why: 'Bacteria multiply quickly in this range.' },
          { q: 'Leftovers should be refrigerated within…', o: ['2 hours', '2 days', 'a week'], a: 0, why: 'Sooner in very hot weather.' },
          { q: 'Keep hot food…', o: ['hot, and cold food cold', 'lukewarm', 'at room temperature all day'], a: 0, why: 'Avoid the danger zone.' }
        ] },
      { card: { t: 'Avoid cross-contamination', x: 'Use separate cutting boards and knives for raw meat and ready-to-eat foods like vegetables for salad. Wash your hands, boards and utensils after handling raw meat.', em: '🥩🔪🥬' },
        qs: [
          { q: 'Why use separate cutting boards for raw meat?', o: ['To avoid spreading bacteria to other food', 'Because it looks nice', 'To save soap'], a: 0, why: 'That’s cross-contamination.' },
          { q: 'After handling raw chicken, you should…', o: ['wash your hands with soap', 'make a salad right away', 'only wipe on your shirt'], a: 0, why: 'Raw poultry can carry harmful bacteria.' },
          { q: 'Cross-contamination means…', o: ['spreading germs from one food or surface to another', 'cooking two dishes at once', 'mixing spices'], a: 0, why: 'It’s a common cause of food poisoning.' }
        ] },
      { card: { t: 'Cook it through', x: 'Use a food thermometer when you can. Chicken and other poultry are safe at an internal temperature of 74 °C (165 °F). Cooked chicken juices should run clear, not pink.', code: 'Poultry: 74 °C (165 °F)' },
        qs: [
          { q: 'What internal temperature makes chicken safe to eat?', o: ['74 °C (165 °F)', '40 °C', '20 °C'], a: 0, why: 'Hot enough to kill harmful bacteria.' },
          { q: 'The most reliable way to check if meat is cooked is…', o: ['a food thermometer', 'how long it smells', 'its color in dim light'], a: 0, why: 'Color alone can be misleading.' },
          { q: 'Undercooked chicken can cause…', o: ['food poisoning', 'better taste', 'nothing'], a: 0, why: 'For example, from Salmonella.' }
        ] },
      { card: { t: 'Cooking terms and measures', x: 'Boil: bubbling rapidly (water boils at 100 °C at sea level). Simmer: small, gentle bubbles below a full boil. Sauté: cook quickly in a little oil. Measures: 1 tablespoon = 3 teaspoons, and 1 cup = 16 tablespoons.', code: '1 tbsp = 3 tsp\n1 cup  = 16 tbsp' },
        qs: [
          { q: 'How many teaspoons are in 1 tablespoon?', o: ['3', '2', '5'], a: 0, why: 'tbsp = 3 tsp.' },
          { q: 'Gentle, small bubbles below a full boil is called…', o: ['simmering', 'frying', 'freezing'], a: 0, why: 'Great for soups like sinigang.' },
          { q: 'Cooking quickly in a little oil (like garlic for sinangag) is…', o: ['sautéing', 'boiling', 'baking'], a: 0, why: 'From the French word for “jump”.' }
        ] }
    ] }
  ] };

  C.music = { name: 'Music Basics', kind: 'skill', group: 'life', icon: '🎵', iconBg: '#8E44AD', voice: [], units: [
    { title: 'Reading Music', desc: 'Notes, staff, rhythm and beats', topics: [
      { card: { t: 'The musical alphabet', x: 'Music uses seven letter names: A, B, C, D, E, F, G. After G it starts again at A, one octave higher. Notes with the same letter sound similar but higher or lower.', code: 'A B C D E F G | A B C …' },
        qs: [
          { q: 'How many letter names are in the musical alphabet?', o: ['7', '8', '12', '26'], a: 0, why: 'A to G.' },
          { q: 'What note comes after G?', o: ['A', 'H', 'G#'], a: 0, why: 'The letters repeat.' },
          { q: 'Going from one C to the next C is called an…', o: ['octave', 'orchestra', 'opera'], a: 0, why: 'Octo = eight notes apart.' }
        ] },
      { card: { t: 'The treble clef staff', x: 'The staff has 5 lines and 4 spaces. In the treble clef, the lines from bottom to top are E, G, B, D, F (“Every Good Boy Does Fine”) and the spaces spell F, A, C, E.', code: 'Lines:  E G B D F  (Every Good Boy Does Fine)\nSpaces: F A C E' },
        qs: [
          { q: 'In the treble clef, the spaces spell…', o: ['FACE', 'EGBDF', 'CAGE'], a: 0, why: 'Bottom to top: F, A, C, E.' },
          { q: 'The bottom line of the treble clef staff is…', o: ['E', 'F', 'G'], a: 0, why: 'Every (E) Good Boy Does Fine.' },
          { q: 'How many lines does a staff have?', o: ['5', '4', '7'], a: 0, why: '5 lines and 4 spaces.' }
        ] },
      { card: { t: 'Note values', x: 'In common time (4/4), a whole note lasts 4 beats, a half note 2 beats, a quarter note 1 beat, and an eighth note half a beat.', code: 'whole = 4   half = 2\nquarter = 1 eighth = ½' },
        qs: [
          { q: 'In 4/4 time, a half note lasts…', o: ['2 beats', '4 beats', '1 beat'], a: 0, why: 'Half of a whole note.' },
          { q: 'How many quarter notes equal one whole note?', calc: '4/1', o: ['4', '2', '8'], a: 0, why: '4 × 1 beat.' },
          { q: 'An eighth note lasts…', o: ['half a beat', '8 beats', '2 beats'], a: 0, why: 'Two eighth notes = one beat.' }
        ] },
      { card: { t: 'Time signatures', x: 'The time signature shows how many beats are in each measure (bar). 4/4 has four quarter-note beats per bar — the most common in pop music. 3/4 has three beats per bar, like a waltz.', code: '4/4 → 1 2 3 4 | 1 2 3 4\n3/4 → 1 2 3 | 1 2 3' },
        qs: [
          { q: 'How many beats are in each bar of 3/4 time?', o: ['3', '4', '6'], a: 0, why: 'The top number tells you.' },
          { q: 'Which time signature is a waltz usually in?', o: ['3/4', '4/4', '2/2'], a: 0, why: 'ONE-two-three, ONE-two-three.' },
          { q: 'The most common time signature in pop music is…', o: ['4/4', '7/8', '5/4'], a: 0, why: 'Also called common time.' }
        ] }
    ] },
    { title: 'Instruments & Chords', desc: 'Piano, guitar, scales and chords', topics: [
      { card: { t: 'The piano keyboard', x: 'Black keys come in groups of 2 and 3. The white key just to the left of each group of two black keys is C. Middle C is the C nearest the middle of the keyboard.', em: '🎹' },
        qs: [
          { q: 'Black keys on a piano come in groups of…', o: ['2 and 3', '4 and 5', '1 only'], a: 0, why: 'This pattern helps you find notes.' },
          { q: 'The white key just left of a group of TWO black keys is…', o: ['C', 'F', 'A'], a: 0, why: 'The key left of a group of three is F.' },
          { q: 'Middle C is…', o: ['the C nearest the middle of the keyboard', 'the highest note', 'a black key'], a: 0, why: 'A common starting point for beginners.' }
        ] },
      { card: { t: 'The C major scale', x: 'A major scale follows the pattern whole, whole, half, whole, whole, whole, half (W W H W W W H). The C major scale uses only white keys: C D E F G A B C.', code: 'C  D  E  F  G  A  B  C\n W  W  H  W  W  W  H' },
        qs: [
          { q: 'Which notes are in the C major scale?', o: ['C D E F G A B C', 'C D E F# G A B C', 'A B C D E F G A'], a: 0, why: 'All white keys.' },
          { q: 'The major scale step pattern is…', o: ['W W H W W W H', 'W H W H W H W', 'H H H H H H H'], a: 0, mono: true, why: 'W = whole step, H = half step.' },
          { q: 'On a piano, the C major scale uses…', o: ['only white keys', 'only black keys', 'every key'], a: 0, why: 'That’s why beginners start with it.' }
        ] },
      { card: { t: 'Guitar basics', x: 'A standard guitar has 6 strings. In standard tuning, from the thickest (lowest) to the thinnest (highest), they are E, A, D, G, B, E. Pressing a string at a fret makes a higher note.', code: '6  5  4  3  2  1\nE  A  D  G  B  E\n(low)       (high)' },
        qs: [
          { q: 'How many strings does a standard guitar have?', o: ['6', '4', '12'], a: 0, why: 'A bass guitar usually has 4.' },
          { q: 'Standard tuning, low to high, is…', o: ['E A D G B E', 'A B C D E F', 'G D A E B G'], a: 0, mono: true, why: 'Some remember it as “Eddie Ate Dynamite, Good Bye Eddie”.' },
          { q: 'Pressing a string at a higher fret makes the note…', o: ['higher', 'lower', 'silent'], a: 0, why: 'It shortens the vibrating string.' }
        ] },
      { card: { t: 'Chords', x: 'A chord is three or more notes played together. A basic major chord (triad) uses the 1st, 3rd and 5th notes of its scale: C major = C, E, G. G major = G, B, D. A minor = A, C, E.', code: 'C major = C E G\nG major = G B D\nA minor = A C E' },
        qs: [
          { q: 'Which notes make a C major chord?', o: ['C, E, G', 'C, D, E', 'C, F, A'], a: 0, why: '1st, 3rd and 5th notes of the C major scale.' },
          { q: 'A basic three-note chord is called a…', o: ['triad', 'trio', 'tritone'], a: 0, why: 'Tri = three.' },
          { q: 'Which notes make an A minor chord?', o: ['A, C, E', 'A, C#, E', 'A, B, C'], a: 0, why: 'A–C# –E would be A major.' }
        ] }
    ] }
  ] };

  C.photo = { name: 'Photography', kind: 'skill', group: 'life', icon: '📷', iconBg: '#2C3E50', voice: [], units: [
    { title: 'Better Photos', desc: 'Composition and light', topics: [
      { card: { t: 'The rule of thirds', x: 'Imagine the frame divided by two horizontal and two vertical lines into 9 boxes. Placing your subject along these lines or where they cross often looks more balanced than putting it dead center. Most phone cameras can show this grid.', code: '┌───┬───┬───┐\n│   │   │   │\n├───●───●───┤\n│   │   │   │\n├───●───●───┤\n│   │   │   │\n└───┴───┴───┘' },
        qs: [
          { q: 'The rule of thirds divides the frame into…', o: ['9 boxes', '3 boxes', '4 boxes'], a: 0, why: '2 horizontal + 2 vertical lines.' },
          { q: 'Where should key subjects go?', o: ['On the lines or where they cross', 'Always exactly in the center', 'At the very edge'], a: 0, why: 'It creates balance and interest.' },
          { q: 'For a landscape, the horizon often looks good…', o: ['along the top or bottom third line', 'cutting the photo exactly in half', 'diagonal'], a: 0, why: 'Choose sky or land as the focus.' }
        ] },
      { card: { t: 'Leading lines', x: 'Roads, rivers, fences and railings can act as leading lines that guide the viewer’s eye toward your subject and add depth.', em: '🛤️👁️' },
        qs: [
          { q: 'Leading lines help to…', o: ['guide the viewer’s eye to the subject', 'make the photo darker', 'hide the subject'], a: 0, why: 'They create a path for the eye.' },
          { q: 'Which can be a leading line?', o: ['A road stretching into the distance', 'A plain blue sky', 'A blank wall'], a: 0, why: 'Lines that point somewhere.' },
          { q: 'Leading lines also add a sense of…', o: ['depth', 'noise', 'blur'], a: 0, why: 'They pull you into the scene.' }
        ] },
      { card: { t: 'Light', x: 'The “golden hour” — shortly after sunrise and before sunset — gives soft, warm, flattering light. Harsh midday sun creates strong shadows. For portraits, face your subject toward soft light like a window.', em: '🌅📸' },
        qs: [
          { q: 'When is the “golden hour”?', o: ['Shortly after sunrise and before sunset', 'At exactly 12 noon', 'At midnight'], a: 0, why: 'The low sun gives soft, warm light.' },
          { q: 'Harsh midday sun usually creates…', o: ['strong shadows', 'soft light', 'no shadows'], a: 0, why: 'Overhead light shadows the eyes.' },
          { q: 'For an indoor portrait, a good light source is…', o: ['a window with soft daylight', 'a bare bulb behind the person', 'no light'], a: 0, why: 'Soft light flatters faces.' }
        ] },
      { card: { t: 'Phone photo tips', x: 'Wipe your lens, tap the screen to focus on your subject, hold steady, and move closer instead of using digital zoom (which lowers quality). Turn on the grid to use the rule of thirds.', em: '📱✨' },
        qs: [
          { q: 'Instead of digital zoom, it’s usually better to…', o: ['move closer', 'zoom to the max', 'shake the phone'], a: 0, why: 'Digital zoom just crops and loses quality.' },
          { q: 'A blurry, hazy phone photo is often fixed by…', o: ['wiping the lens', 'adding stickers', 'using more zoom'], a: 0, why: 'Fingerprints smudge the lens.' },
          { q: 'Tapping the screen on your subject…', o: ['focuses on it', 'deletes the photo', 'turns on the flash'], a: 0, why: 'It also often adjusts brightness.' }
        ] }
    ] },
    { title: 'Camera Settings', desc: 'The exposure triangle', topics: [
      { card: { t: 'The exposure triangle', x: 'Three settings control how bright a photo is: aperture (the size of the lens opening), shutter speed (how long the sensor is exposed) and ISO (how sensitive it is to light). Changing one affects the others.', code: 'Aperture ─ Shutter speed ─ ISO' },
        qs: [
          { q: 'Which three settings make up the exposure triangle?', o: ['Aperture, shutter speed, ISO', 'Zoom, flash, filter', 'Color, contrast, crop'], a: 0, why: 'Together they control brightness.' },
          { q: 'Aperture is…', o: ['the size of the lens opening', 'how long the shutter stays open', 'the sensor’s sensitivity'], a: 0, why: 'Like the pupil of an eye.' },
          { q: 'Exposure means…', o: ['how much light reaches the sensor', 'how many photos you take', 'the camera brand'], a: 0, why: 'Too much = too bright; too little = too dark.' }
        ] },
      { card: { t: 'Aperture', x: 'Aperture is written as an f-number. A SMALL f-number like f/1.8 means a WIDE opening: more light and a blurrier background (great for portraits). A large f-number like f/16 means a small opening and more of the scene in focus (great for landscapes).', code: 'f/1.8 → wide opening, blurry background\nf/16  → small opening, more in focus' },
        qs: [
          { q: 'Which aperture lets in MORE light?', o: ['f/1.8', 'f/16'], a: 0, keep: true, mono: true, why: 'Smaller f-number = wider opening.' },
          { q: 'For a portrait with a blurry background, use…', o: ['a small f-number like f/1.8', 'a large f-number like f/22'], a: 0, keep: true, why: 'A wide aperture gives shallow depth of field.' },
          { q: 'For a landscape with everything sharp, use…', o: ['a larger f-number like f/11–f/16', 'the widest aperture'], a: 0, keep: true, why: 'More depth of field.' }
        ] },
      { card: { t: 'Shutter speed', x: 'Fast shutter speeds like 1/1000 s freeze motion — great for sports. Slow speeds like 1 s blur motion (silky waterfalls, light trails) but need a tripod to avoid shake.', code: '1/1000 s → freeze action\n1 s      → motion blur (use a tripod)' },
        qs: [
          { q: 'To freeze a basketball player mid-jump, use a…', o: ['fast shutter speed like 1/1000 s', 'slow shutter speed like 2 s'], a: 0, keep: true, why: 'Short exposure stops motion.' },
          { q: 'Silky, blurred waterfall photos use a…', o: ['slow shutter speed', 'fast shutter speed'], a: 0, keep: true, why: 'The moving water blurs over time.' },
          { q: 'With slow shutter speeds you usually need…', o: ['a tripod', 'more zoom', 'a filter app'], a: 0, why: 'Hand shake causes blur.' }
        ] },
      { card: { t: 'ISO', x: 'ISO sets how sensitive the sensor is to light. Low ISO (100–200) gives clean images in bright light. High ISO (3200+) brightens dark scenes but adds grain (noise).', code: 'ISO 100  → clean, needs lots of light\nISO 3200 → brighter, more grain' },
        qs: [
          { q: 'Raising the ISO makes photos…', o: ['brighter, but grainier', 'darker and cleaner', 'blurrier'], a: 0, why: 'More sensitivity = more noise.' },
          { q: 'On a sunny day, a good ISO is…', o: ['100–200', '6400', '25600'], a: 0, why: 'Plenty of light, so keep it low.' },
          { q: 'Grain or speckles in a photo are called…', o: ['noise', 'bokeh', 'flare'], a: 0, why: 'Bokeh is background blur.' }
        ] }
    ] }
  ] };
})();
