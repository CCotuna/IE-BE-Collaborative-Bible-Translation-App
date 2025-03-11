import { sequelize } from "./db.js";

import { User } from "./models/user.model.js";
import { UserAccess } from "./models/user.access.model.js";
import { Project } from "./models/project.model.js";
import { Notification } from "./models/notification.model.js";
import { Fragment } from "./models/fragment.model.js";
import { Comment } from "./models/comment.model.js";
import { BibleBook } from "./models/bible.book.model.js";
import { BibleChapter } from "./models/bible.chapter.model.js";

// User.hasMany(UserAccess, { foreignKey: "userId", onDelete: "CASCADE"});
// UserAccess.belongsTo(User, { foreignKey: "userId"})

// Project.hasMany(UserAccess, { foreignKey: "projectId", onDelete: "CASCADE"});
// UserAccess.belongsTo(Project, { foreignKey: "projectId"})

sequelize.sync({ force: true }).then(() => {
  console.log("FINISHED SUCCESS");
  process.exit(0);
});