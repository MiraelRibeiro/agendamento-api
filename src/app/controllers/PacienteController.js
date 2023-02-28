import { Op } from 'sequelize';
import Paciente from '../models/Paciente';
import Agendamento from '../models/Agendamento';
import DataAtual from '../functions/DataAtual';

class PacienteController {
    async store(request, response) {
        const userExists = await Paciente.findOne({
            where: { email: request.body.email },
        });

        if (userExists) {
            return response.status(400).json({
                title: 'E-mail inválido',
                error: 'Há um usuário já cadastrado com este email!',
            });
        }

        const { id, email, nome } = await Paciente.create(request.body);

        return response.json({ id, nome, email });
    }

    async index(request, response) {
        let pacientes = null;
        const { nome } = request.body;
        if (nome != null) {
            try {
                pacientes = await Paciente.findAll({
                    where: {
                        nome: { [Op.like]: `%${nome}%` },
                    },
                });

                return response.json(pacientes);
            } catch (error) {
                return response.status(400).json({ error });
            }
        }

        pacientes = await Paciente.findAll();
        return response.json(pacientes);
    }

    async update(request, response) {
        const { paciente_id } = request.params;

        const paciente = await Paciente.findByPk(paciente_id);

        if (!paciente) {
            return response
                .status(400)
                .json({ error: 'Paciente não encontrado no banco.' });
        }

        await paciente.update(request.body);

        return response.json({
            ok: 'Dados do paciente alterados com sucesso.',
        });
    }

    async delete(request, response) {
        const { paciente_id } = request.params;

        const paciente = await Paciente.findByPk(paciente_id);
        if (!paciente) {
            return response
                .status(400)
                .json({ error: 'Paciente não encontrado no banco.' });
        }

        const datahoje = DataAtual();

        const agendamentos = await Agendamento.findAll({
            where: {
                paciente: paciente_id,
                data: {
                    [Op.gte]: datahoje, // Op.gte representa ">=" E Op.lte representa "<="
                },
            },
        });

        if (agendamentos.length > 0) {
            return response.json({
                title: 'Há agendamentos futuros marcados',
                message:
                    'Delete os agendamentos futuros para poder excluir esse paciente',
            });
        }

        try {
            await paciente.destroy();
            return response.send();
        } catch (err) {
            return response
                .status(400)
                .json({ title: 'Erro ao excluir dados do banco.', error: err });
        }
    }
}

export default new PacienteController();
