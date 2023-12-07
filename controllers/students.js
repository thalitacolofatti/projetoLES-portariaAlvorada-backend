import db from '../connect.js';

export const getAluno = (req, res) => {
  const id = req.query.id

  let query;
  let params;

  if(!id){
    query = 'SELECT aluno.id, aluno.matricula, aluno.nomeAluno, serie.nomeserie, nivel.nome AS nivel, aluno.turno, aluno.alunoImg FROM aluno JOIN serie ON serie.idserie = aluno.serieid JOIN nivel ON nivel.idnivel = serie.nivelid ORDER BY aluno.nomeAluno ASC';
  } else {
    query = 'SELECT aluno.id, aluno.matricula, aluno.nomeAluno, serie.nomeserie, nivel.nome AS nivel, aluno.turno, aluno.alunoImg FROM aluno JOIN serie ON serie.idserie = aluno.serieid JOIN nivel ON nivel.idnivel = serie.nivelid WHERE aluno.id = ? ORDER BY aluno.nomeAluno ASC'; 
    params = [id]; 
  }
  
  db.query(query, params, (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
          });
      } else if (data) {
        return res.status(200).json(data);
      }
    }
  );
};