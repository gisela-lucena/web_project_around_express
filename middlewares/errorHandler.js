export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Dados invalidos', 
      error: err.message 
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      message: 'ID inválido', 
      error: err.message 
    });
  }

  return res.status(500).json({ 
    message: 'Erro interno do servidor' 
  });
};
