export const user = (req, res) => {
  res.json({
    user: {
      name: 'Sakebul islam',
      age: 25,
      location: 'Dhaka',
    },
  });
};
