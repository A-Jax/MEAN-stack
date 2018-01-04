import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscribable } from 'rxjs/Observable';
import { Blogs } from '../../models/Blogs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})

export class IndexComponent implements OnInit {

  blogs:Observable<any>; 

  constructor
    (
    private blogService: BlogService,
    private router: Router,

  ) { }

  ngOnInit() {

    this.blogService.getBlog()
      .subscribe(data => this.blogs = data);
  
  }

  file: string;

  postBlog(title, details) {

     this.blogService.postBlog(title, details)
     .subscribe(data => this.blogs = data)
    
  }

  updateBlog(id) {
    this.blogService.updateBlog(id)
      .subscribe(data => this.blogs = data);

  }

  deleteBlog(id) {
    
      this.blogService.deleteBlog(id)
        .subscribe(data => this.blogs = data);

  }

}
