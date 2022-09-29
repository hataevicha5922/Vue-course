import express from 'express';
import { deleteUser, getTable, updateUser } from '../controllers/table.js';

const router = express.Router();

router.get('/', getTable);
router.delete('/:id', deleteUser);
router.get('/:id', updateUser);

export default router;
