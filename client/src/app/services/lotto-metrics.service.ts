import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { LottoResultsService } from './lotto-results.service';
import { EnumRANGEKeys, IBallResults, IDecenasResults, IPaginator, IRangeResults } from '~/models/utils.model';

@Injectable({
  providedIn: 'root'
})
export class LottoMetricsService {
  private _resultsService = inject(LottoResultsService);
  private _results = this._resultsService.getResults;
  private _result = [];

  fiveBalls = computed(() => this._getFiveBallMetrics());
  tenHotNumbers = computed(() => this._getTenHotNumbersMetrics());
  tenColdNumbers = computed(() => this._getTenColdNumbersMetrics());
  decenasNumCounter = computed(() => this._countNumDecenas());
  decenasBallsCounter = computed(() => this._countBallsDecenas());
  rangeSumFiveNumbers = computed(() => this._getRangeSumFiveNumbers());

  balls = computed(() => this._results().map((item) => item.ball));
  numbers = computed(() => this._results().map((item) => item.numbers));

  private _paginate = signal<IPaginator>({
    page: 0,
    itemsPerPage: 10,
    next: true
  });

  get paginate() {
    return this._paginate.asReadonly();
  }

  nextPage(page: number) {
    this._paginate.mutate((value) => {
      value.page = page;
    });
  }

  setNext(next: boolean) {
    this._paginate.mutate((value) => {
      value.next = next;
    });
  }

  // Obtener las 5 ball rojas mas repetidas
  private _getFiveBallMetrics = () => {
    const result: {[key: number]: number} = {};
    this.balls().forEach((value) => result[value] = (result[value] || 0) + 1);
    const values = this._getCalculatedMetrics(result, 5);
    return values;
  };

  // Obtener las 10 ball blancas mas repetidas
  private _getTenHotNumbersMetrics = () => {
    const result: {[key: number]: number} = {};
    this.numbers().forEach((value) => {
      value.forEach(item => result[item] = (result[item] || 0) + 1)
    });
    
    const values = this._getCalculatedMetrics(result, 10);
    return values;
  };

  // Obtener las 10 ball blancas menos repetidas
  private _getTenColdNumbersMetrics = () => {
    const result: {[key: number]: number} = {};
    this.numbers().forEach((value) => {
      value.forEach(item => result[item] = (result[item] || 0) + 1)
    });
    
    const values = this._getCalculatedMetrics(result, 10, 'cold');
    return values;
  };

  private _getCalculatedMetrics(obj: {[key: number]: number}, slice: number, type?: 'hot' | 'cold'): Array<IBallResults> {
    const keys = Object.keys(obj);
    const array = [];

    keys.sort((a, b) =>  obj[b] - obj[a]).forEach(k => {
      const temObj: {ball: number, percent: string} = {ball: 0, percent: ''};
      temObj.percent = `${(obj[k] / this._results().length * 100).toFixed(1)}%`;
      temObj.ball = Number(k);
      array.push(temObj) ;
    });

    if (type === 'cold') {
      array.reverse();
    }
    return array.slice(0, slice);
  }

  // Calcular las repticiones de las decenas 
  private _countNumDecenas = () => {
    const decenasCount = {};
    this.numbers().forEach((value) => {
      value.forEach(numero => {
        const decena = Math.floor(numero / 10) * 10;
        if (decenasCount[decena]) {
          decenasCount[decena]++;
        } else {
          decenasCount[decena] = 1;
        }
      })
    });
    const value = this._getDecenasMetrics(decenasCount);
    return value;
  }

  private _countBallsDecenas = () => {
    const decenasCount = {};
    this.balls().forEach((ball) => {
      const decena = Math.floor(ball / 10) * 10;
      if (decenasCount[decena]) {
        decenasCount[decena]++;
      } else {
        decenasCount[decena] = 1;
      }
    });
    const value = this._getDecenasMetrics(decenasCount, 'red');
    return value;
  }

  private _getDecenasMetrics(obj: {[key: number]: number}, type?: 'white' | 'red'): Array<IDecenasResults> {
    const lenthComodity = type && type === 'red' ? this._results().length: this._results().length * 5;
    const keys = Object.keys(obj);
    const array = [];

    keys.sort((a, b) =>  obj[b] - obj[a]).forEach(k => {
      const temObj: IDecenasResults = {
        decena: 0, 
        decenaText: '', 
        percent: ''
      };
      const tenComodity = type && type === 'red' && k === '20' ? 6: 9;
      temObj.percent = `${((obj[k] / (lenthComodity)) * 100).toFixed(1)}%`;
      temObj.decenaText = `${k}-${Number(k)+ tenComodity}`;
      temObj.decena = Number(k);

      array.push(temObj) ;
    });
    return array;
  }

  // Calalcular el rango de las sumas de los 5 nnumeros
  private _getRangeSumFiveNumbers() {
    let valuesArray = [];

    this.numbers().forEach((array) => {
      const arraySum = array.reduce((accumulator, current) => accumulator + current, 0);
      valuesArray.push(arraySum);
    });
    valuesArray = valuesArray.sort((a, b) => a - b);
    const rangeSumResults = this._findRepeatedRanges(valuesArray);
    return rangeSumResults;
  }

  private _findRepeatedRanges(array: number[]) {
    const ranges: {[key: number]: number} = {};
    
    const range1 = EnumRANGEKeys.RANGE1;
    const range2 = EnumRANGEKeys.RANGE2;
    const range3 = EnumRANGEKeys.RANGE3;
    const range4 = EnumRANGEKeys.RANGE4;
    const range5 = EnumRANGEKeys.RANGE5;
    const range6 = EnumRANGEKeys.RANGE6;
    const range7 = EnumRANGEKeys.RANGE7;
    const range8 = EnumRANGEKeys.RANGE8;

    array.forEach((num) => {
      if (num >= 15 && num <= 54) {
        if (ranges[range1]) {
           ranges[range1] += 1;
        }else{
          ranges[range1] = 1;
        }
      }
      if (num >= 55 && num <= 94) {
        if (ranges[range2]) {
           ranges[range2] += 1;
        }else{
          ranges[range2] = 1;
        }
      }
      if (num >= 95 && num <= 134) {
        if (ranges[range3]) {
           ranges[range3]+=1
        }else{
          ranges[range3] = 1;
        }
      }
      if (num >= 135 && num <= 174) {
        if (ranges[range4]) {
           ranges[range4]+=1
        }else{
          ranges[range4] = 1;
        }
      }
      if (num >= 175 && num <= 214) {
        if (ranges[range5]) {
           ranges[range5]+=1
        }else{
          ranges[range5] = 1;
        }
      }
      if (num >= 215 && num <= 254) {
        if (ranges[range6]) {
           ranges[range6]+=1
        }else{
          ranges[range6] = 1;
        }
      }
      if (num >= 255 && num <= 294) {
        if (ranges[range7]) {
           ranges[range7]+=1
        }else{
          ranges[range7] = 1;
        }
      }
      if (num >= 295 && num <= 335) {
        if (ranges[range8]) {
           ranges[range8] += 1;
        }else{
          ranges[range8] = 1;
        }
      }
    });
    const rangesMetrics = this._getRangesMetrics(ranges);
    return rangesMetrics;
  }

  private _getRangesMetrics(obj: {[key: number]: number}): Array<IRangeResults> {
    const keys = Object.keys(obj);
    const array = [];

    keys.sort((a, b) =>  obj[b] - obj[a]).forEach(k => {
      const temObj: IRangeResults = { range: '', percent: '' };
      temObj.percent = `${((obj[k] / (this._results().length)) * 100).toFixed(1)}%`;
      temObj.range = k;

      if (k === EnumRANGEKeys.RANGE1) {
        temObj.value1 = 15;
        temObj.value2 = 54;
      }

      if (k === EnumRANGEKeys.RANGE2) {
        temObj.value1 = 55;
        temObj.value2 = 94;
      }

      if (k === EnumRANGEKeys.RANGE3) {
        temObj.value1 = 95;
        temObj.value2 = 134;
      }

      if (k === EnumRANGEKeys.RANGE4) {
        temObj.value1 = 135;
        temObj.value2 = 174;
      }

      if (k === EnumRANGEKeys.RANGE5) {
        temObj.value1 = 175;
        temObj.value2 = 214;
      }

      if (k === EnumRANGEKeys.RANGE6) {
        temObj.value1 = 215;
        temObj.value2 = 254;
      }

      if (k === EnumRANGEKeys.RANGE7) {
        temObj.value1 = 255;
        temObj.value2 = 294;
      }

      if (k === EnumRANGEKeys.RANGE8) {
        temObj.value1 = 295;
        temObj.value2 = 335;
      }

      array.push(temObj);
    });
    return array;
  }

}
