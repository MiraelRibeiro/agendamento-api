import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
    async index(request, response) {
        let users = null;

        const { nome } = request.body;

        if (nome) {
            try {
                users = await User.findAll({
                    attributes: [
                        'id',
                        'full_name',
                        'user_name',
                        'type_user',
                        'medico_id',
                    ],
                    where: {
                        full_name: {
                            [Op.iLike]: `%${String(nome).toLowerCase()}%`,
                        },
                    },
                });

                if (users.length <= 0) {
                    return response.status(204).json();
                }

                return response.json(users);
            } catch (error) {
                return response.status(400).json({
                    title: 'Erro so buscar dados',
                    error,
                });
            }
        }

        try {
            users = await User.findAll({
                attributes: [
                    'id',
                    'full_name',
                    'user_name',
                    'type_user',
                    'medico_id',
                ],
            });
            return response.json(users);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async indexID(request, response) {
        let users = null;

        const { user_id } = request.params;

        try {
            users = await User.findAll({
                attributes: [
                    'id',
                    'full_name',
                    'user_name',
                    'type_user',
                    'medico_id',
                ],
                where: {
                    id: user_id,
                },
            });

            if (users.length <= 0) {
                return response.status(204).json();
            }

            return response.json(users);
        } catch (error) {
            return response.status(400).json({
                title: 'Erro so buscar dados',
            });
        }
    }

    async store(request, response) {
        const userExists = await User.findOne({
            where: { user_name: request.body.user_name },
        });

        if (userExists) {
            return response.status(400).json({
                title: 'Usuário inválido',
                error: 'Há um usuário já cadastrado com este user_name!',
            });
        }

        const { id, full_name, user_name } = await User.create(request.body);
        return response.json({ id, full_name, user_name });
    }

    async update(request, response) {
        const { user_name, oldPassword } = request.body;

        const user = await User.findByPk(request.userId);

        if (user_name !== user.user_name) {
            const userExists = await User.findOne({
                where: { user_name },
            });

            if (userExists) {
                return response.status(400).json({
                    title: 'Usuário inválido',
                    error: 'Há um usuário já cadastrado com este user_name!',
                });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return response.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, name } = await user.update(request.body);

        return response.json({
            id,
            name,
            user_name,
        });
    }

    async delete(request, response) {
        const { user_id } = request.body;
        let user = null;

        try {
            if (!user_id) {
                return response.status(400).json({
                    error: 'Informe o id do usuário',
                });
            }

            user = await User.findByPk(user_id);

            if (!user) {
                return response.status(400).json({
                    error: 'Usuário não encontrado',
                });
            }

            await user.destroy();
            return response.send();
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}

export default new UserController();
