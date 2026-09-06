/* Arya's Reading Log — Library catalog
   Each book: id, title, author, emoji, pages, minutes (est. per sitting), blurb, tags
   Blurbs are original one-line descriptions written for this app. */

const LIBRARY = {
  1: [
    { id: 'g1-frog-toad', title: 'Frog and Toad Are Friends', author: 'Arnold Lobel', emoji: '🐸', pages: 64, minutes: 15, blurb: 'Two best friends share five gentle little adventures, from a lost button to a spring morning.', tags: ['Friendship', 'Easy Reader'] },
    { id: 'g1-green-eggs', title: 'Green Eggs and Ham', author: 'Dr. Seuss', emoji: '🍳', pages: 62, minutes: 12, blurb: 'A very persistent character keeps asking his friend to try one strange breakfast.', tags: ['Rhyming', 'Funny'] },
    { id: 'g1-cat-hat', title: 'The Cat in the Hat', author: 'Dr. Seuss', emoji: '🎩', pages: 61, minutes: 12, blurb: 'A rainy day turns wild when a tall striped hat walks through the door.', tags: ['Rhyming', 'Classic'] },
    { id: 'g1-piggie', title: 'We Are in a Book! (Elephant & Piggie)', author: 'Mo Willems', emoji: '🐷', pages: 57, minutes: 10, blurb: 'Two friends discover someone is reading them, and they think that is hilarious.', tags: ['Funny', 'Easy Reader'] },
    { id: 'g1-are-you-mother', title: 'Are You My Mother?', author: 'P. D. Eastman', emoji: '🐤', pages: 72, minutes: 12, blurb: 'A newly hatched bird sets off to find who he belongs to, asking everyone he meets.', tags: ['Animals', 'Classic'] },
    { id: 'g1-corduroy', title: 'Corduroy', author: 'Don Freeman', emoji: '🧸', pages: 32, minutes: 10, blurb: 'A department store bear goes looking for his missing button, and finds a home instead.', tags: ['Picture Book', 'Heart'] },
    { id: 'g1-caterpillar', title: 'The Very Hungry Caterpillar', author: 'Eric Carle', emoji: '🐛', pages: 26, minutes: 8, blurb: 'One small caterpillar eats his way through the week and becomes something beautiful.', tags: ['Picture Book', 'Nature'] },
    { id: 'g1-danny-dino', title: 'Danny and the Dinosaur', author: 'Syd Hoff', emoji: '🦕', pages: 64, minutes: 15, blurb: 'A museum dinosaur steps down off his stand for one very good day out.', tags: ['Adventure', 'Easy Reader'] },
    { id: 'g1-little-bear', title: 'Little Bear', author: 'Else Holmelund Minarik', emoji: '🐻', pages: 63, minutes: 15, blurb: 'Small cozy stories about a bear cub, his imagination, and his mother.', tags: ['Family', 'Easy Reader'] },
    { id: 'g1-pete-cat', title: 'Pete the Cat: I Love My White Shoes', author: 'Eric Litwin', emoji: '👟', pages: 40, minutes: 10, blurb: 'A cool cat keeps walking and singing no matter what color his shoes turn.', tags: ['Music', 'Picture Book'] }
  ],
  2: [
    { id: 'g2-magic-tree', title: 'Magic Tree House #1: Dinosaurs Before Dark', author: 'Mary Pope Osborne', emoji: '🌳', pages: 68, minutes: 20, blurb: 'A brother and sister find a treehouse full of books that can send them anywhere in time.', tags: ['Adventure', 'Series'] },
    { id: 'g2-nate-great', title: 'Nate the Great', author: 'Marjorie Weinman Sharmat', emoji: '🔍', pages: 80, minutes: 20, blurb: 'A pancake-loving kid detective takes the case of a missing picture.', tags: ['Mystery', 'Series'] },
    { id: 'g2-amelia', title: 'Amelia Bedelia', author: 'Peggy Parish', emoji: '🥧', pages: 64, minutes: 18, blurb: 'A housekeeper follows every instruction exactly as it sounds, with very silly results.', tags: ['Funny', 'Wordplay'] },
    { id: 'g2-mercy', title: 'Mercy Watson to the Rescue', author: 'Kate DiCamillo', emoji: '🐖', pages: 80, minutes: 20, blurb: 'A pig who adores buttered toast accidentally becomes a hero.', tags: ['Funny', 'Series'] },
    { id: 'g2-henry-mudge', title: 'Henry and Mudge: The First Book', author: 'Cynthia Rylant', emoji: '🐕', pages: 40, minutes: 12, blurb: 'A lonely boy gets an enormous dog, and neither of them is ever lonely again.', tags: ['Animals', 'Friendship'] },
    { id: 'g2-ferdinand', title: 'The Story of Ferdinand', author: 'Munro Leaf', emoji: '🐂', pages: 72, minutes: 12, blurb: 'A peaceful bull would rather smell flowers than fight in the ring.', tags: ['Classic', 'Kindness'] },
    { id: 'g2-fly-guy', title: 'Hi! Fly Guy', author: 'Tedd Arnold', emoji: '🪰', pages: 30, minutes: 10, blurb: 'A boy catches a fly for a pet show and discovers it can say his name.', tags: ['Funny', 'Easy Reader'] },
    { id: 'g2-junie-b', title: 'Junie B. Jones and the Stupid Smelly Bus', author: 'Barbara Park', emoji: '🚌', pages: 80, minutes: 20, blurb: 'A very loud kindergartner decides she is absolutely not riding the bus home.', tags: ['Funny', 'School'] },
    { id: 'g2-owl-home', title: 'Owl at Home', author: 'Arnold Lobel', emoji: '🦉', pages: 64, minutes: 15, blurb: 'A kindly owl invites winter inside, makes tear-water tea, and chases the moon.', tags: ['Cozy', 'Easy Reader'] },
    { id: 'g2-cam-jansen', title: 'Cam Jansen and the Mystery of the Stolen Diamonds', author: 'David A. Adler', emoji: '💎', pages: 58, minutes: 18, blurb: 'A girl with a photographic memory says "click" and solves the crime.', tags: ['Mystery', 'Series'] }
  ],
  3: [
    { id: 'g3-charlottes-web', title: "Charlotte's Web", author: 'E. B. White', emoji: '🕷️', pages: 184, minutes: 25, blurb: 'A clever barn spider spins words in her web to save the life of a young pig.', tags: ['Classic', 'Friendship'] },
    { id: 'g3-chocolate-touch', title: 'The Chocolate Touch', author: 'Patrick Skene Catling', emoji: '🍫', pages: 128, minutes: 25, blurb: 'A greedy boy gets a magic gift: everything his lips touch turns to chocolate.', tags: ['Fantasy', 'Lesson'] },
    { id: 'g3-ivy-bean', title: 'Ivy and Bean', author: 'Annie Barrows', emoji: '👯', pages: 120, minutes: 22, blurb: 'Two neighbors who were sure they would never be friends become exactly that.', tags: ['Friendship', 'Series'] },
    { id: 'g3-boxcar', title: 'The Boxcar Children', author: 'Gertrude Chandler Warner', emoji: '🚃', pages: 154, minutes: 25, blurb: 'Four orphaned siblings make a home in an abandoned railroad car in the woods.', tags: ['Mystery', 'Survival'] },
    { id: 'g3-ramona', title: 'Ramona Quimby, Age 8', author: 'Beverly Cleary', emoji: '🍎', pages: 190, minutes: 25, blurb: 'Third grade is full of tricky moments, and Ramona meets every one of them head on.', tags: ['School', 'Family'] },
    { id: 'g3-stuart-little', title: 'Stuart Little', author: 'E. B. White', emoji: '🐭', pages: 144, minutes: 25, blurb: 'A mouse-sized boy sails toy boats and drives off in search of a lost friend.', tags: ['Classic', 'Adventure'] },
    { id: 'g3-flat-stanley', title: 'Flat Stanley', author: 'Jeff Brown', emoji: '📮', pages: 96, minutes: 20, blurb: 'A bulletin board flattens a boy, and suddenly he can travel by envelope.', tags: ['Funny', 'Adventure'] },
    { id: 'g3-despereaux', title: 'The Tale of Despereaux', author: 'Kate DiCamillo', emoji: '🐁', pages: 272, minutes: 25, blurb: 'A tiny mouse with enormous ears falls in love with a princess and with stories.', tags: ['Fantasy', 'Award Winner'] },
    { id: 'g3-sarah-plain', title: 'Sarah, Plain and Tall', author: 'Patricia MacLachlan', emoji: '🌾', pages: 64, minutes: 20, blurb: 'A woman answers a prairie family’s advertisement, and two children hope she will stay.', tags: ['Historical', 'Family'] },
    { id: 'g3-magic-finger', title: 'The Magic Finger', author: 'Roald Dahl', emoji: '👆', pages: 64, minutes: 18, blurb: 'When a girl gets angry, her finger works magic that teaches hunters a lesson.', tags: ['Funny', 'Fantasy'] }
  ],
  4: [
    { id: 'g4-harry-potter-1', title: "Harry Potter and the Sorcerer's Stone", author: 'J. K. Rowling', emoji: '⚡', pages: 309, minutes: 30, blurb: 'On his eleventh birthday, a boy learns he is a wizard and that a school is waiting for him.', tags: ['Fantasy', 'Series', 'Famous'] },
    { id: 'g4-charlie-chocolate', title: 'Charlie and the Chocolate Factory', author: 'Roald Dahl', emoji: '🎫', pages: 176, minutes: 28, blurb: 'Five golden tickets, one mysterious factory, and one very kind boy.', tags: ['Fantasy', 'Classic'] },
    { id: 'g4-matilda', title: 'Matilda', author: 'Roald Dahl', emoji: '📚', pages: 240, minutes: 28, blurb: 'A brilliant girl who reads everything discovers she has a power of her own.', tags: ['Fantasy', 'School'] },
    { id: 'g4-bfg', title: 'The BFG', author: 'Roald Dahl', emoji: '👂', pages: 208, minutes: 28, blurb: 'A giant who collects dreams befriends an orphan and plans to stop the mean giants.', tags: ['Fantasy', 'Friendship'] },
    { id: 'g4-winn-dixie', title: 'Because of Winn-Dixie', author: 'Kate DiCamillo', emoji: '🐶', pages: 182, minutes: 25, blurb: 'A stray dog from the grocery store helps a girl find friends in a new town.', tags: ['Heart', 'Animals'] },
    { id: 'g4-ivan', title: 'The One and Only Ivan', author: 'Katherine Applegate', emoji: '🦍', pages: 320, minutes: 25, blurb: 'A gorilla in a mall cage decides to change the future for a baby elephant.', tags: ['Animals', 'Award Winner'] },
    { id: 'g4-fudge', title: 'Tales of a Fourth Grade Nothing', author: 'Judy Blume', emoji: '🥄', pages: 120, minutes: 22, blurb: 'Life with a wildly destructive toddler brother, told by the older brother who survives it.', tags: ['Funny', 'Family'] },
    { id: 'g4-frindle', title: 'Frindle', author: 'Andrew Clements', emoji: '🖊️', pages: 105, minutes: 22, blurb: 'A boy invents a new word for pen, and the whole country starts using it.', tags: ['School', 'Words'] },
    { id: 'g4-poppers', title: "Mr. Popper's Penguins", author: 'Richard & Florence Atwater', emoji: '🐧', pages: 139, minutes: 22, blurb: 'A house painter receives a penguin in the mail, and then there are twelve.', tags: ['Funny', 'Classic'] },
    { id: 'g4-mouse-motorcycle', title: 'The Mouse and the Motorcycle', author: 'Beverly Cleary', emoji: '🏍️', pages: 158, minutes: 22, blurb: 'A hotel mouse learns to ride a toy motorcycle, if he remembers to make the sound.', tags: ['Animals', 'Adventure'] }
  ],
  5: [
    { id: 'g5-wonder', title: 'Wonder', author: 'R. J. Palacio', emoji: '🌟', pages: 315, minutes: 30, blurb: 'A boy with a facial difference starts fifth grade and asks the world to look again.', tags: ['Heart', 'School'] },
    { id: 'g5-holes', title: 'Holes', author: 'Louis Sachar', emoji: '🕳️', pages: 233, minutes: 30, blurb: 'Boys at a desert camp dig one hole a day, and a hundred-year-old curse starts to unravel.', tags: ['Mystery', 'Award Winner'] },
    { id: 'g5-percy-1', title: 'Percy Jackson: The Lightning Thief', author: 'Rick Riordan', emoji: '🔱', pages: 377, minutes: 30, blurb: 'A kid finds out his father is a Greek god and he has ten days to stop a war.', tags: ['Fantasy', 'Series', 'Famous'] },
    { id: 'g5-number-stars', title: 'Number the Stars', author: 'Lois Lowry', emoji: '⭐', pages: 137, minutes: 25, blurb: 'In occupied Denmark, a girl helps her best friend escape to safety.', tags: ['Historical', 'Courage'] },
    { id: 'g5-terabithia', title: 'Bridge to Terabithia', author: 'Katherine Paterson', emoji: '🌉', pages: 128, minutes: 25, blurb: 'Two friends invent a kingdom in the woods, and it changes how one of them sees the world.', tags: ['Friendship', 'Emotional'] },
    { id: 'g5-wrinkle', title: 'A Wrinkle in Time', author: 'Madeleine L’Engle', emoji: '🌌', pages: 256, minutes: 30, blurb: 'Three children fold space itself to rescue a scientist father lost among the stars.', tags: ['Sci-Fi', 'Classic'] },
    { id: 'g5-red-fern', title: 'Where the Red Fern Grows', author: 'Wilson Rawls', emoji: '🐕‍🦺', pages: 245, minutes: 28, blurb: 'A boy saves for two years to buy two hound puppies, and they hunt the Ozarks together.', tags: ['Animals', 'Emotional'] },
    { id: 'g5-mixed-up-files', title: 'From the Mixed-Up Files of Mrs. Basil E. Frankweiler', author: 'E. L. Konigsburg', emoji: '🏛️', pages: 162, minutes: 25, blurb: 'Two runaways hide inside a great museum and stumble onto a real art mystery.', tags: ['Mystery', 'Adventure'] },
    { id: 'g5-esperanza', title: 'Esperanza Rising', author: 'Pam Muñoz Ryan', emoji: '🌹', pages: 262, minutes: 28, blurb: 'A wealthy girl loses everything and must start over in a California farm camp.', tags: ['Historical', 'Courage'] },
    { id: 'g5-blue-dolphins', title: 'Island of the Blue Dolphins', author: 'Scott O’Dell', emoji: '🏝️', pages: 184, minutes: 28, blurb: 'A girl is left alone on an island and survives there for eighteen years.', tags: ['Survival', 'Classic'] }
  ],
  6: [
    { id: 'g6-giver', title: 'The Giver', author: 'Lois Lowry', emoji: '🎚️', pages: 208, minutes: 30, blurb: 'In a community with no pain and no color, one boy is chosen to receive the memories.', tags: ['Dystopia', 'Award Winner'] },
    { id: 'g6-hatchet', title: 'Hatchet', author: 'Gary Paulsen', emoji: '🪓', pages: 208, minutes: 30, blurb: 'After a plane crash, a boy has one small tool and an entire wilderness to learn.', tags: ['Survival', 'Adventure'] },
    { id: 'g6-hobbit', title: 'The Hobbit', author: 'J. R. R. Tolkien', emoji: '💍', pages: 310, minutes: 35, blurb: 'A comfortable hobbit is swept out his door on a quest for a dragon’s treasure.', tags: ['Fantasy', 'Classic', 'Famous'] },
    { id: 'g6-hp-3', title: 'Harry Potter and the Prisoner of Azkaban', author: 'J. K. Rowling', emoji: '🐺', pages: 435, minutes: 35, blurb: 'An escaped prisoner is hunting Harry, and the truth is not what anyone expects.', tags: ['Fantasy', 'Series', 'Famous'] },
    { id: 'g6-wild-robot', title: 'The Wild Robot', author: 'Peter Brown', emoji: '🤖', pages: 279, minutes: 25, blurb: 'A robot washes ashore on a wild island and learns how to belong there.', tags: ['Sci-Fi', 'Nature'] },
    { id: 'g6-brown-girl', title: 'Brown Girl Dreaming', author: 'Jacqueline Woodson', emoji: '✍️', pages: 336, minutes: 25, blurb: 'A memoir told in poems about growing up between South and North and finding a writer’s voice.', tags: ['Poetry', 'Memoir'] },
    { id: 'g6-maniac', title: 'Maniac Magee', author: 'Jerry Spinelli', emoji: '👟', pages: 184, minutes: 28, blurb: 'A running, legend-making orphan crosses the line that divides his town.', tags: ['Modern Classic', 'Courage'] },
    { id: 'g6-thunder', title: 'Roll of Thunder, Hear My Cry', author: 'Mildred D. Taylor', emoji: '🌩️', pages: 276, minutes: 32, blurb: 'A Black family in 1930s Mississippi holds onto their land and their dignity.', tags: ['Historical', 'Award Winner'] },
    { id: 'g6-tollbooth', title: 'The Phantom Tollbooth', author: 'Norton Juster', emoji: '🚗', pages: 256, minutes: 28, blurb: 'A bored boy drives through a tollbooth into a land where words and numbers are at war.', tags: ['Fantasy', 'Wordplay'] },
    { id: 'g6-bud-buddy', title: 'Bud, Not Buddy', author: 'Christopher Paul Curtis', emoji: '🎺', pages: 245, minutes: 28, blurb: 'A ten-year-old sets out across Depression-era Michigan to find the bandleader he thinks is his father.', tags: ['Historical', 'Award Winner'] }
  ],
  7: [
    { id: 'g7-outsiders', title: 'The Outsiders', author: 'S. E. Hinton', emoji: '🌅', pages: 192, minutes: 30, blurb: 'Two rival groups of teenagers collide, and one boy tries to stay gold.', tags: ['Modern Classic', 'Coming of Age'] },
    { id: 'g7-anne-frank', title: 'The Diary of a Young Girl', author: 'Anne Frank', emoji: '📔', pages: 283, minutes: 30, blurb: 'The real diary of a girl hiding from the Nazis in a secret annex in Amsterdam.', tags: ['Memoir', 'Historical'] },
    { id: 'g7-westing', title: 'The Westing Game', author: 'Ellen Raskin', emoji: '🧩', pages: 216, minutes: 30, blurb: 'Sixteen heirs are given clues to a fortune, and one of them is a murderer.', tags: ['Mystery', 'Award Winner'] },
    { id: 'g7-long-walk-water', title: 'A Long Walk to Water', author: 'Linda Sue Park', emoji: '💧', pages: 128, minutes: 25, blurb: 'Two Sudanese lives, decades apart, are joined by a well.', tags: ['Historical', 'Courage'] },
    { id: 'g7-crossover', title: 'The Crossover', author: 'Kwame Alexander', emoji: '🏀', pages: 237, minutes: 22, blurb: 'Basketball, twin brothers, and family, told entirely in fast-breaking poems.', tags: ['Poetry', 'Sports'] },
    { id: 'g7-refugee', title: 'Refugee', author: 'Alan Gratz', emoji: '🛶', pages: 352, minutes: 32, blurb: 'Three children flee three different countries in three different decades, on parallel journeys.', tags: ['Historical', 'Adventure'] },
    { id: 'g7-freak-mighty', title: 'Freak the Mighty', author: 'Rodman Philbrick', emoji: '🛡️', pages: 169, minutes: 25, blurb: 'A huge boy and a brilliant small one combine into a single unstoppable knight.', tags: ['Friendship', 'Emotional'] },
    { id: 'g7-watsons', title: 'The Watsons Go to Birmingham — 1963', author: 'Christopher Paul Curtis', emoji: '🚙', pages: 210, minutes: 28, blurb: 'A funny family road trip drives straight into a turning point in history.', tags: ['Historical', 'Family'] },
    { id: 'g7-hoot', title: 'Hoot', author: 'Carl Hiaasen', emoji: '🦉', pages: 292, minutes: 28, blurb: 'A new kid in Florida joins a strange mission to save burrowing owls from a construction site.', tags: ['Mystery', 'Nature'] },
    { id: 'g7-ender', title: "Ender's Game", author: 'Orson Scott Card', emoji: '🚀', pages: 324, minutes: 32, blurb: 'A gifted child is trained in zero gravity to command Earth’s fleet.', tags: ['Sci-Fi', 'Strategy'] }
  ],
  8: [
    { id: 'g8-mockingbird', title: 'To Kill a Mockingbird', author: 'Harper Lee', emoji: '🐦', pages: 336, minutes: 35, blurb: 'A girl watches her father defend an innocent man in a small Alabama town.', tags: ['Classic', 'Justice', 'Famous'] },
    { id: 'g8-book-thief', title: 'The Book Thief', author: 'Markus Zusak', emoji: '📖', pages: 552, minutes: 35, blurb: 'Death narrates the story of a German girl who steals books during the war.', tags: ['Historical', 'Literary'] },
    { id: 'g8-hunger-games', title: 'The Hunger Games', author: 'Suzanne Collins', emoji: '🏹', pages: 374, minutes: 32, blurb: 'A girl volunteers for a televised fight to the death and becomes a symbol.', tags: ['Dystopia', 'Series', 'Famous'] },
    { id: 'g8-animal-farm', title: 'Animal Farm', author: 'George Orwell', emoji: '🐖', pages: 112, minutes: 25, blurb: 'Farm animals overthrow the farmer, then slowly rebuild the same cage.', tags: ['Allegory', 'Classic'] },
    { id: 'g8-night', title: 'Night', author: 'Elie Wiesel', emoji: '🕯️', pages: 120, minutes: 25, blurb: 'A survivor’s spare, unflinching memoir of the concentration camps.', tags: ['Memoir', 'Historical'] },
    { id: 'g8-mice-men', title: 'Of Mice and Men', author: 'John Steinbeck', emoji: '🌾', pages: 107, minutes: 25, blurb: 'Two migrant workers carry one shared dream across Depression-era California.', tags: ['Classic', 'Friendship'] },
    { id: 'g8-part-time-indian', title: 'The Absolutely True Diary of a Part-Time Indian', author: 'Sherman Alexie', emoji: '✏️', pages: 240, minutes: 28, blurb: 'A cartoonist leaves his reservation school for an all-white high school and lives between two worlds.', tags: ['Coming of Age', 'Humor'] },
    { id: 'g8-long-way-down', title: 'Long Way Down', author: 'Jason Reynolds', emoji: '🛗', pages: 306, minutes: 22, blurb: 'Sixty seconds in an elevator, seven floors, seven ghosts, one decision.', tags: ['Poetry', 'Powerful'] },
    { id: 'g8-flowers-algernon', title: 'Flowers for Algernon', author: 'Daniel Keyes', emoji: '🐀', pages: 311, minutes: 30, blurb: 'An experiment triples a man’s intelligence, and his journal records everything that follows.', tags: ['Sci-Fi', 'Emotional'] },
    { id: 'g8-miracle-worker', title: 'The Miracle Worker', author: 'William Gibson', emoji: '🤟', pages: 128, minutes: 25, blurb: 'A stubborn teacher fights to reach a deaf-blind child through one word: water.', tags: ['Drama', 'Biography'] }
  ],
  9: [
    { id: 'g9-romeo-juliet', title: 'Romeo and Juliet', author: 'William Shakespeare', emoji: '🌹', pages: 281, minutes: 30, blurb: 'Two teenagers from feuding families fall in love in four days.', tags: ['Drama', 'Shakespeare'] },
    { id: 'g9-fahrenheit', title: 'Fahrenheit 451', author: 'Ray Bradbury', emoji: '🔥', pages: 194, minutes: 30, blurb: 'A fireman whose job is burning books begins to hide one.', tags: ['Dystopia', 'Classic'] },
    { id: 'g9-lord-flies', title: 'Lord of the Flies', author: 'William Golding', emoji: '🐚', pages: 224, minutes: 30, blurb: 'Schoolboys stranded on an island build a society and then dismantle it.', tags: ['Allegory', 'Classic'] },
    { id: 'g9-odyssey', title: 'The Odyssey', author: 'Homer', emoji: '⛵', pages: 541, minutes: 35, blurb: 'One soldier takes ten years to sail home, meeting monsters and gods on the way.', tags: ['Epic', 'Mythology'] },
    { id: 'g9-speak', title: 'Speak', author: 'Laurie Halse Anderson', emoji: '🌳', pages: 208, minutes: 28, blurb: 'A ninth grader stops speaking after a party, and slowly finds her way back to words.', tags: ['Coming of Age', 'Powerful'] },
    { id: 'g9-mango-street', title: 'The House on Mango Street', author: 'Sandra Cisneros', emoji: '🏠', pages: 110, minutes: 22, blurb: 'Short bright chapters build a portrait of a girl and her Chicago neighborhood.', tags: ['Literary', 'Vignettes'] },
    { id: 'g9-anthem', title: 'Anthem', author: 'Ayn Rand', emoji: '🕯️', pages: 105, minutes: 22, blurb: 'In a world without the word "I," one man rediscovers it.', tags: ['Dystopia', 'Short'] },
    { id: 'g9-kite-runner', title: 'The Kite Runner', author: 'Khaled Hosseini', emoji: '🪁', pages: 371, minutes: 35, blurb: 'A betrayal in Kabul follows a man across decades and continents.', tags: ['Literary', 'Redemption'] },
    { id: 'g9-separate-peace', title: 'A Separate Peace', author: 'John Knowles', emoji: '🌲', pages: 204, minutes: 28, blurb: 'At a boarding school during wartime, friendship and envy grow on the same branch.', tags: ['Classic', 'Coming of Age'] },
    { id: 'g9-things-fall-apart', title: 'Things Fall Apart', author: 'Chinua Achebe', emoji: '🌍', pages: 209, minutes: 30, blurb: 'A proud Igbo leader watches colonialism arrive and his world change shape.', tags: ['Literary', 'World Lit'] }
  ],
  10: [
    { id: 'g10-julius-caesar', title: 'Julius Caesar', author: 'William Shakespeare', emoji: '🗡️', pages: 208, minutes: 30, blurb: 'Friends conspire against a rising leader, then discover what they have unleashed.', tags: ['Drama', 'Shakespeare'] },
    { id: 'g10-catcher', title: 'The Catcher in the Rye', author: 'J. D. Salinger', emoji: '🧢', pages: 277, minutes: 30, blurb: 'Three days in New York with the most famous unreliable teenage narrator.', tags: ['Classic', 'Coming of Age'] },
    { id: 'g10-frankenstein', title: 'Frankenstein', author: 'Mary Shelley', emoji: '⚗️', pages: 280, minutes: 32, blurb: 'A student builds a living creature and then refuses to be responsible for it.', tags: ['Gothic', 'Classic'] },
    { id: 'g10-antigone', title: 'Antigone', author: 'Sophocles', emoji: '⚖️', pages: 128, minutes: 25, blurb: 'A woman defies the king’s law to bury her brother.', tags: ['Greek Drama', 'Justice'] },
    { id: 'g10-fences', title: 'Fences', author: 'August Wilson', emoji: '⚾', pages: 112, minutes: 25, blurb: 'A former Negro Leagues player builds a fence around his 1950s Pittsburgh yard and his family.', tags: ['Drama', 'Pulitzer'] },
    { id: 'g10-alchemist', title: 'The Alchemist', author: 'Paulo Coelho', emoji: '🐫', pages: 208, minutes: 25, blurb: 'A shepherd crosses the desert chasing a recurring dream of treasure.', tags: ['Fable', 'World Lit'] },
    { id: 'g10-1984', title: '1984', author: 'George Orwell', emoji: '👁️', pages: 328, minutes: 35, blurb: 'A clerk who edits the past starts keeping a private diary in a surveillance state.', tags: ['Dystopia', 'Famous'] },
    { id: 'g10-jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë', emoji: '🕯️', pages: 532, minutes: 35, blurb: 'An orphaned governess refuses to be small, even when she loves.', tags: ['Classic', 'Gothic'] },
    { id: 'g10-hamlet', title: 'Hamlet', author: 'William Shakespeare', emoji: '💀', pages: 342, minutes: 32, blurb: 'A prince meets his father’s ghost and spends five acts deciding what to do.', tags: ['Drama', 'Shakespeare'] },
    { id: 'g10-life-of-pi', title: 'Life of Pi', author: 'Yann Martel', emoji: '🐯', pages: 319, minutes: 32, blurb: 'A boy shares a lifeboat with a Bengal tiger for 227 days, or does he?', tags: ['Adventure', 'Philosophy'] }
  ],
  11: [
    { id: 'g11-gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', emoji: '🥂', pages: 180, minutes: 28, blurb: 'A mysterious millionaire throws enormous parties for an audience of one.', tags: ['American Classic', 'Famous'] },
    { id: 'g11-scarlet-letter', title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', emoji: '🅰️', pages: 279, minutes: 32, blurb: 'A Puritan woman wears her punishment stitched onto her dress and refuses to name the father.', tags: ['American Classic', 'Symbolism'] },
    { id: 'g11-crucible', title: 'The Crucible', author: 'Arthur Miller', emoji: '🔥', pages: 143, minutes: 28, blurb: 'Salem’s witch trials, written as a mirror for a later American panic.', tags: ['Drama', 'Allegory'] },
    { id: 'g11-their-eyes', title: 'Their Eyes Were Watching God', author: 'Zora Neale Hurston', emoji: '�storm', pages: 219, minutes: 30, blurb: 'A woman tells her own story through three marriages and one hurricane.', tags: ['American Classic', 'Voice'] },
    { id: 'g11-huck-finn', title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain', emoji: '🛶', pages: 366, minutes: 32, blurb: 'A boy and a man escaping slavery float down the Mississippi together.', tags: ['American Classic', 'Satire'] },
    { id: 'g11-macbeth', title: 'Macbeth', author: 'William Shakespeare', emoji: '🗡️', pages: 249, minutes: 30, blurb: 'A prophecy, an ambitious couple, and a crown that costs everything.', tags: ['Drama', 'Shakespeare'] },
    { id: 'g11-beloved', title: 'Beloved', author: 'Toni Morrison', emoji: '🏚️', pages: 324, minutes: 35, blurb: 'A formerly enslaved woman’s house is haunted by what she survived.', tags: ['Literary', 'Pulitzer'] },
    { id: 'g11-salesman', title: 'Death of a Salesman', author: 'Arthur Miller', emoji: '🧳', pages: 144, minutes: 28, blurb: 'An aging salesman’s memories crowd into his last day.', tags: ['Drama', 'American Dream'] },
    { id: 'g11-walden', title: 'Walden', author: 'Henry David Thoreau', emoji: '🌲', pages: 352, minutes: 30, blurb: 'Two years in a cabin by a pond, and a long argument for living deliberately.', tags: ['Essay', 'Transcendentalism'] },
    { id: 'g11-bell-jar', title: 'The Bell Jar', author: 'Sylvia Plath', emoji: '🫙', pages: 244, minutes: 30, blurb: 'A talented young woman in 1950s New York describes her own descent with terrible clarity.', tags: ['Literary', 'Semi-autobiographical'] }
  ],
  12: [
    { id: 'g12-brave-new-world', title: 'Brave New World', author: 'Aldous Huxley', emoji: '🧪', pages: 311, minutes: 32, blurb: 'A society engineered for happiness has no room for anyone who wants to suffer.', tags: ['Dystopia', 'Classic'] },
    { id: 'g12-pride-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', emoji: '💌', pages: 279, minutes: 32, blurb: 'Two people misjudge each other beautifully for four hundred pages.', tags: ['Classic', 'Romance'] },
    { id: 'g12-heart-darkness', title: 'Heart of Darkness', author: 'Joseph Conrad', emoji: '🚢', pages: 96, minutes: 25, blurb: 'A voyage up the Congo River toward a man who has become a legend and a warning.', tags: ['Modernist', 'Colonialism'] },
    { id: 'g12-invisible-man', title: 'Invisible Man', author: 'Ralph Ellison', emoji: '💡', pages: 581, minutes: 35, blurb: 'A nameless narrator moves through a country that refuses to see him.', tags: ['American Classic', 'Literary'] },
    { id: 'g12-slaughterhouse', title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', emoji: '🛸', pages: 275, minutes: 30, blurb: 'A war survivor comes unstuck in time and lives his life out of order.', tags: ['Anti-war', 'Postmodern'] },
    { id: 'g12-wuthering', title: 'Wuthering Heights', author: 'Emily Brontë', emoji: '🌬️', pages: 416, minutes: 35, blurb: 'Love and revenge on the moors, told through two generations of one grudge.', tags: ['Gothic', 'Classic'] },
    { id: 'g12-handmaids', title: "The Handmaid's Tale", author: 'Margaret Atwood', emoji: '🔴', pages: 311, minutes: 32, blurb: 'A theocracy assigns women to roles, and one of them narrates from inside hers.', tags: ['Dystopia', 'Famous'] },
    { id: 'g12-crime-punishment', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', emoji: '🪓', pages: 671, minutes: 40, blurb: 'A student commits a murder to prove a theory, then lives inside his own conscience.', tags: ['Russian Classic', 'Psychological'] },
    { id: 'g12-hundred-years', title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', emoji: '🦋', pages: 417, minutes: 35, blurb: 'Seven generations of one family in a town where the impossible is ordinary.', tags: ['Magical Realism', 'Nobel'] },
    { id: 'g12-beowulf', title: 'Beowulf', author: 'Anonymous (trans. Seamus Heaney)', emoji: '🐉', pages: 213, minutes: 30, blurb: 'The oldest English epic: a hero, three monsters, and a very long memory.', tags: ['Epic', 'Old English'] }
  ]
};

// Fix a typo-safe emoji fallback
LIBRARY[11][3].emoji = '🌀';
