module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Vol',{
    id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    vpl: { type: Sequelize.INTEGER,
          references: {
             // This is a reference to another model
             model: Pilote,
             // This is the column name of the referenced model
             key: 'id'
           }
         },
    vpl: { type: Sequelize.INTEGER,}
  },{

  });

}
