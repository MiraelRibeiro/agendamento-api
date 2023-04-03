import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MedicoController from './app/controllers/MedicoController';
import PacienteController from './app/controllers/PacienteController';
import AgendamentoController from './app/controllers/AgendamentoController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// validar automaticamento o token do usuário
routes.get('/sessions', authMiddleware, SessionController.index);

routes.use(authMiddleware); // todas as rotas abaixo precisarão desse middleware
// rotas de usuarios
routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.indexID);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

// rotas de medicos
routes.post('/medicos', MedicoController.store);
routes.get('/medicos', MedicoController.index);
routes.get('/medicos/:medico_id', MedicoController.indexID);
routes.put('/medicos/:medico_id', MedicoController.update);
routes.delete('/medicos/:medico_id', MedicoController.delete);

// rotas de pacientes
routes.post('/pacientes', PacienteController.store);
routes.get('/pacientes', PacienteController.index);
routes.put('/pacientes/:paciente_id', PacienteController.update);
routes.delete('/pacientes/:paciente_id', PacienteController.delete);

// rotas de agendamentos
routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos', AgendamentoController.index);
routes.get(
    '/agendamentos/medico/:medico_id',
    AgendamentoController.indexMedico
);
routes.get(
    '/agendamentos/paciente/:paciente_id',
    AgendamentoController.indexPaciente
);
routes.put('/agendamentos/:agendamento_id', AgendamentoController.update);
routes.delete('/agendamentos/:agendamento_id', AgendamentoController.delete);

export default routes;
