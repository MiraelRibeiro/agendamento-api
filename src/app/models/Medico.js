// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

class Medico extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                cpf: Sequelize.STRING(11),
                nascimento: Sequelize.STRING(10),
                email: Sequelize.STRING,
                telefone: Sequelize.STRING(13),
                especializacao: Sequelize.STRING,
                diasAtendimento: Sequelize.STRING,
                horaInicio: Sequelize.STRING(8),
                horaFim: Sequelize.STRING(8),
                tempoConsulta: Sequelize.STRING(8),
                cep: Sequelize.STRING(8),
                rua: Sequelize.STRING,
                bairro: Sequelize.STRING,
                cidade: Sequelize.STRING,
                estado: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Medico',
                tableName: 'medicos',
            }
        );
        return this;
    }
}

export default Medico;
