export const notFoundRoute = (err, req, res, next) => {
  console.error(err);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});
};
