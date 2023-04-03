import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import Medico from '../models/Medico';

class MedicoController {
    async store(request, response) {
        const userExists = await Medico.findOne({
            where: { email: request.body.email },
        });

        if (userExists) {
            return response.status(400).json({
                title: 'E-mail inválido',
                error: 'Há um usuário já cadastrado com este email!',
            });
        }

        try {
            const { id, email, nome } = await Medico.create(request.body);

            return response.json({ id, nome, email });
        } catch (err) {
            return response.status(400).json({
                title: 'Erro cadastro',
                error: err,
            });
        }
    }

    async index(request, response) {
        let medicos = null;
        const { nome } = request.body;
        if (nome) {
            try {
                medicos = await Medico.findAll({
                    where: {
                        nome: { [Op.iLike]: `%${String(nome).toLowerCase()}%` },
                    },
                });

                if (medicos.length <= 0) {
                    return response.status(204).json();
                }

                return response.json(medicos);
            } catch (error) {
                return response.status(400).json({
                    title: 'Erro so buscar dados',
                    error,
                });
            }
        }

        medicos = await Medico.findAll();
        return response.json(medicos);
    }

    async indexID(request, response) {
        let medicos = null;
        const { medico_id } = request.params;
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(medico_id)) {
            try {
                medicos = await Medico.findAll({
                    where: {
                        id: medico_id,
                    },
                });

                if (medicos.length <= 0) {
                    return response.status(204).json();
                }

                return response.json(medicos);
            } catch (error) {
                return response.status(400).json({
                    title: 'Erro so buscar dados, verifique o valor do ID.',
                });
            }
        }
        return response.status(400).json({
            title: 'Erro so buscar dados, informe o número do ID do médico',
        });
    }

    async update(request, response) {
        const { medico_id } = request.params;

        const medico = await Medico.findByPk(medico_id);

        if (!medico) {
            return response
                .status(400)
                .json({ error: 'Médico não encontrado no banco.' });
        }

        try {
            await medico.update(request.body);

            return response.json({
                ok: 'Dados do médico alterados com sucesso.',
            });
        } catch (error) {
            return response
                .status(400)
                .json({ title: 'Erro ao atualizar dados!', error });
        }
    }

    async delete(request, response) {
        const { medico_id } = request.params;

        const medico = await Medico.findByPk(medico_id);

        if (!medico) {
            return response
                .status(400)
                .json({ error: 'Médico não encontrado no banco.' });
        }

        const agendamentos = await Agendamento.findAll({
            where: { medico: medico_id },
        });

        if (agendamentos.length > 0) {
            return response.json({
                title: 'Há agendamentos futuros marcados!',
                message:
                    'Delete os agendamentos futuros para poder excluir esse médico.',
            });
        }

        try {
            await medico.destroy();
            return response.send();
        } catch (error) {
            return response
                .status(400)
                .json({ title: 'Erro ao excluir dados do banco.', error });
        }
    }
}

export default new MedicoController();
