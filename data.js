// Course content. words: [target, english, emoji, romaji?]
// sentences: { t: target, e: english, tok?: tiles (defaults to words of t), r?: romaji aligned with tok }
window.COURSES = {
  es: {
    name: 'Spanish', flag: 'es', voice: ['es'],
    units: [
      { title: 'Basics', desc: 'Food, drinks & people',
        words: [['el agua','water','💧'],['el pan','bread','🍞'],['la leche','milk','🥛'],['la manzana','apple','🍎'],
                ['el niño','boy','👦'],['la niña','girl','👧'],['el hombre','man','👨'],['la mujer','woman','👩']],
        sentences: [
          { t: 'Yo bebo agua.', e: 'I drink water' },
          { t: 'El niño come pan.', e: 'The boy eats bread' },
          { t: 'La mujer bebe leche.', e: 'The woman drinks milk' },
          { t: 'Yo como una manzana.', e: 'I eat an apple' },
          { t: 'La niña bebe agua.', e: 'The girl drinks water' },
          { t: 'El hombre come pan.', e: 'The man eats bread' } ] },
      { title: 'Greetings', desc: 'Say hello & be polite',
        words: [['hola','hello','👋'],['adiós','goodbye','🚪'],['buenos días','good morning','🌅'],['buenas noches','good night','🌙'],
                ['gracias','thank you','🙏'],['por favor','please','🤲'],['sí','yes','✅'],['no','no','❌']],
        sentences: [
          { t: '¿Cómo estás?', e: 'How are you' },
          { t: 'Muy bien, gracias.', e: 'Very well thank you' },
          { t: 'Me llamo Ana.', e: 'My name is Ana' },
          { t: 'Buenas noches, adiós.', e: 'Good night goodbye' },
          { t: 'Sí, por favor.', e: 'Yes please' },
          { t: 'Hola, me llamo Luis.', e: 'Hello my name is Luis' } ] },
      { title: 'Family & Home', desc: 'People and pets at home',
        words: [['la madre','mother','👩‍👧'],['el padre','father','👨‍👦'],['el hermano','brother','🧒'],['la hermana','sister','👧'],
                ['la casa','house','🏠'],['el perro','dog','🐕'],['el gato','cat','🐈'],['la familia','family','👨‍👩‍👧']],
        sentences: [
          { t: 'Mi madre tiene un gato.', e: 'My mother has a cat' },
          { t: 'El perro está en la casa.', e: 'The dog is in the house' },
          { t: 'Mi hermano come pan.', e: 'My brother eats bread' },
          { t: 'Tengo un perro.', e: 'I have a dog' },
          { t: 'Mi padre bebe agua.', e: 'My father drinks water' },
          { t: 'La familia está en casa.', e: 'The family is at home' } ] }
    ]
  },
  fr: {
    name: 'French', flag: 'fr', voice: ['fr'],
    units: [
      { title: 'Basics', desc: 'Food, drinks & people',
        words: [["l'eau",'water','💧'],['le pain','bread','🍞'],['le lait','milk','🥛'],['la pomme','apple','🍎'],
                ['le garçon','boy','👦'],['la fille','girl','👧'],["l'homme",'man','👨'],['la femme','woman','👩']],
        sentences: [
          { t: "Je bois de l'eau.", e: 'I drink water' },
          { t: 'Le garçon mange du pain.', e: 'The boy eats bread' },
          { t: 'La femme boit du lait.', e: 'The woman drinks milk' },
          { t: 'Je mange une pomme.', e: 'I eat an apple' },
          { t: "La fille boit de l'eau.", e: 'The girl drinks water' },
          { t: "L'homme mange du pain.", e: 'The man eats bread' } ] },
      { title: 'Greetings', desc: 'Say hello & be polite',
        words: [['bonjour','hello','👋'],['au revoir','goodbye','🚪'],['bonsoir','good evening','🌆'],['bonne nuit','good night','🌙'],
                ['merci','thank you','🙏'],["s'il vous plaît",'please','🤲'],['oui','yes','✅'],['non','no','❌']],
        sentences: [
          { t: 'Comment ça va ?', e: 'How are you' },
          { t: 'Très bien, merci.', e: 'Very well thank you' },
          { t: "Je m'appelle Marie.", e: 'My name is Marie' },
          { t: 'Bonne nuit, au revoir.', e: 'Good night goodbye' },
          { t: "Oui, s'il vous plaît.", e: 'Yes please' },
          { t: "Bonjour, je m'appelle Paul.", e: 'Hello my name is Paul' } ] },
      { title: 'Family & Home', desc: 'People and pets at home',
        words: [['la mère','mother','👩‍👧'],['le père','father','👨‍👦'],['le frère','brother','🧒'],['la sœur','sister','👧'],
                ['la maison','house','🏠'],['le chien','dog','🐕'],['le chat','cat','🐈'],['la famille','family','👨‍👩‍👧']],
        sentences: [
          { t: 'Ma mère a un chat.', e: 'My mother has a cat' },
          { t: 'Le chien est dans la maison.', e: 'The dog is in the house' },
          { t: 'Mon frère mange du pain.', e: 'My brother eats bread' },
          { t: "J'ai un chien.", e: 'I have a dog' },
          { t: "Mon père boit de l'eau.", e: 'My father drinks water' },
          { t: 'La famille est à la maison.', e: 'The family is at home' } ] }
    ]
  },
  ja: {
    name: 'Japanese', flag: 'ja', voice: ['ja'], romaji: true,
    units: [
      { title: 'Basics', desc: 'Food & drinks',
        words: [['みず','water','💧','mizu'],['パン','bread','🍞','pan'],['ぎゅうにゅう','milk','🥛','gyuunyuu'],['りんご','apple','🍎','ringo'],
                ['おちゃ','tea','🍵','ocha'],['ごはん','rice','🍚','gohan'],['おとこのこ','boy','👦','otoko no ko'],['おんなのこ','girl','👧','onna no ko']],
        sentences: [
          { t: 'みずをのみます', tok: ['みず','を','のみます'], r: 'mizu o nomimasu', e: 'I drink water' },
          { t: 'パンをたべます', tok: ['パン','を','たべます'], r: 'pan o tabemasu', e: 'I eat bread' },
          { t: 'おちゃをのみます', tok: ['おちゃ','を','のみます'], r: 'ocha o nomimasu', e: 'I drink tea' },
          { t: 'りんごをたべます', tok: ['りんご','を','たべます'], r: 'ringo o tabemasu', e: 'I eat an apple' },
          { t: 'ごはんをたべます', tok: ['ごはん','を','たべます'], r: 'gohan o tabemasu', e: 'I eat rice' },
          { t: 'ぎゅうにゅうをのみます', tok: ['ぎゅうにゅう','を','のみます'], r: 'gyuunyuu o nomimasu', e: 'I drink milk' } ] },
      { title: 'Greetings', desc: 'Say hello & be polite',
        words: [['こんにちは','hello','👋','konnichiwa'],['おはよう','good morning','🌅','ohayou'],['こんばんは','good evening','🌆','konbanwa'],['おやすみ','good night','🌙','oyasumi'],
                ['ありがとう','thank you','🙏','arigatou'],['さようなら','goodbye','🚪','sayounara'],['はい','yes','✅','hai'],['いいえ','no','❌','iie']],
        sentences: [
          { t: 'はい、ありがとう', tok: ['はい','ありがとう'], r: 'hai arigatou', e: 'Yes thank you' },
          { t: 'おはようございます', tok: ['おはよう','ございます'], r: 'ohayou gozaimasu', e: 'Good morning' },
          { t: 'ありがとうございます', tok: ['ありがとう','ございます'], r: 'arigatou gozaimasu', e: 'Thank you very much' },
          { t: 'わたしはアナです', tok: ['わたし','は','アナ','です'], r: 'watashi wa Ana desu', e: 'I am Ana' },
          { t: 'こんにちは、ケンです', tok: ['こんにちは','ケン','です'], r: 'konnichiwa Ken desu', e: 'Hello I am Ken' },
          { t: 'おやすみなさい', tok: ['おやすみ','なさい'], r: 'oyasumi nasai', e: 'Good night' } ] },
      { title: 'Family & Home', desc: 'People and pets at home',
        words: [['はは','mother','👩‍👧','haha'],['ちち','father','👨‍👦','chichi'],['あに','older brother','🧒','ani'],['あね','older sister','👧','ane'],
                ['いえ','house','🏠','ie'],['いぬ','dog','🐕','inu'],['ねこ','cat','🐈','neko'],['かぞく','family','👨‍👩‍👧','kazoku']],
        sentences: [
          { t: 'いぬがいます', tok: ['いぬ','が','います'], r: 'inu ga imasu', e: 'There is a dog' },
          { t: 'ねこがすきです', tok: ['ねこ','が','すき','です'], r: 'neko ga suki desu', e: 'I like cats' },
          { t: 'はははおちゃをのみます', tok: ['はは','は','おちゃ','を','のみます'], r: 'haha wa ocha o nomimasu', e: 'My mother drinks tea' },
          { t: 'ちちはパンをたべます', tok: ['ちち','は','パン','を','たべます'], r: 'chichi wa pan o tabemasu', e: 'My father eats bread' },
          { t: 'いえにねこがいます', tok: ['いえ','に','ねこ','が','います'], r: 'ie ni neko ga imasu', e: 'There is a cat in the house' },
          { t: 'かぞくがすきです', tok: ['かぞく','が','すき','です'], r: 'kazoku ga suki desu', e: 'I like my family' } ] }
    ]
  },
  ceb: {
    name: 'Cebuano', flag: 'ph', voice: ['ceb', 'fil', 'tl'],
    units: [
      { title: 'Basics', desc: 'Food, drinks & people',
        words: [['tubig','water','💧'],['pan','bread','🍞'],['gatas','milk','🥛'],['mansanas','apple','🍎'],
                ['kan-on','rice','🍚'],['bata','child','🧒'],['lalaki','man','👨'],['babaye','woman','👩']],
        sentences: [
          { t: 'Moinom ko og tubig.', e: 'I drink water' },
          { t: 'Mokaon ko og kan-on.', e: 'I eat rice' },
          { t: 'Mokaon ang bata og pan.', e: 'The child eats bread' },
          { t: 'Moinom ang babaye og gatas.', e: 'The woman drinks milk' },
          { t: 'Mokaon ang lalaki og mansanas.', e: 'The man eats an apple' },
          { t: 'Moinom ang bata og tubig.', e: 'The child drinks water' } ] },
      { title: 'Greetings', desc: 'Say hello & be polite',
        words: [['kumusta','hello','👋'],['maayong buntag','good morning','🌅'],['maayong gabii','good evening','🌙'],['amping','take care','🚪'],
                ['salamat','thank you','🙏'],['palihug','please','🤲'],['oo','yes','✅'],['dili','no','❌']],
        sentences: [
          { t: 'Kumusta ka?', e: 'How are you' },
          { t: 'Maayo man, salamat.', e: 'I am fine thank you' },
          { t: 'Unsa imong ngalan?', e: 'What is your name' },
          { t: 'Ako si Ana.', e: 'I am Ana' },
          { t: 'Oo, palihug.', e: 'Yes please' },
          { t: 'Maayong buntag, Ana.', e: 'Good morning Ana' } ] },
      { title: 'Family & Home', desc: 'People and pets at home',
        words: [['inahan','mother','👩‍👧'],['amahan','father','👨‍👦'],['igsoon','sibling','🧒'],['pamilya','family','👨‍👩‍👧'],
                ['balay','house','🏠'],['iro','dog','🐕'],['iring','cat','🐈'],['isda','fish','🐟']],
        sentences: [
          { t: 'Naa koy iro.', e: 'I have a dog' },
          { t: 'Ang iring naa sa balay.', e: 'The cat is in the house' },
          { t: 'Mokaon ang iring og isda.', e: 'The cat eats fish' },
          { t: 'Moinom ang akong amahan og tubig.', e: 'My father drinks water' },
          { t: 'Nindot ang balay.', e: 'The house is beautiful' },
          { t: 'Gihigugma nako akong pamilya.', e: 'I love my family' } ] }
    ]
  }
};
