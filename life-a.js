// Career, study, people skills and money courses (skill engine). `calc` answers are machine-checked.
(function () {
  const TF = ['True', 'False'];
  const C = window.COURSES;

  C.career = { name: 'Career English', kind: 'skill', group: 'career', icon: '💼', iconBg: '#3A6EA5', voice: [], units: [
    { title: 'Job Interviews', desc: 'Answer common questions with confidence', topics: [
      { card: { t: 'Tell me about yourself', x: 'Use a simple present–past–future structure: what you do now, the experience that prepared you, and why you want this job. Keep it to about 1–2 minutes.', code: '"I’m a customer service representative with\ntwo years of experience in billing support.\nBefore that, I studied IT. Now I’d love to\ngrow into a team lead role here."' },
        qs: [
          { q: 'What is a good structure for “Tell me about yourself”?', o: ['Present, past, then future (why this job)', 'Your whole life story from childhood', 'Only your hobbies'], a: 0, why: 'Keep it relevant to the job.' },
          { q: 'About how long should your answer be?', o: ['About 1–2 minutes', 'About 10 minutes', 'One sentence'], a: 0, why: 'Long enough to show who you are, short enough to keep attention.' },
          { q: 'Which is the strongest opening line?', o: ['“I’m a customer service rep with two years of experience in…”', '“Well, I was born in…”', '“I don’t really know what to say.”'], a: 0, why: 'Start with what’s most relevant to the role.' }
        ] },
      { card: { t: 'The STAR method', x: 'For “Tell me about a time when…” questions, answer with STAR: Situation (the context), Task (your goal), Action (what YOU did) and Result (what happened, ideally with numbers).', code: 'S: A customer was angry about a double charge.\nT: I had to fix it and keep the customer.\nA: I apologized, checked the records, and\n   processed the refund during the call.\nR: The customer stayed and rated the call 5/5.' },
        qs: [
          { q: 'What does STAR stand for?', o: ['Situation, Task, Action, Result', 'Skills, Talent, Attitude, Respect', 'Start, Talk, Answer, Repeat'], a: 0, why: 'A clear story structure.' },
          { q: 'Which part of STAR describes what YOU did?', o: ['Action', 'Situation', 'Result'], a: 0, why: 'Focus on your own steps, not the team’s.' },
          { q: 'STAR works best for questions like…', o: ['“Tell me about a time you handled an angry customer.”', '“What is your name?”', '“Can you start on Monday?”'], a: 0, why: 'Behavioral questions ask for real examples.' }
        ] },
      { card: { t: 'Strengths, weaknesses and questions', x: 'Back up each strength with a specific example. For a weakness, choose a real one that isn’t essential to the job and explain how you’re improving it. At the end, always ask the interviewer a thoughtful question.', code: '"My weakness is public speaking, so I joined\na speaking club and now present at team huddles."' },
        qs: [
          { q: 'What’s the best way to answer “What is your weakness?”', o: ['Name a real weakness and how you’re improving it', 'Say you have no weaknesses', 'Name a weakness that is essential for the job'], a: 0, why: 'It shows self-awareness and growth.' },
          { q: 'A strength is most convincing when backed by…', o: ['a specific example', 'a long list of adjectives', 'your expected salary'], a: 0, why: 'Examples are proof.' },
          { q: 'Which is a strong question to ask the interviewer?', o: ['“What does success look like in this role in the first 90 days?”', '“How many vacation days do I get?” (as your very first question)', '“No questions.”'], a: 0, why: 'It shows you care about doing the job well.' }
        ] },
      { card: { t: 'Interview etiquette', x: 'Arrive 10–15 minutes early. For online interviews, test your camera, microphone and internet beforehand and find a quiet place with good light. Send a short thank-you message within 24 hours.', em: '⏰👔💻✉️' },
        qs: [
          { q: 'How early should you arrive for an interview?', o: ['10–15 minutes early', 'Exactly on time or a little late', 'One hour early'], a: 0, why: 'Early enough to settle in, not so early that you wait for an hour.' },
          { q: 'Before an online interview, you should…', o: ['test your camera, mic and internet', 'turn your camera off', 'join from a noisy café'], a: 0, why: 'Technical problems create a bad first impression.' },
          { q: 'When should you send a thank-you message?', o: ['Within 24 hours', 'After a month', 'Never'], a: 0, why: 'It keeps you memorable.' }
        ] }
    ] },
    { title: 'Customer Service English', desc: 'Phrases for BPO and call center work', topics: [
      { card: { t: 'Opening a call', x: 'A professional opening has a greeting, the company name, your name and an offer to help. Ask politely for information and permission.', code: '"Thank you for calling Sunrise Telecom,\nthis is Ana. How may I help you today?"\n"May I have your account number, please?"' },
        qs: [
          { q: 'Which is the most professional opening?', o: ['“Thank you for calling Sunrise Telecom, this is Ana. How may I help you today?”', '“Hello? What do you want?”', '“Yeah, Sunrise.”'], a: 0, why: 'Greeting + company + name + offer to help.' },
          { q: 'Which request is more professional?', o: ['“May I have your account number, please?”', '“Give me your number.”'], a: 0, keep: true, why: '“May I… please” is polite.' },
          { q: 'What is a polite way to ask a caller to wait?', o: ['“May I place you on a brief hold?”', '“Wait.”', '“Hold on a sec, dude.”'], a: 0, why: 'Ask permission and keep it professional.' }
        ] },
      { card: { t: 'Empathy statements', x: 'When a customer is upset, first listen and acknowledge their feelings, then apologize for the experience and assure them you’ll help. Don’t interrupt.', code: '"I understand how frustrating that must be.\nI’m sorry for the inconvenience. Let me\nlook into this for you right away."' },
        qs: [
          { q: 'Which is an empathy statement?', o: ['“I understand how frustrating that must be.”', '“That’s not my problem.”', '“Calm down.”'], a: 0, why: 'It shows you understand their feelings.' },
          { q: 'With an angry customer, what should you do first?', o: ['Listen and acknowledge their feelings', 'Interrupt with the solution', 'Transfer the call immediately'], a: 0, why: 'People calm down when they feel heard.' },
          { q: '“I apologize for the inconvenience” is used to…', o: ['acknowledge the problem politely', 'end the call quickly', 'blame the customer'], a: 0, why: 'It shows respect for their experience.' }
        ] },
      { card: { t: 'Clear communication', x: 'Speak clearly and avoid filler words like “um” and “like”. Confirm details by repeating them back. Spell names and codes with the NATO phonetic alphabet: A = Alpha, B = Bravo, C = Charlie, D = Delta, E = Echo… M = Mike.', code: '"Just to confirm, that’s B as in Bravo,\nM as in Mike, 4-5-2. Is that correct?"' },
        qs: [
          { q: 'In the NATO phonetic alphabet, “B” is…', o: ['Bravo', 'Boy', 'Beta'], a: 0, why: 'A–Alpha, B–Bravo, C–Charlie.' },
          { q: 'In the NATO phonetic alphabet, “M” is…', o: ['Mike', 'Mary', 'Mango'], a: 0, why: 'M–Mike.' },
          { q: 'Why say “Just to confirm…”?', o: ['To check you understood correctly', 'To end the call', 'To sell something'], a: 0, why: 'Repeating details prevents mistakes.' }
        ] },
      { card: { t: 'Closing a call', x: 'Summarize what you did, ask if there’s anything else you can help with, and thank the customer.', code: '"I’ve processed your refund; you’ll see it in\n3–5 business days. Is there anything else\nI can help you with? Thank you for calling!"' },
        qs: [
          { q: 'Which question should you ask before ending a call?', o: ['“Is there anything else I can help you with?”', '“Can I go now?”', '“Why did you call?”'], a: 0, why: 'It makes sure all issues are solved.' },
          { q: 'A good closing includes…', o: ['a summary, an offer of more help and a thank-you', 'hanging up immediately', 'a long sales pitch'], a: 0, why: 'Customers remember how a call ends.' },
          { q: '“3–5 business days” means…', o: ['3 to 5 working days (usually not weekends or holidays)', 'exactly 5 calendar days', 'any time this month'], a: 0, why: 'Business days are working days.' }
        ] }
    ] },
    { title: 'Workplace Writing', desc: 'Emails, resumes and office phrases', topics: [
      { card: { t: 'Professional emails', x: 'Write a clear subject line, a polite greeting, short paragraphs with one main point each, and a professional closing.', code: 'Subject: Request for leave on June 12\n\nHi Ms. Santos,\n\nI’d like to request a day of leave on June 12\nfor a family event. My tasks are covered by Ben.\n\nBest regards,\nAna Cruz' },
        qs: [
          { q: 'Which subject line is best?', o: ['“Request for leave on June 12”', '“Hello”', '“URGENT!!!!”'], a: 0, why: 'Specific and clear.' },
          { q: 'Which is a professional email closing?', o: ['“Best regards,”', '“Bye!!”', '“K thx”'], a: 0, why: 'Others: “Kind regards,” “Sincerely,”' },
          { q: 'Paragraphs in a work email should be…', o: ['short, with one main point each', 'one long block of text', 'written in all capital letters'], a: 0, why: 'Easy to read on any screen.' }
        ] },
      { card: { t: 'Resume basics', x: 'Keep a resume short (1 page for most entry-level jobs). Include contact details, a short summary, experience (most recent first), skills and education. Start bullet points with action verbs like Led, Solved or Increased, and tailor it to each job.', code: '• Resolved 40+ customer calls daily with a\n  95% satisfaction score\n• Led a team of 5 in a school IT project' },
        qs: [
          { q: 'How should work experience be ordered?', o: ['Most recent first', 'Alphabetically', 'Oldest first'], a: 0, why: 'This is called reverse chronological order.' },
          { q: 'Which bullet point is strongest?', o: ['“Resolved 40+ customer calls daily with a 95% satisfaction score”', '“Was responsible for phones”', '“Did many things”'], a: 0, why: 'Action verb + specific numbers.' },
          { q: 'A good resume length for most entry-level jobs is…', o: ['1 page', '5 pages', 'As long as possible'], a: 0, why: 'Recruiters scan resumes quickly.' }
        ] },
      { card: { t: 'Polite requests', x: 'At work, soften requests: “Could you please…?”, “Would you mind…?”, “I would appreciate it if…”. Formal: “I am writing to inquire…”; informal: “Just checking in…”.', code: '"Could you please send the report by 3 PM?"\n"Would you mind reviewing my draft?"' },
        qs: [
          { q: 'Which request is most polite?', o: ['“Could you please send the report by 3 PM?”', '“Send the report.”', '“Report. Now.”'], a: 0, why: '“Could you please” softens it.' },
          { q: 'Complete: “Would you mind ___ my draft?”', o: ['reviewing', 'review', 'to review'], a: 0, why: '“Would you mind” is followed by the -ing form.' },
          { q: 'Which sentence is more formal?', o: ['“I am writing to inquire about the position.”', '“Hey, is the job still open?”'], a: 0, keep: true, why: 'Use formal language with people you don’t know well.' }
        ] },
      { card: { t: 'Office abbreviations', x: 'You’ll see these often at work: ASAP (as soon as possible), FYI (for your information), EOD (end of day), ETA (estimated time of arrival), and “touch base” (talk briefly to check in).', code: '"FYI, the client wants the files by EOD."' },
        qs: [
          { q: 'What does EOD mean?', o: ['End of day', 'Every other day', 'Email on demand'], a: 0, why: 'Usually by the end of the working day.' },
          { q: 'What does FYI mean?', o: ['For your information', 'Find your issue', 'Fix your input'], a: 0, why: 'No action needed — just information.' },
          { q: '“Let’s touch base tomorrow” means…', o: ['let’s talk briefly to check in', 'let’s play baseball', 'let’s cancel the project'], a: 0, why: 'A common workplace idiom.' }
        ] }
    ] }
  ] };

  C.study = { name: 'Study & Exam Skills', kind: 'skill', group: 'career', icon: '📝', iconBg: '#7A5AF8', voice: [], units: [
    { title: 'Study Smarter', desc: 'Methods backed by learning science', topics: [
      { card: { t: 'Active recall', x: 'Testing yourself — answering questions, using flashcards, explaining from memory — builds memory much better than rereading or highlighting.', em: '🧠❓' },
        qs: [
          { q: 'Which study method works better?', o: ['Testing yourself on the material', 'Rereading the same notes many times'], a: 0, keep: true, why: 'Pulling information out of memory strengthens it.' },
          { q: 'Which is an example of active recall?', o: ['Covering your notes and explaining the topic aloud', 'Highlighting a textbook', 'Copying notes word for word'], a: 0, why: 'You retrieve the information yourself.' },
          { q: 'Getting a practice question wrong is…', o: ['useful — it shows what to review', 'a waste of time', 'proof you can’t learn it'], a: 0, why: 'Mistakes during practice help you learn.' }
        ] },
      { card: { t: 'Spaced repetition', x: 'Review material at increasing intervals — for example after 1 day, 3 days, a week, then a month. Spacing reviews out beats cramming everything the night before. (Tuon’s practice mode brings back your mistakes the same way.)', code: 'Day 1 → Day 2 → Day 4 → Day 8 → Day 30' },
        qs: [
          { q: 'Spaced repetition means…', o: ['reviewing at increasing intervals over time', 'studying everything the night before', 'reading faster'], a: 0, why: 'Each review comes just before you would forget.' },
          { q: 'Which usually leads to longer-lasting memory?', o: ['Studying 30 minutes a day for a week', 'Studying 3.5 hours in one night'], a: 0, keep: true, why: 'Same total time, better results when spread out.' },
          { q: 'Cramming the night before mostly helps…', o: ['short-term memory', 'long-term memory'], a: 0, keep: true, why: 'It fades quickly after the test.' }
        ] },
      { card: { t: 'The Pomodoro technique', x: 'Work with full focus for 25 minutes, then take a 5-minute break. After four rounds, take a longer break of 15–30 minutes. Put your phone away while you focus.', code: '25 min focus → 5 min break  (× 4)\n→ 15–30 min break' },
        qs: [
          { q: 'A standard Pomodoro focus session lasts…', o: ['25 minutes', '5 minutes', '2 hours'], a: 0, why: 'Then a 5-minute break.' },
          { q: 'After four Pomodoros, you take…', o: ['a longer 15–30 minute break', 'no break', 'a 1-minute break'], a: 0, why: 'Longer rest helps you recharge.' },
          { q: 'During a focus session, your phone should be…', o: ['out of reach or on silent', 'in your hand', 'on loud with notifications'], a: 0, why: 'Interruptions break concentration.' }
        ] },
      { card: { t: 'Sleep and memory', x: 'Sleep helps your brain store what you learned. Pulling an all-nighter usually hurts memory and focus on exam day. Teens need about 8–10 hours of sleep; adults about 7–9.', em: '😴📚' },
        qs: [
          { q: 'How does sleep affect learning?', o: ['It helps the brain store memories', 'It erases what you studied', 'It has no effect'], a: 0, why: 'Memory consolidation happens during sleep.' },
          { q: 'An all-nighter before an exam usually…', o: ['hurts memory and focus', 'improves your score a lot', 'is required'], a: 0, why: 'Tired brains recall less.' },
          { q: 'How much sleep do most adults need?', o: ['About 7–9 hours', 'About 3–4 hours', 'About 12–14 hours'], a: 0, why: 'Teens need a bit more: 8–10 hours.' }
        ] }
    ] },
    { title: 'Exams & Tests', desc: 'Strategies and common exams', topics: [
      { card: { t: 'Test-taking strategies', x: 'Read all instructions first. Answer the easy questions first, then return to the hard ones. For multiple choice, eliminate options you know are wrong. Keep an eye on the time, and save a few minutes to review.', em: '⏱️✅' },
        qs: [
          { q: 'What should you do first on an exam?', o: ['Read all the instructions', 'Start on the hardest question', 'Guess every answer'], a: 0, why: 'Instructions can change how you answer.' },
          { q: 'On a multiple-choice question you’re unsure of…', o: ['eliminate the options you know are wrong', 'always choose the longest answer', 'leave the test'], a: 0, why: 'It improves your odds.' },
          { q: 'Why answer the easy questions first?', o: ['To secure points and save time for the hard ones', 'Because hard questions don’t count', 'There’s no reason'], a: 0, why: 'Don’t get stuck early.' }
        ] },
      { card: { t: 'Philippine exams', x: 'The Civil Service Exam (Professional or Subprofessional level) is given by the Civil Service Commission for government jobs. The LET (Licensure Examination for Teachers) is given by the PRC. Nurses who want to work in the United States take the NCLEX.', em: '🇵🇭📄' },
        qs: [
          { q: 'Which agency gives the Civil Service Exam?', o: ['The Civil Service Commission (CSC)', 'The PRC', 'DepEd'], a: 0, why: 'For careers in government.' },
          { q: 'Which exam do future teachers take?', o: ['LET', 'NCLEX', 'IELTS'], a: 0, why: 'Licensure Examination for Teachers, given by the PRC.' },
          { q: 'The NCLEX is for…', o: ['nurses who want to work in the United States', 'teachers in the Philippines', 'government clerks'], a: 0, why: 'It’s the US nursing licensure exam.' }
        ] },
      { card: { t: 'Language exams for work abroad', x: 'IELTS tests English in four parts — Listening, Reading, Writing and Speaking — scored in bands from 0 to 9. The JLPT tests Japanese from N5 (easiest) to N1 (hardest). EPS-TOPIK is the Korean test for workers under Korea’s Employment Permit System.', em: '🇬🇧🇯🇵🇰🇷' },
        qs: [
          { q: 'Which is the HARDEST JLPT level?', o: ['N1', 'N5', 'N3'], a: 0, why: 'N5 is the easiest.' },
          { q: 'IELTS has which four parts?', o: ['Listening, Reading, Writing, Speaking', 'Math, Science, English, History', 'Grammar, Spelling, Typing, Art'], a: 0, why: 'All four English skills.' },
          { q: 'EPS-TOPIK is a test of…', o: ['Korean, for work under the Employment Permit System', 'Japanese for university', 'English for nurses'], a: 0, why: 'It’s required for many jobs in South Korea.' }
        ] },
      { card: { t: 'Exam day', x: 'Prepare your ID, permit and supplies the night before. Sleep well, eat a proper meal, and arrive early so you’re calm. During the exam, if you feel panic, pause and take a few slow, deep breaths.', em: '🪪✏️⏰' },
        qs: [
          { q: 'When should you prepare your ID and exam permit?', o: ['The night before', 'On the way to the exam', 'After the exam'], a: 0, why: 'Avoid a morning rush.' },
          { q: 'If you panic during the exam…', o: ['pause and take a few slow, deep breaths', 'leave immediately', 'skip the rest'], a: 0, why: 'Slow breathing calms the body.' },
          { q: 'On exam morning you should…', o: ['eat a proper meal', 'skip breakfast', 'drink five energy drinks'], a: 0, why: 'Your brain needs fuel.' }
        ] }
    ] }
  ] };

  C.people = { name: 'People Skills', kind: 'skill', group: 'human', icon: '🤝', iconBg: '#E0874B', voice: [], units: [
    { title: 'Communication', desc: 'Listen, speak and give feedback', topics: [
      { card: { t: 'Active listening', x: 'Give full attention, don’t interrupt, and show you understand by paraphrasing: “So what you’re saying is…”. Ask questions to learn more instead of planning your reply.', em: '👂💬' },
        qs: [
          { q: 'Which is active listening?', o: ['“So what you’re saying is the deadline is too tight?”', 'Checking your phone while they talk', 'Interrupting with your own story'], a: 0, why: 'Paraphrasing shows you understood.' },
          { q: 'While someone is talking, you should…', o: ['focus on understanding them', 'plan what you’ll say next', 'look around the room'], a: 0, why: 'Listen to understand, not just to reply.' },
          { q: 'Asking “Can you tell me more?” is…', o: ['a good listening habit', 'rude', 'a waste of time'], a: 0, why: 'It shows interest.' }
        ] },
      { card: { t: 'Public speaking', x: 'Prepare a simple structure: an opening, three main points and a closing. Practice out loud, look at your audience, and speak slowly. Feeling nervous is normal — slow breathing helps.', code: 'Opening → Point 1 → Point 2 → Point 3 → Closing' },
        qs: [
          { q: 'What’s a simple structure for a talk?', o: ['Opening, three main points, closing', 'Read every slide word for word', 'No plan at all'], a: 0, why: 'Easy for you and the audience to follow.' },
          { q: 'Feeling nervous before speaking is…', o: ['normal — practice and slow breathing help', 'a sign you should quit', 'rare'], a: 0, why: 'Even experienced speakers get nervous.' },
          { q: 'The best way to practice a speech is…', o: ['out loud, several times', 'only reading it silently', 'not practicing'], a: 0, why: 'Speaking aloud reveals where you stumble.' }
        ] },
      { card: { t: 'Body language', x: 'Your body speaks too. Eye contact, an open posture and nodding show interest. Crossed arms or looking at your phone can make you seem closed off or uninterested.', em: '🙂👀🙌' },
        qs: [
          { q: 'Which body language shows interest?', o: ['Eye contact and nodding', 'Looking at your phone', 'Turning away'], a: 0, why: 'They signal attention.' },
          { q: 'Crossed arms can make you look…', o: ['closed off or defensive', 'very friendly', 'excited'], a: 0, why: 'Even if you’re just cold!' },
          { q: 'An open posture means…', o: ['relaxed arms and facing the person', 'hands in pockets and looking away', 'standing behind a desk'], a: 0, why: 'It looks approachable.' }
        ] },
      { card: { t: 'Giving feedback', x: 'Good feedback is specific and about behavior, not the person. One method is SBI: Situation, Behavior, Impact — “In this morning’s meeting (S), you explained the data clearly (B), and the client agreed right away (I).”', code: 'Situation → Behavior → Impact' },
        qs: [
          { q: 'Which feedback is better?', o: ['“Your report had three missing numbers on page 2.”', '“Your report is bad.”'], a: 0, keep: true, why: 'Specific and about the work.' },
          { q: 'What does SBI stand for?', o: ['Situation, Behavior, Impact', 'Speak, Blame, Ignore', 'Smile, Bow, Introduce'], a: 0, why: 'A clear, fair structure.' },
          { q: 'Good feedback focuses on…', o: ['behavior', 'the person’s personality'], a: 0, keep: true, why: 'Behavior can change; it feels less like an attack.' }
        ] }
    ] },
    { title: 'Thinking & Teamwork', desc: 'Solve problems and work well with others', topics: [
      { card: { t: 'Critical thinking', x: 'Separate facts from opinions, ask “How do we know this?”, and check claims with reliable sources. Before sharing a post, look up what other trusted sources say about it.', em: '🔍🧐' },
        qs: [
          { q: 'Which is a fact, not an opinion?', o: ['“Water boils at 100 °C at sea level.”', '“Adobo is the best dish.”', '“Mondays are terrible.”'], a: 0, why: 'Facts can be checked.' },
          { q: 'Before sharing a shocking post, you should…', o: ['check what other trusted sources say', 'share it right away', 'only read the headline'], a: 0, why: 'Many viral posts are false or misleading.' },
          { q: 'A key critical-thinking question is…', o: ['“How do we know this is true?”', '“Who posted it first?”', '“How many likes does it have?”'], a: 0, why: 'Popularity isn’t evidence.' }
        ] },
      { card: { t: 'Problem solving', x: 'Define the problem clearly, brainstorm several solutions, pick one, try it, and review the result. The “5 Whys” technique — asking “why?” repeatedly — helps you find the root cause.', code: 'Define → Brainstorm → Choose → Act → Review' },
        qs: [
          { q: 'What is the first step in solving a problem?', o: ['Define the problem clearly', 'Pick the first idea', 'Blame someone'], a: 0, why: 'You can’t solve what you don’t understand.' },
          { q: 'The “5 Whys” helps you find…', o: ['the root cause', 'five new problems', 'who to blame'], a: 0, why: 'Keep asking why until you reach the source.' },
          { q: 'When brainstorming, you should…', o: ['list many ideas before judging them', 'judge each idea immediately', 'only accept one idea'], a: 0, why: 'More ideas → better choices.' }
        ] },
      { card: { t: 'Emotional intelligence', x: 'Emotional intelligence means noticing your own feelings, managing your reactions, understanding how others feel (empathy), and handling relationships well. When upset, pause before you react.', em: '❤️🧠' },
        qs: [
          { q: 'Understanding how someone else feels is called…', o: ['empathy', 'sympathy for yourself', 'stubbornness'], a: 0, why: 'A key part of emotional intelligence.' },
          { q: 'When you feel angry at work, a good first step is to…', o: ['pause before reacting', 'reply immediately', 'post about it online'], a: 0, why: 'A short pause prevents regret.' },
          { q: 'Noticing your own emotions is called…', o: ['self-awareness', 'teamwork', 'leadership'], a: 0, why: 'It’s the foundation of emotional intelligence.' }
        ] },
      { card: { t: 'Teamwork and leadership', x: 'Strong teams have clear roles, open communication and trust. Good leaders listen, set a clear direction, share credit with the team and take responsibility for mistakes.', em: '👥🚀' },
        qs: [
          { q: 'Which habit makes a good leader?', o: ['Sharing credit with the team', 'Taking all the credit', 'Never listening'], a: 0, why: 'It builds trust and motivation.' },
          { q: 'Strong teams usually have…', o: ['clear roles and open communication', 'no plan', 'one person doing everything'], a: 0, why: 'Everyone knows what to do.' },
          { q: 'When a team project fails, a good leader…', o: ['takes responsibility and learns from it', 'blames one member publicly', 'pretends it didn’t happen'], a: 0, why: 'Accountability builds respect.' }
        ] }
    ] }
  ] };

  C.money = { name: 'Money Basics', kind: 'skill', group: 'money', icon: '💰', iconBg: '#1E9E5A', voice: [], units: [
    { title: 'Budgeting & Saving', desc: 'Take control of your money', topics: [
      { card: { t: 'Make a budget', x: 'A budget plans where your money goes. One simple guide is 50/30/20: about 50% for needs, 30% for wants and 20% for savings or paying off debt. Adjust it to your situation.', code: 'Income ₱20,000\nNeeds   50% = ₱10,000\nWants   30% = ₱6,000\nSavings 20% = ₱4,000' },
        qs: [
          { q: 'With ₱20,000 monthly income, how much goes to savings under 50/30/20?', calc: '20000*0.2', o: ['₱4,000', '₱6,000', '₱10,000', '₱2,000'], a: 0, why: '20% of ₱20,000.' },
          { q: 'In the 50/30/20 guide, the 50% is for…', o: ['needs', 'wants', 'savings'], a: 0, why: 'Rent, food, bills, transport.' },
          { q: 'The first step to budgeting is…', o: ['knowing your income and where your money goes', 'buying what you want', 'borrowing money'], a: 0, why: 'Track it for a month to see the real picture.' }
        ] },
      { card: { t: 'Needs vs. wants', x: 'Needs are things you must have to live and work: food, rent, utilities, transport, medicine. Wants are nice to have: milk tea, new gadgets, eating out. Covering needs first keeps you out of trouble.', em: '🍚🏠 vs 🧋📱' },
        qs: [
          { q: 'Which is a NEED?', o: ['Electricity bill', 'Milk tea', 'A new phone case'], a: 0, why: 'Essential for daily living.' },
          { q: 'Which is a WANT?', o: ['Concert tickets', 'Rent', 'Medicine'], a: 0, why: 'Nice to have, not essential.' },
          { q: 'When money is tight, you should first cover…', o: ['needs', 'wants'], a: 0, keep: true, why: 'Needs keep you safe and working.' }
        ] },
      { card: { t: 'Emergency fund', x: 'An emergency fund is money saved for surprises: hospital bills, job loss, repairs. A common target is 3–6 months of your basic expenses, kept somewhere safe and easy to reach.', em: '🛟💵' },
        qs: [
          { q: 'A common emergency-fund target is…', o: ['3–6 months of expenses', '1 day of expenses', '10 years of expenses'], a: 0, why: 'Enough to cover a job loss or big surprise.' },
          { q: 'An emergency fund is for…', o: ['unexpected costs like hospital bills', 'a new gadget on sale', 'holiday shopping'], a: 0, why: 'Only for real emergencies.' },
          { q: 'Monthly expenses are ₱15,000. Three months of expenses is…', calc: '15000*3', o: ['₱45,000', '₱30,000', '₱15,000'], a: 0, why: '₱15,000 × 3.' }
        ] },
      { card: { t: 'Saving habits', x: '“Pay yourself first”: set aside savings as soon as you get paid, before spending. Automate transfers if you can. Small amounts add up — saving ₱50 a day is ₱1,500 in 30 days.', code: '₱50 × 30 days = ₱1,500' },
        qs: [
          { q: '“Pay yourself first” means…', o: ['save as soon as you get paid, before spending', 'buy something for yourself first', 'pay your friends first'], a: 0, why: 'Savings happen before temptation.' },
          { q: 'Saving ₱50 a day for 30 days gives…', calc: '50*30', o: ['₱1,500', '₱500', '₱3,000'], a: 0, why: '₱50 × 30.' },
          { q: 'Why automate your savings?', o: ['You save without having to remember or decide each time', 'It earns 100% interest', 'Banks require it'], a: 0, why: 'Good habits on autopilot.' }
        ] }
    ] },
    { title: 'Banking, Credit & Investing', desc: 'Make your money work for you', topics: [
      { card: { t: 'Banks and e-wallets', x: 'Banks keep your money safe and may pay interest. In the Philippines, deposits in member banks are insured by PDIC up to ₱1,000,000 per depositor per bank. E-wallets are convenient for payments and transfers — protect them like a bank account.', em: '🏦📱' },
        qs: [
          { q: 'PDIC insures bank deposits up to how much per depositor per bank?', o: ['₱1,000,000', '₱10,000', 'Unlimited'], a: 0, why: 'Coverage was raised from ₱500,000 to ₱1 million in 2025.' },
          { q: 'One benefit of keeping savings in a bank instead of at home is…', o: ['safety (and sometimes interest)', 'it’s always free to withdraw anywhere', 'it doubles every month'], a: 0, why: 'Cash at home can be lost or stolen.' },
          { q: 'You should protect your e-wallet like…', o: ['a bank account', 'a social media game', 'a public notebook'], a: 0, why: 'It holds real money.' }
        ] },
      { card: { t: 'Interest and debt', x: 'Simple interest = principal × rate × time: ₱10,000 at 5% for 1 year earns ₱500. Compound interest also earns interest on past interest, so it grows faster over time — great for savings, dangerous for debt. Pay credit cards in full to avoid interest.', code: '₱10,000 × 5% × 1 year = ₱500' },
        qs: [
          { q: '₱10,000 at 5% simple interest for 1 year earns…', calc: '10000*0.05*1', o: ['₱500', '₱50', '₱5,000'], a: 0, why: '10,000 × 0.05 × 1.' },
          { q: 'Compound interest means…', o: ['you earn interest on your interest too', 'interest is paid only once', 'there is no interest'], a: 0, why: 'Growth speeds up over time.' },
          { q: 'To avoid credit card interest, you should…', o: ['pay the full balance on time each month', 'pay only the minimum', 'ignore the bill'], a: 0, why: 'Paying the minimum lets interest pile up.' }
        ] },
      { card: { t: 'Investing basics', x: 'Investing aims to grow money over the long term. Higher possible returns usually come with higher risk. Diversify — don’t put all your eggs in one basket. Examples in the Philippines include stocks on the PSE, bonds, mutual funds or UITFs, and the government’s Pag-IBIG MP2 savings program.', em: '📈🧺' },
        qs: [
          { q: 'Higher possible returns usually come with…', o: ['higher risk', 'no risk', 'guaranteed profit'], a: 0, why: 'Risk and return go together.' },
          { q: '“Diversify” means…', o: ['spread money across different investments', 'put everything in one stock', 'keep all cash under the bed'], a: 0, why: 'One loss won’t sink everything.' },
          { q: 'Pag-IBIG MP2 is…', o: ['a government voluntary savings program', 'a cryptocurrency', 'a credit card'], a: 0, why: 'It’s offered by the Pag-IBIG Fund.' }
        ] },
      { card: { t: 'Inflation', x: 'Inflation means prices rise over time, so the same money buys less. If prices rise 4% a year, ₱100 today buys only about what ₱96 bought a year ago. Saving and investing aim to keep up with or beat inflation.', em: '🛒⬆️' },
        qs: [
          { q: 'Inflation means…', o: ['prices rise over time', 'prices always fall', 'money doubles every year'], a: 0, why: 'Your money buys less.' },
          { q: 'If your savings earn 1% while inflation is 4%, your money’s buying power…', o: ['goes down', 'goes up', 'stays exactly the same'], a: 0, why: 'Prices grow faster than your savings.' },
          { q: 'Why do people invest?', o: ['To try to grow money faster than inflation', 'To lose money', 'Because it’s risk-free'], a: 0, why: 'Long-term growth.' }
        ] }
    ] },
    { title: 'Small Business', desc: 'Start selling the smart way', topics: [
      { card: { t: 'Price, cost and profit', x: 'Profit = revenue (money from sales) − costs. Know all your costs: materials, packaging, delivery and your time. Set prices that cover costs and leave a profit.', code: '50 items × ₱120 = ₱6,000 revenue\n₱6,000 − ₱4,000 costs = ₱2,000 profit' },
        qs: [
          { q: 'You sell 50 items at ₱120 each, and your total cost is ₱4,000. What is your profit?', calc: '50*120-4000', o: ['₱2,000', '₱6,000', '₱4,000', '₱1,200'], a: 0, why: '₱6,000 revenue − ₱4,000 costs.' },
          { q: 'Profit equals…', o: ['revenue minus costs', 'revenue plus costs', 'the price of one item'], a: 0, why: 'What’s left after paying costs.' },
          { q: 'Which is a cost you might forget?', o: ['Packaging and delivery', 'Sales revenue', 'Your selling price'], a: 0, why: 'Small costs add up.' }
        ] },
      { card: { t: 'Registering a business', x: 'In the Philippines, a sole proprietor registers a business name with the DTI, gets a barangay clearance and a mayor’s (business) permit from the local government, and registers with the BIR for taxes.', em: '📋🏢' },
        qs: [
          { q: 'Where does a sole proprietor register a business name?', o: ['DTI', 'PAGASA', 'DepEd'], a: 0, why: 'The Department of Trade and Industry.' },
          { q: 'Which agency handles business tax registration?', o: ['BIR', 'DTI', 'LTO'], a: 0, why: 'Bureau of Internal Revenue.' },
          { q: 'The mayor’s (business) permit comes from…', o: ['the local government (city or municipality)', 'the bank', 'the post office'], a: 0, why: 'Usually after a barangay clearance.' }
        ] },
      { card: { t: 'Online selling', x: 'Use clear, well-lit photos and honest descriptions. Reply to messages quickly and give realistic delivery times. Good reviews build trust — so does a clear return or refund policy.', em: '📦⭐' },
        qs: [
          { q: 'What helps an online shop build trust?', o: ['Honest descriptions and good reviews', 'Blurry photos', 'Never replying to messages'], a: 0, why: 'Buyers can’t touch the product, so trust matters.' },
          { q: 'Product photos should be…', o: ['clear and well-lit', 'dark and blurry', 'copied from another seller'], a: 0, why: 'Copying photos can also break copyright rules.' },
          { q: 'Delivery times you promise should be…', o: ['realistic', 'as short as possible even if untrue', 'never mentioned'], a: 0, why: 'Late deliveries lead to bad reviews.' }
        ] },
      { card: { t: 'Keep records', x: 'Keep your business money separate from your personal money. Record every sale and expense — a notebook or spreadsheet is enough to start. Records show if you’re really making a profit.', code: 'Date | Item | Sale | Expense\n6/1  | Tote | ₱350 |\n6/1  | Ink  |      | ₱120' },
        qs: [
          { q: 'Why keep business and personal money separate?', o: ['To see clearly if the business is profitable', 'Because mixing is illegal everywhere', 'There’s no reason'], a: 0, why: 'Mixing hides the real numbers.' },
          { q: 'What should you record?', o: ['Every sale and every expense', 'Only big sales', 'Nothing'], a: 0, why: 'Small expenses add up.' },
          { q: 'A simple tool to track sales is…', o: ['a notebook or spreadsheet', 'your memory', 'social media likes'], a: 0, why: 'Start simple and be consistent.' }
        ] }
    ] }
  ] };

  C.scams = { name: 'Scam Shield', kind: 'skill', group: 'money', icon: '🛡️', iconBg: '#C0392B', voice: [], units: [
    { title: 'Spot the Scam', desc: 'Red flags in texts, calls and offers', topics: [
      { card: { t: 'Red flags', x: 'Scams usually share warning signs: urgency (“act now or lose your account!”), offers too good to be true, requests for your OTP, PIN or password, and links that don’t match the official website.', code: '“CONGRATULATIONS! You won ₱50,000!\nClaim within 1 hour: bit.ly/claim-prize”' },
        qs: [
          { q: 'Which is a scam red flag?', o: ['“Act now or your account will be blocked!”', '“Your monthly statement is ready in the app.”', '“Thank you for your purchase.”'], a: 0, why: 'Scammers create urgency so you don’t think.' },
          { q: 'You get a text saying you won a raffle you never joined. It’s most likely…', o: ['a scam', 'real', 'a bank update'], a: 0, why: 'You can’t win a contest you didn’t enter.' },
          { q: 'An offer that seems too good to be true…', o: ['probably is a scam', 'is always real', 'should be shared with friends'], a: 0, why: 'Trust that feeling.' }
        ] },
      { card: { t: 'Never share your OTP', x: 'Your OTP (one-time PIN), PIN and password are keys to your money. Real banks and e-wallets will NEVER ask for them by call, text, chat or email. Anyone who asks is a scammer.', em: '🔐🚫' },
        qs: [
          { q: 'A caller from “your bank” asks for your OTP to “verify your account.” You should…', o: ['refuse and hang up', 'give it quickly', 'give only half of it'], a: 0, why: 'Banks never ask for your OTP.' },
          { q: 'Real e-wallet staff will ask for your PIN by chat.', o: TF, a: 1, keep: true, why: 'Never. Only scammers ask.' },
          { q: 'An OTP is…', o: ['a one-time code that unlocks a transaction', 'a public account number', 'a discount code to share'], a: 0, why: 'Sharing it lets someone take your money.' }
        ] },
      { card: { t: 'Phishing links', x: 'Phishing messages pretend to be a bank, courier or government office and send you to a fake website to steal your login. Don’t click links in unexpected messages — open the official app or type the address yourself.', code: 'Real:  https://www.yourbank.com.ph\nFake:  https://yourbank-ph.verify-login.co' },
        qs: [
          { q: 'You get a text with a link about a “failed delivery.” The safest move is…', o: ['ignore the link and check the courier’s official app', 'click it to see', 'reply with your address'], a: 0, why: 'Fake delivery texts are very common.' },
          { q: 'Which web address looks fake?', o: ['yourbank-ph.verify-login.co', 'www.yourbank.com.ph'], a: 0, keep: true, mono: true, why: 'The real domain is buried inside a strange one.' },
          { q: 'Phishing tries to steal your…', o: ['login details and money', 'phone battery', 'photos only'], a: 0, why: 'It “fishes” for your information.' }
        ] },
      { card: { t: 'Investment scams', x: 'Be careful with “guaranteed” high returns, like doubling your money in a month, and schemes that pay you for recruiting others (Ponzi or pyramid schemes). In the Philippines, check with the SEC whether a company is allowed to offer investments.', em: '💸⚠️' },
        qs: [
          { q: 'An “investment” promises to double your money in 30 days, guaranteed. It’s most likely…', o: ['a scam', 'a safe bank product', 'a government program'], a: 0, why: 'No real investment can guarantee that.' },
          { q: 'A scheme that pays old members with money from new recruits is a…', o: ['Ponzi or pyramid scheme', 'savings account', 'insurance plan'], a: 0, why: 'It collapses when recruiting slows down.' },
          { q: 'Which Philippine agency should you check to see if a company may offer investments?', o: ['SEC', 'LTO', 'PAGASA'], a: 0, why: 'The Securities and Exchange Commission.' }
        ] }
    ] },
    { title: 'Stay Safe Online', desc: 'Protect yourself — and what to do if scammed', topics: [
      { card: { t: 'Online shopping scams', x: 'Fake sellers post very low prices, then ask you to pay outside the platform by direct transfer. Stay inside the marketplace’s official checkout, check seller ratings, and be careful with brand-new accounts.', em: '🛍️🎭' },
        qs: [
          { q: 'A seller asks you to pay by direct transfer outside the shopping app for a discount. You should…', o: ['pay only through the platform’s checkout', 'send the money quickly', 'send your OTP too'], a: 0, why: 'Off-platform payments lose buyer protection.' },
          { q: 'A brand-new seller account with an extremely low price on a popular phone is…', o: ['a warning sign', 'always a great deal', 'guaranteed safe'], a: 0, why: 'Check ratings and reviews first.' },
          { q: 'Before buying from an online seller, check…', o: ['their ratings and reviews', 'only the price', 'nothing'], a: 0, why: 'Other buyers’ experiences reveal problems.' }
        ] },
      { card: { t: 'Love and job scams', x: 'Romance scammers build trust online for weeks, then ask for money for an “emergency”. Job scams promise work abroad or easy online income but ask for upfront fees. For overseas jobs, check that the agency is licensed by the DMW (Department of Migrant Workers).', em: '💔💼' },
        qs: [
          { q: 'Someone you’ve only met online suddenly needs money for an emergency. This is…', o: ['a common romance scam pattern', 'proof of true love', 'normal'], a: 0, why: 'Never send money to people you haven’t met in person.' },
          { q: 'For an overseas job offer, check that the agency is licensed by the…', o: ['DMW (Department of Migrant Workers)', 'DTI', 'PSA'], a: 0, why: 'The DMW took over the POEA’s role.' },
          { q: 'An online job that requires you to pay a fee before starting is…', o: ['a red flag', 'normal for every job', 'a guaranteed salary'], a: 0, why: 'Real employers pay you, not the other way around.' }
        ] },
      { card: { t: 'Protect your accounts', x: 'Use long, unique passwords for important accounts (a password manager helps), and turn on two-factor authentication (2FA). Keep your phone and apps updated, and lock your phone with a PIN or fingerprint.', em: '🔑📲' },
        qs: [
          { q: 'Two-factor authentication (2FA) adds…', o: ['a second check, like a code, when you log in', 'a second password you share', 'nothing useful'], a: 0, why: 'A stolen password alone isn’t enough.' },
          { q: 'Using the same password everywhere is…', o: ['risky — one leak exposes everything', 'the safest option', 'required'], a: 0, why: 'Use unique passwords for important accounts.' },
          { q: 'Why keep apps updated?', o: ['Updates fix security problems', 'Updates delete your money', 'There’s no reason'], a: 0, why: 'Many attacks use old, unpatched bugs.' }
        ] },
      { card: { t: 'If you’ve been scammed', x: 'Act fast: contact your bank or e-wallet through its official app or hotline to freeze transactions, change your passwords, and keep evidence (screenshots, numbers, receipts). Report it to authorities such as the CICC (hotline 1326) or the PNP Anti-Cybercrime Group.', em: '🚨📸' },
        qs: [
          { q: 'If you sent money to a scammer, what should you do first?', o: ['Contact your bank or e-wallet through official channels right away', 'Wait a week', 'Delete all the messages'], a: 0, why: 'Speed matters for freezing transactions.' },
          { q: 'Why keep screenshots of the scam?', o: ['They are evidence for your report', 'To post for likes', 'No reason'], a: 0, why: 'Authorities need details to act.' },
          { q: 'Which is a Philippine authority for reporting online scams?', o: ['CICC (hotline 1326) or the PNP Anti-Cybercrime Group', 'PAGASA', 'The barangay basketball league'], a: 0, why: 'The Cybercrime Investigation and Coordinating Center.' }
        ] }
    ] }
  ] };
})();
