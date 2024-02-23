import { nanoid } from "nanoid";

class Course {
    constructor(id, {
        courseName, category, price, language, email, stack, teachingAssists
    }){
        this.id = id
        this.courseName = courseName
        this.category = category
        this.price = price
        this.language = language
        this.email = email
        this.stack = stack
        this.teachingAssists = teachingAssists
    }
}

const courseholder = {
}

const resolvers = {
    getCourse : ({ id }) => {
        return new Course(id, courseholder[id])
    },
    createCourse: ({ input }) => {
        let id = nanoid()
        courseholder[id] = input
        return new Course(id, input)
    },
    getAllCourses: () => {
        return Object.keys(courseholder).map(id => new Course(id, courseholder[id]));
    },
    deleteCourse: ({ id }) => {
        const courseToDelete = courseholder[id];
        if (!courseToDelete) {
          throw new Error(`Course with ID ${id} not found`);
        }
        console.log("course deleted",id);
        delete courseholder[id];
        return true; // Return true to indicate successful deletion
    },
    updateCourse: ({ id, input }) => {
        if (!courseholder[id]) {
          throw new Error(`Course with ID ${id} not found`);
        }
        console.log("course updated",id);
        courseholder[id] = input;
        return new Course(id, input);
      },
}

export default resolvers;