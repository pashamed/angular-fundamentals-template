import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  searchValue: string = "";
  @Input() placeholder: string = "";
  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch(): void {
    this.search.emit(this.searchValue);
    console.log(this.searchValue);
  }
  isAdmin: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit() {
    // Subscribe to the isAdmin$ observable to get the latest admin status
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  addNewCourse(){
    this.router.navigate(['/course-form'])
  }
}
