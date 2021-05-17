import { DataService } from "./services/data.service";
import { Component } from "@angular/core";

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
  providers: [DataService],
})

export class AppComponent {
}
