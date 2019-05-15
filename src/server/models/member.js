module.exports = (sequelize, DataTypes) => {
  var Member = sequelize.define('Member', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: {
        name: 'member_id',
        msg: 'A Member with this ID already exists.',
      }
    },
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: DataTypes.STRING,
    teamId: DataTypes.STRING
  }, {
    hooks: {
      afterUpdate: (user, options) => {
        console.log(user);
      }
    },
    tableName: 'members',
    underscored: true,
  });

  Member.associate = function(models) {
    Member.belongsTo(models.Team, {
      foreignKey: 'team_id',
      as: 'team'
    });

    Member.belongsTo(models.Role, {
      foereignKey: 'role_id',
      as: 'role'
    });
  };

  return Member
}
