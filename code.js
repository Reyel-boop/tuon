// Programming courses (same engine as skills.js). Extra fields: code (shown in a code block), mono (options shown as code).
(function () {
  const TF = ['True', 'False'];
  const C = window.COURSES;

  C.html = { name: 'HTML', kind: 'skill', group: 'code', icon: '</>', iconText: true, iconBg: '#E44D26', voice: [], units: [
    { title: 'HTML Basics', desc: 'Tags, elements and page structure', topics: [
      { card: { t: 'What is HTML?', x: 'HTML (HyperText Markup Language) describes the structure of a web page. Content is wrapped in elements made of an opening tag and a closing tag. The closing tag has a slash.', code: '<p>Hello, world!</p>' },
        qs: [
          { q: 'What does HTML stand for?', o: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'], a: 0, why: 'HTML = HyperText Markup Language.' },
          { q: 'Which one is a closing tag?', o: ['</p>', '<p>', '<p/>', '<\\p>'], a: 0, mono: true, why: 'Closing tags start with </.' },
          { q: 'HTML is mainly used to…', o: ['structure the content of a web page', 'style colors and layout', 'store data in a database'], a: 0, why: 'Structure is HTML, style is CSS, behavior is JavaScript.' }
        ] },
      { card: { t: 'Page structure', x: 'Every page starts with <!DOCTYPE html>. The <head> holds information about the page (like the <title> shown in the browser tab). Everything visible goes inside <body>.', code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n  </body>\n</html>' },
        qs: [
          { q: 'Where does the visible content of a page go?', o: ['<body>', '<head>', '<title>'], a: 0, mono: true, why: 'Visible content belongs in the body.' },
          { q: 'The text inside <title> appears…', o: ['in the browser tab', 'as the biggest heading', 'at the bottom of the page'], a: 0, why: 'It’s also used by search engines and bookmarks.' },
          { q: 'What does <!DOCTYPE html> tell the browser?', o: ['That this is a modern HTML5 document', 'To load a CSS file', 'To start a new paragraph'], a: 0, why: 'It switches the browser into standards mode.' }
        ] },
      { card: { t: 'Headings and paragraphs', x: 'There are six heading levels: <h1> is the most important and <h6> the least. Use <p> for paragraphs. <br> adds a line break — it is an empty (void) element with no closing tag.', code: '<h1>My Blog</h1>\n<h2>First post</h2>\n<p>Today I learned HTML.<br>It was fun!</p>' },
        qs: [
          { q: 'Which heading is the most important?', o: ['<h1>', '<h6>', '<head>'], a: 0, mono: true, why: '<h1> is the top-level heading.' },
          { q: 'How many heading levels are there?', o: ['6', '3', '10'], a: 0, why: '<h1> through <h6>.' },
          { q: 'Which tag creates a paragraph?', o: ['<p>', '<para>', '<pg>'], a: 0, mono: true, why: '<p> stands for paragraph.' }
        ] },
      { card: { t: 'Text and comments', x: '<strong> marks important text (shown in bold). <em> adds emphasis (shown in italics). Comments are notes for developers that the browser doesn’t show.', code: '<p>This is <strong>very</strong> <em>important</em>.</p>\n<!-- This is a comment -->' },
        qs: [
          { q: 'How do you write a comment in HTML?', o: ['<!-- comment -->', '// comment', '/* comment */'], a: 0, mono: true, why: '// and /* */ are JavaScript and CSS comments.' },
          { q: '<em> text is usually displayed in…', o: ['italics', 'bold', 'red'], a: 0, why: '<em> = emphasis.' },
          { q: '<strong> means the text is…', o: ['important (shown in bold)', 'a heading', 'a link'], a: 0, why: 'It gives the text strong importance.' }
        ] }
    ] },
    { title: 'Links, Images & Lists', desc: 'Connect pages and show content', topics: [
      { card: { t: 'Links', x: 'The <a> (anchor) element creates a link. The href attribute holds the address. Adding target="_blank" opens the link in a new tab.', code: '<a href="https://example.com" target="_blank">Visit site</a>' },
        qs: [
          { q: 'Which attribute holds a link’s address?', o: ['href', 'src', 'link'], a: 0, mono: true, why: 'href = hypertext reference.' },
          { q: 'Which tag creates a link?', o: ['<a>', '<link>', '<href>'], a: 0, mono: true, why: '<link> is for stylesheets, not clickable links.' },
          { q: 'What does target="_blank" do?', o: ['Opens the link in a new tab', 'Makes the link invisible', 'Disables the link'], a: 0, why: 'The current page stays open.' }
        ] },
      { card: { t: 'Images', x: 'The <img> element shows an image. src is the file path, and alt describes the image for screen readers and when it fails to load. <img> is a void element: no closing tag.', code: '<img src="cat.jpg" alt="A sleeping cat">' },
        qs: [
          { q: 'Which attribute sets the image file?', o: ['src', 'href', 'alt'], a: 0, mono: true, why: 'src = source.' },
          { q: 'Why add an alt attribute?', o: ['It describes the image for screen readers and if it fails to load', 'It makes the image bigger', 'It adds a border'], a: 0, why: 'Good alt text makes pages accessible.' },
          { q: 'Does <img> need a closing tag?', o: ['No', 'Yes'], a: 0, keep: true, why: 'It’s a void element.' }
        ] },
      { card: { t: 'Lists', x: '<ul> makes an unordered (bulleted) list and <ol> an ordered (numbered) list. Each item goes in an <li>.', code: '<ol>\n  <li>Wake up</li>\n  <li>Learn HTML</li>\n</ol>' },
        qs: [
          { q: 'Which tag makes a numbered list?', o: ['<ol>', '<ul>', '<li>'], a: 0, mono: true, why: 'ol = ordered list.' },
          { q: 'Each list item uses…', o: ['<li>', '<item>', '<list>'], a: 0, mono: true, why: 'li = list item.' },
          { q: 'A <ul> list shows…', o: ['bullet points', 'numbers', 'a table'], a: 0, why: 'ul = unordered list.' }
        ] },
      { card: { t: 'Tables', x: 'Tables organize data in rows and columns: <table> wraps it, <tr> is a row, <th> a header cell and <td> a data cell.', code: '<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Ana</td><td>20</td></tr>\n</table>' },
        qs: [
          { q: 'Which tag makes a table row?', o: ['<tr>', '<td>', '<row>'], a: 0, mono: true, why: 'tr = table row.' },
          { q: 'Which tag makes a header cell?', o: ['<th>', '<thead>', '<td>'], a: 0, mono: true, why: 'th = table header cell.' },
          { q: 'Which tag holds normal data in a table?', o: ['<td>', '<tr>', '<data>'], a: 0, mono: true, why: 'td = table data.' }
        ] }
    ] },
    { title: 'Forms & Semantics', desc: 'Get input and write meaningful HTML', topics: [
      { card: { t: 'Forms', x: 'Forms collect user input. <input> creates a field, <label> describes it (its for attribute matches the input’s id), and a submit button sends the form.', code: '<form>\n  <label for="name">Name</label>\n  <input id="name" type="text">\n  <button type="submit">Send</button>\n</form>' },
        qs: [
          { q: 'Which element creates a text field?', o: ['<input>', '<text>', '<field>'], a: 0, mono: true, why: '<input type="text"> is a one-line text box.' },
          { q: 'How is a <label> connected to an <input>?', o: ['Its for attribute matches the input’s id', 'It must be the same color', 'It uses href'], a: 0, why: 'Clicking the label then focuses the input.' },
          { q: 'type="password" makes the input…', o: ['hide the characters you type', 'check your spelling', 'accept only numbers'], a: 0, why: 'Characters show as dots.' }
        ] },
      { card: { t: 'Input types', x: 'Inputs come in many types: email, number, date, checkbox (on/off, several allowed) and radio (pick one of a group). The required attribute means the field must be filled in before the form can be submitted.', code: '<input type="email" required>\n<input type="radio" name="size" value="S">\n<input type="checkbox"> Remember me' },
        qs: [
          { q: 'To let users pick exactly one option from a group, use…', o: ['type="radio"', 'type="checkbox"', 'type="text"'], a: 0, mono: true, why: 'Radio buttons with the same name are mutually exclusive.' },
          { q: 'What does the required attribute do?', o: ['The field must be filled before submitting', 'It makes the field bigger', 'It hides the field'], a: 0, why: 'The browser blocks submission until it’s filled.' },
          { q: 'Which type checks that the text looks like an email address?', o: ['type="email"', 'type="mail"', 'type="text"'], a: 0, mono: true, why: 'The browser validates the format.' }
        ] },
      { card: { t: 'Semantic HTML', x: 'Semantic elements describe their meaning: <header>, <nav> (navigation links), <main> (main content), <article>, <section> and <footer>. They help screen readers and search engines understand your page.', code: '<header>…</header>\n<nav>…</nav>\n<main>\n  <article>…</article>\n</main>\n<footer>…</footer>' },
        qs: [
          { q: 'Navigation links belong in…', o: ['<nav>', '<footer>', '<aside>'], a: 0, mono: true, why: 'nav = navigation.' },
          { q: 'Which element holds the main content of the page?', o: ['<main>', '<body2>', '<center>'], a: 0, mono: true, why: 'Use one <main> per page.' },
          { q: 'Why use semantic elements?', o: ['They describe meaning for screen readers and search engines', 'They load faster', 'They are required for CSS'], a: 0, why: 'Meaning = accessibility + SEO.' }
        ] },
      { card: { t: 'Block vs inline', x: 'Block elements (like <div>, <p>, <h1>) start on a new line and take the full width. Inline elements (like <span>, <a>, <strong>) sit within a line of text. <div> and <span> are generic containers with no meaning of their own.', code: '<div>A block box</div>\n<p>Text with a <span>styled word</span>.</p>' },
        qs: [
          { q: '<div> is a…', o: ['block element', 'inline element'], a: 0, keep: true, why: 'It starts on a new line.' },
          { q: '<span> is a…', o: ['inline element', 'block element'], a: 0, keep: true, why: 'It stays inside the line of text.' },
          { q: 'Which kind of element starts on a new line?', o: ['Block', 'Inline'], a: 0, keep: true, why: 'Block elements stack vertically.' }
        ] }
    ] }
  ] };

  C.css = { name: 'CSS', kind: 'skill', group: 'code', icon: '{ }', iconText: true, iconBg: '#264DE4', voice: [], units: [
    { title: 'CSS Basics', desc: 'Rules, selectors and colors', topics: [
      { card: { t: 'What is CSS?', x: 'CSS (Cascading Style Sheets) controls how HTML looks. A rule has a selector (what to style) and declarations of property: value, each ending with a semicolon.', code: 'p {\n  color: blue;\n  font-size: 18px;\n}' },
        qs: [
          { q: 'What does CSS stand for?', o: ['Cascading Style Sheets', 'Creative Style System', 'Computer Styled Sections'], a: 0, why: 'Cascading Style Sheets.' },
          { q: 'In p { color: blue; }, what is p?', o: ['The selector', 'The property', 'The value'], a: 0, why: 'It selects all <p> elements.' },
          { q: 'Each declaration ends with a…', o: [';', ':', ','], a: 0, mono: true, why: 'The colon separates property and value; the semicolon ends it.' }
        ] },
      { card: { t: 'Adding CSS', x: 'The best way is an external stylesheet linked in the <head>. You can also write CSS in a <style> element, or inline with the style attribute (hardest to maintain).', code: '<link rel="stylesheet" href="style.css">\n<style> h1 { color: red; } </style>\n<p style="color: green;">Hi</p>' },
        qs: [
          { q: 'How do you link an external CSS file?', o: ['<link rel="stylesheet" href="style.css">', '<css src="style.css">', '<style href="style.css">'], a: 0, mono: true, why: 'Use <link> in the <head>.' },
          { q: 'Which attribute adds inline CSS?', o: ['style', 'css', 'class'], a: 0, mono: true, why: 'style="…" on the element itself.' },
          { q: 'Which is best for styling a whole website?', o: ['An external stylesheet', 'Inline styles on every element', 'Images of text'], a: 0, why: 'One file styles every page.' }
        ] },
      { card: { t: 'Selectors', x: 'Select elements by tag name (p), by class with a dot (.card) or by id with a hash (#main). A class can be used on many elements; an id should be unique on the page.', code: 'p { … }        /* every <p> */\n.card { … }    /* class="card" */\n#main { … }    /* id="main" */' },
        qs: [
          { q: 'How do you select elements with class="card"?', o: ['.card', '#card', 'card'], a: 0, mono: true, why: 'Dot = class.' },
          { q: 'How do you select the element with id="main"?', o: ['#main', '.main', '*main'], a: 0, mono: true, why: 'Hash = id.' },
          { q: 'Which can be used on many elements on one page?', o: ['A class', 'An id'], a: 0, keep: true, why: 'Ids must be unique.' }
        ] },
      { card: { t: 'Colors', x: 'color sets text color and background-color sets the background. Colors can be names (red), hex codes (#ff0000) or rgb(255, 0, 0).', code: 'h1 {\n  color: #ffffff;\n  background-color: rgb(14, 140, 143);\n}' },
        qs: [
          { q: 'What color is #ff0000?', o: ['Red', 'Green', 'Blue'], a: 0, why: 'Hex is red-green-blue: ff red, 00 green, 00 blue.' },
          { q: 'Which property changes the text color?', o: ['color', 'text-color', 'font-color'], a: 0, mono: true, why: 'Just color.' },
          { q: 'Which property changes the background color?', o: ['background-color', 'bgcolor', 'color-background'], a: 0, mono: true, why: 'background-color (or the background shorthand).' }
        ] }
    ] },
    { title: 'Box Model & Text', desc: 'Spacing, sizes and fonts', topics: [
      { card: { t: 'The box model', x: 'Every element is a box. From the inside out: content, then padding (space inside the border), then border, then margin (space outside the border, between boxes).', code: '.box {\n  padding: 16px;\n  border: 2px solid black;\n  margin: 20px;\n}' },
        qs: [
          { q: 'Space between the content and the border is…', o: ['padding', 'margin', 'gap'], a: 0, mono: true, why: 'Padding is inside the border.' },
          { q: 'Space outside the border is…', o: ['margin', 'padding', 'outline'], a: 0, mono: true, why: 'Margin separates boxes.' },
          { q: 'Order from inside to outside:', o: ['content, padding, border, margin', 'content, margin, border, padding', 'margin, padding, content, border'], a: 0, why: 'Content → padding → border → margin.' }
        ] },
      { card: { t: 'Sizing and shorthand', x: 'By default (box-sizing: content-box) width covers only the content. With box-sizing: border-box, width includes padding and border — easier to work with. Shorthand: margin: 10px 20px; means 10px top/bottom and 20px left/right.', code: '* { box-sizing: border-box; }\n.card { width: 300px; margin: 10px 20px; }' },
        qs: [
          { q: 'With box-sizing: border-box, width includes…', o: ['content + padding + border', 'content only', 'margin too'], a: 0, why: 'Margin is never part of width.' },
          { q: 'What is the default box-sizing?', o: ['content-box', 'border-box', 'padding-box'], a: 0, mono: true, why: 'That’s why many sites set border-box globally.' },
          { q: 'margin: 10px 20px; sets the left margin to…', o: ['20px', '10px', '0'], a: 0, why: 'First value = top/bottom, second = left/right.' }
        ] },
      { card: { t: 'Text styling', x: 'font-family picks the typeface, font-size the size, font-weight the thickness (bold) and text-align the alignment (left, center, right).', code: 'h1 {\n  font-family: Arial, sans-serif;\n  font-weight: bold;\n  text-align: center;\n}' },
        qs: [
          { q: 'How do you center text?', o: ['text-align: center;', 'align: center;', 'font-align: middle;'], a: 0, mono: true, why: 'text-align controls inline content alignment.' },
          { q: 'How do you make text bold?', o: ['font-weight: bold;', 'font-style: bold;', 'text-weight: 700px;'], a: 0, mono: true, why: 'font-weight (bold or 700).' },
          { q: 'Which property changes the typeface?', o: ['font-family', 'font-type', 'typeface'], a: 0, mono: true, why: 'List fallbacks after a comma.' }
        ] },
      { card: { t: 'Units', x: 'px is a fixed unit. % is relative to the parent element. em is relative to the element’s own font size, and rem is relative to the root (html) font size — great for consistent, scalable designs.', code: 'html { font-size: 16px; }\nh1 { font-size: 2rem; }   /* 32px */\n.half { width: 50%; }' },
        qs: [
          { q: 'rem is relative to…', o: ['the root (html) font size', 'the parent’s width', 'the screen height'], a: 0, why: 'rem = root em.' },
          { q: 'With html { font-size: 16px; }, 2rem equals…', o: ['32px', '16px', '2px'], a: 0, why: '2 × 16px.' },
          { q: 'width: 50% is relative to…', o: ['the parent element’s width', 'the screen height', 'the font size'], a: 0, why: 'Percent widths use the containing block.' }
        ] }
    ] },
    { title: 'Layout', desc: 'Display, Flexbox, Grid and responsive design', topics: [
      { card: { t: 'Display', x: 'display controls how a box behaves: block (new line, full width), inline (within text, ignores width/height), inline-block (inline but accepts width/height) and none (hidden and removed from the layout).', code: '.hidden { display: none; }\n.tag { display: inline-block; width: 80px; }' },
        qs: [
          { q: 'Which hides an element and removes its space?', o: ['display: none;', 'visibility: hidden;', 'opacity: 0;'], a: 0, mono: true, why: 'The other two still take up space.' },
          { q: 'inline-block elements…', o: ['sit in a line but accept width and height', 'always start a new line', 'are invisible'], a: 0, why: 'Best of both.' },
          { q: 'The default display of a <div> is…', o: ['block', 'inline', 'flex'], a: 0, mono: true, why: 'Divs are block-level.' }
        ] },
      { card: { t: 'Flexbox', x: 'display: flex lines children up in a row (or a column with flex-direction: column). justify-content aligns items along the main axis and align-items along the cross axis.', code: '.row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
        qs: [
          { q: 'How do you turn on Flexbox?', o: ['display: flex;', 'flex: on;', 'layout: flex;'], a: 0, mono: true, why: 'Set it on the parent container.' },
          { q: 'Which property aligns items along the main axis?', o: ['justify-content', 'align-items', 'text-align'], a: 0, mono: true, why: 'align-items is for the cross axis.' },
          { q: 'The default flex-direction is…', o: ['row', 'column'], a: 0, keep: true, mono: true, why: 'Items line up left to right.' }
        ] },
      { card: { t: 'Grid', x: 'display: grid creates rows and columns. grid-template-columns defines the columns; the fr unit means a fraction of the free space. gap sets the space between items.', code: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 12px;\n}' },
        qs: [
          { q: 'Which makes three equal columns?', o: ['grid-template-columns: 1fr 1fr 1fr;', 'grid-columns: 3;', 'columns: 1fr;'], a: 0, mono: true, why: 'Or repeat(3, 1fr).' },
          { q: 'Which property sets the space between grid items?', o: ['gap', 'margin-grid', 'spacing'], a: 0, mono: true, why: 'gap works in Flexbox too.' },
          { q: 'The fr unit means…', o: ['a fraction of the free space', 'a fixed pixel size', 'font ratio'], a: 0, why: '1fr 2fr splits space 1:2.' }
        ] },
      { card: { t: 'Responsive & position', x: 'Media queries apply styles only when a condition is true, like a small screen. position: relative nudges an element from its normal spot; absolute places it relative to the nearest positioned ancestor; fixed pins it to the viewport.', code: '@media (max-width: 600px) {\n  .sidebar { display: none; }\n}\n.badge { position: absolute; top: 0; right: 0; }' },
        qs: [
          { q: 'When do styles inside @media (max-width: 600px) apply?', o: ['When the viewport is 600px wide or less', 'Only on screens wider than 600px', 'Always'], a: 0, why: 'max-width = up to that width.' },
          { q: 'position: fixed keeps an element…', o: ['in the same place on screen while scrolling', 'in the normal flow', 'hidden'], a: 0, why: 'It’s positioned relative to the viewport.' },
          { q: 'position: absolute is relative to…', o: ['the nearest positioned ancestor', 'the previous sibling', 'the mouse'], a: 0, why: 'If none exists, the initial containing block (page).' }
        ] }
    ] }
  ] };

  C.js = { name: 'JavaScript', kind: 'skill', group: 'code', icon: 'JS', iconText: true, iconBg: '#F0D23C', iconFg: '#1E2833', voice: [], units: [
    { title: 'JS Basics', desc: 'Variables, types and operators', topics: [
      { card: { t: 'What is JavaScript?', x: 'JavaScript makes web pages interactive: it responds to clicks, updates content and talks to servers. console.log() prints a message to the browser’s developer console.', code: 'console.log("Hello, Tuon!");' },
        qs: [
          { q: 'What does this code do?', code: 'console.log("Hi");', o: ['Prints Hi to the console', 'Shows an alert box', 'Creates a variable'], a: 0, why: 'The console is in the browser’s developer tools.' },
          { q: 'JavaScript mainly adds…', o: ['interactivity and behavior', 'page structure', 'colors and fonts'], a: 0, why: 'HTML = structure, CSS = style, JS = behavior.' },
          { q: 'JavaScript and Java are the same language.', o: TF, a: 1, keep: true, why: 'Despite the name, they are completely different languages.' }
        ] },
      { card: { t: 'Variables', x: 'Variables store values. Use let for values that change and const for values that won’t be reassigned. var is the older way — prefer let and const.', code: 'let score = 10;\nscore = 15;        // OK\nconst name = "Ana";\n// name = "Bea";  // Error!' },
        qs: [
          { q: 'Which keyword declares a variable that can’t be reassigned?', o: ['const', 'let', 'var'], a: 0, mono: true, why: 'Reassigning a const throws an error.' },
          { q: 'What is x after this code?', code: 'let x = 5;\nx = 7;', o: ['7', '5', '12'], a: 0, why: 'let allows reassignment.' },
          { q: 'Which is the old way to declare variables?', o: ['var', 'let', 'const'], a: 0, mono: true, why: 'Modern code prefers let and const.' }
        ] },
      { card: { t: 'Data types', x: 'Common types: string ("hi"), number (42 or 3.14), boolean (true / false), undefined (no value yet) and null (intentionally empty). The typeof operator tells you a value’s type.', code: 'typeof "hi"    // "string"\ntypeof 42      // "number"\ntypeof true    // "boolean"' },
        qs: [
          { q: 'What does this return?', code: 'typeof "hello"', o: ['"string"', '"text"', '"char"'], a: 0, mono: true, why: 'Text values are strings.' },
          { q: 'true is a…', o: ['boolean', 'string', 'number'], a: 0, why: 'Booleans are true or false.' },
          { q: 'What does this return?', code: 'typeof 3.14', o: ['"number"', '"float"', '"decimal"'], a: 0, mono: true, why: 'JavaScript has one number type for whole and decimal numbers.' }
        ] },
      { card: { t: 'Operators', x: 'Math: + - * / and % (remainder). + also joins strings. Use === (strict equality) to compare — it checks both value and type, unlike ==.', code: '7 % 3        // 1\n"5" + 3      // "53"\n5 === "5"    // false' },
        qs: [
          { q: 'What is the result?', code: '7 % 3', o: ['1', '2', '2.33'], a: 0, mono: true, why: '% gives the remainder: 7 = 2×3 + 1.' },
          { q: 'What is the result?', code: '"5" + 3', o: ['"53"', '8', 'Error'], a: 0, mono: true, why: 'With a string, + joins instead of adding.' },
          { q: 'What is the result?', code: '5 === "5"', o: ['false', 'true'], a: 0, keep: true, mono: true, why: 'Different types: number vs string.' }
        ] }
    ] },
    { title: 'Control Flow', desc: 'Decisions and loops', topics: [
      { card: { t: 'if / else', x: 'if runs code only when a condition is true; else runs otherwise. Combine conditions with && (and), || (or) and ! (not).', code: 'let n = 10;\nif (n > 5) {\n  console.log("big");\n} else {\n  console.log("small");\n}' },
        qs: [
          { q: 'What does this print?', code: 'let n = 10;\nif (n > 5) {\n  console.log("big");\n} else {\n  console.log("small");\n}', o: ['big', 'small', 'Nothing'], a: 0, why: '10 > 5 is true.' },
          { q: 'Which operator means AND?', o: ['&&', '||', '!'], a: 0, mono: true, why: '&& is true only if both sides are true.' },
          { q: 'What is the result?', code: '!true', o: ['false', 'true'], a: 0, keep: true, mono: true, why: '! flips a boolean.' }
        ] },
      { card: { t: 'Comparisons', x: 'Compare values with > < >= <=, === (equal) and !== (not equal). || (or) is true if at least one side is true.', code: '3 >= 3          // true\n4 !== 4         // false\ntrue || false   // true' },
        qs: [
          { q: 'What is the result?', code: '3 >= 3', o: ['true', 'false'], a: 0, keep: true, mono: true, why: '3 is equal to 3, so >= is true.' },
          { q: 'What is the result?', code: 'true || false', o: ['true', 'false'], a: 0, keep: true, mono: true, why: 'One side is true.' },
          { q: 'What is the result?', code: '4 !== 4', o: ['false', 'true'], a: 0, keep: true, mono: true, why: '4 is equal to 4, so “not equal” is false.' }
        ] },
      { card: { t: 'for loops', x: 'A for loop repeats code: start; condition; step. i++ adds 1 to i each time.', code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n// prints 0, 1, 2' },
        qs: [
          { q: 'How many times does this print?', code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', o: ['3', '2', '4'], a: 0, why: 'i = 0, 1, 2.' },
          { q: 'What is the last number printed?', code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', o: ['2', '3', '0'], a: 0, why: 'When i becomes 3 the condition is false.' },
          { q: 'What does i++ do?', o: ['Adds 1 to i', 'Doubles i', 'Resets i to 0'], a: 0, why: 'It’s short for i = i + 1.' }
        ] },
      { card: { t: 'while and break', x: 'A while loop repeats as long as its condition is true. break exits a loop immediately. If the condition never becomes false, you get an infinite loop.', code: 'let i = 0;\nwhile (i < 5) {\n  i += 2;\n}\nconsole.log(i);  // 6' },
        qs: [
          { q: 'What does this print?', code: 'let i = 0;\nwhile (i < 5) {\n  i += 2;\n}\nconsole.log(i);', o: ['6', '5', '4'], a: 0, why: 'i goes 0 → 2 → 4 → 6, then 6 < 5 is false.' },
          { q: 'What does break do?', o: ['Exits the loop immediately', 'Skips one line', 'Restarts the loop'], a: 0, why: 'continue skips to the next iteration; break stops the loop.' },
          { q: 'A loop whose condition never becomes false…', o: ['runs forever (infinite loop)', 'runs once', 'never runs'], a: 0, why: 'Always make sure the loop can end.' }
        ] }
    ] },
    { title: 'Functions & Arrays', desc: 'Reusable code and lists of data', topics: [
      { card: { t: 'Functions', x: 'A function is reusable code. Parameters are its inputs, and return sends a value back.', code: 'function add(a, b) {\n  return a + b;\n}\nadd(2, 3);  // 5' },
        qs: [
          { q: 'What does this return?', code: 'function add(a, b) {\n  return a + b;\n}\nadd(2, 3);', o: ['5', '23', 'undefined'], a: 0, why: '2 + 3 = 5 (both are numbers).' },
          { q: 'What does return do?', o: ['Sends a value back from the function', 'Prints to the console', 'Restarts the function'], a: 0, why: 'It also ends the function.' },
          { q: 'In function add(a, b), a and b are…', o: ['parameters', 'loops', 'objects'], a: 0, why: 'The values passed in are called arguments.' }
        ] },
      { card: { t: 'Arrow functions', x: 'Arrow functions are a shorter way to write functions. With one expression, the result is returned automatically.', code: 'const square = x => x * x;\nsquare(4);   // 16\nconst greet = () => "hi";' },
        qs: [
          { q: 'What does this return?', code: 'const square = x => x * x;\nsquare(4);', o: ['16', '8', '4'], a: 0, why: '4 × 4.' },
          { q: 'Which symbol defines an arrow function?', o: ['=>', '->', '>>'], a: 0, mono: true, why: '-> is used in Java lambdas, not JavaScript.' },
          { q: 'What does greet() return?', code: 'const greet = () => "hi";', o: ['"hi"', 'undefined', 'greet'], a: 0, mono: true, why: 'One-expression arrows return automatically.' }
        ] },
      { card: { t: 'Arrays', x: 'Arrays hold ordered lists. Indexes start at 0. length gives the number of items and push() adds to the end.', code: 'const fruits = ["apple", "banana", "mango"];\nfruits[0];        // "apple"\nfruits.length;    // 3\nfruits.push("kiwi");' },
        qs: [
          { q: 'What is fruits[1]?', code: 'const fruits = ["apple", "banana", "mango"];', o: ['"banana"', '"apple"', '"mango"'], a: 0, mono: true, why: 'Indexes start at 0.' },
          { q: 'What is fruits.length?', code: 'const fruits = ["apple", "banana", "mango"];', o: ['3', '2', '4'], a: 0, why: 'Three items.' },
          { q: 'What does push() do?', o: ['Adds an item to the end', 'Removes the first item', 'Sorts the array'], a: 0, why: 'pop() removes from the end.' }
        ] },
      { card: { t: 'Array methods', x: 'map() makes a new array by transforming each item. filter() keeps only items that pass a test. includes() checks if a value is in the array.', code: '[1, 2, 3].map(n => n * 2);          // [2, 4, 6]\n[1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]\n["a", "b"].includes("b");          // true' },
        qs: [
          { q: 'What is the result?', code: '[1, 2, 3].map(n => n * 2)', o: ['[2, 4, 6]', '[1, 2, 3]', '12'], a: 0, mono: true, why: 'Each item is doubled.' },
          { q: 'What is the result?', code: '[1, 2, 3, 4].filter(n => n % 2 === 0)', o: ['[2, 4]', '[1, 3]', '[0, 0]'], a: 0, mono: true, why: 'Keeps only even numbers.' },
          { q: 'What is the result?', code: '["a", "b"].includes("b")', o: ['true', 'false'], a: 0, keep: true, mono: true, why: '"b" is in the array.' }
        ] }
    ] },
    { title: 'Objects & the DOM', desc: 'Data objects and changing the page', topics: [
      { card: { t: 'Objects', x: 'Objects group related data as key: value pairs, called properties. Read them with a dot or brackets, and add new ones by assigning.', code: 'const user = { name: "Ana", age: 20 };\nuser.name;        // "Ana"\nuser["age"];      // 20\nuser.city = "Cebu";' },
        qs: [
          { q: 'What is user.name?', code: 'const user = { name: "Ana", age: 20 };', o: ['"Ana"', '20', 'undefined'], a: 0, mono: true, why: 'Dot notation reads a property.' },
          { q: 'How do you add a city property?', o: ['user.city = "Cebu";', 'user.add("city")', 'add user.city'], a: 0, mono: true, why: 'Just assign to a new key.' },
          { q: 'name: "Ana" is called a…', o: ['key-value pair (property)', 'loop', 'function'], a: 0, why: 'Objects are collections of properties.' }
        ] },
      { card: { t: 'Selecting elements', x: 'The document object represents the web page (the DOM). document.querySelector() takes a CSS selector and returns the first matching element.', code: 'const title = document.querySelector("#title");\nconst firstCard = document.querySelector(".card");' },
        qs: [
          { q: 'How do you select the element with id="title"?', o: ['document.querySelector("#title")', 'document.querySelector("title")', 'document.get("#title")'], a: 0, mono: true, why: 'querySelector uses CSS selectors: # for id.' },
          { q: 'querySelector returns…', o: ['the first matching element', 'all matching elements', 'a number'], a: 0, why: 'Use querySelectorAll to get all matches.' },
          { q: 'In the browser, document represents…', o: ['the web page (DOM)', 'a Word file', 'the server'], a: 0, why: 'DOM = Document Object Model.' }
        ] },
      { card: { t: 'Changing the page', x: 'Once you have an element you can change its text with textContent, its style with style, and its classes with classList.', code: 'const el = document.querySelector("#title");\nel.textContent = "Hello!";\nel.style.color = "red";\nel.classList.add("active");' },
        qs: [
          { q: 'Which property changes an element’s text?', o: ['textContent', 'text()', 'value'], a: 0, mono: true, why: 'textContent sets plain text safely.' },
          { q: 'How do you add a CSS class?', o: ['el.classList.add("active")', 'el.class = "+active"', 'el.addClass("active")'], a: 0, mono: true, why: 'addClass is jQuery, not plain JavaScript.' },
          { q: 'What does this do?', code: 'el.style.color = "red";', o: ['Makes the element’s text red', 'Deletes the element', 'Makes the background red'], a: 0, why: 'color is the text color.' }
        ] },
      { card: { t: 'Events', x: 'Events are things that happen, like a click. addEventListener() runs a function (a callback) when the event happens.', code: 'const btn = document.querySelector("button");\nbtn.addEventListener("click", () => {\n  alert("Clicked!");\n});' },
        qs: [
          { q: 'How do you run code when a button is clicked?', o: ['btn.addEventListener("click", fn)', 'btn.onClick(fn)', 'btn.click = run(fn)'], a: 0, mono: true, why: 'addEventListener is the standard way.' },
          { q: '"click" is an example of an…', o: ['event', 'array', 'operator'], a: 0, why: 'Others: "input", "submit", "keydown".' },
          { q: 'The function passed to addEventListener is called a…', o: ['callback (event handler)', 'constructor', 'class'], a: 0, why: 'It’s called back when the event fires.' }
        ] }
    ] }
  ] };

  C.java = { name: 'Java', kind: 'skill', group: 'code', icon: '☕', iconBg: '#E76F00', voice: [], units: [
    { title: 'Java Basics', desc: 'Your first program, types and math', topics: [
      { card: { t: 'Hello, World', x: 'Every Java program lives in a class. It starts running in the main method. System.out.println() prints a line of text.', code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}' },
        qs: [
          { q: 'Which method does a Java program start running from?', o: ['main', 'start', 'run'], a: 0, mono: true, why: 'public static void main(String[] args).' },
          { q: 'What does System.out.println() do?', o: ['Prints text and moves to a new line', 'Reads keyboard input', 'Creates a class'], a: 0, why: 'print() prints without the new line.' },
          { q: 'A public class named Main must be saved in a file named…', o: ['Main.java', 'main.txt', 'Program.java'], a: 0, mono: true, why: 'The file name must match the public class name.' }
        ] },
      { card: { t: 'Compile and run', x: 'javac compiles your .java source code into bytecode (.class files). The JVM (Java Virtual Machine) runs that bytecode, which is why Java runs on many systems: “write once, run anywhere”. Statements end with a semicolon.', code: 'javac Main.java   // compile\njava Main         // run' },
        qs: [
          { q: 'What does javac do?', o: ['Compiles source code into bytecode', 'Runs the program', 'Deletes .class files'], a: 0, why: 'Then java runs it.' },
          { q: 'Java bytecode runs on the…', o: ['JVM', 'HTML engine', 'CSS parser'], a: 0, why: 'Java Virtual Machine.' },
          { q: 'In Java, semicolons at the end of statements are…', o: ['required', 'optional', 'not allowed'], a: 0, why: 'Missing one is a compile error.' }
        ] },
      { card: { t: 'Variables and types', x: 'Java is statically typed: you declare each variable’s type. int holds whole numbers, double decimals, boolean true/false, char a single character in single quotes, and String text in double quotes.', code: 'int age = 20;\ndouble price = 9.99;\nboolean ok = true;\nchar grade = \'A\';\nString name = "Ana";' },
        qs: [
          { q: 'Which type stores whole numbers?', o: ['int', 'double', 'String'], a: 0, mono: true, why: 'double is for decimals.' },
          { q: 'A char value is written with…', o: ['single quotes, like \'A\'', 'double quotes, like "A"', 'no quotes'], a: 0, why: 'Double quotes make a String.' },
          { q: 'Why does String start with a capital S?', o: ['It’s a class, not a primitive type', 'It’s a mistake', 'All types are capitalized'], a: 0, why: 'Primitives like int and double are lowercase.' }
        ] },
      { card: { t: 'Math in Java', x: 'Dividing two ints gives an int — the decimal part is dropped. If either number is a double, you get a decimal result. % gives the remainder.', code: '7 / 2      // 3\n7.0 / 2    // 3.5\n10 % 3     // 1' },
        qs: [
          { q: 'What is the result?', code: 'int x = 7 / 2;', o: ['3', '3.5', '4'], a: 0, why: 'Integer division drops the decimal.' },
          { q: 'What is the result?', code: '7.0 / 2', o: ['3.5', '3', '4'], a: 0, mono: true, why: 'One operand is a double.' },
          { q: 'What is the result?', code: '10 % 3', o: ['1', '3', '0'], a: 0, mono: true, why: '10 = 3×3 + 1.' }
        ] }
    ] },
    { title: 'Control Flow', desc: 'Decisions, strings and loops', topics: [
      { card: { t: 'if / else if / else', x: 'Java checks conditions from top to bottom and runs the first block whose condition is true.', code: 'int score = 85;\nif (score >= 90) {\n  System.out.println("A");\n} else if (score >= 80) {\n  System.out.println("B");\n} else {\n  System.out.println("C");\n}' },
        qs: [
          { q: 'What does this print?', code: 'int score = 85;\nif (score >= 90) {\n  System.out.println("A");\n} else if (score >= 80) {\n  System.out.println("B");\n} else {\n  System.out.println("C");\n}', o: ['B', 'A', 'C'], a: 0, why: '85 isn’t ≥ 90, but it is ≥ 80.' },
          { q: 'Which operator means AND in Java?', o: ['&&', 'and', '||'], a: 0, mono: true, why: 'Same as JavaScript.' },
          { q: 'Which operator compares two ints for equality?', o: ['==', '=', '==='], a: 0, mono: true, why: '= assigns; Java has no ===.' }
        ] },
      { card: { t: 'Strings', x: 'Compare String contents with .equals(), not == (which checks if they are the same object). length() returns the number of characters, and + joins strings.', code: 'String a = "Java";\na.length();          // 4\na.equals("Java");    // true\n"Hi" + 5             // "Hi5"' },
        qs: [
          { q: 'How should you compare two Strings’ contents?', o: ['a.equals(b)', 'a == b', 'a.compare == b'], a: 0, mono: true, why: '== compares references, not text.' },
          { q: 'What does "Java".length() return?', o: ['4', '3', '5'], a: 0, why: 'J-a-v-a.' },
          { q: 'What is the result?', code: '"Hi" + 5', o: ['"Hi5"', '"Hi 5"', 'Error'], a: 0, mono: true, why: '+ with a String joins them.' }
        ] },
      { card: { t: 'for loops', x: 'for (start; condition; step) repeats code. print() prints without a new line; println() adds a new line.', code: 'for (int i = 1; i <= 3; i++) {\n  System.out.print(i);\n}\n// prints 123' },
        qs: [
          { q: 'What does this print?', code: 'for (int i = 1; i <= 3; i++) {\n  System.out.print(i);\n}', o: ['123', '012', '1 2 3 4'], a: 0, mono: true, why: 'i = 1, 2, 3 printed on one line.' },
          { q: 'How many times does that loop run?', o: ['3', '4', '2'], a: 0, why: '1, 2 and 3.' },
          { q: 'What’s the difference between print and println?', o: ['println adds a new line', 'print adds a new line', 'There is no difference'], a: 0, why: 'ln = line.' }
        ] },
      { card: { t: 'switch and while', x: 'switch picks a case by value; use break or execution “falls through” into the next case. A while loop may run zero times; a do-while loop always runs at least once.', code: 'switch (day) {\n  case 1: System.out.println("Mon"); break;\n  case 2: System.out.println("Tue"); break;\n  default: System.out.println("Other");\n}' },
        qs: [
          { q: 'What happens if a case has no break?', o: ['It falls through into the next case', 'The program crashes', 'Nothing else runs'], a: 0, why: 'Execution continues into the following case.' },
          { q: 'A do-while loop runs at least…', o: ['once', 'zero times', 'twice'], a: 0, why: 'The condition is checked after the body.' },
          { q: 'How many times does this body run?', code: 'int i = 5;\nwhile (i < 3) {\n  System.out.println("hi");\n  i++;\n}', o: ['0', '1', 'Forever'], a: 0, why: 'i < 3 is already false, so the while loop never enters its body.' }
        ] }
    ] },
    { title: 'Methods & Arrays', desc: 'Reusable code and collections', topics: [
      { card: { t: 'Methods', x: 'A method has a return type, a name and parameters. void means it returns nothing.', code: 'static int add(int a, int b) {\n  return a + b;\n}\n\nstatic void greet() {\n  System.out.println("Hi!");\n}' },
        qs: [
          { q: 'What does add(2, 3) return?', code: 'static int add(int a, int b) {\n  return a + b;\n}', o: ['5', '23', 'Nothing'], a: 0, why: '2 + 3.' },
          { q: 'What does void mean?', o: ['The method returns nothing', 'The method is empty', 'The method is private'], a: 0, why: 'void = no return value.' },
          { q: 'In static int add(...), int is the…', o: ['return type', 'method name', 'parameter'], a: 0, why: 'It says the method returns an int.' }
        ] },
      { card: { t: 'Arrays', x: 'Arrays hold a fixed number of values of one type. Indexes start at 0, and .length (no parentheses) gives the size. Using an index that doesn’t exist throws ArrayIndexOutOfBoundsException.', code: 'int[] nums = {4, 8, 15};\nnums[0];       // 4\nnums.length;   // 3' },
        qs: [
          { q: 'What is nums[2]?', code: 'int[] nums = {4, 8, 15};', o: ['15', '8', '4'], a: 0, why: 'Index 2 is the third item.' },
          { q: 'How do you get an array’s size?', o: ['nums.length', 'nums.length()', 'nums.size()'], a: 0, mono: true, why: 'For arrays, length is a field (no parentheses).' },
          { q: 'What happens with nums[3] on a 3-item array?', o: ['ArrayIndexOutOfBoundsException', 'It returns 0', 'It returns null'], a: 0, mono: true, why: 'Valid indexes are 0, 1 and 2.' }
        ] },
      { card: { t: 'ArrayList', x: 'An ArrayList is a resizable list from java.util. Use add() to insert, get() to read, and size() for the count.', code: 'import java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\nnames.add("Ana");\nnames.get(0);    // "Ana"\nnames.size();    // 1' },
        qs: [
          { q: 'How do you get the number of items in an ArrayList?', o: ['size()', 'length', 'count()'], a: 0, mono: true, why: 'Arrays use length; ArrayLists use size().' },
          { q: 'How do you add an item?', o: ['names.add("Ana")', 'names.push("Ana")', 'names[0] = "Ana"'], a: 0, mono: true, why: 'push is JavaScript.' },
          { q: 'The main advantage of ArrayList over an array:', o: ['It can grow and shrink', 'It is always faster', 'It can only hold numbers'], a: 0, why: 'Arrays have a fixed size.' }
        ] },
      { card: { t: 'The for-each loop', x: 'The enhanced for loop (for-each) visits every element of an array or list without using an index.', code: 'int[] nums = {1, 2, 3};\nint sum = 0;\nfor (int n : nums) {\n  sum += n;\n}\n// sum is 6' },
        qs: [
          { q: 'What is sum after the loop?', code: 'int[] nums = {1, 2, 3};\nint sum = 0;\nfor (int n : nums) {\n  sum += n;\n}', o: ['6', '3', '0'], a: 0, why: '1 + 2 + 3.' },
          { q: 'The enhanced for loop is also called a…', o: ['for-each loop', 'do loop', 'switch'], a: 0, why: 'Read “:” as “in”.' },
          { q: 'A for-each loop is best for…', o: ['reading every element', 'changing the array’s size', 'skipping to a specific index'], a: 0, why: 'You don’t get the index.' }
        ] }
    ] },
    { title: 'Object-Oriented Java', desc: 'Classes, objects and inheritance', topics: [
      { card: { t: 'Classes and objects', x: 'A class is a blueprint; an object is an instance made from it with new. Objects have fields (data) and methods (behavior).', code: 'class Dog {\n  String name;\n  void bark() { System.out.println("Woof!"); }\n}\n\nDog d = new Dog();\nd.name = "Bantay";\nd.bark();' },
        qs: [
          { q: 'How do you create a Dog object?', o: ['new Dog()', 'Dog.create()', 'make Dog'], a: 0, mono: true, why: 'new calls the constructor.' },
          { q: 'A class is a…', o: ['blueprint for objects', 'single object', 'kind of loop'], a: 0, why: 'Many objects can come from one class.' },
          { q: 'An object is an…', o: ['instance of a class', 'error', 'import'], a: 0, why: 'd is an instance of Dog.' }
        ] },
      { card: { t: 'Constructors', x: 'A constructor sets up a new object. It has the same name as the class and no return type. this refers to the current object.', code: 'class Dog {\n  String name;\n  Dog(String name) {\n    this.name = name;\n  }\n}\nDog d = new Dog("Bantay");' },
        qs: [
          { q: 'What must a constructor be named?', o: ['The same as the class', 'init', 'constructor'], a: 0, why: 'constructor is the JavaScript keyword.' },
          { q: 'What is a constructor’s return type?', o: ['It has none', 'void', 'Object'], a: 0, why: 'Not even void.' },
          { q: 'In this.name = name;, this refers to…', o: ['the current object', 'the class file', 'the parameter'], a: 0, why: 'this.name is the field; name is the parameter.' }
        ] },
      { card: { t: 'Encapsulation', x: 'Make fields private so only the class can touch them, and expose public getters and setters. This protects the data and lets the class control changes.', code: 'class Account {\n  private double balance;\n  public double getBalance() { return balance; }\n  public void deposit(double amt) {\n    if (amt > 0) balance += amt;\n  }\n}' },
        qs: [
          { q: 'private means a field can be used…', o: ['only inside its own class', 'by any class', 'only in main'], a: 0, why: 'Other classes must use public methods.' },
          { q: 'getBalance() is an example of a…', o: ['getter', 'constructor', 'loop'], a: 0, why: 'Getters read; setters change.' },
          { q: 'Why use encapsulation?', o: ['To protect data and control how it changes', 'To make code run faster', 'Because Java requires private fields'], a: 0, why: 'deposit() can reject negative amounts.' }
        ] },
      { card: { t: 'Inheritance', x: 'A class can extend one other class to inherit its fields and methods. @Override marks a method that replaces the parent’s version — the basis of polymorphism.', code: 'class Animal {\n  void speak() { System.out.println("..."); }\n}\nclass Cat extends Animal {\n  @Override\n  void speak() { System.out.println("Meow"); }\n}' },
        qs: [
          { q: 'Which keyword makes one class inherit from another?', o: ['extends', 'inherits', 'implements'], a: 0, mono: true, why: 'implements is for interfaces.' },
          { q: 'What does @Override indicate?', o: ['The method replaces a parent class method', 'The method is private', 'The method is new and unique'], a: 0, why: 'The compiler checks it really overrides something.' },
          { q: 'How many classes can a Java class directly extend?', o: ['1', '2', 'Unlimited'], a: 0, why: 'Java has single inheritance for classes (but a class can implement many interfaces).' }
        ] }
    ] }
  ] };
})();
