module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('agendamentos', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            data: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            hora: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            medico: {
                type: Sequelize.INTEGER,
                references: { model: 'medicos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            paciente: {
                type: Sequelize.INTEGER,
                references: { model: 'pacientes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => queryInterface.dropTable('agendamentos'),
};
