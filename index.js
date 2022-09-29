import express from 'express';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/table.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.listen(8800, () => {
  console.log('Connected');
});

app.get('/test', (req, res) => {
  res.json('it works');
});
