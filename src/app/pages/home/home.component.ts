import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { directus } from 'src/app/services/directus';
//import { formatRelativeTime } from '../../../../../shared/utils/format-relative-time.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataset } from './home.interfaces.js';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePage implements OnInit {
  faArrowRight = faArrowRight;
  hero: Record<string, any> | null = null;
  articles: Record<string, any>[] | null = null;
  totalDatasets: number = 0;
  datasets: Array<IDataset> = [];
  messageBox: any;
  tabs = [
    { title: 'Datasets' },
    { title: 'Tools' },
    { title: 'Guides' },
    { title: 'Services' },
  ];

  accordionItems: any[] = [
    { title: 'Population genomics', content: '' },
    { title: 'Command line software deployments', content: '' },
    { title: 'Best practice documentation', content: '' }
  ];

  activeTab = 0;
  contentIndex = 0;
  guides!: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    directus.auth.refreshIfExpired();
    this.newData();
    this.getDatasets();
    this.testData();
  }

  async testData() {
    const nice = await directus.auth.token;
    console.log(nice);

    const nice2 = await directus.users.me.read().then((data) => {
      console.log(data);
      console.log(directus.roles.readOne(data.role).then((another) => {
        console.log(another?.name);
      }));
    });
    console.log(directus.folders);
    console.log(directus.collections.readAll());
  }

  selectTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  //data.bioplatforms.com
  fetchDatasets(): Observable<any> {
    return this.http.get<any>(
      'https://data.bpa.test.biocommons.org.au/api/3/action/package_search?q=organization:threatened-species&sort=metadata_modified+desc'
    );
  }

  getDatasets() {
    this.fetchDatasets().subscribe((res) => {
      this.totalDatasets = res?.result?.count;
      const nice = res?.result?.results.map((item: IDataset) => {
        return {
          title: item.title,
          type: item.type,
          id: item.id,
          url: `https://data.bpa.test.biocommons.org.au/${item.type}/${item.id}`,
          notes: item.notes,
          formats: [
            ...new Set(item.resources?.map((resource) => resource.format)),
          ],
          size: this.calculateTotalSize(item.resources),
        };
      });
      this.datasets = nice;
    });
  }

  async newData() {
    this.guides = await directus
      .items('genome_assembly')
      .readByQuery({ sort: ['id'] }) || [];

    this.messageBox = await directus
      .items('tsi_dashboard_box')
      .readByQuery({ sort: ['id'] });

    const nice = await directus.items("directus_folders").readByQuery();
  }

  async fetchData() {
    const response = await directus.items('articles').readByQuery({
      fields: ['*', 'author.avatar', 'author.first_name', 'author.last_name'],
      sort: ['-publish_date'],
    });

    if (!response.data) {
      this.router.navigate(['404']);
      return;
    }

    const formattedArticles = response.data.map((article) => {
      return {
        ...article,
        publish_date: new Date(article.publish_date)
      };
    });

    const [first, ...rest] = formattedArticles;
    this.hero = first;
    this.articles = rest;
  }

  convertSizeToGiBOrTiB(sizeInBits: number): string {
    const sizeInGiB = sizeInBits / 1024 ** 3;
    const sizeInTiB = sizeInBits / 1024 ** 4;

    if (sizeInTiB >= 1) {
      return `${sizeInTiB.toFixed(2)} TiB`;
    } else {
      return `${sizeInGiB.toFixed(2)} GiB`;
    }
  }

  calculateTotalSize(resources: any[]): string {
    if (!resources.length) {
      return '';
    }
    const totalSizeInBits = resources.reduce(
      (sum, resource) => sum + resource.size,
      0
    );

    const randomForDemo = totalSizeInBits * 1024 * Math.random() * 10;
    return this.convertSizeToGiBOrTiB(randomForDemo);
  }

  selectContent(index: number) {
    this.contentIndex = index;
  }
}
