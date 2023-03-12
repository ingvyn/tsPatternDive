"use strict";
class User {
    addSkill(skillOrSkills) {
        if (typeof skillOrSkills === 'string') {
            this.skills = [...this.skills, skillOrSkills];
        }
        this.skills = [...this.skills, ...skillOrSkills];
    }
}
const user = new User();
user.addSkill('shs');
