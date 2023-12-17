// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

import { describe } from "node:test";

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });

import { Test } from '@nestjs/testing'
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from 'pactum';

const PORT = 3002;
describe('App EndtoEnd Test', () => {
  let app: INestApplication
  let prismaService: PrismaService
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    app.listen(PORT);
    prismaService = await app.get(PrismaService)
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`)
  });

  describe('auth test', () => {
    describe('register', () => {
      it('should register', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: 'kahng@gmail.com',
            password: 'a',
            firstName : "Khang",
            lastName :  "Nguyen"
          })
          .expectStatus(201)
          // .inspect();
          .stores('token', "JWT_Token");  // store to import in next header
      })
    });
    describe('register fail', () => {
      it('should register fail if email not right format', () => {
        return pactum.spec()
          .post('/auth/login')
          .withBody({
            email: 'kahnggmail.com',
            password: 'a',
            firstName : "Khang",
            lastName :  "Nguyen"
          })
          .expectStatus(400)
          // .inspect();
      })
    });
    describe('login', () => {
      it('should login', () => {
        return pactum.spec()
          .post('/auth/login')
          .withBody({
            email: 'kahng@gmail.com',
            password: 'a',
            firstName : "Khang",
            lastName :  "Nguyen"
          })
          .expectStatus(201)
          // .inspect();
          .stores("token", "token");  // store to import in next header
      })
    });
    describe('get user info', ()=>{
      it('should get me', () => {
        return pactum.spec()
          .get('/users/me')
          .withBearerToken(`$S{token}`)
          .expectStatus(200)
          // .inspect();
      })
    });
  });

  describe('tour test', () => {
    describe('insert node', () => {});
    describe('get all node', () => {});
    describe('get node by id', () => {});
    describe('delete node', () => {});
  })

  afterAll(async () => {
    app.close()
  })
})

