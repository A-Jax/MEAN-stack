import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Blogs } from '../models/Blogs';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpClient

  ) {

  }


  getBlog(): any {

    return this.http.get<any>('/blogs')
  }

  postBlog(title, details): any {
    return this.http.post<any>('/blogs', {
      title: title,
      details: details,
      date: Date.now()
    })
  }

  updateBlog(id): any {
    return this.http.put<any>('/blogs/update', {
      id: id,
      title: 'new title',
      details: 'new details'

    })
  }

  deleteBlog(id): any {

    return this.http.post<any>('/blogs/delete', {
      id: id

    })
  }

}
