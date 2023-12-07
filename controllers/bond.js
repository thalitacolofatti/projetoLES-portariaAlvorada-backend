import db from "../connect.js";

export const addBond = (req, res) => {
  const { alunoId, respId, principal } = req.body;

  db.query(
    'INSERT INTO autorizados SET ?',
    { alunoId, respId , principal },
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res.status(200).json({ msg: "Vínculo aluno-responsável realizado com sucesso!" });
      }
    }
  );
};

export const deleteBond = (req, res) => {
  const { motivo, alunoId, respId} = req.body;

  db.query(
    'UPDATE autorizados SET deletedAt = NOW() AND motivo = ? WHERE `alunoId` = ? AND `respId` = ?',
    [motivo, alunoId, respId],
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res.status(200).json({ msg: "Vínculo aluno-responsável deletado com sucesso." });
      }
    }
  );
};

export const getBondByAluno = (req, res) => {
  const id = req.query.id

  if(!id){
    return res.status(422).json({msg: 'Precisamos do id'});
  } 

  console.log('id:', id);

  let query;
  let params;

  query = 'SELECT a.id, a.alunoId, a.respId, r.nomeresp, r.rg, r.respImg, aluno.nomeAluno, serie.nomeserie, nivel.nome AS nivelnome, aluno.turno, aluno.alunoImg, a.principal FROM autorizados AS a JOIN aluno, serie, nivel, responsaveis AS r WHERE a.respId = r.id AND a.alunoId = aluno.id AND serie.idserie = aluno.serieid AND nivel.idnivel = serie.nivelid AND r.deletedAt IS NULL AND a.deletedAt IS NULL AND aluno.id = ? ORDER BY r.nomeresp ASC';
  params = [id];

  db.query(query, params, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
      });
    } else if (data.length > 0) {
      console.log('Result: ', data);

      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ msg: "Nenhum resultado encontrado." });
    }
  });
};

export const getBondByGuardian = (req, res) => {
const id = req.query.id

  if(!id){
    return res.status(422).json({msg: 'Precisamos do id'});
  } 

  console.log('id:', id);

  let query;
  let params;

  query = 'SELECT a.id, a.alunoId, a.respId, r.nomeresp, r.rg, r.respImg, aluno.nomeAluno, serie.nomeserie, nivel.nome AS nivelnome, aluno.turno, aluno.alunoImg, a.principal FROM autorizados AS a JOIN aluno, serie, nivel, responsaveis AS r WHERE a.respId = r.id AND a.alunoId = aluno.id AND serie.idserie = aluno.serieid AND nivel.idnivel = serie.nivelid AND r.deletedAt IS NULL AND a.deletedAt IS NULL AND r.id = ? ORDER BY aluno.nomeAluno ASC';
  params = [id];

  db.query(query, params, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
      });
    } else if (data.length > 0) {
      console.log('Result: ', data);

      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ msg: "Nenhum resultado encontrado." });
    }
  });
};