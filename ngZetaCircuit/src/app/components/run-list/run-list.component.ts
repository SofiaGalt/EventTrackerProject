import { Component, OnInit } from '@angular/core';
import { Run } from 'src/app/models/run';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.css']
})
export class RunListComponent implements OnInit {

  runs: Run[] = [];

  selected: Run = null;
  newRun: Run = new Run();
  editRun: Run = null;
  showComplete = false;

  constructor(private runService: RunService) { }

  ngOnInit(): void {

    this.loadRuns();
  }

  loadRuns(): void {

    this.runService.index().subscribe(
      data => {
        this.runs = data;
      },
      fail => {
        console.log(fail);
      }
    );
  }

}
