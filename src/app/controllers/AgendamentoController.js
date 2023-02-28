import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import DataAtual from '../functions/DataAtual';

class AgendamentoController {
    async index(request, response) {
        const datahoje = DataAtual;

        try {
            const agendamentos = await Agendamento.findAll({
                where: {
                    data: {
                        [Op.gte]: datahoje, // Op.gte representa ">=" E Op.lte representa "<="
                    },
                },
            });
            return response.json(agendamentos);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async indexPaciente(request, response) {
        const { paciente_id } = request.params;
        try {
            const agendamentos = await Agendamento.findAll({
                attributes: ['id', 'data', 'hora', 'medico', 'paciente'],
                where: { paciente: paciente_id },
            });

            if (agendamentos.length <= 0) {
                return response.status(400).json({
                    error: 'Não foi encontrado agendamentos referentes a este paciente!',
                });
            }
            return response.json(agendamentos);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async indexMedico(request, response) {
        const { medico_id } = request.params;

        try {
            const agendamentos = await Agendamento.findAll({
                where: { medico: medico_id },
            });
            if (agendamentos.length <= 0) {
                return response.status(400).json({
                    error: 'Não foi encontrado agendamentos referentes a este médico!',
                });
            }
            return response.json(agendamentos);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async store(request, response) {
        const agendamento = request.body;

        try {
            const agendamentos = await Agendamento.create(agendamento);

            return response.json(agendamentos);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request, response) {
        const { agendamento_id } = request.params;

        try {
            const agendamento = await Agendamento.findByPk(agendamento_id);

            if (!agendamento) {
                return response
                    .status(400)
                    .json({ error: 'Agendamento não existe.' });
            }
            await agendamento.update(request.body);

            return response.json(agendamento);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async delete(request, response) {
        const { agendamento_id } = request.params;

        try {
            const agendamento = await Agendamento.findByPk(agendamento_id);

            if (!agendamento) {
                return response
                    .status(400)
                    .json({ error: 'Agendamento não existe.' });
            }

            await agendamento.destroy();
            return response.send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}

export default new AgendamentoController();
