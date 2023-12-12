import { Controller, Get, Render, Body, Post } from '@nestjs/common';
import * as mysql from 'mysql2';
import { AppService } from './app.service';
import { ujzeneDto } from './ujzeneDto'

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zene',
}).promise();


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() {
    const [adatok, mezok] = await conn.execute('select id, title, artist, lenght FROM zene');
    return { title: 'Zene lista', zenek: adatok };
  }

  @Get('/ujzene')
  @Render('ujzene')
  ujgyerek() {
    return { title: 'Új zene felvétele' };
  }

  @Post('/ujzene')
  async ujGyerek(@Body() ujzene: ujzeneDto) {
    const title = ujzene.title;
    const artist = ujzene.artist;
    const lenght = ujzene.lenght;
    const [ adatok ] = await conn.execute(
      'INSERT INTO zene (title, artist, lenght) VALUES (?, ?, ?)',
      [title, artist, lenght],
    );
    console.log(adatok);
    return {};
  }
}
