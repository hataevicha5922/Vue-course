import { db } from '../db.js';

export const getTable = (req, res) => {
  const q = 'SELECT * FROM `taskfour`.`visitors`';

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const deleteUser = (req, res) => {};

export const updateUser = (req, res) => {};
