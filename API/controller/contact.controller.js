import Contact from '../model/contact.model.js';

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, Email and Message are required' });
  }

  try {
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};
