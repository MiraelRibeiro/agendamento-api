// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
    async index(request, response) {
        return response.json({
            message: 'Validação de token de usuário concluída!',
        });
    }

    async store(request, response) {
        const { user_name, password } = request.body;

        const user = await User.findOne({ where: { user_name } });

        if (!user) {
            return response.status(401).json({ error: 'Usuário não existe!' });
        }

        if (!(await user.checkPassword(password))) {
            return response.status(401).json({ error: 'Senha incorreta!' });
        }

        const { id, full_name, type_user } = user;

        return response.json({
            user: {
                id,
                full_name,
                user_name,
                type_user,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
