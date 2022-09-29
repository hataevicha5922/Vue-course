import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  const q = 'SELECT * FROM visitors WHERE email = ? OR user_name = ?';

  db.query(q, [req.body.id, req.body.email, req.body.uer_name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO `taskfour`.`visitors` (`id`, `user_name`, email, password, registr_data, visit_date, status) VALUES (?)';
    const values = [
      req.body.id,
      req.body.user_name,
      req.body.email,
      req.body.password,
      req.body.registr_data,
      req.body.visit_date,
      req.body.status,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM visitors WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json('User not found!');
    if (req.body.password !== data[0].password)
      return res.status(400).json('Wrong email or password!');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey');
    const { password, ...other } = data[0];

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const logOut = (req, res) => {};
