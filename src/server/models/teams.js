module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Teams', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: {
        name: 'team_id',
        msg: 'A Team with this ID already exists.',
      }
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
  },  {
    tableName: 'teams',
    underscored: true,
  });

  return Team
}
