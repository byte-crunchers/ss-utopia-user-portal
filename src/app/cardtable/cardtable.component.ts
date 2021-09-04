import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cardtable',
  templateUrl: './cardtable.component.html',
  styleUrls: ['./cardtable.component.css']
})
export class CardTableComponent implements OnInit {

  constructor(
    private httpService: HttpService, 
    private modalService: NgbModal,
    private fb: FormBuilder
    ) { }
  cards: any;
  totalCards = 0;
  today = new Date();

  ngOnInit(): void {
    this.loadAllCards();
  }

  loadAllCards() {
    this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.CARDS_GET_URL}`).subscribe((res) => {
      this.cards = res;
      this.totalCards = this.cards.length;
    })
  }

}
