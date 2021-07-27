import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';


describe('Swagger (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    afterEach(async () => {
        await app.close();
    })

    it("/api (GET)", () => {
        return request(app.getHttpServer())
            .get('/api')
            .expect(404)
            .responseType('application/json')
    })

    it("/api/v1 (GET)", async() => {
        return request(app.getHttpServer())
            .get('/api/v1')
            // .expect(200)
            // .responseType('application/json')
    })

})