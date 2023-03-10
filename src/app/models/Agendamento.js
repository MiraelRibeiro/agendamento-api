// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
    static init(sequelize) {
        super.init(
            {
                data: Sequelize.DATEONLY,
                hora: Sequelize.STRING(8),
                medicoID: Sequelize.INTEGER,
                pacienteID: Sequelize.INTEGER,
                medicoNome: Sequelize.STRING,
                pacienteNome: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Agendamento',
                tableName: 'agendamentos',
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Paciente, {
            foreignKey: 'id',
            as: 'paciente_id',
        });
        this.belongsTo(models.Medico, { foreignKey: 'id', as: 'medico_id' });
    }
}

export default Agendamento;
