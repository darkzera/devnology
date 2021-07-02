// Malandragem braba
// https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts/51114250#51114250
// In fact, i actually dont know exactly it works...
// :: In theory it is suposed to insert an new type inside this interface

declare namespace NodeJS {
    interface Global {
        testRequest: import('supertest').SuperTest<import('supertest').Test>;
    }
}
