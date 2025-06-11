import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashCan, faPencil);
  }

  @Input() buttonText?: string;
  @Input() iconName?: 'pencil' | 'trash-can';
  @Input() type?: 'button' | 'submit' = 'button';
}
