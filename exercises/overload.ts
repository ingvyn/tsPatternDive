class User {
    skills: string[];

    addSkill(skill: string): void;
    addSkill(skills: string[]): void;
    addSkill(skillOrSkills: string | string[]): void {
        if (typeof skillOrSkills === 'string') {
            this.skills = [...this.skills, skillOrSkills];
        }
        this.skills = [...this.skills, ...skillOrSkills];
    }
}

const user = new User();
user.addSkill('shs');