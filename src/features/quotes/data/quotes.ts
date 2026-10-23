import type { Quote } from '../types/quote';

export const quotes: readonly Quote[] = [
  // Happy
  { id: 'h1', moodId: 'happy', text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
  { id: 'h2', moodId: 'happy', text: 'The most wasted of all days is one without laughter.', author: 'E.E. Cummings' },
  { id: 'h3', moodId: 'happy', text: 'Count your age by friends, not years. Count your life by smiles, not tears.', author: 'John Lennon' },
  { id: 'h4', moodId: 'happy', text: 'Let your joy be a source of strength.', author: 'Unknown' },

  // Calm
  { id: 'c1', moodId: 'calm', text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
  { id: 'c2', moodId: 'calm', text: 'Breathe. Let go. And remind yourself that this very moment is all you have.', author: 'Unknown' },
  { id: 'c3', moodId: 'calm', text: 'Quiet the mind and the soul will speak.', author: 'Ma Jaya Sati Bhagavati' },
  { id: 'c4', moodId: 'calm', text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },

  // Hopeful
  { id: 'hp1', moodId: 'hopeful', text: 'Hope is being able to see that there is light despite all of the darkness.', author: 'Desmond Tutu' },
  { id: 'hp2', moodId: 'hopeful', text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { id: 'hp3', moodId: 'hopeful', text: 'No winter lasts forever; no spring skips its turn.', author: 'Hal Borland' },
  { id: 'hp4', moodId: 'hopeful', text: 'Hope smiles from the threshold of the year to come.', author: 'Alfred Lord Tennyson' },

  // Grateful
  { id: 'g1', moodId: 'grateful', text: 'Gratitude turns what we have into enough.', author: 'Aesop' },
  { id: 'g2', moodId: 'grateful', text: 'Acknowledging the good that you already have in your life is the foundation for all abundance.', author: 'Eckhart Tolle' },
  { id: 'g3', moodId: 'grateful', text: 'When I started counting my blessings, my whole life turned around.', author: 'Willie Nelson' },
  { id: 'g4', moodId: 'grateful', text: 'Gratitude is the fairest blossom which springs from the soul.', author: 'Henry Ward Beecher' },

  // Sad
  { id: 's1', moodId: 'sad', text: 'Tears come from the heart and not from the brain.', author: 'Leonardo da Vinci' },
  { id: 's2', moodId: 'sad', text: 'The word "happy" would lose its meaning if it were not balanced by sadness.', author: 'Carl Jung' },
  { id: 's3', moodId: 'sad', text: 'Even the darkest night will end and the sun will rise.', author: 'Victor Hugo' },
  { id: 's4', moodId: 'sad', text: 'You cannot protect yourself from sadness without protecting yourself from happiness.', author: 'Jonathan Safran Foer' },

  // Anxious
  { id: 'a1', moodId: 'anxious', text: 'You can’t stop the waves, but you can learn to surf.', author: 'Jon Kabat-Zinn' },
  { id: 'a2', moodId: 'anxious', text: 'Do not anticipate trouble, or worry about what may never happen.', author: 'Benjamin Franklin' },
  { id: 'a3', moodId: 'anxious', text: 'Worry does not empty tomorrow of its sorrow, it empties today of its strength.', author: 'Corrie ten Boom' },
  { id: 'a4', moodId: 'anxious', text: 'Feel the fear and do it anyway.', author: 'Susan Jeffers' },

  // Angry
  { id: 'an1', moodId: 'angry', text: 'For every minute you remain angry, you give up sixty seconds of peace of mind.', author: 'Ralph Waldo Emerson' },
  { id: 'an2', moodId: 'angry', text: 'Holding onto anger is like drinking poison and expecting the other person to die.', author: 'Buddha' },
  { id: 'an3', moodId: 'angry', text: 'Speak when you are angry and you will make the best speech you will ever regret.', author: 'Ambrose Bierce' },
  { id: 'an4', moodId: 'angry', text: 'Anger is a wind which blows out the lamp of the mind.', author: 'Robert Greene' },

  // Lonely
  { id: 'l1', moodId: 'lonely', text: 'All great and precious things are lonely.', author: 'John Steinbeck' },
  { id: 'l2', moodId: 'lonely', text: 'Loneliness does not come from having no people around, but from being unable to communicate what seems important.', author: 'Carl Jung' },
  { id: 'l3', moodId: 'lonely', text: 'The soul that sees beauty may sometimes walk alone.', author: 'Johann Wolfgang von Goethe' },
  { id: 'l4', moodId: 'lonely', text: 'You are never alone. You are eternally connected with everyone.', author: 'Amma' },
];
