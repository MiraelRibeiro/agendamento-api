module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('medicos', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING(11),
                allowNull: false,
            },
            nascimento: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            telefone: {
                type: Sequelize.STRING(13),
                allowNull: false,
            },
            especializacao: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            diasAtendimento: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            horaInicio: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            horaFim: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            tempoConsulta: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            cep: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            rua: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            estado: {
                type: Sequelize.STRING,
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

    down: (queryInterface) => queryInterface.dropTable('medicos'),
};
