module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Teams', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    token: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    name: DataTypes.STRING,
    chanId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chanName: DataTypes.STRING, 
  });

  return Team
}
