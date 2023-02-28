// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                full_name: Sequelize.STRING,
                user_name: Sequelize.STRING,
                type_user: Sequelize.STRING,
                medico_id: Sequelize.INTEGER,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Users',
                tableName: 'users',
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
