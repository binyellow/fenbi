// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportNews from '../../../app/service/News';
import ExportCrawler from '../../../app/service/crawler';
import ExportCrawlerParse from '../../../app/service/crawlerParse';
import ExportData from '../../../app/service/data';

declare module 'egg' {
  interface IService {
    news: AutoInstanceType<typeof ExportNews>;
    crawler: AutoInstanceType<typeof ExportCrawler>;
    crawlerParse: AutoInstanceType<typeof ExportCrawlerParse>;
    data: AutoInstanceType<typeof ExportData>;
  }
}
