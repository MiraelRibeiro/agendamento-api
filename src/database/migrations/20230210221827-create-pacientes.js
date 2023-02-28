module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('pacientes', {
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
            convenio: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            convenioNome: {
                type: Sequelize.STRING,
                allowNull: true,
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

    down: (queryInterface) => queryInterface.dropTable('pacientes'),
};
