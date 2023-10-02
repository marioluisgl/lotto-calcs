import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Draw, IDraw } from '~/models/draw.model';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EnumPlay } from '~/models/utils.model';
import { LottoResultsService } from '~/services/lotto-results.service';
import { cloneDeep } from 'lodash-es';
import { Helpers } from '~/core/utils/helpers';
import { HandleDrawService } from '~/services/handle-draw.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ResultItemComponent } from '~/components/shared/result-item/result-item.component';

@Component({
  selector: 'app-add-draw',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    TranslateModule,
    ResultItemComponent
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './add-draw.component.html',
  styleUrls: ['./add-draw.component.scss']
})
export class AddDrawComponent implements OnInit {
  private _resultService = inject(LottoResultsService);

  formAddDraw: FormGroup;
  modelData: IDraw;
  isEdit: boolean;
  showImportBox = false;
  showlist = false;

  selectedPlay = this._resultService.getSelectedPlay;
  resultsToImport = this._resultService.getDataToImport;

  play = EnumPlay;
  year: number | null = 2023;

  constructor(private _dialogRef: MatDialogRef<AddDrawComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any,
              private _handleDrawService: HandleDrawService,
              private _fb: FormBuilder,
              private _translate: TranslateService) { 
    this.modelData = _data.modelData;
    this.isEdit = _data.isEdit;
  }

  ngOnInit(): void {
    this.modelData = null == this.modelData ? new Draw() : this.modelData;
    this.formAddDraw = this._addFormGroup();
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.year = Number(value);
  }


  addDraw() {
    const numbers = [];
    this.modelData.ball = Number(this.formAddDraw.get('ball').value)
    this.modelData.type = this.selectedPlay();

    if (this.formAddDraw.get('number1').value) {
      numbers?.push(Number(this.formAddDraw.get('number1').value));
      this.formAddDraw.get('number1').setValue('');
    }

    if (this.formAddDraw.get('number2').value) {
      numbers?.push(Number(this.formAddDraw.get('number2').value));
      this.formAddDraw.get('number2').setValue('');
    }

    if (this.formAddDraw.get('number3').value) {
      numbers?.push(Number(this.formAddDraw.get('number3').value));
      this.formAddDraw.get('number3').setValue('');
    }

    if (this.formAddDraw.get('number4').value) {
      numbers?.push(Number(this.formAddDraw.get('number4').value));
      this.formAddDraw.get('number4').setValue('');
    }

    if (this.formAddDraw.get('number5').value) {
      numbers?.push(Number(this.formAddDraw.get('number5').value));
      this.formAddDraw.get('number5').setValue('');
    }

    if (numbers.length < 5) {
      return;
    }else {
      this.modelData.numbers = numbers;
      this.modelData.year = this.year;
      this.formAddDraw.get('ball').setValue('');
      let modelDataCopy = cloneDeep(this.modelData);

      modelDataCopy = Helpers.convertToStringify(Helpers.removeNulls(modelDataCopy));
      this._handleDrawService.saveDraw({data: modelDataCopy}).subscribe({
        next: (data) => {
          if (data._id) {
            console.log(data);
            this._resultService.loadResults(this.selectedPlay());
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  loadDrawings() {
    this._resultService.loadDataToImport(this.selectedPlay());
    this.showlist = true;
  }

  importDrawings() {
    const obj = {
      draws: this.resultsToImport(),
    }
    const  modelDataCopy = Helpers.convertToStringify(obj);
    console.log(modelDataCopy);
    this._handleDrawService.importDrawings({data: modelDataCopy}).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this._resultService.loadResults(this.selectedPlay());
          this.showlist = false;
          this._dialogRef.close();
        }
      },
      error: (e) => {
        this.showlist = false;
        this._dialogRef.close();
        console.log(e);
      },
    });
  }


  private _addFormGroup(): FormGroup {
    return this._fb.group({
      type: [this.modelData.type, []],
      year: [this.modelData.year, [Validators.required]],
      number1: [this.modelData.numbers[0], [Validators.required]],
      number2: [this.modelData.numbers[1], [Validators.required]],
      number3: [this.modelData.numbers[2], [Validators.required]],
      number4: [this.modelData.numbers[3], [Validators.required]],
      number5: [this.modelData.numbers[4], [Validators.required]],
      ball: [this.modelData.ball, [Validators.required]],
    });
  }
}
