/* Arya's Reading Log — Quest bank (语音闯关题库)
   Every question is answered by SPEAKING. Item types:
     repeat  – read the sentence out loud (word-match scored)
     fill    – fill in the blank; anyOf:true means any choice is a good answer
     grammar – one correct answer, say the word or the whole sentence
     vocab   – word meaning / word detective
     talk    – open speaking answer, needs minWords
     story   – make up your own story, needs minWords, saved to My Story Book
*/

const BANDS = [
  { id: 'b1', name: 'Sprouts', grades: [1, 2], emoji: '🌱' },
  { id: 'b2', name: 'Explorers', grades: [3, 4, 5], emoji: '🧭' },
  { id: 'b3', name: 'Adventurers', grades: [6, 7, 8], emoji: '🗺️' },
  { id: 'b4', name: 'Scholars', grades: [9, 10, 11, 12], emoji: '🎓' }
];

function bandForGrade(g) {
  return BANDS.find(b => b.grades.includes(Number(g))) || BANDS[0];
}

const QUESTS = {
  b1: [
    {
      id: 'b1-l1', title: 'Say It Out Loud', emoji: '🗣️',
      blurb: 'Read each sentence with your big reading voice.',
      items: [
        { type: 'repeat', text: 'The little cat sat on a soft red mat.', hint: 'Say every word clearly.' },
        { type: 'repeat', text: 'I can run fast in the sunny park.', hint: 'Try to sound happy!' },
        { type: 'repeat', text: 'My big dog likes to jump over the log.', hint: 'Say it like a story.' },
        { type: 'repeat', text: 'We read ten books this week.', hint: 'Loud and proud!' }
      ]
    },
    {
      id: 'b1-l2', title: 'Fill the Blank', emoji: '🧩',
      blurb: 'Pick a word and say the WHOLE sentence out loud.',
      items: [
        { type: 'fill', prompt: 'I want to go to the ___.', options: ['school', 'playground', 'library', 'zoo'], anyOf: true, say: 'Say the whole sentence, like "I want to go to the playground."' },
        { type: 'fill', prompt: 'My favorite animal is a ___.', options: ['cat', 'dog', 'panda', 'dolphin'], anyOf: true, say: 'Say the whole sentence out loud.' },
        { type: 'fill', prompt: 'After school I like to ___.', options: ['read', 'draw', 'play', 'sing'], anyOf: true, say: 'Any answer is right — just say it in a full sentence!' },
        { type: 'fill', prompt: 'The sun is very ___.', options: ['hot', 'bright', 'big', 'yellow'], anyOf: true, say: 'Choose one and say the sentence.' }
      ]
    },
    {
      id: 'b1-l3', title: 'Grammar Power', emoji: '⚡',
      blurb: 'Only ONE answer is correct. Say it out loud.',
      items: [
        { type: 'grammar', prompt: 'She ___ to school every day.', options: ['go', 'goes', 'going'], answer: 'goes', explain: 'With she / he / it we add -s: she goes.' },
        { type: 'grammar', prompt: 'There ___ two birds in the tree.', options: ['is', 'are', 'am'], answer: 'are', explain: 'Two birds are more than one, so we use "are".' },
        { type: 'grammar', prompt: 'I ___ my homework yesterday.', options: ['do', 'did', 'does'], answer: 'did', explain: '"Yesterday" means the past, so we use "did".' },
        { type: 'grammar', prompt: 'This is ___ apple.', options: ['a', 'an', 'the'], answer: 'an', explain: 'Apple starts with a vowel sound, so we say "an apple".' }
      ]
    },
    {
      id: 'b1-l4', title: 'Word Detective', emoji: '🔍',
      blurb: 'Find the word that fits. Say your answer.',
      items: [
        { type: 'vocab', prompt: 'Which word means VERY BIG?', options: ['tiny', 'huge', 'slow'], answer: 'huge', explain: 'Huge means very, very big.' },
        { type: 'vocab', prompt: 'Which word is the opposite of HAPPY?', options: ['sad', 'fast', 'loud'], answer: 'sad', explain: 'Happy and sad are opposites.' },
        { type: 'vocab', prompt: 'Which one is a place where you borrow books?', options: ['bakery', 'library', 'garage'], answer: 'library', explain: 'A library lends books to everyone.' },
        { type: 'talk', prompt: 'Tell me about a book you liked. What happened in it?', minWords: 12, hint: 'Try: "I read ___. It was about ___. My favorite part was ___."' }
      ]
    },
    {
      id: 'b1-l5', title: 'Make Up Your Own Story', emoji: '✨',
      blurb: 'Use your imagination and TELL a story. It gets saved in your Story Book!',
      items: [
        { type: 'story', prompt: 'Make up your own story about a dragon who is afraid of the dark.', words: ['dragon', 'cave', 'night', 'brave', 'friend'], minWords: 25 },
        { type: 'story', prompt: 'Make up a story about the day your pet learned to talk.', words: ['pet', 'talk', 'surprise', 'secret'], minWords: 25 }
      ]
    }
  ],

  b2: [
    {
      id: 'b2-l1', title: 'Say It Out Loud', emoji: '🗣️',
      blurb: 'Read with expression — pause at the commas!',
      items: [
        { type: 'repeat', text: 'The old library smelled like paper, dust, and adventure.', hint: 'Pause a little at each comma.' },
        { type: 'repeat', text: 'Charlotte spun a word into her web, and everybody came to look.', hint: 'Read it like a storyteller.' },
        { type: 'repeat', text: 'Before the storm arrived, the whole sky turned a strange green color.', hint: 'Slow down for the long sentence.' },
        { type: 'repeat', text: 'She was nervous, but she raised her hand anyway.', hint: 'Make "anyway" sound brave.' }
      ]
    },
    {
      id: 'b2-l2', title: 'Fill the Blank', emoji: '🧩',
      blurb: 'Choose a word, then say the whole sentence.',
      items: [
        { type: 'fill', prompt: 'I want to go to the ___ because I love it there.', options: ['school', 'playground', 'museum', 'beach'], anyOf: true, say: 'Say the whole sentence and add your reason!' },
        { type: 'fill', prompt: 'The main character felt ___ at the end of the story.', options: ['proud', 'lonely', 'excited', 'relieved'], anyOf: true, say: 'Pick a feeling word and say the sentence.' },
        { type: 'fill', prompt: 'If I could have any superpower, I would choose ___.', options: ['flying', 'invisibility', 'super speed', 'talking to animals'], anyOf: true, say: 'Say it in a full sentence.' },
        { type: 'fill', prompt: 'A good friend is someone who ___.', options: ['listens', 'shares', 'helps', 'makes you laugh'], anyOf: true, say: 'Full sentence, please!' }
      ]
    },
    {
      id: 'b2-l3', title: 'Grammar Power', emoji: '⚡',
      blurb: 'One correct answer each. Say it clearly.',
      items: [
        { type: 'grammar', prompt: 'My brother and I ___ going to the park.', options: ['is', 'are', 'am'], answer: 'are', explain: '"My brother and I" is plural, so we use "are".' },
        { type: 'grammar', prompt: 'She ran ___ than everyone else in her class.', options: ['fast', 'faster', 'fastest'], answer: 'faster', explain: 'Comparing two things uses -er: faster than.' },
        { type: 'grammar', prompt: 'The dog wagged ___ tail.', options: ['its', "it's", 'their'], answer: 'its', explain: '"Its" shows belonging. "It\'s" means "it is".' },
        { type: 'grammar', prompt: 'Yesterday we ___ a whole chapter book.', options: ['read', 'readed', 'reading'], answer: 'read', explain: 'Read is irregular — the past tense is still spelled "read".' },
        { type: 'grammar', prompt: 'There are three ___ on the shelf.', options: ['box', 'boxes', 'boxs'], answer: 'boxes', explain: 'Words ending in -x take -es: boxes.' }
      ]
    },
    {
      id: 'b2-l4', title: 'Word Detective', emoji: '🔍',
      blurb: 'Vocabulary and thinking questions.',
      items: [
        { type: 'vocab', prompt: 'Which word means "to feel very surprised"?', options: ['amazed', 'annoyed', 'ancient'], answer: 'amazed', explain: 'Amazed = filled with surprise and wonder.' },
        { type: 'vocab', prompt: 'What is the OPPOSITE of "generous"?', options: ['selfish', 'gentle', 'giant'], answer: 'selfish', explain: 'Generous means sharing; selfish means keeping it all.' },
        { type: 'vocab', prompt: 'If a character is "curious", what are they doing?', options: ['asking questions', 'falling asleep', 'running away'], answer: 'asking questions', explain: 'Curious people want to find out more.' },
        { type: 'talk', prompt: 'Tell me about the last book you read. Who was the main character and what problem did they solve?', minWords: 20, hint: 'Say the title, the character, the problem, and the ending.' }
      ]
    },
    {
      id: 'b2-l5', title: 'Make Up Your Own Story', emoji: '✨',
      blurb: 'Tell your own story out loud. It gets saved forever.',
      items: [
        { type: 'story', prompt: 'Make up your own story about finding a door in your school that was not there yesterday.', words: ['door', 'secret', 'discover', 'brave', 'return'], minWords: 40 },
        { type: 'story', prompt: 'Make up a story where you and your best friend swap places for one day.', words: ['swap', 'friend', 'mistake', 'learn'], minWords: 40 }
      ]
    }
  ],

  b3: [
    {
      id: 'b3-l1', title: 'Read With Expression', emoji: '🗣️',
      blurb: 'These are longer. Breathe, and read like you mean it.',
      items: [
        { type: 'repeat', text: 'The wilderness did not care whether he was afraid; it simply continued.', hint: 'Read it slowly and seriously.' },
        { type: 'repeat', text: 'She had memorized the rules, but nobody had explained the reasons behind them.', hint: 'Stress the word "reasons".' },
        { type: 'repeat', text: 'Courage is not the absence of fear; it is deciding something else matters more.', hint: 'Pause at the semicolon.' },
        { type: 'repeat', text: 'Every family carries stories that nobody has written down yet.', hint: 'Warm, thoughtful voice.' }
      ]
    },
    {
      id: 'b3-l2', title: 'Fill the Blank', emoji: '🧩',
      blurb: 'Choose the word that fits best, then say the sentence.',
      items: [
        { type: 'fill', prompt: 'The theme of this book is ___.', options: ['friendship', 'courage', 'identity', 'survival'], anyOf: true, say: 'Say the sentence and name a book it fits.' },
        { type: 'fill', prompt: 'The author uses ___ to make the setting feel real.', options: ['description', 'dialogue', 'sensory details', 'flashbacks'], anyOf: true, say: 'Full sentence, and give one example if you can.' },
        { type: 'fill', prompt: 'A character changes most when they ___.', options: ['lose something', 'make a mistake', 'meet someone new', 'face their fear'], anyOf: true, say: 'Say it in a full sentence.' },
        { type: 'fill', prompt: 'The turning point in the story happened when ___.', options: ['the secret came out', 'they decided to leave', 'the plan failed', 'help arrived'], anyOf: true, say: 'Say the full sentence about a book you know.' }
      ]
    },
    {
      id: 'b3-l3', title: 'Grammar Power', emoji: '⚡',
      blurb: 'Trickier grammar. One correct answer each.',
      items: [
        { type: 'grammar', prompt: 'Neither the students nor the teacher ___ ready for the test.', options: ['was', 'were', 'been'], answer: 'was', explain: 'With "neither...nor", the verb matches the closest subject: teacher was.' },
        { type: 'grammar', prompt: 'If I ___ more time, I would finish the whole series.', options: ['have', 'had', 'has'], answer: 'had', explain: 'This is a hypothetical, so we use the past form: if I had.' },
        { type: 'grammar', prompt: 'The book, ___ cover was torn, still sold for ten dollars.', options: ['who', 'whose', "who's"], answer: 'whose', explain: '"Whose" shows possession, even for objects.' },
        { type: 'grammar', prompt: 'She has ___ that novel three times.', options: ['read', 'readed', 'reading'], answer: 'read', explain: 'Present perfect uses the past participle: has read.' },
        { type: 'grammar', prompt: 'The effect of the ending was ___ than I expected.', options: ['powerful', 'more powerful', 'most powerful'], answer: 'more powerful', explain: 'Comparing two things uses "more ___ than".' }
      ]
    },
    {
      id: 'b3-l4', title: 'Word Detective', emoji: '🔍',
      blurb: 'Vocabulary, figurative language, and inference.',
      items: [
        { type: 'vocab', prompt: '"Her voice was thunder in the quiet room." What is this?', options: ['a metaphor', 'a rhyme', 'an alliteration'], answer: 'a metaphor', explain: 'It compares her voice to thunder without using "like" or "as".' },
        { type: 'vocab', prompt: 'Which word means "stubbornly refusing to change"?', options: ['obstinate', 'obvious', 'obscure'], answer: 'obstinate', explain: 'Obstinate = very stubborn.' },
        { type: 'vocab', prompt: 'If an author "foreshadows" something, what are they doing?', options: ['hinting at what comes later', 'summarizing the plot', 'ending the chapter'], answer: 'hinting at what comes later', explain: 'Foreshadowing plants clues about the future.' },
        { type: 'talk', prompt: 'Pick a character you disagree with. Explain what they did and what you would have done instead.', minWords: 30, hint: 'Name the book, the choice, and your reasoning.' }
      ]
    },
    {
      id: 'b3-l5', title: 'Make Up Your Own Story', emoji: '✨',
      blurb: 'Build a real story: character, problem, turning point, ending.',
      items: [
        { type: 'story', prompt: 'Make up your own story about a person who receives a letter that was mailed fifty years ago.', words: ['letter', 'mystery', 'past', 'choice', 'truth'], minWords: 60 },
        { type: 'story', prompt: 'Make up a story about the last library on Earth and the person who protects it.', words: ['library', 'protect', 'memory', 'hope'], minWords: 60 }
      ]
    }
  ],

  b4: [
    {
      id: 'b4-l1', title: 'Read With Expression', emoji: '🗣️',
      blurb: 'Complex sentences. Control your pace and emphasis.',
      items: [
        { type: 'repeat', text: 'Although the evidence was circumstantial, the jury deliberated for only twenty minutes.', hint: 'Emphasize "only".' },
        { type: 'repeat', text: 'Literature does not give us answers; it gives us better questions.', hint: 'Pause at the semicolon.' },
        { type: 'repeat', text: 'The narrator insists he is reliable, which is precisely why we should doubt him.', hint: 'Slightly ironic tone.' },
        { type: 'repeat', text: 'Every society tells itself a story about why its rules are inevitable.', hint: 'Steady, academic pace.' }
      ]
    },
    {
      id: 'b4-l2', title: 'Fill the Blank', emoji: '🧩',
      blurb: 'Complete the literary claim and say it as a full sentence.',
      items: [
        { type: 'fill', prompt: 'The central conflict of this work is fundamentally about ___.', options: ['power', 'identity', 'freedom', 'memory'], anyOf: true, say: 'Say the sentence and name the work.' },
        { type: 'fill', prompt: 'The author’s use of ___ shapes how we judge the narrator.', options: ['irony', 'point of view', 'symbolism', 'diction'], anyOf: true, say: 'Full sentence, then give one example.' },
        { type: 'fill', prompt: 'This text is best understood in the context of ___.', options: ['its historical moment', 'the author’s biography', 'the literary movement', 'its intended audience'], anyOf: true, say: 'Say the full sentence and justify it in one more sentence.' },
        { type: 'fill', prompt: 'The ending is ___ because the reader is left to decide.', options: ['ambiguous', 'deliberate', 'unsettling', 'satisfying'], anyOf: true, say: 'Say it as a full argumentative sentence.' }
      ]
    },
    {
      id: 'b4-l3', title: 'Grammar & Usage', emoji: '⚡',
      blurb: 'Advanced usage. One correct answer each.',
      items: [
        { type: 'grammar', prompt: 'The committee ___ divided over the proposal.', options: ['is', 'are', 'be'], answer: 'is', explain: 'In American usage, collective nouns like "committee" take a singular verb.' },
        { type: 'grammar', prompt: 'Had she known the truth, she ___ differently.', options: ['would act', 'would have acted', 'will act'], answer: 'would have acted', explain: 'Third conditional: had + past participle → would have + past participle.' },
        { type: 'grammar', prompt: 'The author, along with her editors, ___ the manuscript.', options: ['revise', 'revises', 'revising'], answer: 'revises', explain: 'The phrase "along with..." does not change the singular subject.' },
        { type: 'grammar', prompt: 'It is a book ___ influence is still felt today.', options: ['whose', "who's", 'which'], answer: 'whose', explain: '"Whose" is the possessive relative pronoun for things as well as people.' },
        { type: 'grammar', prompt: 'Between you and ___, the ending disappointed me.', options: ['I', 'me', 'myself'], answer: 'me', explain: 'After a preposition we use the object pronoun: between you and me.' }
      ]
    },
    {
      id: 'b4-l4', title: 'Critical Thinking', emoji: '🔍',
      blurb: 'Literary terms and argument.',
      items: [
        { type: 'vocab', prompt: 'A story where the surface meaning stands for a larger idea is called:', options: ['an allegory', 'an anecdote', 'an epilogue'], answer: 'an allegory', explain: 'Animal Farm is the classic example.' },
        { type: 'vocab', prompt: 'When the reader knows something the character does not, that is:', options: ['dramatic irony', 'verbal irony', 'hyperbole'], answer: 'dramatic irony', explain: 'The gap between reader knowledge and character knowledge creates tension.' },
        { type: 'vocab', prompt: 'A "foil" character exists mainly to:', options: ['contrast with the protagonist', 'narrate the story', 'provide comic relief'], answer: 'contrast with the protagonist', explain: 'The contrast highlights the protagonist’s traits.' },
        { type: 'talk', prompt: 'Make an argument: choose a book that is often taught in school and explain whether it still deserves that place. Give two reasons.', minWords: 45, hint: 'Claim, reason one, reason two, counterpoint.' }
      ]
    },
    {
      id: 'b4-l5', title: 'Make Up Your Own Story', emoji: '✨',
      blurb: 'Compose an original piece out loud.',
      items: [
        { type: 'story', prompt: 'Tell an original story with an unreliable narrator — someone whose version the listener should question.', words: ['narrator', 'truth', 'doubt', 'reveal'], minWords: 80 },
        { type: 'story', prompt: 'Invent a story set one hundred years from now, in which a single old book changes someone’s life.', words: ['future', 'book', 'change', 'memory', 'choice'], minWords: 80 }
      ]
    }
  ]
};
