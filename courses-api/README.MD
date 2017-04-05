Routes to develop

GET     /courses
POST    /courses

GET     /courses/:id
PUT     /courses/:id
DELETE  /courses/:id

GET     /courses/:id/authors
POST    /courses/:id/authors

DELETE  /courses/:id/authors/:authorId



GET     /authors
POST    /authors

GET     /authors/:id
PUT     /authors/:id
DELETE  /authors/:id

GET     /authors/:id/courses
POST    /authors/:id/courses

DELETE  /authors/:id/courses/:courseId

