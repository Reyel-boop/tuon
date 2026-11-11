// School subjects: Math, English, Science (same engine as skills.js; group:'school').
// Math questions with `calc` are verified by evaluating the expression in the validation script.
(function () {
  const TF = ['True', 'False'];
  const C = window.COURSES;

  C.math = { name: 'Math', kind: 'skill', group: 'school', icon: '➗', iconBg: '#5B6CF0', voice: [], units: [
    { title: 'Numbers & Operations', desc: 'Place value and the four operations', topics: [
      { card: { t: 'Place value', x: 'Each digit’s value depends on its place. In 4,582: the 4 means 4 thousands, the 5 means 5 hundreds, the 8 means 8 tens and the 2 means 2 ones. To round to the nearest hundred, look at the tens digit: 5 or more rounds up.', code: '4,582 = 4,000 + 500 + 80 + 2' },
        qs: [
          { q: 'In 4,582, what is the value of the digit 5?', o: ['500', '50', '5', '5,000'], a: 0, why: 'The 5 is in the hundreds place.' },
          { q: 'Which number is “three thousand forty-two”?', o: ['3,042', '3,420', '30,042', '342'], a: 0, why: '3 thousands, 0 hundreds, 4 tens, 2 ones.' },
          { q: 'Round 4,582 to the nearest hundred.', o: ['4,600', '4,500', '5,000', '4,580'], a: 0, why: 'The tens digit is 8 (5 or more), so round up.' }
        ] },
      { card: { t: 'Adding and subtracting', x: 'Line up the digits by place value. When a column adds to 10 or more, carry 1 to the next column. When subtracting a bigger digit from a smaller one, borrow from the next column.', code: '  347\n+ 286\n-----\n  633' },
        qs: [
          { q: '347 + 286 = ?', calc: '347+286', o: ['633', '523', '623', '533'], a: 0, why: '7+6=13 (carry 1), 4+8+1=13 (carry 1), 3+2+1=6.' },
          { q: '1,000 − 457 = ?', calc: '1000-457', o: ['543', '657', '553', '443'], a: 0, why: 'Check: 543 + 457 = 1,000.' },
          { q: '128 + 72 + 300 = ?', calc: '128+72+300', o: ['500', '490', '400', '510'], a: 0, why: '128 + 72 = 200, then + 300 = 500.' }
        ] },
      { card: { t: 'Multiplication', x: 'Multiplication is repeated addition: 7 × 8 means 8 added 7 times. To multiply a whole number by 10, add a zero at the end.', code: '7 × 8 = 56\n45 × 10 = 450' },
        qs: [
          { q: '7 × 8 = ?', calc: '7*8', o: ['56', '54', '63', '48'], a: 0, why: 'A tricky one to memorize: 5, 6, 7, 8 → 56 = 7 × 8.' },
          { q: '12 × 25 = ?', calc: '12*25', o: ['300', '250', '325', '275'], a: 0, why: '4 × 25 = 100, so 12 × 25 = 300.' },
          { q: '45 × 10 = ?', calc: '45*10', o: ['450', '4,500', '55', '45'], a: 0, why: 'Multiply by 10: add a zero.' }
        ] },
      { card: { t: 'Division and remainders', x: 'Division splits a number into equal groups. When it doesn’t split evenly, the leftover is the remainder: 17 ÷ 5 = 3 remainder 2, because 3 × 5 = 15 and 17 − 15 = 2. You can never divide by zero.', code: '72 ÷ 8 = 9\n17 ÷ 5 = 3 R 2' },
        qs: [
          { q: '72 ÷ 8 = ?', calc: '72/8', o: ['9', '8', '7', '12'], a: 0, why: '8 × 9 = 72.' },
          { q: '17 ÷ 5 = 3 remainder ?', calc: '17%5', o: ['2', '3', '1', '5'], a: 0, why: '3 × 5 = 15, and 17 − 15 = 2.' },
          { q: 'Which of these is NOT possible?', o: ['Dividing 5 by zero', 'Dividing zero by 5', 'Dividing 5 by 5'], a: 0, why: 'Division by zero is undefined. (0 ÷ 5 = 0 and 5 ÷ 5 = 1.)' }
        ] }
    ] },
    { title: 'Fractions, Decimals & Percents', desc: 'Parts of a whole', topics: [
      { card: { t: 'Fractions', x: 'A fraction shows parts of a whole. In 3/4, the bottom number (denominator) is how many equal parts, and the top number (numerator) is how many you have. Equivalent fractions are equal: 1/2 = 2/4 = 4/8. Simplify by dividing top and bottom by the same number.', code: '6/9 = (6÷3)/(9÷3) = 2/3' },
        qs: [
          { q: 'In 3/4, the denominator is…', o: ['4', '3', '7'], a: 0, why: 'The denominator is the bottom number.' },
          { q: 'Which fraction is equal to 1/2?', o: ['4/8', '2/3', '3/4', '1/4'], a: 0, why: '4 is half of 8.' },
          { q: 'Simplify 6/9.', o: ['2/3', '3/4', '1/3', 'It can’t be simplified'], a: 0, why: 'Divide top and bottom by 3.' }
        ] },
      { card: { t: 'Adding fractions', x: 'With the same denominator, just add the numerators. With different denominators, first change them to a common denominator.', code: '1/5 + 2/5 = 3/5\n1/2 + 1/3 = 3/6 + 2/6 = 5/6' },
        qs: [
          { q: '1/5 + 2/5 = ?', o: ['3/5', '3/10', '2/5', '1/5'], a: 0, why: 'Same denominator: add the tops.' },
          { q: '1/2 + 1/3 = ?', o: ['5/6', '2/5', '1/6', '2/6'], a: 0, why: '3/6 + 2/6 = 5/6.' },
          { q: '3/4 − 1/4 = ?', o: ['1/2', '1/4', '2/0', '3/8'], a: 0, why: '2/4, which simplifies to 1/2.' }
        ] },
      { card: { t: 'Decimals', x: 'Decimals are another way to write fractions: 0.5 = 1/2, 0.25 = 1/4. To compare decimals, compare digit by digit from the left: 0.7 is bigger than 0.65 because 7 tenths beats 6 tenths.', code: '0.70 > 0.65\n1.20 + 0.35 = 1.55' },
        qs: [
          { q: 'Which is bigger?', o: ['0.7', '0.65'], a: 0, keep: true, why: '0.7 = 0.70, which is more than 0.65.' },
          { q: '0.25 as a fraction is…', o: ['1/4', '1/25', '2/5'], a: 0, why: '25 hundredths = 1/4.' },
          { q: '1.2 + 0.35 = ?', calc: '1.2+0.35', o: ['1.55', '1.37', '0.47', '1.5'], a: 0, why: 'Line up the decimal points: 1.20 + 0.35.' }
        ] },
      { card: { t: 'Percents', x: 'Percent means “out of 100”. 50% is half, 25% is a quarter and 10% is a tenth. To find 10% of a number, divide it by 10.', code: '10% of 250 = 25\n25% of 80 = 20' },
        qs: [
          { q: '25% of 80 = ?', calc: '0.25*80', o: ['20', '25', '40', '8'], a: 0, why: '25% is a quarter, and 80 ÷ 4 = 20.' },
          { q: '50% is the same as…', o: ['1/2', '1/5', '1/50'], a: 0, why: '50 out of 100 is half.' },
          { q: 'A ₱400 shirt is 10% off. How much do you save?', calc: '400*0.10', o: ['₱40', '₱10', '₱360', '₱4'], a: 0, why: '10% of 400 is 40 — so you pay ₱360.' }
        ] }
    ] },
    { title: 'Geometry & Measurement', desc: 'Shapes, perimeter, area and angles', topics: [
      { card: { t: 'Shapes', x: 'Polygons are named by their number of sides: triangle (3), quadrilateral (4), pentagon (5), hexagon (6), octagon (8). A square has 4 equal sides and 4 right angles.', em: '🔺 ⬛ ⬟ ⬢' },
        qs: [
          { q: 'How many sides does a hexagon have?', o: ['6', '5', '8', '7'], a: 0, why: 'Hexa means six (like a honeycomb cell).' },
          { q: 'A pentagon has…', o: ['5 sides', '6 sides', '8 sides'], a: 0, why: 'Penta means five.' },
          { q: 'Which shape has 4 equal sides AND 4 right angles?', o: ['Square', 'Rectangle', 'Rhombus', 'Triangle'], a: 0, why: 'A rhombus has equal sides but not always right angles; a rectangle has right angles but not always equal sides.' }
        ] },
      { card: { t: 'Perimeter', x: 'Perimeter is the distance around a shape: add up all the sides. For a rectangle: 2 × (length + width). For a square: 4 × side.', code: 'Rectangle 8 cm × 3 cm\nP = 2 × (8 + 3) = 22 cm' },
        qs: [
          { q: 'What is the perimeter of a rectangle 8 cm by 3 cm?', calc: '2*(8+3)', o: ['22 cm', '24 cm', '11 cm', '16 cm'], a: 0, why: '8 + 3 + 8 + 3 = 22.' },
          { q: 'What is the perimeter of a square with 5 m sides?', calc: '4*5', o: ['20 m', '25 m', '10 m'], a: 0, why: '4 × 5 = 20.' },
          { q: 'Perimeter measures…', o: ['the distance around a shape', 'the space inside a shape', 'how tall a shape is'], a: 0, why: 'The space inside is area.' }
        ] },
      { card: { t: 'Area', x: 'Area is the space inside a shape, measured in square units. Rectangle: length × width. Triangle: ½ × base × height. Circle: π × radius² (π ≈ 3.14).', code: 'Rectangle: 8 × 3 = 24 cm²\nTriangle: ½ × 10 × 6 = 30 m²\nCircle:   3.14 × 2² = 12.56' },
        qs: [
          { q: 'What is the area of a rectangle 8 cm by 3 cm?', calc: '8*3', o: ['24 cm²', '22 cm²', '11 cm²'], a: 0, why: 'Length × width.' },
          { q: 'What is the area of a triangle with base 10 m and height 6 m?', calc: '0.5*10*6', o: ['30 m²', '60 m²', '16 m²'], a: 0, why: 'Half of 10 × 6.' },
          { q: 'What is the area of a circle with radius 2? (Use π ≈ 3.14)', calc: '3.14*2*2', o: ['12.56', '6.28', '3.14', '4'], a: 0, why: '3.14 × 2² = 3.14 × 4.' }
        ] },
      { card: { t: 'Angles', x: 'Angles are measured in degrees (°). A right angle is 90°, an acute angle is less than 90°, an obtuse angle is between 90° and 180°, and a straight angle is 180°. The three angles of any triangle add up to 180°.', code: 'Triangle: 50° + 60° + ? = 180°\n? = 70°' },
        qs: [
          { q: 'A right angle measures…', o: ['90°', '180°', '45°', '360°'], a: 0, why: 'Like the corner of a square.' },
          { q: 'Two angles of a triangle are 50° and 60°. What is the third?', calc: '180-50-60', o: ['70°', '80°', '90°', '110°'], a: 0, why: '180 − 50 − 60 = 70.' },
          { q: 'An angle of 120° is…', o: ['obtuse', 'acute', 'right'], a: 0, why: 'Between 90° and 180°.' }
        ] }
    ] },
    { title: 'Pre-Algebra', desc: 'Order of operations, negatives and equations', topics: [
      { card: { t: 'Order of operations', x: 'Solve in this order (often remembered as PEMDAS or GEMDAS): Parentheses/grouping, Exponents, then Multiplication and Division (left to right), then Addition and Subtraction (left to right).', code: '3 + 4 × 2 = 3 + 8 = 11\n(3 + 4) × 2 = 7 × 2 = 14' },
        qs: [
          { q: '3 + 4 × 2 = ?', calc: '3+4*2', o: ['11', '14', '10', '9'], a: 0, why: 'Multiply first: 4 × 2 = 8, then 3 + 8.' },
          { q: '(3 + 4) × 2 = ?', calc: '(3+4)*2', o: ['14', '11', '10'], a: 0, why: 'Parentheses first.' },
          { q: '20 − 8 ÷ 4 = ?', calc: '20-8/4', o: ['18', '3', '16', '12'], a: 0, why: 'Divide first: 8 ÷ 4 = 2, then 20 − 2.' }
        ] },
      { card: { t: 'Negative numbers', x: 'Negative numbers are less than zero, to the left on a number line. Adding a positive moves right. Multiplying two negatives gives a positive; a negative times a positive gives a negative.', code: '−5 + 3 = −2\n−3 × −4 = 12\n−3 × 4 = −12' },
        qs: [
          { q: '−5 + 3 = ?', calc: '-5+3', o: ['−2', '2', '−8', '8'], a: 0, why: 'Start at −5 and move 3 to the right.' },
          { q: '−3 × −4 = ?', calc: '-3*-4', o: ['12', '−12', '−7', '7'], a: 0, why: 'Negative × negative = positive.' },
          { q: 'Which is smaller?', o: ['−8', '−3'], a: 0, keep: true, why: '−8 is further left on the number line.' }
        ] },
      { card: { t: 'Variables and equations', x: 'A variable (like x) stands for an unknown number. Solve an equation by doing the same thing to both sides until x is alone.', code: 'x + 5 = 12  →  x = 12 − 5 = 7\n3x = 18     →  x = 18 ÷ 3 = 6' },
        qs: [
          { q: 'x + 5 = 12. What is x?', calc: '12-5', o: ['7', '17', '5', '12'], a: 0, why: 'Subtract 5 from both sides.' },
          { q: '3x = 18. What is x?', calc: '18/3', o: ['6', '15', '21', '54'], a: 0, why: 'Divide both sides by 3.' },
          { q: 'If y = 4, what is 2y + 1?', calc: '2*4+1', o: ['9', '8', '24', '7'], a: 0, why: '2 × 4 = 8, plus 1.' }
        ] },
      { card: { t: 'Exponents and roots', x: 'An exponent says how many times to multiply a number by itself: 2³ = 2 × 2 × 2 = 8. A square root undoes squaring: √49 = 7 because 7 × 7 = 49. Any non-zero number to the power 0 equals 1.', code: '2³ = 8\n10² = 100\n√81 = 9\n5⁰ = 1' },
        qs: [
          { q: '2³ = ?', calc: '2**3', o: ['8', '6', '9', '5'], a: 0, why: '2 × 2 × 2.' },
          { q: '√81 = ?', calc: 'Math.sqrt(81)', o: ['9', '8', '18', '40.5'], a: 0, why: '9 × 9 = 81.' },
          { q: '5⁰ = ?', calc: '5**0', o: ['1', '0', '5'], a: 0, why: 'Any non-zero number to the power 0 is 1.' }
        ] }
    ] }
  ] };

  C.english = { name: 'English', kind: 'skill', group: 'school', icon: 'Aa', iconText: true, iconBg: '#D9467A', voice: [], units: [
    { title: 'Parts of Speech', desc: 'Nouns, verbs, adjectives and adverbs', topics: [
      { card: { t: 'Nouns', x: 'A noun names a person, place, thing or idea: teacher, city, ball, happiness. Proper nouns name specific ones and start with a capital letter: Maria, Manila, Monday.', code: 'The dog chased a ball in Rizal Park.\n    ^^^          ^^^^    ^^^^^^^^^^' },
        qs: [
          { q: 'Which word is a noun? “The dog ran fast.”', o: ['dog', 'ran', 'fast', 'the'], a: 0, why: 'A dog is a thing (an animal).' },
          { q: 'Which is a proper noun?', o: ['Manila', 'city', 'river', 'teacher'], a: 0, why: 'It names a specific place, so it’s capitalized.' },
          { q: 'What is the plural of “child”?', o: ['children', 'childs', 'childes'], a: 0, why: 'An irregular plural.' }
        ] },
      { card: { t: 'Verbs', x: 'A verb shows an action (run, eat, sing) or a state of being (is, am, are, seem). Every complete sentence needs a verb.', code: 'She sings every morning.\n    ^^^^^\nHe is happy.\n   ^^' },
        qs: [
          { q: 'Find the verb: “She sings every morning.”', o: ['sings', 'She', 'every', 'morning'], a: 0, why: 'Sings is the action.' },
          { q: 'In “He is happy,” the word “is” is a…', o: ['verb (linking verb)', 'noun', 'adjective'], a: 0, why: 'It links the subject to a description.' },
          { q: 'Which word is an action verb?', o: ['jump', 'happy', 'table', 'slowly'], a: 0, why: 'You can do it.' }
        ] },
      { card: { t: 'Adjectives', x: 'Adjectives describe nouns: a beautiful sunset, a red car. Many add -er to compare two things and -est for the most: tall, taller, tallest. Some are irregular: good, better, best.', code: 'big → bigger → biggest\ngood → better → best' },
        qs: [
          { q: 'Find the adjective: “a beautiful sunset”', o: ['beautiful', 'a', 'sunset'], a: 0, why: 'It describes the sunset.' },
          { q: 'What is the comparative form of “good”?', o: ['better', 'gooder', 'best'], a: 0, why: 'Good → better → best.' },
          { q: 'What is the superlative form of “big”?', o: ['biggest', 'bigger', 'most big'], a: 0, why: 'Double the g and add -est.' }
        ] },
      { card: { t: 'Adverbs', x: 'Adverbs describe verbs, adjectives or other adverbs. They tell how, when, where or how much. Many end in -ly: quickly, softly. Others include very, always and here.', code: 'He runs quickly.\n        ^^^^^^^\nShe speaks very softly.' },
        qs: [
          { q: 'Find the adverb: “He runs quickly.”', o: ['quickly', 'runs', 'He'], a: 0, why: 'It tells how he runs.' },
          { q: 'Many adverbs end in…', o: ['-ly', '-ing', '-ed'], a: 0, why: 'quick → quickly, soft → softly.' },
          { q: '“She speaks very softly.” Which word tells HOW she speaks?', o: ['softly', 'She', 'speaks'], a: 0, why: '“Very” is also an adverb — it tells how softly.' }
        ] }
    ] },
    { title: 'Sentences & Punctuation', desc: 'Agreement, capitals and punctuation', topics: [
      { card: { t: 'Subject–verb agreement', x: 'The verb must match its subject. In the present tense, he, she and it (singular) take a verb ending in -s; I, you, we and they don’t.', code: 'He plays.     They play.\nShe walks.    We walk.' },
        qs: [
          { q: 'Choose: “She ___ to school every day.”', o: ['walks', 'walk', 'walking'], a: 0, why: 'She is singular → walks.' },
          { q: 'Choose: “They ___ my friends.”', o: ['are', 'is', 'am'], a: 0, why: 'They are.' },
          { q: 'Choose: “The dogs ___ loudly.”', o: ['bark', 'barks'], a: 0, keep: true, why: 'Dogs is plural → bark.' }
        ] },
      { card: { t: 'Capital letters', x: 'Use a capital letter at the start of a sentence, for the word I, and for proper nouns: names of people, places, days and months.', code: 'My birthday is in June.\nI live in Cebu.' },
        qs: [
          { q: 'Which sentence is correct?', o: ['I live in Cebu.', 'i live in Cebu.', 'I live in cebu.'], a: 0, why: 'Capitalize I and place names.' },
          { q: 'Which word should always be capitalized?', o: ['Monday', 'table', 'happy'], a: 0, why: 'Days of the week are proper nouns.' },
          { q: 'Which sentence is written correctly?', o: ['My birthday is in June.', 'my birthday is in june.', 'My Birthday Is In june.'], a: 0, why: 'Capitalize the first word and the month only.' }
        ] },
      { card: { t: 'End punctuation', x: 'A statement ends with a period (.), a question with a question mark (?), and a strong feeling or warning with an exclamation point (!).', code: 'I like mangoes.\nDo you like mangoes?\nWatch out!' },
        qs: [
          { q: '“Where do you live___”', o: ['?', '.', '!'], a: 0, mono: true, why: 'It’s a question.' },
          { q: '“Watch out___” (a warning)', o: ['!', '?', ','], a: 0, mono: true, why: 'Strong feeling or warning.' },
          { q: 'A statement ends with a…', o: ['period (.)', 'question mark (?)', 'comma (,)'], a: 0, why: 'Statements tell something.' }
        ] },
      { card: { t: 'Commas and apostrophes', x: 'Use commas to separate items in a list. An apostrophe shows a contraction (don’t = do not) or possession (Ana’s book = the book belongs to Ana).', code: 'I bought eggs, milk, and bread.\ndon’t = do not\nAna’s book' },
        qs: [
          { q: '“don’t” is short for…', o: ['do not', 'does not', 'did not'], a: 0, why: 'does not → doesn’t; did not → didn’t.' },
          { q: 'Which shows that the book belongs to Ana?', o: ['Ana’s book', 'Anas book', 'Anas’ book'], a: 0, why: 'Singular owner: add ’s.' },
          { q: 'Which uses commas correctly in a list?', o: ['I bought eggs, milk, and bread.', 'I bought, eggs milk and bread.', 'I bought eggs milk, and, bread.'], a: 0, why: 'Commas go between the list items.' }
        ] }
    ] },
    { title: 'Verb Tenses', desc: 'Past, present and future', topics: [
      { card: { t: 'Simple present', x: 'Use the simple present for habits, routines and facts. Remember the -s with he, she and it.', code: 'I eat rice every day.\nWater boils at 100 °C.' },
        qs: [
          { q: '“Water ___ at 100 °C.”', o: ['boils', 'boil', 'boiled'], a: 0, why: 'A scientific fact → simple present (at sea level).' },
          { q: '“I ___ rice every day.”', o: ['eat', 'eats', 'eating'], a: 0, why: 'With I, no -s.' },
          { q: 'Which sentence is in the simple present?', o: ['She reads books.', 'She read books yesterday.', 'She will read books.'], a: 0, why: 'A habit, happening regularly.' }
        ] },
      { card: { t: 'Simple past', x: 'For finished actions in the past, regular verbs add -ed (walk → walked). Many common verbs are irregular: go → went, eat → ate, see → saw.', code: 'Yesterday I played basketball.\nWe went to the beach.' },
        qs: [
          { q: 'What is the past tense of “go”?', o: ['went', 'goed', 'gone'], a: 0, why: '“Gone” is used with have: I have gone.' },
          { q: 'What is the past tense of “play”?', o: ['played', 'plaid', 'plays'], a: 0, why: 'A regular verb: add -ed.' },
          { q: '“Yesterday I ___ a movie.”', o: ['saw', 'see', 'seen'], a: 0, why: 'see → saw (past) → seen (with have).' }
        ] },
      { card: { t: 'Future', x: 'Talk about the future with will + the base verb, or am/is/are going to + the base verb.', code: 'It will rain tomorrow.\nI’m going to visit Lola.' },
        qs: [
          { q: '“Tomorrow it ___ rain.”', o: ['will', 'is', 'was'], a: 0, why: 'will + base verb.' },
          { q: 'Which sentence is about the future?', o: ['I’m going to visit Lola.', 'I visited Lola.', 'I visit Lola.'], a: 0, why: 'going to + base verb.' },
          { q: '“She will ___ tomorrow.”', o: ['come', 'comes', 'came'], a: 0, why: 'After will, use the base form.' }
        ] },
      { card: { t: 'Present continuous', x: 'For actions happening right now, use am/is/are + the -ing form of the verb.', code: 'Look! The baby is sleeping.\nThey are playing basketball.' },
        qs: [
          { q: '“Look! The baby ___.”', o: ['is sleeping', 'sleeps', 'slept'], a: 0, why: 'Happening right now.' },
          { q: '“They ___ basketball right now.”', o: ['are playing', 'is playing', 'plays'], a: 0, why: 'They → are.' },
          { q: 'The present continuous uses am/is/are plus…', o: ['the -ing form', 'the -ed form', 'will'], a: 0, why: 'is + playing.' }
        ] }
    ] },
    { title: 'Vocabulary & Usage', desc: 'Word choice and common mistakes', topics: [
      { card: { t: 'Synonyms and antonyms', x: 'Synonyms are words with similar meanings (big / large). Antonyms are words with opposite meanings (hot / cold).', code: 'happy ≈ glad\nancient ↔ modern' },
        qs: [
          { q: 'Which is a synonym for “big”?', o: ['large', 'small', 'tiny'], a: 0, why: 'Similar meaning.' },
          { q: 'Which is an antonym for “ancient”?', o: ['modern', 'old', 'historic'], a: 0, why: 'Opposite meaning.' },
          { q: 'Which is an antonym for “brave”?', o: ['cowardly', 'bold', 'strong'], a: 0, why: 'Bold is a synonym.' }
        ] },
      { card: { t: 'Homophones', x: 'Homophones sound the same but have different meanings and spellings. their (belongs to them) / there (a place) / they’re (they are). your (belongs to you) / you’re (you are). to / too (also) / two (2).', code: 'They’re putting their bags over there.' },
        qs: [
          { q: '“___ going to the park.” (they are)', o: ['They’re', 'Their', 'There'], a: 0, why: 'They’re = they are.' },
          { q: '“Is this ___ bag?” (it belongs to you)', o: ['your', 'you’re'], a: 0, keep: true, why: 'You’re = you are.' },
          { q: '“I have ___ brothers.” (the number)', o: ['two', 'too', 'to'], a: 0, why: 'Two = 2.' }
        ] },
      { card: { t: 'A or an?', x: 'Use “an” before a vowel SOUND and “a” before a consonant SOUND. It’s about sound, not spelling: an hour (silent h), a university (sounds like “you”).', code: 'an apple · an hour\na banana · a university' },
        qs: [
          { q: '___ apple', o: ['an', 'a'], a: 0, keep: true, why: 'Apple starts with a vowel sound.' },
          { q: '___ hour', o: ['an', 'a'], a: 0, keep: true, why: 'The h is silent, so it starts with a vowel sound.' },
          { q: '___ university', o: ['a', 'an'], a: 0, keep: true, why: 'It starts with a “you” (consonant) sound.' }
        ] },
      { card: { t: 'Common mistakes', x: 'than (comparing) vs then (time). its (belongs to it) vs it’s (it is). fewer (things you can count) vs less (amounts you can’t count).', code: 'She is taller than me.\nThe dog wagged its tail.\nfewer cars · less water' },
        qs: [
          { q: '“She is taller ___ me.”', o: ['than', 'then'], a: 0, keep: true, why: 'Comparing → than.' },
          { q: '“The dog wagged ___ tail.”', o: ['its', 'it’s'], a: 0, keep: true, why: 'Possession → its (no apostrophe).' },
          { q: '“There are ___ cars today.”', o: ['fewer', 'less'], a: 0, keep: true, why: 'Cars can be counted → fewer.' }
        ] }
    ] }
  ] };

  C.science = { name: 'Science', kind: 'skill', group: 'school', icon: '🔬', iconBg: '#17936A', voice: [], units: [
    { title: 'Living Things', desc: 'Cells, plants, food chains and the body', topics: [
      { card: { t: 'Cells', x: 'The cell is the basic unit of life. The nucleus holds the DNA and controls the cell. Plant cells also have a cell wall and chloroplasts, which animal cells don’t have.', em: '🦠🌿' },
        qs: [
          { q: 'The basic unit of life is the…', o: ['cell', 'atom', 'organ'], a: 0, why: 'All living things are made of cells.' },
          { q: 'Which part contains DNA and controls the cell?', o: ['Nucleus', 'Cell wall', 'Vacuole'], a: 0, why: 'The nucleus is the control center.' },
          { q: 'Which do plant cells have that animal cells don’t?', o: ['A cell wall and chloroplasts', 'A nucleus', 'A cell membrane'], a: 0, why: 'Both have a nucleus and a membrane.' }
        ] },
      { card: { t: 'Photosynthesis', x: 'Plants make their own food by photosynthesis. Using sunlight, they turn carbon dioxide and water into glucose (sugar) and release oxygen. Green chlorophyll captures the light.', code: 'carbon dioxide + water + sunlight\n      → glucose + oxygen' },
        qs: [
          { q: 'Plants make their food by…', o: ['photosynthesis', 'digestion', 'evaporation'], a: 0, why: 'Photo = light, synthesis = making.' },
          { q: 'Which gas do plants take in for photosynthesis?', o: ['Carbon dioxide', 'Oxygen', 'Nitrogen'], a: 0, why: 'CO₂ from the air.' },
          { q: 'Which gas do plants release during photosynthesis?', o: ['Oxygen', 'Carbon dioxide', 'Helium'], a: 0, why: 'The oxygen we breathe.' }
        ] },
      { card: { t: 'Food chains', x: 'Energy flows from the Sun to producers (plants), then to consumers: herbivores eat plants, carnivores eat animals, omnivores eat both. Decomposers like fungi and bacteria break down dead things.', code: 'grass → grasshopper → frog → snake' },
        qs: [
          { q: 'In “grass → grasshopper → frog → snake,” the producer is…', o: ['grass', 'snake', 'frog'], a: 0, why: 'Plants produce food from sunlight.' },
          { q: 'An animal that eats only plants is a…', o: ['herbivore', 'carnivore', 'decomposer'], a: 0, why: 'Like a carabao.' },
          { q: 'Mushrooms and bacteria that break down dead things are…', o: ['decomposers', 'producers', 'predators'], a: 0, why: 'They recycle nutrients into the soil.' }
        ] },
      { card: { t: 'The human body', x: 'The heart pumps blood around the body, the lungs take in oxygen, and the brain controls everything. An adult skeleton has 206 bones. The largest organ is the skin.', em: '🫀🫁🧠🦴' },
        qs: [
          { q: 'Which organ pumps blood?', o: ['Heart', 'Lungs', 'Liver'], a: 0, why: 'It beats about 60–100 times a minute at rest.' },
          { q: 'How many bones does an adult human have?', o: ['206', '100', '300', '186'], a: 0, why: 'Babies have more, which fuse as they grow.' },
          { q: 'What is the largest organ of the human body?', o: ['Skin', 'Liver', 'Brain', 'Heart'], a: 0, why: 'The liver is the largest internal organ.' }
        ] }
    ] },
    { title: 'Matter', desc: 'States, atoms and changes', topics: [
      { card: { t: 'States of matter', x: 'Matter is usually a solid (fixed shape), liquid (takes the shape of its container) or gas (fills any space). Melting: solid → liquid. Freezing: liquid → solid. Evaporation: liquid → gas. Condensation: gas → liquid.', em: '🧊 💧 ♨️' },
        qs: [
          { q: 'Ice melting into water is a change from…', o: ['solid to liquid', 'liquid to gas', 'gas to solid'], a: 0, why: 'Melting.' },
          { q: 'Water droplets forming on a cold glass is…', o: ['condensation', 'evaporation', 'melting'], a: 0, why: 'Water vapor in the air turns back into liquid.' },
          { q: 'Which state of matter has a fixed shape?', o: ['Solid', 'Liquid', 'Gas'], a: 0, why: 'Liquids and gases take their container’s shape.' }
        ] },
      { card: { t: 'Atoms and elements', x: 'Everything is made of atoms. An element is made of only one kind of atom, and all elements are organized in the periodic table. Each has a symbol: O (oxygen), H (hydrogen), Fe (iron), Au (gold), Ag (silver).', code: 'O  oxygen     Fe  iron\nH  hydrogen   Au  gold\nNa sodium     Ag  silver' },
        qs: [
          { q: 'What is the chemical symbol for gold?', o: ['Au', 'Go', 'Gd', 'Ag'], a: 0, mono: true, why: 'From the Latin aurum. Ag is silver.' },
          { q: 'What is the chemical symbol for oxygen?', o: ['O', 'Ox', 'Om'], a: 0, mono: true, why: 'Just O.' },
          { q: 'Elements are organized in the…', o: ['periodic table', 'food pyramid', 'solar system'], a: 0, why: 'Arranged by atomic number.' }
        ] },
      { card: { t: 'Compounds', x: 'A compound is two or more elements chemically joined. Water is H₂O: two hydrogen atoms and one oxygen atom. Table salt is sodium chloride (NaCl). Carbon dioxide is CO₂.', code: 'H₂O  water\nNaCl table salt\nCO₂  carbon dioxide' },
        qs: [
          { q: 'What is the chemical formula of water?', o: ['H₂O', 'HO₂', 'H₂O₂'], a: 0, why: 'H₂O₂ is hydrogen peroxide.' },
          { q: 'Table salt is…', o: ['sodium chloride (NaCl)', 'calcium carbonate', 'sugar'], a: 0, why: 'Sodium + chlorine.' },
          { q: 'How many hydrogen atoms are in one water molecule?', o: ['2', '1', '3'], a: 0, why: 'The small 2 in H₂O.' }
        ] },
      { card: { t: 'Changes and pH', x: 'A physical change alters shape or state but not the substance (cutting paper, melting ice). A chemical change makes a new substance (burning wood, iron rusting). The pH scale measures acids and bases: below 7 is acidic, 7 is neutral, above 7 is basic.', code: 'pH 0 ── 7 ── 14\nacid  neutral  base\nlemon  water   soap' },
        qs: [
          { q: 'Which is a chemical change?', o: ['Burning wood', 'Melting ice', 'Cutting paper'], a: 0, why: 'Burning makes new substances like ash and smoke.' },
          { q: 'Pure water has a pH of…', o: ['7', '0', '14'], a: 0, why: 'Neutral.' },
          { q: 'Lemon juice is…', o: ['acidic', 'basic', 'neutral'], a: 0, why: 'It has a pH of about 2.' }
        ] }
    ] },
    { title: 'Forces & Energy', desc: 'Gravity, motion, energy and electricity', topics: [
      { card: { t: 'Gravity', x: 'Gravity is the force that pulls objects toward each other — it keeps us on Earth and the Moon in orbit. Your mass (how much matter you have) stays the same everywhere, but your weight (the pull of gravity) is less on the Moon.', em: '🍎⬇️🌍' },
        qs: [
          { q: 'What force pulls objects toward Earth?', o: ['Gravity', 'Friction', 'Magnetism'], a: 0, why: 'The bigger the mass, the stronger the pull.' },
          { q: 'On the Moon, your mass is…', o: ['the same as on Earth', 'zero', 'six times bigger'], a: 0, why: 'Your weight drops to about 1/6, but your mass doesn’t change.' },
          { q: 'Without air resistance, a hammer and a feather dropped together…', o: ['land at the same time', 'land hammer first', 'land feather first'], a: 0, why: 'An astronaut showed this on the Moon in 1971 (Apollo 15).' }
        ] },
      { card: { t: 'Newton’s laws', x: '1st law (inertia): an object stays at rest or keeps moving unless a force acts on it. 2nd law: force = mass × acceleration (F = m × a). 3rd law: for every action there is an equal and opposite reaction.', code: 'F = m × a\n2 kg × 3 m/s² = 6 N' },
        qs: [
          { q: '“For every action there is an equal and opposite reaction” is Newton’s…', o: ['third law', 'first law', 'second law'], a: 0, why: 'Like a rocket pushing gas down to go up.' },
          { q: 'What force accelerates a 2 kg mass at 3 m/s²?', calc: '2*3', o: ['6 N', '5 N', '1.5 N'], a: 0, why: 'F = m × a = 2 × 3.' },
          { q: 'An object at rest stays at rest unless a force acts on it. This is…', o: ['inertia (the first law)', 'gravity', 'friction'], a: 0, why: 'Why you lurch forward when a jeepney brakes.' }
        ] },
      { card: { t: 'Energy', x: 'Kinetic energy is the energy of motion; potential energy is stored energy (like a stretched rubber band). Energy can’t be created or destroyed — only changed from one form to another, like solar panels turning light into electricity.', em: '☀️➡️🔋' },
        qs: [
          { q: 'The energy of a moving object is…', o: ['kinetic energy', 'potential energy', 'nuclear energy'], a: 0, why: 'Kinetic = motion.' },
          { q: 'Energy can be created from nothing.', o: TF, a: 1, keep: true, why: 'Energy is conserved — it only changes form.' },
          { q: 'Solar panels change light energy into…', o: ['electrical energy', 'sound energy', 'chemical energy'], a: 0, why: 'That’s how they power homes.' }
        ] },
      { card: { t: 'Electricity, light and sound', x: 'Electricity flows only through a closed (complete) circuit. Conductors like copper let it flow; insulators like rubber and plastic don’t. Light travels about 300,000 km per second, much faster than sound (about 343 m per second in air) — so we see lightning before we hear thunder.', em: '💡⚡🔊' },
        qs: [
          { q: 'Which is a good conductor of electricity?', o: ['Copper', 'Rubber', 'Plastic', 'Wood'], a: 0, why: 'That’s why wires are made of copper.' },
          { q: 'Why do we see lightning before we hear thunder?', o: ['Light travels much faster than sound', 'Thunder happens later', 'Our ears are slower than our eyes'], a: 0, why: 'They happen at the same time.' },
          { q: 'For a bulb to light up, the circuit must be…', o: ['closed (complete)', 'open', 'broken'], a: 0, why: 'Electricity needs a full loop.' }
        ] }
    ] },
    { title: 'Earth & Space', desc: 'Our planet, water, the solar system and weather', topics: [
      { card: { t: 'Inside the Earth', x: 'Earth has four main layers: the crust (where we live), the mantle, the liquid outer core and the solid inner core. The crust is broken into moving plates. The Philippines lies on the Pacific Ring of Fire, so it has many volcanoes and earthquakes.', em: '🌍🌋' },
        qs: [
          { q: 'Earth’s outermost layer is the…', o: ['crust', 'mantle', 'core'], a: 0, why: 'It’s the thinnest layer.' },
          { q: 'Which layer is liquid?', o: ['Outer core', 'Inner core', 'Crust'], a: 0, why: 'The inner core is solid because of the huge pressure.' },
          { q: 'The Philippines has many volcanoes and earthquakes because it lies on the…', o: ['Pacific Ring of Fire', 'Equator', 'Tropic of Cancer'], a: 0, why: 'A belt of active plate boundaries around the Pacific.' }
        ] },
      { card: { t: 'The water cycle', x: 'The Sun heats water, which evaporates into vapor. The vapor cools and condenses into clouds. Water falls back as precipitation (rain, hail or snow) and collects in rivers, lakes and oceans — and the cycle repeats.', code: 'evaporation → condensation\n     ↑               ↓\n collection ← precipitation' },
        qs: [
          { q: 'Water rising as vapor from the sea is…', o: ['evaporation', 'precipitation', 'condensation'], a: 0, why: 'Heat turns liquid into gas.' },
          { q: 'Rain, snow and hail are forms of…', o: ['precipitation', 'evaporation', 'condensation'], a: 0, why: 'Water falling from clouds.' },
          { q: 'Clouds form through…', o: ['condensation', 'evaporation', 'melting'], a: 0, why: 'Vapor cools into tiny droplets.' }
        ] },
      { card: { t: 'The solar system', x: 'The Sun is a star. Eight planets orbit it: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Earth spins once a day (24 hours) and orbits the Sun once a year (about 365 days).', em: '☀️🪐🌍' },
        qs: [
          { q: 'How many planets are in our solar system?', o: ['8', '9', '7', '10'], a: 0, why: 'Pluto was reclassified as a dwarf planet in 2006.' },
          { q: 'Which planet is closest to the Sun?', o: ['Mercury', 'Venus', 'Mars'], a: 0, why: 'Then Venus, Earth, Mars…' },
          { q: 'One full orbit of Earth around the Sun takes about…', o: ['365 days', '24 hours', '30 days'], a: 0, why: '24 hours is one spin (a day).' }
        ] },
      { card: { t: 'Weather and seasons', x: 'Weather is the short-term condition of the air (today’s rain); climate is the long-term pattern. Seasons happen because Earth’s axis is tilted, not because of our distance from the Sun. Strong tropical cyclones in the western Pacific are called typhoons.', em: '🌀☔🌤️' },
        qs: [
          { q: 'What causes Earth’s seasons?', o: ['The tilt of Earth’s axis', 'Earth’s distance from the Sun', 'The Moon'], a: 0, why: 'The tilt changes how directly sunlight hits each region.' },
          { q: 'Weather is short-term. Climate is…', o: ['the long-term pattern', 'exactly the same as weather', 'only the temperature'], a: 0, why: 'Usually averaged over 30 years or more.' },
          { q: 'In the western Pacific, strong tropical cyclones are called…', o: ['typhoons', 'tornadoes', 'monsoons'], a: 0, why: 'The same storms are called hurricanes in the Atlantic.' }
        ] }
    ] }
  ] };
})();
