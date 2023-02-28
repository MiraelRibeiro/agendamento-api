module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            type_user: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            medico_id: {
                type: Sequelize.INTEGER,
                references: { model: 'medicos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            password_hash: {
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

    down: (queryInterface) => queryInterface.dropTable('users'),
};
