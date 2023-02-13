import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message, MessageRegister } from "src/app/models/message";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html'
})

export class MessageFormComponent implements OnInit{
  @Input('title') formTitle!: string
  @Input('displayModal') displayModal!: boolean;
  @Input('message') message?: Message; 

  @Output('modalDisplay') hideModalEvent = new EventEmitter<boolean>();
  @Output('submitMethod') submitMethodEvent = new EventEmitter<MessageRegister>();

  messageForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: [this.message?.title, [Validators.required]],
      messageText: [this.message?.text, [Validators.required]]
    });
  }

  hideModal(display: boolean){
    this.hideModalEvent.emit(display);
  }

  submitMethod(){
    this.submitMethodEvent.emit(this.messageForm.value);
  }

  get title() { return this.messageForm.get('title'); }
  get messageText() { return this.messageForm.get('messageText'); }
}