let name = 'Igor';
name = 'Dmirty';

const isAdmin = true;

// Примитивы - строки, чиста, boolean.
// Объекты - объекты, массивы, прототипы примитивов.
// null - дефолтное значение, используемое до загрузки объекта.
// undefined

const user = {
    id: 1,
    firstName: 'Igor',
    lastName: 'Tukhtametov',
    patronymic: 'Tamirovich',
    age: 18,
    gender: 'male',
    getFullName() {
        return `${this.lastName} ${this.firstName} ${this.patronymic}`;
    }
}




function todoSmth(callback) {
    if(callback) {
        callback();
    }
}