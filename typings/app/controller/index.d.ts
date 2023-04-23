// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCrawler from '../../../app/controller/crawler';
import ExportNews from '../../../app/controller/news';

declare module 'egg' {
  interface IController {
    crawler: ExportCrawler;
    news: ExportNews;
  }
}
