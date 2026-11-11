// Six more courses built on one shared English template (10 units each).
// Word entry: 't' or [t, romanization] or [t, romanization, englishOverride, emojiOverride]
// Sentence entry: 't' (tiles = words split on spaces) or { t, r } (r aligned to the space-split words)
// or { tok, r } for languages written without spaces; any entry may carry e to override the English.
(function () {
  const T = [
    ['Basics', 'Food, drinks & people', [['water','💧'],['bread','🍞'],['milk','🥛'],['apple','🍎'],['boy','👦'],['girl','👧'],['man','👨'],['woman','👩']],
      ['I drink water','The boy eats bread','The woman drinks milk','I eat an apple','The girl drinks water','The man eats bread']],
    ['Greetings', 'Say hello & be polite', [['hello','👋'],['goodbye','🚪'],['good morning','🌅'],['good night','🌙'],['thank you','🙏'],['please','🤲'],['yes','✅'],['no','❌']],
      ['How are you','Very well thank you','My name is Ana','Good night goodbye','Yes please','Hello my name is Luis']],
    ['Family & Home', 'People and pets at home', [['mother','👩‍👧'],['father','👨‍👦'],['brother','🧒'],['sister','👧'],['house','🏠'],['dog','🐕'],['cat','🐈'],['family','👨‍👩‍👧']],
      ['My mother has a cat','The dog is in the house','My brother eats bread','I have a dog','My father drinks water','The family is at home']],
    ['Numbers', 'Count from one to eight', [['one','1️⃣'],['two','2️⃣'],['three','3️⃣'],['four','4️⃣'],['five','5️⃣'],['six','6️⃣'],['seven','7️⃣'],['eight','8️⃣']],
      ['I have two dogs','There are three apples','My sister has five cats','One two three','I am eight years old','The family has four houses']],
    ['Colors', 'Describe the world in color', [['red','🔴'],['blue','🔵'],['green','🟢'],['yellow','🟡'],['black','⚫'],['white','⚪'],['orange','🟠'],['purple','🟣']],
      ['The cat is black','The apple is red','I like blue','The dog is white','The house is yellow','My favorite color is green']],
    ['Animals', 'On the farm and in the forest', [['bird','🐦'],['horse','🐴'],['cow','🐄'],['chicken','🐔'],['pig','🐖'],['mouse','🐭'],['monkey','🐒'],['butterfly','🦋']],
      ['The horse is big','The cow drinks water','The monkey eats bananas','The bird is blue','I have a pig','The butterfly is yellow']],
    ['At the Market', 'Shop for food and pay', [['egg','🥚'],['banana','🍌'],['coffee','☕'],['salt','🧂'],['meat','🥩'],['vegetables','🥬'],['money','💵'],['market','🏪']],
      ['How much is it','I want two eggs','The coffee is hot','I buy meat at the market','I have no money','I like vegetables']],
    ['Days & Time', 'Today, tomorrow and what time it is', [['today','📅'],['tomorrow','⏭️'],['yesterday','⏮️'],['week','🗓️'],['hour','⏰'],['now','⏱️'],['day','🌞'],['night','🌃']],
      ['Today is Monday','Tomorrow I eat with my family','Yesterday I drank coffee','What time is it','Not now','Good night see you tomorrow']],
    ['Around Town', 'Places and getting around', [['school','🏫'],['hospital','🏥'],['church','⛪'],['street','🛣️'],['car','🚗'],['bus','🚌'],['bank','🏦'],['beach','🏖️']],
      ['Where is the hospital','I go to school','The church is near','I take the bus','My car is red',"Let's go to the beach"]],
    ['Weather & Feelings', 'Rain, sun and how you feel', [['rain','🌧️'],['sun','☀️'],['wind','💨'],['snow','❄️'],['happy','😊'],['sad','😢'],['tired','😴'],['sick','🤒']],
      ['It is sunny today','It is raining','I am happy','I am very tired','My mother is sick','It is very windy']]
  ];
  function build(units) {
    return units.map(([words, sents], ui) => {
      const [title, desc, tw, ts] = T[ui];
      return {
        title, desc,
        words: words.map((w, i) => { w = Array.isArray(w) ? w : [w]; return [w[0], w[2] || tw[i][0], w[3] || tw[i][1], w[1] || '']; }),
        sentences: sents.map((s, i) => {
          if (typeof s === 'string') return { t: s, e: ts[i] };
          const o = { e: s.e || ts[i] };
          if (s.tok) { o.tok = s.tok; o.t = s.tok.join(''); } else o.t = s.t;
          if (s.r) o.r = s.r;
          return o;
        })
      };
    });
  }
  const Z = (tok, r, e) => ({ tok, r, e }); // no-space scripts (Chinese)
  const K = (t, r, e) => ({ t, r, e });     // Korean: spaced words + romanization

  const add = {
    tl: { name: 'Tagalog', flag: 'ph', voice: ['fil', 'tl'], units: build([
      [['tubig','tinapay','gatas','mansanas','batang lalaki','batang babae','lalaki','babae'],
       ['Umiinom ako ng tubig.','Kumakain ng tinapay ang batang lalaki.','Umiinom ng gatas ang babae.','Kumakain ako ng mansanas.','Umiinom ng tubig ang batang babae.','Kumakain ng tinapay ang lalaki.']],
      [['kumusta','paalam','magandang umaga','magandang gabi','salamat','pakiusap','oo','hindi'],
       ['Kumusta ka?','Mabuti, salamat.','Ana ang pangalan ko.','Magandang gabi, paalam.','Oo, pakiusap.','Kumusta, Luis ang pangalan ko.']],
      [['nanay','tatay','kapatid na lalaki','kapatid na babae','bahay','aso','pusa','pamilya'],
       ['May pusa ang nanay ko.','Nasa bahay ang aso.','Kumakain ng tinapay ang kapatid kong lalaki.','May aso ako.','Umiinom ng tubig ang tatay ko.','Nasa bahay ang pamilya.']],
      [['isa','dalawa','tatlo','apat','lima','anim','pito','walo'],
       ['May dalawang aso ako.','May tatlong mansanas.','May limang pusa ang kapatid kong babae.','Isa, dalawa, tatlo.','Walong taong gulang ako.','May apat na bahay ang pamilya.']],
      [['pula','asul','berde','dilaw','itim','puti','kahel','lila'],
       ['Itim ang pusa.','Pula ang mansanas.','Gusto ko ang asul.','Puti ang aso.','Dilaw ang bahay.','Berde ang paborito kong kulay.']],
      [['ibon','kabayo','baka','manok','baboy','daga','unggoy','paru-paro'],
       ['Malaki ang kabayo.','Umiinom ng tubig ang baka.','Kumakain ng saging ang unggoy.','Asul ang ibon.','May baboy ako.','Dilaw ang paru-paro.']],
      [['itlog','saging','kape','asin','karne','gulay','pera','palengke'],
       ['Magkano ito?','Gusto ko ng dalawang itlog.','Mainit ang kape.','Bumibili ako ng karne sa palengke.','Wala akong pera.','Gusto ko ng gulay.']],
      [['ngayong araw','bukas','kahapon','linggo','oras','ngayon',['umaga','','morning','🌄'],'gabi'],
       ['Lunes ngayon.','Bukas kakain ako kasama ang pamilya ko.','Uminom ako ng kape kahapon.','Anong oras na?','Hindi ngayon.','Magandang gabi, kita tayo bukas.']],
      [['paaralan','ospital','simbahan','kalye','kotse','bus','bangko','dalampasigan'],
       ['Nasaan ang ospital?','Pupunta ako sa paaralan.','Malapit ang simbahan.','Sumasakay ako ng bus.','Pula ang kotse ko.','Tara sa dalampasigan.']],
      [['ulan','araw','hangin','niyebe','masaya','malungkot','pagod','may sakit'],
       ['Maaraw ngayon.','Umuulan.','Masaya ako.','Pagod na pagod ako.','May sakit ang nanay ko.','Napakahangin.']]
    ]) },

    ko: { name: 'Korean', flag: 'ko', voice: ['ko'], romaji: true, romName: 'romanization', units: build([
      [[['물','mul'],['빵','ppang'],['우유','uyu'],['사과','sagwa'],['소년','sonyeon'],['소녀','sonyeo'],['남자','namja'],['여자','yeoja']],
       [K('저는 물을 마셔요.','jeoneun mureul masyeoyo'),K('소년이 빵을 먹어요.','sonyeoni ppangeul meogeoyo'),K('여자가 우유를 마셔요.','yeojaga uyureul masyeoyo'),
        K('저는 사과를 먹어요.','jeoneun sagwareul meogeoyo'),K('소녀가 물을 마셔요.','sonyeoga mureul masyeoyo'),K('남자가 빵을 먹어요.','namjaga ppangeul meogeoyo')]],
      [[['안녕하세요','annyeonghaseyo'],['안녕히 가세요','annyeonghi gaseyo'],['좋은 아침','joeun achim'],['잘 자요','jal jayo'],['감사합니다','gamsahamnida'],['주세요','juseyo'],['네','ne'],['아니요','aniyo']],
       [K('어떻게 지내세요?','eotteoke jinaeseyo'),K('아주 좋아요, 감사합니다.','aju joayo gamsahamnida'),K('제 이름은 아나예요.','je ireumeun anayeyo'),
        K('잘 자요, 안녕히 가세요.','jal jayo annyeonghi gaseyo'),K('네, 주세요.','ne juseyo'),K('안녕하세요, 저는 루이스예요.','annyeonghaseyo jeoneun ruiseuyeyo','Hello I am Luis')]],
      [[['엄마','eomma'],['아빠','appa'],['남동생','namdongsaeng','younger brother'],['여동생','yeodongsaeng','younger sister'],['집','jip'],['개','gae'],['고양이','goyangi'],['가족','gajok']],
       [K('엄마는 고양이가 있어요.','eommaneun goyangiga isseoyo'),K('개가 집에 있어요.','gaega jibe isseoyo'),K('남동생이 빵을 먹어요.','namdongsaengi ppangeul meogeoyo','My younger brother eats bread'),
        K('저는 개가 있어요.','jeoneun gaega isseoyo'),K('아빠가 물을 마셔요.','appaga mureul masyeoyo'),K('가족이 집에 있어요.','gajogi jibe isseoyo')]],
      [[['일','il'],['이','i'],['삼','sam'],['사','sa'],['오','o'],['육','yuk'],['칠','chil'],['팔','pal']],
       [K('개가 두 마리 있어요.','gaega du mari isseoyo','There are two dogs'),K('사과가 세 개 있어요.','sagwaga se gae isseoyo'),K('고양이가 다섯 마리 있어요.','goyangiga daseot mari isseoyo','There are five cats'),
        K('일, 이, 삼.','il i sam'),K('저는 여덟 살이에요.','jeoneun yeodeol sarieyo'),K('집이 네 채 있어요.','jibi ne chae isseoyo','There are four houses')]],
      [[['빨간색','ppalgansaek'],['파란색','paransaek'],['초록색','choroksaek'],['노란색','noransaek'],['검은색','geomeunsaek'],['흰색','huinsaek'],['주황색','juhwangsaek'],['보라색','borasaek']],
       [K('고양이는 검은색이에요.','goyangineun geomeunsaegieyo'),K('사과는 빨개요.','sagwaneun ppalgaeyo'),K('저는 파란색을 좋아해요.','jeoneun paransaegeul joahaeyo'),
        K('개는 하얘요.','gaeneun hayaeyo'),K('집은 노란색이에요.','jibeun noransaegieyo'),K('초록색을 제일 좋아해요.','choroksaegeul jeil joahaeyo','I like green the most')]],
      [[['새','sae'],['말','mal'],['소','so'],['닭','dak'],['돼지','dwaeji'],['쥐','jwi'],['원숭이','wonsungi'],['나비','nabi']],
       [K('말은 커요.','mareun keoyo'),K('소가 물을 마셔요.','soga mureul masyeoyo'),K('원숭이가 바나나를 먹어요.','wonsungiga bananareul meogeoyo'),
        K('새는 파래요.','saeneun paraeyo'),K('돼지가 있어요.','dwaejiga isseoyo','There is a pig'),K('나비는 노래요.','nabineun noraeyo')]],
      [[['달걀','dalgyal'],['바나나','banana'],['커피','keopi'],['소금','sogeum'],['고기','gogi'],['채소','chaeso'],['돈','don'],['시장','sijang']],
       [K('얼마예요?','eolmayeyo'),K('달걀 두 개 주세요.','dalgyal du gae juseyo','Two eggs please'),K('커피가 뜨거워요.','keopiga tteugeowoyo'),
        K('시장에서 고기를 사요.','sijangeseo gogireul sayo'),K('돈이 없어요.','doni eopseoyo'),K('채소를 좋아해요.','chaesoreul joahaeyo')]],
      [[['오늘','oneul'],['내일','naeil'],['어제','eoje'],['주','ju'],['시간','sigan','time'],['지금','jigeum'],['낮','nat','daytime'],['밤','bam']],
       [K('오늘은 월요일이에요.','oneureun woryoirieyo'),K('내일 가족이랑 먹어요.','naeil gajogirang meogeoyo'),K('어제 커피를 마셨어요.','eoje keopireul masyeosseoyo'),
        K('지금 몇 시예요?','jigeum myeot siyeyo','What time is it now'),K('지금은 안 돼요.','jigeumeun an dwaeyo'),K('잘 자요, 내일 봐요.','jal jayo naeil bwayo')]],
      [[['학교','hakgyo'],['병원','byeongwon'],['교회','gyohoe'],['길','gil'],['자동차','jadongcha'],['버스','beoseu'],['은행','eunhaeng'],['바다','bada','sea','🌊']],
       [K('병원이 어디예요?','byeongwoni eodiyeyo'),K('학교에 가요.','hakgyoe gayo'),K('교회가 가까워요.','gyohoega gakkawoyo'),
        K('버스를 타요.','beoseureul tayo','I ride the bus'),K('제 차는 빨개요.','je chaneun ppalgaeyo'),K('바다에 가요.','badae gayo',"Let's go to the sea")]],
      [[['비','bi'],['해','hae'],['바람','baram'],['눈','nun'],['행복해요','haengbokaeyo'],['슬퍼요','seulpeoyo'],['피곤해요','pigonhaeyo'],['아파요','apayo']],
       [K('오늘은 맑아요.','oneureun malgayo'),K('비가 와요.','biga wayo'),K('저는 행복해요.','jeoneun haengbokaeyo'),
        K('너무 피곤해요.','neomu pigonhaeyo'),K('엄마가 아파요.','eommaga apayo'),K('바람이 많이 불어요.','barami mani bureoyo')]]
    ]) },

    zh: { name: 'Chinese', flag: 'zh', voice: ['zh-cn', 'zh'], romaji: true, romName: 'pinyin', units: build([
      [[['水','shuǐ'],['面包','miànbāo'],['牛奶','niúnǎi'],['苹果','píngguǒ'],['男孩','nánhái'],['女孩','nǚhái'],['男人','nánrén'],['女人','nǚrén']],
       [Z(['我','喝','水'],'wǒ hē shuǐ'),Z(['男孩','吃','面包'],'nánhái chī miànbāo'),Z(['女人','喝','牛奶'],'nǚrén hē niúnǎi'),
        Z(['我','吃','苹果'],'wǒ chī píngguǒ'),Z(['女孩','喝','水'],'nǚhái hē shuǐ'),Z(['男人','吃','面包'],'nánrén chī miànbāo')]],
      [[['你好','nǐhǎo'],['再见','zàijiàn'],['早上好','zǎoshang hǎo'],['晚安',"wǎn'ān"],['谢谢','xièxie'],['请','qǐng'],['是','shì'],['不','bù']],
       [Z(['你','好','吗'],'nǐ hǎo ma'),Z(['很','好','谢谢'],'hěn hǎo xièxie'),Z(['我','叫','安娜'],'wǒ jiào Ānnà'),
        Z(['晚安','再见'],"wǎn'ān zàijiàn"),Z(['好','谢谢'],'hǎo xièxie','OK thank you'),Z(['你好','我','叫','路易斯'],'nǐhǎo wǒ jiào Lùyìsī')]],
      [[['妈妈','māma'],['爸爸','bàba'],['哥哥','gēge','older brother'],['姐姐','jiějie','older sister'],['家','jiā','home'],['狗','gǒu'],['猫','māo'],['家人','jiārén']],
       [Z(['我','妈妈','有','一只','猫'],'wǒ māma yǒu yìzhī māo'),Z(['狗','在','家里'],'gǒu zài jiālǐ'),Z(['我','哥哥','吃','面包'],'wǒ gēge chī miànbāo','My older brother eats bread'),
        Z(['我','有','一只','狗'],'wǒ yǒu yìzhī gǒu'),Z(['我','爸爸','喝','水'],'wǒ bàba hē shuǐ'),Z(['家人','在','家'],'jiārén zài jiā')]],
      [[['一','yī'],['二','èr'],['三','sān'],['四','sì'],['五','wǔ'],['六','liù'],['七','qī'],['八','bā']],
       [Z(['我','有','两只','狗'],'wǒ yǒu liǎngzhī gǒu'),Z(['有','三个','苹果'],'yǒu sānge píngguǒ'),Z(['我','姐姐','有','五只','猫'],'wǒ jiějie yǒu wǔzhī māo','My older sister has five cats'),
        Z(['一','二','三'],'yī èr sān'),Z(['我','八','岁'],'wǒ bā suì'),Z(['我们','有','四个','房子'],'wǒmen yǒu sìge fángzi','We have four houses')]],
      [[['红色','hóngsè'],['蓝色','lánsè'],['绿色','lǜsè'],['黄色','huángsè'],['黑色','hēisè'],['白色','báisè'],['橙色','chéngsè'],['紫色','zǐsè']],
       [Z(['猫','是','黑色','的'],'māo shì hēisè de'),Z(['苹果','是','红色','的'],'píngguǒ shì hóngsè de'),Z(['我','喜欢','蓝色'],'wǒ xǐhuan lánsè'),
        Z(['狗','是','白色','的'],'gǒu shì báisè de'),Z(['房子','是','黄色','的'],'fángzi shì huángsè de'),Z(['我','最','喜欢','绿色'],'wǒ zuì xǐhuan lǜsè','I like green the most')]],
      [[['鸟','niǎo'],['马','mǎ'],['牛','niú'],['鸡','jī'],['猪','zhū'],['老鼠','lǎoshǔ'],['猴子','hóuzi'],['蝴蝶','húdié']],
       [Z(['马','很','大'],'mǎ hěn dà'),Z(['牛','喝','水'],'niú hē shuǐ'),Z(['猴子','吃','香蕉'],'hóuzi chī xiāngjiāo'),
        Z(['鸟','是','蓝色','的'],'niǎo shì lánsè de'),Z(['我','有','一头','猪'],'wǒ yǒu yìtóu zhū'),Z(['蝴蝶','是','黄色','的'],'húdié shì huángsè de')]],
      [[['鸡蛋','jīdàn'],['香蕉','xiāngjiāo'],['咖啡','kāfēi'],['盐','yán'],['肉','ròu'],['蔬菜','shūcài'],['钱','qián'],['市场','shìchǎng']],
       [Z(['多少','钱'],'duōshao qián'),Z(['我','要','两个','鸡蛋'],'wǒ yào liǎngge jīdàn'),Z(['咖啡','很','烫'],'kāfēi hěn tàng'),
        Z(['我','在','市场','买','肉'],'wǒ zài shìchǎng mǎi ròu'),Z(['我','没有','钱'],'wǒ méiyǒu qián'),Z(['我','喜欢','蔬菜'],'wǒ xǐhuan shūcài')]],
      [[['今天','jīntiān'],['明天','míngtiān'],['昨天','zuótiān'],['星期','xīngqī'],['小时','xiǎoshí'],['现在','xiànzài'],['白天','báitiān','daytime'],['晚上','wǎnshang']],
       [Z(['今天','是','星期一'],'jīntiān shì xīngqīyī'),Z(['明天','我','和','家人','吃饭'],'míngtiān wǒ hé jiārén chīfàn'),Z(['昨天','我','喝了','咖啡'],'zuótiān wǒ hēle kāfēi'),
        Z(['现在','几点'],'xiànzài jǐdiǎn','What time is it now'),Z(['现在','不行'],'xiànzài bùxíng'),Z(['晚安','明天','见'],"wǎn'ān míngtiān jiàn")]],
      [[['学校','xuéxiào'],['医院','yīyuàn'],['教堂','jiàotáng'],['街','jiē'],['汽车','qìchē'],['公交车','gōngjiāochē'],['银行','yínháng'],['海滩','hǎitān']],
       [Z(['医院','在','哪里'],'yīyuàn zài nǎlǐ'),Z(['我','去','学校'],'wǒ qù xuéxiào'),Z(['教堂','很','近'],'jiàotáng hěn jìn'),
        Z(['我','坐','公交车'],'wǒ zuò gōngjiāochē'),Z(['我的','汽车','是','红色','的'],'wǒde qìchē shì hóngsè de'),Z(['我们','去','海滩','吧'],'wǒmen qù hǎitān ba')]],
      [[['雨','yǔ'],['太阳','tàiyáng'],['风','fēng'],['雪','xuě'],['开心','kāixīn'],['难过','nánguò'],['累','lèi'],['生病','shēngbìng']],
       [Z(['今天','是','晴天'],'jīntiān shì qíngtiān'),Z(['下雨','了'],'xiàyǔ le'),Z(['我','很','开心'],'wǒ hěn kāixīn'),
        Z(['我','很','累'],'wǒ hěn lèi','I am tired'),Z(['我','妈妈','生病','了'],'wǒ māma shēngbìng le'),Z(['风','很','大'],'fēng hěn dà','The wind is strong')]]
    ]) },

    de: { name: 'German', flag: 'de', voice: ['de'], units: build([
      [['das Wasser','das Brot','die Milch','der Apfel','der Junge','das Mädchen','der Mann','die Frau'],
       ['Ich trinke Wasser.','Der Junge isst Brot.','Die Frau trinkt Milch.','Ich esse einen Apfel.','Das Mädchen trinkt Wasser.','Der Mann isst Brot.']],
      [['hallo','tschüss','guten Morgen','gute Nacht','danke','bitte','ja','nein'],
       ['Wie geht es dir?','Sehr gut, danke.',{ t: 'Ich heiße Anna.', e: 'My name is Anna' },'Gute Nacht, tschüss.','Ja, bitte.','Hallo, ich heiße Luis.']],
      [['die Mutter','der Vater','der Bruder','die Schwester','das Haus','der Hund','die Katze','die Familie'],
       ['Meine Mutter hat eine Katze.','Der Hund ist im Haus.','Mein Bruder isst Brot.','Ich habe einen Hund.','Mein Vater trinkt Wasser.','Die Familie ist zu Hause.']],
      [['eins','zwei','drei','vier','fünf','sechs','sieben','acht'],
       ['Ich habe zwei Hunde.','Es gibt drei Äpfel.','Meine Schwester hat fünf Katzen.','Eins, zwei, drei.','Ich bin acht Jahre alt.','Die Familie hat vier Häuser.']],
      [['rot','blau','grün','gelb','schwarz','weiß','orange','lila'],
       ['Die Katze ist schwarz.','Der Apfel ist rot.','Ich mag Blau.','Der Hund ist weiß.','Das Haus ist gelb.','Meine Lieblingsfarbe ist Grün.']],
      [['der Vogel','das Pferd','die Kuh','das Huhn','das Schwein','die Maus','der Affe','der Schmetterling'],
       ['Das Pferd ist groß.','Die Kuh trinkt Wasser.','Der Affe isst Bananen.','Der Vogel ist blau.','Ich habe ein Schwein.','Der Schmetterling ist gelb.']],
      [['das Ei','die Banane','der Kaffee','das Salz','das Fleisch','das Gemüse','das Geld','der Markt'],
       ['Wie viel kostet das?','Ich möchte zwei Eier.','Der Kaffee ist heiß.','Ich kaufe Fleisch auf dem Markt.','Ich habe kein Geld.','Ich mag Gemüse.']],
      [['heute','morgen','gestern','die Woche','die Stunde','jetzt','der Tag','die Nacht'],
       ['Heute ist Montag.','Morgen esse ich mit meiner Familie.','Gestern habe ich Kaffee getrunken.','Wie spät ist es?','Nicht jetzt.','Gute Nacht, bis morgen.']],
      [['die Schule','das Krankenhaus','die Kirche','die Straße','das Auto','der Bus','die Bank','der Strand'],
       ['Wo ist das Krankenhaus?','Ich gehe zur Schule.','Die Kirche ist nah.','Ich nehme den Bus.','Mein Auto ist rot.','Gehen wir zum Strand.']],
      [['der Regen','die Sonne','der Wind','der Schnee','glücklich','traurig','müde','krank'],
       ['Heute ist es sonnig.','Es regnet.','Ich bin glücklich.','Ich bin sehr müde.','Meine Mutter ist krank.','Es ist sehr windig.']]
    ]) },

    it: { name: 'Italian', flag: 'it', voice: ['it'], units: build([
      [["l'acqua",'il pane','il latte','la mela','il ragazzo','la ragazza',"l'uomo",'la donna'],
       ['Io bevo acqua.','Il ragazzo mangia il pane.','La donna beve il latte.','Io mangio una mela.',"La ragazza beve l'acqua.","L'uomo mangia il pane."]],
      [['ciao','arrivederci','buongiorno','buonanotte','grazie','per favore','sì','no'],
       ['Come stai?','Molto bene, grazie.','Mi chiamo Ana.','Buonanotte, arrivederci.','Sì, per favore.','Ciao, mi chiamo Luis.']],
      [['la madre','il padre','il fratello','la sorella','la casa','il cane','il gatto','la famiglia'],
       ['Mia madre ha un gatto.','Il cane è in casa.','Mio fratello mangia il pane.','Ho un cane.',"Mio padre beve l'acqua.",'La famiglia è a casa.']],
      [['uno','due','tre','quattro','cinque','sei','sette','otto'],
       ['Ho due cani.','Ci sono tre mele.','Mia sorella ha cinque gatti.','Uno, due, tre.','Ho otto anni.','La famiglia ha quattro case.']],
      [['rosso','blu','verde','giallo','nero','bianco','arancione','viola'],
       ['Il gatto è nero.','La mela è rossa.','Mi piace il blu.','Il cane è bianco.','La casa è gialla.','Il mio colore preferito è il verde.']],
      [["l'uccello",'il cavallo','la mucca','la gallina','il maiale','il topo','la scimmia','la farfalla'],
       ['Il cavallo è grande.',"La mucca beve l'acqua.",'La scimmia mangia le banane.',"L'uccello è blu.",'Ho un maiale.','La farfalla è gialla.']],
      [["l'uovo",'la banana','il caffè','il sale','la carne','le verdure','i soldi','il mercato'],
       ['Quanto costa?','Voglio due uova.','Il caffè è caldo.','Compro la carne al mercato.','Non ho soldi.','Mi piacciono le verdure.']],
      [['oggi','domani','ieri','la settimana',"l'ora",'adesso','il giorno','la notte'],
       ['Oggi è lunedì.','Domani mangio con la mia famiglia.','Ieri ho bevuto un caffè.','Che ora è?','Non adesso.','Buonanotte, a domani.']],
      [['la scuola',"l'ospedale",'la chiesa','la strada','la macchina',"l'autobus",'la banca','la spiaggia'],
       ["Dov'è l'ospedale?",'Vado a scuola.','La chiesa è vicina.',"Prendo l'autobus.",'La mia macchina è rossa.','Andiamo in spiaggia.']],
      [['la pioggia','il sole','il vento','la neve','felice','triste','stanco','malato'],
       ["Oggi c'è il sole.",'Piove.','Sono felice.','Sono molto stanco.','Mia madre è malata.',"C'è molto vento."]]
    ]) },

    pt: { name: 'Portuguese', flag: 'br', voice: ['pt-br', 'pt'], units: build([
      [['a água','o pão','o leite','a maçã','o menino','a menina','o homem','a mulher'],
       ['Eu bebo água.','O menino come pão.','A mulher bebe leite.','Eu como uma maçã.','A menina bebe água.','O homem come pão.']],
      [['olá','tchau','bom dia','boa noite','obrigado','por favor','sim','não'],
       ['Como você está?','Muito bem, obrigado.','Meu nome é Ana.','Boa noite, tchau.','Sim, por favor.','Olá, meu nome é Luis.']],
      [['a mãe','o pai','o irmão','a irmã','a casa','o cachorro','o gato','a família'],
       ['Minha mãe tem um gato.','O cachorro está dentro de casa.','Meu irmão come pão.','Eu tenho um cachorro.','Meu pai bebe água.','A família está em casa.']],
      [['um','dois','três','quatro','cinco','seis','sete','oito'],
       ['Eu tenho dois cachorros.','Há três maçãs.','Minha irmã tem cinco gatos.','Um, dois, três.','Eu tenho oito anos.','A família tem quatro casas.']],
      [['vermelho','azul','verde','amarelo','preto','branco','laranja','roxo'],
       ['O gato é preto.','A maçã é vermelha.','Eu gosto de azul.','O cachorro é branco.','A casa é amarela.','Minha cor favorita é verde.']],
      [['o pássaro','o cavalo','a vaca','a galinha','o porco','o rato','o macaco','a borboleta'],
       ['O cavalo é grande.','A vaca bebe água.','O macaco come bananas.','O pássaro é azul.','Eu tenho um porco.','A borboleta é amarela.']],
      [['o ovo','a banana','o café','o sal','a carne','os legumes','o dinheiro','o mercado'],
       ['Quanto custa?','Eu quero dois ovos.','O café está quente.','Eu compro carne no mercado.','Eu não tenho dinheiro.','Eu gosto de legumes.']],
      [['hoje','amanhã','ontem','a semana','a hora','agora','o dia','a noite'],
       ['Hoje é segunda-feira.','Amanhã eu como com a minha família.','Ontem eu bebi café.','Que horas são?','Agora não.','Boa noite, até amanhã.']],
      [['a escola','o hospital','a igreja','a rua','o carro','o ônibus','o banco','a praia'],
       ['Onde fica o hospital?','Eu vou para a escola.','A igreja fica perto.','Eu pego o ônibus.','Meu carro é vermelho.','Vamos à praia.']],
      [['a chuva','o sol','o vento','a neve','feliz','triste','cansado','doente'],
       ['Hoje está ensolarado.','Está chovendo.','Eu estou feliz.','Eu estou muito cansado.','Minha mãe está doente.','Está ventando muito.']]
    ]) }
  };
  window.TUON_BUILD = build;
  Object.assign(window.COURSES, add);
})();
