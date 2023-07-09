// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCrawler from '../../../app/controller/crawler';
import ExportCrawlerParse from '../../../app/controller/crawlerParse';
import ExportData from '../../../app/controller/data';
import ExportNews from '../../../app/controller/news';
import ExportTimu from '../../../app/controller/timu';
import ExportPdfIndex from '../../../app/controller/pdf/index';

declare module 'egg' {
  interface IController {
    crawler: ExportCrawler;
    crawlerParse: ExportCrawlerParse;
    data: ExportData;
    news: ExportNews;
    timu: ExportTimu;
    pdf: {
      index: ExportPdfIndex;
    }
  }
}
