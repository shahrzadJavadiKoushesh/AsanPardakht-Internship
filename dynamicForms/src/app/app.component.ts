import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dynamicForms';

  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({

    })
  }
}
