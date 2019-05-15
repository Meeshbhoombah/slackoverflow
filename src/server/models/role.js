module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN,
    canVerify: DataTypes.BOOLEAN
  }, {
    tableName: 'roles',
    underscored: true,
  });

  Role.associate = function(models) {
    Role.hasMany(models.Member, {
      foreignKey: 'role_id',
      as: 'members'
    });
  };

  return Role
}
