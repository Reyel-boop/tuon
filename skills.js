// Game & sport courses. Each unit has 4 topics; each topic = one teaching card + quiz questions.
// Lessons 1–4 of a unit teach topics 1–4; lesson 5 reviews the whole unit.
// Question forms:
//   { q, o:[...options], a:indexOfCorrect, why, fen?, em?, keep? }   multiple choice (keep = don't shuffle, e.g. True/False)
//   { q, fen, from:'e4', why }   tap any square the piece on `from` can move to (computed from the rules)
//   { q, fen, sq:['f7'], why }   tap one of the listed squares
// fen = piece placement only (rank 8 → rank 1), uppercase = White.
(function () {
  const TF = ['True', 'False'];
  window.COURSES.chess = {
    name: 'Chess', kind: 'skill', icon: '♞', iconBg: '#2B3440', voice: [], units: [
      { title: 'Board & Pieces', desc: 'The board and how pieces move', topics: [
        { card: { t: 'The chessboard', x: 'A chessboard has 64 squares in an 8×8 grid. Columns are called files (a–h) and rows are called ranks (1–8), so every square has a name like e4. Set it up so each player has a light square in the bottom-right corner: “light on the right”.', fen: '8/8/8/8/8/8/8/8', hl: ['e4'] },
          qs: [
            { q: 'How many squares are on a chessboard?', o: ['64', '32', '81', '100'], a: 0, why: '8 files × 8 ranks = 64 squares.' },
            { q: 'Tap the square e4.', fen: '8/8/8/8/8/8/8/8', sq: ['e4'], why: 'Find the e-file (5th column), then go up to rank 4.' },
            { q: 'Each player should have which color square in their bottom-right corner?', o: ['Light', 'Dark', 'It does not matter'], a: 0, why: '“Light on the right” — the h1 and a8 corners are light squares.' }
          ] },
        { card: { t: 'Setting up', x: 'Rooks go in the corners, then knights, then bishops. The queen goes on her own color (the white queen on d1, a light square) and the king takes the last square (e1). Each side has 8 pawns on the second rank. White always moves first.', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' },
          qs: [
            { q: 'Tap the square where the white queen starts.', fen: 'rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1KBNR', sq: ['d1'], why: 'The queen starts on her own color: the white queen goes on d1.' },
            { q: 'How many pawns does each player start with?', o: ['8', '6', '10', '16'], a: 0, why: 'Each side has a full row of 8 pawns.' },
            { q: 'Which side moves first?', o: ['White', 'Black', 'Whoever wins a coin toss'], a: 0, why: 'In chess, White always makes the first move.' }
          ] },
        { card: { t: 'Rook and bishop', x: 'The rook moves any number of squares in a straight line: up, down, left or right. The bishop moves any number of squares diagonally, so it always stays on the same color. Neither can jump over other pieces. A piece captures by moving onto an enemy piece’s square.', fen: '8/8/8/8/3R4/8/8/8', hl: ['d4'] },
          qs: [
            { q: 'Tap any square the rook can move to.', fen: '8/8/8/8/3R4/8/8/8', from: 'd4', why: 'Rooks move in straight lines along their file or rank.' },
            { q: 'Tap any square the bishop can move to.', fen: '8/8/8/8/4B3/8/8/8', from: 'e4', why: 'Bishops move diagonally, any distance.' },
            { q: 'The rook can capture the black pawn but is blocked by its own pawn. Tap any square it can reach.', fen: '8/8/3p4/8/3R1P2/8/8/8', from: 'd4', why: 'It can capture on d6, but can’t pass its own pawn on f4.' },
            { q: 'A bishop that starts on a light square…', o: ['always stays on light squares', 'can switch colors', 'can only move one square'], a: 0, why: 'Diagonal moves never change the square color.' }
          ] },
        { card: { t: 'Queen and king', x: 'The queen is the most powerful piece: she moves like a rook and a bishop combined, any distance in any straight or diagonal line. The king moves only one square in any direction — but he is the piece you must protect.', fen: '8/8/8/8/3Q4/8/8/8', hl: ['d4'] },
          qs: [
            { q: 'Tap any square the queen can move to.', fen: '8/8/8/8/3Q4/8/8/8', from: 'd4', why: 'The queen moves straight or diagonally, any distance.' },
            { q: 'Tap any square the king can move to.', fen: '8/8/8/8/4K3/8/8/8', from: 'e4', why: 'The king moves one square in any direction.' },
            { q: 'The queen moves like which two pieces combined?', o: ['Rook and bishop', 'Knight and bishop', 'King and pawn'], a: 0, why: 'Straight lines (rook) plus diagonals (bishop).' }
          ] }
      ] },
      { title: 'Knights & Pawns', desc: 'Tricky moves and special rules', topics: [
        { card: { t: 'The knight', x: 'The knight moves in an “L”: two squares in one direction, then one square to the side. It is the only piece that can jump over other pieces. A knight always lands on the opposite color from where it started.', fen: '8/8/8/8/4N3/8/8/8', hl: ['e4'] },
          qs: [
            { q: 'Tap any square the knight can move to.', fen: '8/8/8/8/4N3/8/8/8', from: 'e4', why: 'Two squares one way, one square to the side.' },
            { q: 'A knight in the corner has fewer moves. Tap one.', fen: '8/8/8/8/8/8/8/N7', from: 'a1', why: 'From a1 the knight can only reach b3 and c2.' },
            { q: 'Which piece can jump over other pieces?', o: ['Knight', 'Bishop', 'Queen', 'Rook'], a: 0, why: 'Only the knight jumps.' }
          ] },
        { card: { t: 'Pawns', x: 'Pawns move straight forward one square, but on their very first move they may move two. They cannot move backward. Unlike other pieces, pawns capture differently from how they move: one square diagonally forward.', fen: '8/8/8/3ppp2/4P3/8/8/8', hl: ['e4'] },
          qs: [
            { q: 'Tap any square this pawn can move to.', fen: '8/8/8/8/8/8/4P3/8', from: 'e2', why: 'From its starting square a pawn may move one or two squares forward.' },
            { q: 'The pawn is blocked straight ahead. Tap a square it can capture on.', fen: '8/8/8/3ppp2/4P3/8/8/8', from: 'e4', why: 'Pawns capture one square diagonally forward.' },
            { q: 'Can a pawn move backward?', o: TF.map(x => x === 'True' ? 'Yes' : 'No'), a: 1, keep: true, why: 'Pawns only ever move forward.' }
          ] },
        { card: { t: 'Promotion and en passant', x: 'When a pawn reaches the far end of the board it is promoted: it becomes a queen, rook, bishop or knight (almost always a queen). En passant: if an enemy pawn moves two squares and lands right beside your pawn, you may capture it as if it had moved only one — but only on the very next move.', fen: '8/P7/8/8/8/8/8/8', hl: ['a7', 'a8'] },
          qs: [
            { q: 'This pawn moves to a8. What can it become?', fen: '8/P7/8/8/8/8/8/8', o: ['A queen, rook, bishop or knight', 'Only a queen', 'A king', 'Nothing — it stays a pawn'], a: 0, why: 'A promoting pawn can become any piece except a king or pawn.' },
            { q: 'When must you capture en passant?', o: ['Immediately, on the very next move', 'Any time later', 'Only in the endgame'], a: 0, why: 'If you don’t take en passant right away, the chance is gone.' },
            { q: 'Most players promote a pawn to a…', o: ['Queen', 'Knight', 'Rook', 'Bishop'], a: 0, why: 'The queen is the strongest piece, so it’s the usual choice.' }
          ] },
        { card: { t: 'Castling', x: 'Castling moves two pieces at once: the king moves two squares toward a rook, and that rook jumps to the other side of the king. You can only castle if neither piece has moved, the squares between them are empty, and the king is not in check, does not pass through check, and does not land in check.', fen: 'r3k2r/8/8/8/8/8/8/R3K2R', hl: ['e1', 'g1', 'c1'] },
          qs: [
            { q: 'White castles kingside (short). Tap the square where the king ends up.', fen: 'r3k2r/8/8/8/8/8/8/R3K2R', sq: ['g1'], why: 'The king moves two squares to g1 and the rook jumps to f1.' },
            { q: 'White castles queenside (long). Tap the square where the king ends up.', fen: 'r3k2r/8/8/8/8/8/8/R3K2R', sq: ['c1'], why: 'The king moves two squares to c1 and the rook jumps to d1.' },
            { q: 'You may castle while your king is in check.', o: TF, a: 1, keep: true, why: 'You can’t castle out of, through, or into check.' },
            { q: 'If your king has already moved once, can you still castle later?', o: ['No', 'Yes', 'Only queenside'], a: 0, why: 'Castling is only allowed if the king and that rook have never moved.' }
          ] }
      ] },
      { title: 'Check & Checkmate', desc: 'How a game is won — or drawn', topics: [
        { card: { t: 'Check', x: 'A king that is attacked is “in check”. You must get out of check right away, in one of three ways: move the king, block the attack, or capture the attacking piece. You may never make a move that leaves your own king in check.', fen: '4k3/8/8/8/8/8/8/4R1K1', hl: ['e1', 'e8'] },
          qs: [
            { q: 'Is the black king in check?', fen: '4k3/8/8/8/8/8/8/4R1K1', o: ['Yes', 'No'], a: 0, keep: true, why: 'The rook on e1 attacks straight up the e-file to e8.' },
            { q: 'Which is NOT a way to get out of check?', o: ['Moving another piece that doesn’t block', 'Moving the king', 'Blocking the attack', 'Capturing the attacker'], a: 0, why: 'Only moving the king, blocking or capturing ends a check.' },
            { q: 'You are allowed to ignore a check and make another move.', o: TF, a: 1, keep: true, why: 'You must always respond to check immediately.' }
          ] },
        { card: { t: 'Checkmate', x: 'Checkmate is when a king is in check and there is no way to escape. That ends the game — the side that delivers checkmate wins. A classic pattern is the “back-rank mate”: a king trapped behind its own pawns is checked along the back row.', fen: '4R1k1/5ppp/8/8/8/8/8/6K1', hl: ['e8', 'g8'] },
          qs: [
            { q: 'Is Black checkmated?', fen: '4R1k1/5ppp/8/8/8/8/8/6K1', o: ['Yes', 'No'], a: 0, keep: true, why: 'The rook checks along the 8th rank and the king’s own pawns block every escape.' },
            { q: 'White to move. Tap the square where the rook gives checkmate.', fen: '6k1/5ppp/8/8/8/8/8/R5K1', sq: ['a8'], why: 'Ra8 is a back-rank mate: the king is boxed in by its pawns.' },
            { q: 'What happens when a king is checkmated?', o: ['The game ends and that side loses', 'The king is removed and play continues', 'The game is a draw'], a: 0, why: 'Checkmate ends the game immediately.' }
          ] },
        { card: { t: 'Stalemate', x: 'Stalemate happens when the player to move is NOT in check but has no legal move at all. A stalemate is a draw — nobody wins. Be careful when you are far ahead: it’s easy to stalemate by accident!', fen: 'k7/8/1Q6/8/8/8/8/4K3', hl: ['a8'] },
          qs: [
            { q: 'Black to move. What is this position?', fen: 'k7/8/1Q6/8/8/8/8/4K3', o: ['Stalemate — a draw', 'Checkmate — White wins', 'Check', 'Black wins'], a: 0, why: 'The king isn’t in check but every square it could go to is attacked.' },
            { q: 'A stalemate counts as a…', o: ['Draw', 'Win for the stronger side', 'Win for the player who is stuck'], a: 0, why: 'Stalemate is always a draw.' },
            { q: 'In stalemate, the stuck king is in check.', o: TF, a: 1, keep: true, why: 'That would be checkmate. In stalemate the king is not in check.' }
          ] },
        { card: { t: 'Other draws', x: 'A game is also drawn if: both players agree to a draw; the same position happens three times (threefold repetition); 50 moves pass with no capture and no pawn move (the 50-move rule); or neither side has enough pieces to checkmate (for example king against king).', fen: '8/8/3k4/8/8/4K3/8/8' },
          qs: [
            { q: 'King against king is…', fen: '8/8/3k4/8/8/4K3/8/8', o: ['A draw', 'A win for White', 'A win for Black'], a: 0, why: 'Neither side can ever checkmate, so it’s a draw by insufficient material.' },
            { q: 'How many times must the same position repeat for a draw?', o: ['3', '2', '5'], a: 0, why: 'Threefold repetition.' },
            { q: 'The 50-move rule counts moves without…', o: ['a capture or a pawn move', 'a check', 'castling'], a: 0, why: '50 moves with no capture and no pawn move can be claimed as a draw.' }
          ] }
      ] },
      { title: 'Values & Tactics', desc: 'Win material with clever moves', topics: [
        { card: { t: 'Piece values', x: 'Players use points to compare pieces: pawn = 1, knight = 3, bishop = 3, rook = 5, queen = 9. The king has no point value because losing it loses the game. Trading a knight (3) for a rook (5) wins material.', em: '♟1 ♞3 ♝3 ♜5 ♛9' },
          qs: [
            { q: 'How many points is a rook worth?', o: ['5', '3', '9', '1'], a: 0, why: 'Rook = 5 points.' },
            { q: 'Which is worth the most?', o: ['Queen', 'Rook', 'Two knights', 'Bishop'], a: 0, why: 'Queen = 9; two knights = 6.' },
            { q: 'You give a bishop to win a rook. Did you gain material?', o: ['Yes, +2', 'No, −2', 'It’s even'], a: 0, why: 'You gave 3 and got 5.' }
          ] },
        { card: { t: 'The fork', x: 'A fork is one piece attacking two (or more) enemy pieces at the same time. The opponent can usually save only one. Knights are famous for forks because they attack in unusual directions.', fen: '6k1/pp1q3p/8/8/4N3/8/PP5P/6K1', hl: ['e4'] },
          qs: [
            { q: 'White to move. Tap the square where the knight forks the king and queen.', fen: '6k1/pp1q3p/8/8/4N3/8/PP5P/6K1', sq: ['f6'], why: 'Nf6+ checks the king on g8 and attacks the queen on d7.' },
            { q: 'A fork attacks…', o: ['two or more pieces at once', 'only the king', 'pieces of your own color'], a: 0, why: 'That’s what makes it so effective.' },
            { q: 'Which piece is most famous for forks?', o: ['Knight', 'King', 'Rook'], a: 0, why: 'Its L-shaped attack is hard to see coming.' }
          ] },
        { card: { t: 'The pin', x: 'A pin is when a piece cannot move because a more valuable piece is behind it on the same line. If the piece behind is the king, moving the pinned piece is illegal.', fen: '4k3/8/2n5/1B6/8/8/8/4K3', hl: ['b5', 'c6', 'e8'] },
          qs: [
            { q: 'Why can’t the black knight on c6 move?', fen: '4k3/8/2n5/1B6/8/8/8/4K3', o: ['It is pinned to its king by the bishop', 'Knights can’t move backward', 'It is blocked by pawns'], a: 0, why: 'Moving it would expose the king on e8 to the bishop — that’s illegal.' },
            { q: 'Which pieces can pin? (pick the best answer)', o: ['Bishops, rooks and queens', 'Only knights', 'Only pawns'], a: 0, why: 'Pins happen along straight or diagonal lines.' },
            { q: 'A piece pinned to its king may legally move off the line.', o: TF, a: 1, keep: true, why: 'That would leave the king in check, which is illegal.' }
          ] },
        { card: { t: 'The skewer', x: 'A skewer is like a reverse pin: a valuable piece is attacked and forced to move, exposing a piece behind it to capture. Example: a rook checks the king, the king steps aside, and the rook takes the queen behind it.', fen: '8/8/8/q3k2R/8/8/8/4K3', hl: ['h5', 'e5', 'a5'] },
          qs: [
            { q: 'In a skewer, the MORE valuable piece is in front.', o: TF, a: 0, keep: true, why: 'True — that’s the difference from a pin, where the more valuable piece is behind.' },
            { q: 'After a skewer check, what usually happens?', o: ['The king moves and the piece behind is captured', 'The game is drawn', 'The attacker is trapped'], a: 0, why: 'The king must escape check, leaving the piece behind undefended.' },
            { q: 'Pin, fork and skewer are all…', o: ['tactics', 'openings', 'draw rules'], a: 0, why: 'They are short-term tricks that win material.' }
          ] }
      ] },
      { title: 'Openings & Strategy', desc: 'Start strong and avoid traps', topics: [
        { card: { t: 'Control the center', x: 'The four center squares are d4, e4, d5 and e5. Pieces in the center control more of the board, so good openings fight for these squares — often starting with 1.e4 or 1.d4.', fen: '8/8/8/8/8/8/8/8', hl: ['d4', 'e4', 'd5', 'e5'] },
          qs: [
            { q: 'Tap one of the four center squares.', fen: '8/8/8/8/8/8/8/8', sq: ['d4', 'e4', 'd5', 'e5'], why: 'd4, e4, d5 and e5 are the center.' },
            { q: 'Why is the center important?', o: ['Pieces there control more squares', 'Pieces there can’t be captured', 'It’s required by the rules'], a: 0, why: 'A knight in the center attacks 8 squares; in a corner only 2.' },
            { q: 'Which is a popular first move for White?', o: ['1.e4', '1.h4', '1.a3'], a: 0, why: '1.e4 grabs the center and opens lines for the queen and bishop.' }
          ] },
        { card: { t: 'Develop your pieces', x: 'In the opening, bring out your knights and bishops quickly so they join the game. Avoid moving the same piece many times, and don’t bring your queen out too early — it can be chased around by smaller pieces.', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R', hl: ['f3', 'c6'] },
          qs: [
            { q: 'Which pieces should you usually develop first?', o: ['Knights and bishops', 'Rooks', 'The king'], a: 0, why: 'They’re quick to bring out and influence the center.' },
            { q: 'Why not bring the queen out early?', o: ['She can be chased by smaller pieces, wasting time', 'The rules forbid it', 'She can’t capture yet'], a: 0, why: 'Every move spent saving the queen is a move not spent developing.' },
            { q: 'In the opening it’s good to move the same piece over and over.', o: TF, a: 1, keep: true, why: 'Develop new pieces instead.' }
          ] },
        { card: { t: 'King safety', x: 'Castle early — usually in the first 10 moves. Castling tucks your king safely behind pawns and brings a rook toward the center. Avoid pushing the pawns in front of your castled king without a good reason.', fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1', hl: ['g1', 'g8'] },
          qs: [
            { q: 'Why castle early?', o: ['To keep the king safe and connect the rooks', 'To win a pawn', 'Because castling is required'], a: 0, why: 'A king left in the center is easy to attack.' },
            { q: 'After castling, the pawns in front of your king should usually…', o: ['stay where they are', 'all be pushed forward', 'be traded off'], a: 0, why: 'They form a shield around your king.' },
            { q: 'Which piece does castling also activate?', o: ['A rook', 'A knight', 'The queen'], a: 0, why: 'The rook moves toward the center files.' }
          ] },
        { card: { t: 'Beware quick mates', x: 'The Scholar’s Mate attacks the weak f7 square (defended only by the king) with the queen and bishop. Fool’s Mate is the fastest possible checkmate — just 2 moves — after White weakens the king with f3 and g4.', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR', hl: ['h5', 'c4', 'f7'] },
          qs: [
            { q: 'White to move. Tap the square where the queen gives checkmate.', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR', sq: ['f7'], why: 'Qxf7# — the bishop on c4 protects the queen. This is Scholar’s Mate.' },
            { q: 'Which square does Scholar’s Mate target for Black?', o: ['f7', 'e5', 'a7', 'h8'], a: 0, why: 'At the start, f7 is defended only by the king.' },
            { q: 'Fool’s Mate takes how many moves?', o: ['2', '4', '10'], a: 0, why: 'It’s the fastest checkmate possible.' }
          ] }
      ] }
    ]
  };

  window.COURSES.basketball = {
    name: 'Basketball', kind: 'skill', icon: '🏀', iconBg: '#F27A24', voice: [], units: [
      { title: 'Court & Scoring', desc: 'Players, points and game time', topics: [
        { card: { t: 'The team', x: 'Each team has 5 players on the court. The usual positions are point guard (runs the offense and brings the ball up), shooting guard, small forward, power forward and center (usually the tallest, playing near the basket).', em: '🏀👟👟👟👟👟' },
          qs: [
            { q: 'How many players per team are on the court?', o: ['5', '6', '7', '11'], a: 0, why: 'Basketball is 5 against 5.' },
            { q: 'Which position usually brings the ball up and runs the plays?', o: ['Point guard', 'Center', 'Power forward'], a: 0, why: 'The point guard is the floor leader.' },
            { q: 'Which position is usually the tallest, playing close to the basket?', o: ['Center', 'Point guard', 'Shooting guard'], a: 0, why: 'Centers rebound, block shots and score inside.' }
          ] },
        { card: { t: 'Scoring', x: 'A basket from inside the three-point line is worth 2 points. A shot made from behind the three-point line is worth 3. A free throw — an unguarded shot from the free-throw line after a foul — is worth 1.', em: '🏀 1 · 2 · 3' },
          qs: [
            { q: 'A shot made from behind the three-point line is worth…', o: ['3 points', '2 points', '1 point'], a: 0, why: 'That’s why it’s called the three-point line.' },
            { q: 'A free throw is worth…', o: ['1 point', '2 points', '3 points'], a: 0, why: 'Each made free throw is 1 point.' },
            { q: 'A layup right next to the basket is worth…', o: ['2 points', '1 point', '3 points'], a: 0, why: 'Any made shot inside the arc counts 2.' }
          ] },
        { card: { t: 'Dribbling rules', x: 'You must dribble (bounce) the ball to move with it. Taking steps while holding the ball without dribbling is traveling. Stopping your dribble and then dribbling again — or dribbling with both hands at once — is a double dribble. Both give the ball to the other team.', em: '🚫🚶‍♂️🏀' },
          qs: [
            { q: 'Walking with the ball without dribbling is called…', o: ['Traveling', 'Goaltending', 'A foul'], a: 0, why: 'Traveling is a violation; the other team gets the ball.' },
            { q: 'You stop dribbling, hold the ball, then start dribbling again. That’s…', o: ['A double dribble', 'Allowed', 'A technical foul'], a: 0, why: 'Once you pick up your dribble you must pass or shoot.' },
            { q: 'Dribbling with both hands at the same time is allowed.', o: TF, a: 1, keep: true, why: 'That’s also a double dribble.' }
          ] },
        { card: { t: 'Game time', x: 'Games have 4 quarters. In FIBA (international) games each quarter is 10 minutes; in the NBA it’s 12 minutes. The shot clock gives the attacking team 24 seconds to attempt a shot that hits the rim. A tie at the end goes to 5-minute overtime periods.', em: '⏱️ 24' },
          qs: [
            { q: 'How long is the shot clock?', o: ['24 seconds', '30 seconds', '10 seconds'], a: 0, why: 'Shoot (and hit the rim) within 24 seconds or lose the ball.' },
            { q: 'How long is a quarter in an NBA game?', o: ['12 minutes', '10 minutes', '15 minutes'], a: 0, why: 'NBA quarters are 12 minutes; FIBA quarters are 10.' },
            { q: 'If the score is tied at the end, the teams play…', o: ['Overtime', 'Free throws to decide', 'Nothing — it’s a tie'], a: 0, why: 'Overtime periods are 5 minutes each.' }
          ] }
      ] },
      { title: 'Fouls & Violations', desc: 'What you can’t do on court', topics: [
        { card: { t: 'Personal fouls', x: 'A personal foul is illegal physical contact, like pushing, holding or hitting an opponent. If a player is fouled while shooting, they get free throws: 2 for a missed two-point shot, 3 for a missed three. If the shot goes in anyway, it counts and they get 1 extra free throw (“and-one”).', em: '🙅‍♂️🤚' },
          qs: [
            { q: 'A player is fouled while shooting a three and misses. How many free throws?', o: ['3', '2', '1'], a: 0, why: 'Free throws match the value of the missed shot.' },
            { q: 'A player is fouled, but the shot still goes in. What is that called?', o: ['An and-one', 'A double dribble', 'Goaltending'], a: 0, why: 'The basket counts plus 1 free throw.' },
            { q: 'Pushing an opponent is a…', o: ['Personal foul', 'Travel', 'Shot-clock violation'], a: 0, why: 'Illegal contact is a personal foul.' }
          ] },
        { card: { t: 'Fouling out', x: 'Players can only commit a limited number of personal fouls before they must leave the game (“foul out”): 5 fouls in FIBA games, 6 in the NBA. Teams also have a foul limit per quarter; after it, every foul gives the other team free throws (the “bonus” or penalty).', em: '5️⃣ / 6️⃣' },
          qs: [
            { q: 'In FIBA games, how many personal fouls make a player foul out?', o: ['5', '6', '4'], a: 0, why: 'FIBA: 5 fouls. NBA: 6.' },
            { q: 'In the NBA, a player fouls out after…', o: ['6 fouls', '5 fouls', '7 fouls'], a: 0, why: 'NBA players get one more foul than FIBA players.' },
            { q: 'After a team reaches its foul limit in a quarter, the other team…', o: ['shoots free throws on every foul', 'gets an extra player', 'gets 3 points'], a: 0, why: 'That’s called being in the bonus (penalty).' }
          ] },
        { card: { t: 'Time violations', x: 'Attacking players may not stay in the painted lane (the “key”) for more than 3 seconds. After gaining the ball, a team has 8 seconds to bring it past the half-court line. An inbound pass must be made within 5 seconds.', em: '3️⃣ · 8️⃣ · 5️⃣' },
          qs: [
            { q: 'How long can an attacker stay in the painted lane?', o: ['3 seconds', '5 seconds', '8 seconds'], a: 0, why: 'More than 3 seconds is a lane violation.' },
            { q: 'How long does a team have to bring the ball past half-court?', o: ['8 seconds', '24 seconds', '3 seconds'], a: 0, why: 'It’s the 8-second rule.' },
            { q: 'An inbound pass must be made within…', o: ['5 seconds', '10 seconds', '24 seconds'], a: 0, why: 'Otherwise the other team gets the ball.' }
          ] },
        { card: { t: 'Backcourt and goaltending', x: 'Once the attacking team has brought the ball into its frontcourt, it can’t take the ball back over the half-court line — that’s a backcourt violation. Goaltending is touching a shot on its way down toward the basket, or touching the ball while it’s on the rim above the cylinder; the basket counts.', em: '🚫⬅️🏀' },
          qs: [
            { q: 'Blocking a shot that is already coming down toward the basket is…', o: ['Goaltending — the basket counts', 'A great block', 'A travel'], a: 0, why: 'You can only block a shot on its way up.' },
            { q: 'After crossing half-court, can the attacking team dribble back over it?', o: ['No, it’s a backcourt violation', 'Yes, any time', 'Only in the last minute'], a: 0, why: 'The ball has to stay in the frontcourt.' },
            { q: 'When goaltending is called on the defense, the shot…', o: ['counts as made', 'is replayed', 'is worth 0'], a: 0, why: 'The points are awarded.' }
          ] }
      ] },
      { title: 'Skills & Strategy', desc: 'Shoot, pass and defend', topics: [
        { card: { t: 'Shooting form', x: 'Many coaches teach “BEEF”: Balance (feet shoulder-width, knees bent), Eyes (on the rim), Elbow (under the ball, pointing at the basket), Follow-through (snap your wrist and hold it, like reaching into a cookie jar).', em: '🎯🏀' },
          qs: [
            { q: 'In BEEF, what does the F stand for?', o: ['Follow-through', 'Footwork', 'Fast break'], a: 0, why: 'Hold your follow-through after the release.' },
            { q: 'Where should your eyes be when shooting?', o: ['On the rim', 'On the ball', 'On the defender'], a: 0, why: 'Aim at the target.' },
            { q: 'Your shooting elbow should be…', o: ['under the ball, pointing at the basket', 'flared out to the side', 'straight before you shoot'], a: 0, why: 'This keeps the shot straight.' }
          ] },
        { card: { t: 'Passing', x: 'The chest pass goes straight from your chest to a teammate’s chest — fast and accurate. The bounce pass hits the floor about two-thirds of the way to your teammate, good for getting past defenders’ hands. The overhead pass is thrown from above your head over a defender.', em: '🤾‍♂️🏀' },
          qs: [
            { q: 'Which pass hits the floor before reaching your teammate?', o: ['Bounce pass', 'Chest pass', 'Overhead pass'], a: 0, why: 'Aim about two-thirds of the way there.' },
            { q: 'Which pass is usually the fastest over a short, open distance?', o: ['Chest pass', 'Bounce pass', 'Lob pass'], a: 0, why: 'It travels in a straight line.' },
            { q: 'To pass over a defender’s head, use the…', o: ['Overhead pass', 'Bounce pass', 'Behind-the-back dribble'], a: 0, why: 'It starts high, above the defender.' }
          ] },
        { card: { t: 'Defense', x: 'In man-to-man defense, each defender guards one specific opponent. In zone defense, each defender guards an area of the court (like a 2-3 zone). Stay between your opponent and the basket and keep a low stance.', em: '🛡️' },
          qs: [
            { q: 'Each defender guards one specific player. That’s…', o: ['Man-to-man', 'Zone', 'Full-court press'], a: 0, why: 'Man-to-man matches players up one-on-one.' },
            { q: 'In a 2-3 zone, defenders guard…', o: ['areas of the court', 'the same player all game', 'only the ball handler'], a: 0, why: 'Zone defenses cover areas.' },
            { q: 'A good defender stays…', o: ['between the opponent and the basket', 'behind the opponent', 'at half-court'], a: 0, why: 'That blocks the path to the hoop.' }
          ] },
        { card: { t: 'Plays & rebounds', x: 'In a pick-and-roll, a teammate sets a screen (pick) on the ball handler’s defender, then rolls toward the basket for a pass. Rebounds are missed shots grabbed off the rim: an offensive rebound keeps your possession, a defensive rebound wins the ball back.', em: '🔁🏀' },
          qs: [
            { q: 'In a pick-and-roll, the screener then…', o: ['rolls toward the basket', 'shoots a three right away', 'leaves the court'], a: 0, why: 'They cut to the hoop for a pass.' },
            { q: 'Grabbing your own team’s missed shot is an…', o: ['Offensive rebound', 'Defensive rebound', 'Assist'], a: 0, why: 'It gives your team another chance to score.' },
            { q: 'A “screen” is also called a…', o: ['Pick', 'Travel', 'Dunk'], a: 0, why: 'Setting a pick blocks a defender’s path.' }
          ] }
      ] }
    ]
  };

  window.COURSES.football = {
    name: 'Football', kind: 'skill', icon: '⚽', iconBg: '#1E9E5A', voice: [], units: [
      { title: 'The Basics', desc: 'Players, time and scoring', topics: [
        { card: { t: 'The team', x: 'Each team has 11 players on the field, including one goalkeeper. The goalkeeper is the only player allowed to handle the ball — and only inside their own penalty area.', em: '⚽🧤' },
          qs: [
            { q: 'How many players per team are on the field?', o: ['11', '9', '7', '12'], a: 0, why: 'Ten outfield players plus a goalkeeper.' },
            { q: 'Where may the goalkeeper use their hands?', o: ['Only in their own penalty area', 'Anywhere on the field', 'Nowhere'], a: 0, why: 'Outside the box the keeper plays like everyone else.' },
            { q: 'Can the goalkeeper pick up the ball outside their penalty area?', o: ['No', 'Yes'], a: 0, keep: true, why: 'Outside the penalty area, handling by the goalkeeper is a foul.' }
          ] },
        { card: { t: 'Match length', x: 'A match is two halves of 45 minutes with a 15-minute half-time break. The referee adds stoppage time for injuries and delays. In knockout games a tie may go to extra time (two halves of 15 minutes) and then a penalty shootout (5 kicks each, then sudden death).', em: '⏱️ 45 + 45' },
          qs: [
            { q: 'How long is each half?', o: ['45 minutes', '40 minutes', '30 minutes'], a: 0, why: 'Two halves of 45 minutes = 90.' },
            { q: 'Extra time is two halves of…', o: ['15 minutes', '10 minutes', '45 minutes'], a: 0, why: '30 minutes of extra time in total.' },
            { q: 'In a penalty shootout each team first takes…', o: ['5 kicks', '3 kicks', '11 kicks'], a: 0, why: 'If still level, it goes to sudden death.' }
          ] },
        { card: { t: 'Scoring a goal', x: 'A goal is scored only when the WHOLE ball crosses the goal line between the posts and under the crossbar. Even if most of the ball is over the line, it doesn’t count until the whole ball is over.', em: '🥅⚽' },
          qs: [
            { q: 'When is a goal scored?', o: ['When the whole ball crosses the goal line', 'When half the ball crosses', 'When the ball touches the net'], a: 0, why: 'The entire ball must be over the line.' },
            { q: 'A goal is worth…', o: ['1 point', '2 points', '3 points'], a: 0, why: 'Every goal counts as one.' },
            { q: 'The ball must go under the…', o: ['crossbar', 'corner flag', 'halfway line'], a: 0, why: 'Between the posts and under the crossbar.' }
          ] },
        { card: { t: 'Restarts', x: 'When the ball goes over a sideline, the other team takes a throw-in: both hands, from behind the head, with both feet on the ground. Over the goal line, last touched by a defender → corner kick. Last touched by an attacker → goal kick.', em: '🙌 ⛳ 🦵' },
          qs: [
            { q: 'A defender kicks the ball over their own goal line. The attackers get a…', o: ['Corner kick', 'Goal kick', 'Throw-in'], a: 0, why: 'Last touch by the defending team → corner.' },
            { q: 'For a throw-in, the ball must be thrown…', o: ['with both hands from behind the head', 'with one hand', 'by kicking it'], a: 0, why: 'Both feet must also stay on the ground.' },
            { q: 'An attacker shoots wide over the goal line. The restart is a…', o: ['Goal kick', 'Corner kick', 'Penalty'], a: 0, why: 'Last touch by the attacking team → goal kick.' }
          ] }
      ] },
      { title: 'Rules & Fouls', desc: 'Offside, cards and free kicks', topics: [
        { card: { t: 'Offside', x: 'A player is offside if, when a teammate plays the ball to them, they are in the opponents’ half and nearer to the goal line than both the ball and the second-last defender (usually the last outfield defender). You can’t be offside in your own half, or directly from a throw-in, goal kick or corner kick.', em: '🚩' },
          qs: [
            { q: 'Can you be offside in your own half?', o: ['No', 'Yes'], a: 0, keep: true, why: 'Offside only applies in the opponents’ half.' },
            { q: 'Can you be offside directly from a throw-in?', o: ['No', 'Yes'], a: 0, keep: true, why: 'Throw-ins, goal kicks and corners are exceptions.' },
            { q: 'Offside is judged at the moment…', o: ['the teammate plays the ball', 'the player receives the ball', 'the goal is scored'], a: 0, why: 'Position is judged when the pass is made.' }
          ] },
        { card: { t: 'Cards', x: 'A yellow card is a caution for unsporting behavior or a reckless foul. Two yellow cards in one match make a red card. A red card means the player is sent off and the team must continue with one fewer player.', em: '🟨🟥' },
          qs: [
            { q: 'Two yellow cards in the same match equal a…', o: ['Red card', 'Penalty', 'Free kick only'], a: 0, why: 'The player is sent off.' },
            { q: 'After a red card, the team plays with…', o: ['one fewer player', 'a substitute', 'the same number'], a: 0, why: 'The sent-off player can’t be replaced.' },
            { q: 'A yellow card is a…', o: ['caution', 'sending-off', 'goal'], a: 0, why: 'It’s a warning.' }
          ] },
        { card: { t: 'Free kicks & penalties', x: 'A direct free kick can be scored straight into the goal. An indirect free kick must touch another player before a goal can count. If a defender commits a direct-free-kick foul inside their own penalty area, the attackers get a penalty kick from the penalty mark, 11 meters (12 yards) from goal.', em: '🎯🥅' },
          qs: [
            { q: 'How far is the penalty mark from the goal?', o: ['11 meters (12 yards)', '16 meters', '20 meters'], a: 0, why: 'The penalty spot is 11 m / 12 yd out.' },
            { q: 'An indirect free kick goes straight into the goal without touching anyone. Does it count?', o: ['No', 'Yes'], a: 0, keep: true, why: 'It must touch another player first.' },
            { q: 'A defender trips an attacker inside their own penalty area. The result is a…', o: ['Penalty kick', 'Corner kick', 'Throw-in'], a: 0, why: 'Direct-free-kick fouls in the box give a penalty.' }
          ] },
        { card: { t: 'Handball & VAR', x: 'Deliberately handling the ball is a foul for outfield players. A goal scored directly with the hand or arm never counts, even by accident. VAR (Video Assistant Referee) helps the referee review goals, penalties, red cards and mistaken identity.', em: '✋📺' },
          qs: [
            { q: 'What does VAR stand for?', o: ['Video Assistant Referee', 'Very Accurate Referee', 'Video Action Replay'], a: 0, why: 'It helps the on-field referee with key decisions.' },
            { q: 'Can a goal scored with the hand count if it was accidental?', o: ['No', 'Yes'], a: 0, keep: true, why: 'A goal scored directly with the hand/arm never counts.' },
            { q: 'Which decision can VAR review?', o: ['Penalties', 'Throw-ins', 'Substitutions'], a: 0, why: 'Goals, penalties, direct red cards and mistaken identity.' }
          ] }
      ] },
      { title: 'Skills & Tournaments', desc: 'Play smart and know the game', topics: [
        { card: { t: 'Passing & shooting', x: 'For short, accurate passes use the inside of your foot. For powerful shots strike the ball with your laces (instep), keeping your knee over the ball to keep the shot low.', em: '🦶⚽' },
          qs: [
            { q: 'For an accurate short pass, use the…', o: ['inside of the foot', 'toe', 'heel'], a: 0, why: 'The flat inside surface gives control.' },
            { q: 'For a powerful shot, strike with the…', o: ['laces (instep)', 'inside of the foot', 'sole'], a: 0, why: 'The instep gives the most power.' },
            { q: 'To keep a shot low, keep your knee…', o: ['over the ball', 'behind the ball', 'straight'], a: 0, why: 'Leaning back sends the ball high.' }
          ] },
        { card: { t: 'Positions & formations', x: 'Teams have a goalkeeper, defenders, midfielders and forwards. Formations list outfield players from back to front, not counting the goalkeeper: 4-4-2 means 4 defenders, 4 midfielders and 2 forwards; 4-3-3 has 3 forwards.', em: '🧤🛡️⚙️⚡' },
          qs: [
            { q: 'In a 4-3-3, how many forwards are there?', o: ['3', '4', '2'], a: 0, why: 'Defenders-midfielders-forwards.' },
            { q: 'Formation numbers do NOT include the…', o: ['goalkeeper', 'captain', 'defenders'], a: 0, why: 'The numbers always add up to 10.' },
            { q: 'In a 4-4-2, how many defenders are there?', o: ['4', '2', '3'], a: 0, why: 'The first number is the defenders.' }
          ] },
        { card: { t: 'The World Cup', x: 'The FIFA World Cup is held every 4 years. The first one was in 1930 in Uruguay, which also won it. Brazil has won the most titles: 5.', em: '🏆🌍' },
          qs: [
            { q: 'How often is the FIFA World Cup held?', o: ['Every 4 years', 'Every 2 years', 'Every year'], a: 0, why: 'It’s a four-year cycle.' },
            { q: 'Which country has won the most World Cups?', o: ['Brazil', 'Germany', 'Argentina', 'Italy'], a: 0, why: 'Brazil has 5 titles.' },
            { q: 'Where was the first World Cup held?', o: ['Uruguay', 'England', 'Brazil'], a: 0, why: 'Uruguay hosted and won in 1930.' }
          ] },
        { card: { t: 'Football words', x: 'A hat-trick is three goals by one player in a single match. A clean sheet means a team (or goalkeeper) conceded no goals. An assist is the pass that sets up a goal. An own goal is scored into your own net.', em: '🎩⚽⚽⚽' },
          qs: [
            { q: 'A hat-trick is…', o: ['3 goals by one player in one match', '3 wins in a row', '3 yellow cards'], a: 0, why: 'One player, three goals, one game.' },
            { q: 'A goalkeeper who concedes no goals keeps a…', o: ['clean sheet', 'hat-trick', 'red card'], a: 0, why: 'Zero goals against.' },
            { q: 'The pass that sets up a goal is an…', o: ['assist', 'offside', 'own goal'], a: 0, why: 'Assists are tracked like goals.' }
          ] }
      ] }
    ]
  };

  window.COURSES.volleyball = {
    name: 'Volleyball', kind: 'skill', icon: '🏐', iconBg: '#2F80ED', voice: [], units: [
      { title: 'The Basics', desc: 'Touches, points and sets', topics: [
        { card: { t: 'The team', x: 'In indoor volleyball each team has 6 players on the court. The aim is to send the ball over the net so it lands on the other side, or the opponents can’t return it.', em: '🏐👟👟👟👟👟👟' },
          qs: [
            { q: 'How many players per team are on an indoor court?', o: ['6', '5', '4', '11'], a: 0, why: 'Indoor volleyball is 6 against 6.' },
            { q: 'You win a rally when the ball…', o: ['lands on the opponents’ court', 'touches the net', 'goes out after your touch'], a: 0, why: 'Make it land in, or force an error.' },
            { q: 'Beach volleyball teams have how many players?', o: ['2', '6', '4'], a: 0, why: 'Beach volleyball is played in pairs.' }
          ] },
        { card: { t: 'Three touches', x: 'A team may touch the ball at most 3 times before sending it over the net (a block doesn’t count as one of the three). The same player can’t touch the ball twice in a row — except after a block.', em: '1️⃣2️⃣3️⃣' },
          qs: [
            { q: 'How many touches can a team use before the ball must go over?', o: ['3', '2', '4'], a: 0, why: 'Usually pass, set, attack.' },
            { q: 'Can one player touch the ball twice in a row?', o: ['No (except after a block)', 'Yes, always', 'Only the setter'], a: 0, why: 'Two consecutive touches is a double contact.' },
            { q: 'Does a block count as one of the three touches?', o: ['No', 'Yes'], a: 0, keep: true, why: 'After a block the team still has 3 touches.' }
          ] },
        { card: { t: 'Points & sets', x: 'Volleyball uses rally scoring: every rally wins a point, no matter who served. A set is won by the first team to 25 points with a 2-point lead. Indoor matches are best of 5 sets, and a deciding 5th set is played to 15.', em: '25 · 15' },
          qs: [
            { q: 'A normal indoor set is played to…', o: ['25 points', '21 points', '15 points'], a: 0, why: 'You must also lead by 2.' },
            { q: 'The deciding 5th set is played to…', o: ['15 points', '25 points', '11 points'], a: 0, why: 'It’s shorter than the other sets.' },
            { q: 'If the score is 25–24, is the set over?', o: ['No — you must win by 2', 'Yes'], a: 0, keep: true, why: 'Play continues until a 2-point lead.' }
          ] },
        { card: { t: 'Serving & rotation', x: 'Every rally starts with a serve from behind the end line. When your team wins the right to serve back from the other team (a “side-out”), your players rotate one position clockwise and the next player serves.', em: '🔄' },
          qs: [
            { q: 'Where do you serve from?', o: ['Behind the end line', 'Next to the net', 'The middle of the court'], a: 0, why: 'Stepping on or over the line while serving is a fault.' },
            { q: 'Teams rotate in which direction?', o: ['Clockwise', 'Counterclockwise', 'They don’t rotate'], a: 0, why: 'Everyone moves one position clockwise.' },
            { q: 'Winning the serve back from the other team is called a…', o: ['side-out', 'spike', 'let'], a: 0, why: 'Then your team rotates and serves.' }
          ] }
      ] },
      { title: 'Rules & Positions', desc: 'Faults and who does what', topics: [
        { card: { t: 'The libero', x: 'The libero is a defensive specialist who wears a different-colored shirt. Under international (FIVB) rules the libero cannot serve, block, or attack the ball from above the height of the net, and can substitute freely for back-row players.', em: '🟡👕' },
          qs: [
            { q: 'Why does the libero wear a different color?', o: ['To show they’re the defensive specialist with special rules', 'Because they’re the captain', 'For fashion'], a: 0, why: 'Officials need to spot the libero easily.' },
            { q: 'Under FIVB rules, can the libero block?', o: ['No', 'Yes'], a: 0, keep: true, why: 'Liberos play in the back row only.' },
            { q: 'The libero mainly specializes in…', o: ['defense and passing', 'spiking', 'serving aces'], a: 0, why: 'Receiving serves and digging attacks.' }
          ] },
        { card: { t: 'Net faults', x: 'Touching the net while playing the ball is a fault. Crossing completely under the net into the opponent’s court is a fault (you may touch the center line with part of your foot). Reaching over the net to touch the ball before the opponents have attacked it is also a fault.', em: '🚫🕸️' },
          qs: [
            { q: 'Touching the net during play is…', o: ['a fault', 'allowed', 'a point for you'], a: 0, why: 'The other team wins the rally.' },
            { q: 'Your whole foot crosses the center line into the other court. That’s…', o: ['a fault', 'allowed'], a: 0, keep: true, why: 'Part of the foot on the line is OK; fully across is a fault.' },
            { q: 'Can you reach over the net to play the ball before the opponents attack it?', o: ['No', 'Yes'], a: 0, keep: true, why: 'That’s reaching beyond the net — a fault.' }
          ] },
        { card: { t: 'Positions', x: 'The setter takes the second touch and sets up attacks. Outside hitters attack from the left side and also pass serves. Middle blockers block and hit quick sets in the middle. The opposite hitter attacks from the right. The libero leads the defense.', em: '🙌⚡🧱' },
          qs: [
            { q: 'Which player usually takes the second touch?', o: ['Setter', 'Libero', 'Middle blocker'], a: 0, why: 'The setter sets up the attack.' },
            { q: 'Middle blockers are especially important at…', o: ['blocking at the net', 'serving', 'back-row defense'], a: 0, why: 'They move along the net to block.' },
            { q: 'Outside hitters attack from the…', o: ['left side', 'back row only', 'service line'], a: 0, why: 'Position 4 on the left front.' }
          ] },
        { card: { t: 'Clean contact', x: 'The ball must be hit cleanly. Catching, holding or throwing the ball is a fault called a lift (or carry). You may play the ball with any part of the body — even a foot.', em: '✋🏐' },
          qs: [
            { q: 'Catching and throwing the ball is called a…', o: ['lift / carry', 'spike', 'dig'], a: 0, why: 'The ball must rebound cleanly.' },
            { q: 'Is it legal to play the ball with your foot?', o: ['Yes', 'No'], a: 0, keep: true, why: 'Any part of the body may touch the ball.' },
            { q: 'A lift is a…', o: ['fault', 'type of serve', 'point'], a: 0, why: 'The other team wins the rally.' }
          ] }
      ] },
      { title: 'Skills', desc: 'Pass, set, spike and block', topics: [
        { card: { t: 'The bump', x: 'The forearm pass, or bump, is used to receive serves and hard hits. Join your hands, keep your arms straight, bend your knees and let the ball bounce off your forearms toward the setter. A dig is a bump that saves a hard attack.', em: '🙏🏐' },
          qs: [
            { q: 'Which skill is mainly used to receive a serve?', o: ['Bump (forearm pass)', 'Spike', 'Block'], a: 0, why: 'Forearms give a stable platform.' },
            { q: 'Saving a hard attack close to the floor is called a…', o: ['dig', 'set', 'ace'], a: 0, why: 'It’s a defensive bump.' },
            { q: 'For a good bump your arms should be…', o: ['straight and together', 'bent at the elbows', 'over your head'], a: 0, why: 'A flat platform directs the ball.' }
          ] },
        { card: { t: 'The set', x: 'The set is an overhead pass using the fingertips of both hands, shaped like a triangle above your forehead. It places the ball high and close to the net for a teammate to attack.', em: '🙌' },
          qs: [
            { q: 'A set is played with the…', o: ['fingertips of both hands', 'forearms', 'fists'], a: 0, why: 'Soft fingertips control the ball.' },
            { q: 'Where should your hands be for a set?', o: ['Above your forehead', 'At your waist', 'Behind your back'], a: 0, why: 'Form a triangle above your forehead.' },
            { q: 'The purpose of a set is to…', o: ['set up a teammate’s attack', 'score directly', 'block the opponent'], a: 0, why: 'It’s usually the second touch.' }
          ] },
        { card: { t: 'Spike and block', x: 'The spike (attack) is a powerful jump hit sending the ball down into the opponents’ court. The block is a jump at the net with arms raised to stop or slow the opponent’s spike. A serve that scores directly is called an ace.', em: '⚡🧱' },
          qs: [
            { q: 'A powerful jumping hit down into the other court is a…', o: ['spike', 'bump', 'set'], a: 0, why: 'Also called an attack or kill.' },
            { q: 'A serve that wins the point directly is an…', o: ['ace', 'assist', 'own goal'], a: 0, why: 'The receivers couldn’t return it.' },
            { q: 'Jumping at the net to stop an attack is a…', o: ['block', 'dig', 'side-out'], a: 0, why: 'Front-row players block.' }
          ] },
        { card: { t: 'Beach volleyball', x: 'Beach volleyball is played by 2 players per team on sand. Matches are best of 3 sets: the first two to 21 points and a deciding third set to 15, always winning by 2.', em: '🏖️🏐' },
          qs: [
            { q: 'Beach volleyball sets (except the third) are played to…', o: ['21 points', '25 points', '15 points'], a: 0, why: 'The deciding third set goes to 15.' },
            { q: 'A beach volleyball match is best of…', o: ['3 sets', '5 sets', '1 set'], a: 0, why: 'First to win 2 sets.' },
            { q: 'Beach teams have how many players?', o: ['2', '4', '6'], a: 0, why: 'Just two players cover the whole court.' }
          ] }
      ] }
    ]
  };
})();
