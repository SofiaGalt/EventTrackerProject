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

  getNumberOfRecords = () => {

    return this.runs.length;
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

  addRun = () => {

    console.log(JSON.stringify(this.newRun));

    this.runService.create(this.newRun).subscribe(
      data => {

        this.newRun = new Run();
        this.loadRuns();
      },
      fail => {
        console.error(fail);
      });
  }

  updateTodo = (run: Run, displayRun = true) => {

    this.runService.update(run).subscribe(
      data => {
        if(displayRun){
          this.selected = this.editRun;
        }
        this.editRun = null;
        this.loadRuns();
      },
      fail => {
        console.log(fail);
      }
    );
  }

  deleteRun(id: number ): void{
    this.runService.destroy(id).subscribe(
      data => {

        this.loadRuns();
      },
      fail => {}
    );
  }

}
