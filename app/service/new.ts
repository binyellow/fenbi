// app/service/news.ts
import { Service } from "egg";

export default class NewsService extends Service {
  public async list(): Promise<NewsItem[]> {
    return [];
  }
}

export interface NewsItem {
  id: number;
  title: string;
}
