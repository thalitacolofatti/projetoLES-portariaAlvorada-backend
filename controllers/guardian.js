import db from '../connect.js';

export const createGuardian = (req, res) => {
  const { nomeresp, rg, email, telefone, endereco, respImg } = req.body;

  if(!nomeresp) {
    return res
      .status(422)
      .json({msg: 'Nome completo obrigatório'});
  }
  if(!rg) {
    return res
      .status(422)
      .json({msg: 'RG obrigatório'});
  }
  if(!email) {
    return res
      .status(422)
      .json({msg: 'Email obrigatório'});
  }
  if(!telefone) {
    return res
      .status(422)
      .json({msg: 'Telefone obrigatório'});
  }
  if(!endereco) {
    return res
      .status(422)
      .json({msg: 'Endereço obrigatório'});
  }

  db.query('INSERT INTO responsaveis SET ?', { nomeresp, rg, email, telefone, endereco, respImg }, (error) => {
    if(error) {
      console.log(error);
      return res
        .status(500)
        .json({
          msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
        });
    } else {
      return res.status(200).json({msg: 'Responsável criado com sucesso!'});
    }
  });
};

export const getGuardian = (req, res) => {
  const id = req.query.id

  let query;
  let params;

  if(!id){
    query = 'SELECT r.nomeresp, r.rg, r.respImg FROM responsaveis AS r WHERE r.deletedAt IS NULL ORDER BY r.nomeresp ASC';
  } else {
    query = 'SELECT r.id, r.nomeresp, r.rg, r.email, r.telefone, r.endereco, r.respImg FROM responsaveis AS r WHERE r.id = ? AND r.deletedAt IS NULL ORDER BY r.nomeresp ASC'; 
    params = [id]; 
  }

  db.query(query, params, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
          });
      } else if (data) {
        return res.status(200).json(data);
      }
    });
};

export const updateGuardian = (req, res) => {
  const { nomeresp, email, telefone, endereco, respImg, id } = req.body

  if(!nomeresp || !email || !telefone || !endereco || !respImg){
    return res.status(422).json({msg:"Sem alterações"})
  }

  db.query(
    'UPDATE responsaveis SET nomeresp = ?, email = ?, telefone = ?, endereco = ?, respImg = ? WHERE id = ?', 
    [nomeresp, email, telefone, endereco, respImg, id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde.'
          });
      } if (data.affectedRows > 0) {
        return res.status(200).json("Atualizado com sucesso!");
      }
    }
  );
};

export const deleteGuardian = async (req, res) => {
  const id = req.query.id;

  if(!id){
    return res.status(422).json({msg:"Id do responsável necessário"})
  }

  db.query('START TRANSACTION', (error) => {
    if (error) {
      console.error('Erro ao iniciar a transação:', error);
      return res.status(500).json({
        msg: 'Aconteceu algum erro no servidor, tente novamente mais tarde.',
      });
    }
  
    db.query(
      'UPDATE responsaveis SET deletedAt = NOW() WHERE id = ?',
      [id],
      (error, deleteResponsavelResult) => {
        if (error) {
          console.error('Erro ao excluir responsável:', error);
          return rollbackAndRespond(500, 'Erro ao excluir responsável');
        }
  
        db.query(
          'UPDATE autorizados SET deletedAt = NOW() WHERE respId = ?',
          [id],
          (error, deleteAutorizadoResult) => {
            if (error) {
              console.error('Erro ao excluir autorizado:', error);
              return rollbackAndRespond(500, 'Erro ao excluir autorizado');
            }
  
            if (
              deleteResponsavelResult.affectedRows > 0 &&
              deleteAutorizadoResult.affectedRows > 0
            ) {
              return db.query('COMMIT', (error) => {
                if (error) {
                  console.error('Erro ao commitar a transação:', error);
                  return rollbackAndRespond(500, 'Erro ao commitar a transação');
                }
  
                return res.status(200).json("Responsável deletado!");
              });
            } else {
              return rollbackAndRespond(404, 'Responsável não encontrado');
            }
          }
        );
      }
    );
  });
  
  function rollbackAndRespond(statusCode, msg) {
    db.query('ROLLBACK', (error) => {
      if (error) {
        console.error('Erro ao dar rollback:', error);
      }
      return res.status(statusCode).json({ msg });
    });
  }
};
