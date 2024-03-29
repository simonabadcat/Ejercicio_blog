const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);

const Author = require("./Author");
const Comment = require("./Comment");
const Article = require("./Article");

Author.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */
Article.belongsTo(Author);
Author.hasMany(Article);
Comment.belongsTo(Article);
Article.hasMany(Comment);
sequelize.sync();

module.exports = {
  sequelize,
  Author,
  Comment,
  Article,
};
