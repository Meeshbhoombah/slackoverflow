async function seedRoles(db) {
  return new Promise(async (resolve, reject) => {
    const Role = db.Role; 

    let Roles = [{
      name: 'MEMBER',
      isDefault: true,
      canVerify: false
    }, {
      name: 'ADMINISTRATOR',
      isDefault: false,
      canVerify: true
    }]

    await Role.findAll()
    .then(async (roles) => {
      if (roles == undefined || roles.length == 0) {
        return await Role.bulkCreate(Roles);
      } else {
        resolve(false); 
      }
    })
    .then((roles) => {
      if (roles == undefined || roles.length == 0) {
        resolve(false);
      } else {
        resolve(true); 
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};


module.exports = async (db) => {
  return new Promise(async (resolve, reject) => {
    let didSeed = false;

    await seedRoles(db)
    .then((rolesDidSeed) => {
      resolve(rolesDidSeed);
    })
    .catch((err) => {
      reject(err);
    });
  });
};
