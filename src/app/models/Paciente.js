// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

class Paciente extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                cpf: Sequelize.STRING(11),
                nascimento: Sequelize.STRING(10),
                email: Sequelize.STRING,
                telefone: Sequelize.STRING(13),
                convenio: Sequelize.BOOLEAN,
                convenioNome: Sequelize.STRING,
                cep: Sequelize.STRING(8),
                rua: Sequelize.STRING,
                bairro: Sequelize.STRING,
                cidade: Sequelize.STRING,
                estado: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Paciente',
                tableName: 'pacientes',
            }
        );
        return this;
    }
}

export default Paciente;
