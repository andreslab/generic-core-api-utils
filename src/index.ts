import express from 'express';
import IndexRoutes from './routes';

//initializations
const app = express();

//settings
app.set('port', 3001);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get('/', (req, res) => res.send("UTILS"));
app.use('/api', IndexRoutes); //use funciona para objetos con mutltiples rutas

//statis files

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});