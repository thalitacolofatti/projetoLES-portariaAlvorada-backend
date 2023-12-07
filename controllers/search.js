import db from '../connect.js';

export const buscaAluno = (req, res) => {
  const params = "%" + req.query.params + "%";

  if(!params){
    return res.status(422).json({msg: 'Precisamos do parâmetro'});
  }
  db.query(
    'SELECT nomeAluno, id FROM aluno WHERE nomeAluno LIKE ? ORDER BY nomeAluno ASC', 
    [params],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
          });
      } else {
        return res.status(200).json(data);
      }
    }
  );
};

export const buscaResponsavel = (req, res) => {
  const params = "%" + req.query.params + "%";

  if(!params){
    return res.status(422).json({msg: 'Precisamos do parâmetro'});
  }

  db.query(
    'SELECT nomeresp, id FROM responsaveis WHERE nomeresp LIKE ? AND deletedAt IS NULL ORDER BY nomeresp ASC', 
    [params],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
          });
      } else {
        return res.status(200).json(data);
      }
    }
  );
};