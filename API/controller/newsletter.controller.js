import Newsletter from '../model/newsletter.model.js';

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
