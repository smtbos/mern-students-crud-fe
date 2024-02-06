import ApiClient from "./ApiClient";

class StudentsAPI extends ApiClient {
    constructor() {
        super('students');
    }

    updateProfile(id, body) {
        return this.update(id, body, '/profile');
    }
}

const studentsAPI = new StudentsAPI();
export default studentsAPI;