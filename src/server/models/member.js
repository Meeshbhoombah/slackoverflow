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


  function isStaff(email) {
    return email.includes('@makeschool.com');
  };

  // set role for Member (options: Student, Adminstration) based off email
  Member.beforeCreate(async function(member, options) {
    // TODO: rewrite to remove duplication
    if (isStaff(member.email)) {
      sequelize.models.Role.findOne({
        where: {
          name: 'ADMINISTRATOR' 
        } 
      })
      .then((role) => {
        member.roleId = role.id; 
      })
      .catch((err) => {
        console.error(`🚨 FAILED TO ASSIGN ROLE`, (err.messages || err)); 
      })
    } else {
      await sequelize.models.Role.findOne({
        where: {
          isDefault: true 
        } 
      })
      .then((role) => {
        member.roleId = role.id; 
      })
      .catch((err) => {
        console.error(`🚨 FAILED TO ASSIGN ROLE`, (err.messages || err)); 
      })
    }
  });

  return Member
}
